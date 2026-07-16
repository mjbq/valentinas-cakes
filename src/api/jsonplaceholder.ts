import axios from 'axios';
import type { User } from '../types';

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const DEFAULT_PASSWORD = 'Inacap123';
const DEFAULT_BIRTHDATE = '2000-01-01';

/**
 * Obtiene los 3 primeros usuarios desde JSONPlaceholder y los transforma
 * al formato de usuario usado por la aplicación. Lanza un error controlado
 * si no hay conexión, el servidor falla o la respuesta es inválida.
 */
export async function fetchInitialUsers(): Promise<User[]> {
  try {
    const response = await axios.get<ApiUser[]>(API_URL, { timeout: 8000 });

    if (!Array.isArray(response.data)) {
      throw new Error('Respuesta inválida de la API de usuarios.');
    }

    return response.data.slice(0, 3).map((apiUser) => ({
      id: `api-${apiUser.id}`,
      name: apiUser.name,
      email: apiUser.email,
      password: DEFAULT_PASSWORD,
      birthDate: DEFAULT_BIRTHDATE,
      failedAttempts: 0,
      blocked: false,
      fromApi: true,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tiempo de espera agotado al contactar la API de usuarios.');
      }
      if (!error.response) {
        throw new Error('Sin conexión a internet: no se pudieron cargar los usuarios iniciales.');
      }
      throw new Error(`Error del servidor al obtener usuarios (código ${error.response.status}).`);
    }
    throw new Error('Ocurrió un error inesperado al obtener los usuarios iniciales.');
  }
}
