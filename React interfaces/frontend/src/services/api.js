import axios from 'axios';
import { toast } from 'react-toastify';

// Configuración base de axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('http://localhost:8000/api/auth/refresh', {
            refresh_token: refreshToken
          });
          
          const { token } = response.data;
          localStorage.setItem('token', token);
          
          // Reintentar la request original
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar auth y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirigir al login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Manejar otros errores
    if (error.response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción');
    } else if (error.response?.status === 404) {
      toast.error('Recurso no encontrado');
    } else if (error.response?.status >= 500) {
      toast.error('Error del servidor');
    } else if (error.message === 'Network Error') {
      toast.error('Error de conexión');
    }

    return Promise.reject(error);
  }
);

// Métodos helper
export const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default api; 