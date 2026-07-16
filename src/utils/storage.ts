// Claves usadas en Local Storage
export const STORAGE_KEYS = {
  USERS: 'vc_users',
  PRODUCTS: 'vc_products',
  CART: 'vc_cart',
  SESSION: 'vc_session',
  API_LOADED: 'vc_api_users_loaded',
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error leyendo "${key}" de Local Storage:`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando "${key}" en Local Storage:`, error);
  }
}
