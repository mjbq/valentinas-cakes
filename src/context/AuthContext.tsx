import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { User } from '../types';
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../utils/storage';
import { fetchInitialUsers } from '../api/jsonplaceholder';

type RegisterInput = Omit<User, 'id' | 'failedAttempts' | 'blocked' | 'fromApi'>;

type LoginResult =
  | { ok: true }
  | { ok: false; reason: 'not-found' | 'blocked' | 'wrong-password'; attemptsLeft?: number };

interface AuthContextValue {
  currentUser: User | null;
  users: User[];
  apiError: string | null;
  loadingApi: boolean;
  register: (data: RegisterInput) => { ok: true } | { ok: false; reason: 'duplicate-email' };
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadFromStorage<User[]>(STORAGE_KEYS.USERS, []));
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    loadFromStorage<User | null>(STORAGE_KEYS.SESSION, null)
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const hasTriedApiLoad = useRef(false);

  // Persistir usuarios y sesión en Local Storage cada vez que cambian.
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SESSION, currentUser);
  }, [currentUser]);

  // Cargar los 3 primeros usuarios de la API una sola vez.
  useEffect(() => {
    const alreadyLoaded = loadFromStorage<boolean>(STORAGE_KEYS.API_LOADED, false);
    if (alreadyLoaded || hasTriedApiLoad.current) return;
    hasTriedApiLoad.current = true;

    setLoadingApi(true);
    fetchInitialUsers()
      .then((apiUsers) => {
        setUsers((prev) => {
          const existingEmails = new Set(prev.map((u) => u.email.toLowerCase()));
          const newOnes = apiUsers.filter((u) => !existingEmails.has(u.email.toLowerCase()));
          return [...prev, ...newOnes];
        });
        saveToStorage(STORAGE_KEYS.API_LOADED, true);
      })
      .catch((error: Error) => {
        setApiError(error.message);
      })
      .finally(() => setLoadingApi(false));
  }, []);

  function register(data: RegisterInput): { ok: true } | { ok: false; reason: 'duplicate-email' } {
    const normalizedEmail = data.email.trim().toLowerCase();
    const emailExists = users.some(
          (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (emailExists) {
      return { ok: false, reason: 'duplicate-email' };
    }

    const newUser: User = {
      ...data,
      email: normalizedEmail,
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      failedAttempts: 0,
      blocked: false,
  };

    setUsers((prev) => [...prev, newUser]);
    return { ok: true };
  }

  function login(email: string, password: string): LoginResult {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return { ok: false, reason: 'not-found' };
    }
    if (user.blocked) {
      return { ok: false, reason: 'blocked' };
    }
    if (user.password !== password) {
      const failedAttempts = user.failedAttempts + 1;
      const blocked = failedAttempts >= 3;
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, failedAttempts, blocked } : u))
      );
      if (blocked) {
        return { ok: false, reason: 'blocked' };
      }
      return { ok: false, reason: 'wrong-password', attemptsLeft: 3 - failedAttempts };
    }

    // Login correcto: resetear intentos fallidos.
    const freshUser = {
      ...user,
      failedAttempts: 0,
      blocked: false,
    };
    setUsers((prev) => 
      prev.map((u) => (u.id === user.id ? freshUser : u))
  );
    setCurrentUser(freshUser);
    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, users, apiError, loadingApi, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return ctx;
}
