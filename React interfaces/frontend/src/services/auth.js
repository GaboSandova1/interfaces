import api from './api';
import { toast } from 'react-toastify';

class AuthService {
  constructor() {
  this.token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  this.user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
  }

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      toast.success('Login exitoso');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Error en el login';
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      toast.success('Registro exitoso');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Error en el registro';
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async logout() {
    try {
      if (this.token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      this.clearAuth();
      toast.info('Sesión cerrada');
    }
  }

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      this.setToken(token);
      return true;
    } catch (error) {
      this.clearAuth();
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/user');
      const user = response.data;
      this.setUser(user);
      return user;
    } catch (error) {
      this.clearAuth();
      return null;
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.token;
  }

  isAdmin() {
    return this.user?.role === 'admin';
  }

  clearAuth() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  }

  // Método para inicializar la autenticación al cargar la app
  init() {
    if (this.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }
}

export default new AuthService(); 