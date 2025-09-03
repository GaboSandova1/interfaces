import api from './api';
import { toast } from 'react-toastify';

class UserService {
  async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      toast.error('Error al cargar usuarios');
      throw error;
    }
  }

  async getUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Error al cargar usuario');
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await api.post('/users', userData);
      toast.success('Usuario creado correctamente');
      return response.data;
    } catch (error) {
      toast.error('Error al crear usuario');
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData);
      toast.success('Usuario actualizado correctamente');
      return response.data;
    } catch (error) {
      toast.error('Error al actualizar usuario');
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      toast.success('Usuario eliminado correctamente');
      return response.data;
    } catch (error) {
      toast.error('Error al eliminar usuario');
      throw error;
    }
  }
}

export default new UserService(); 