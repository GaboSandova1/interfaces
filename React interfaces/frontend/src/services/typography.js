import api from './api';
import { toast } from 'react-toastify';

class TypographyService {
  async getThemes() {
    try {
      const res = await api.get('/typography-themes');
      return res.data.data;
    } catch (e) {
      toast.error('Error al cargar temas de tipografía');
      throw e;
    }
  }

  async createTheme(data) {
    try {
      const res = await api.post('/typography-themes', data);
      toast.success('Tema guardado');
      return res.data.data;
    } catch (e) {
      toast.error('Error al guardar tema');
      throw e;
    }
  }

  async updateTheme(id, data) {
    try {
      const res = await api.put(`/typography-themes/${id}`, data);
      toast.success('Tema actualizado');
      return res.data.data;
    } catch (e) {
      toast.error('Error al actualizar tema');
      throw e;
    }
  }

  async deleteTheme(id) {
    try {
      await api.delete(`/typography-themes/${id}`);
      toast.success('Tema eliminado');
    } catch (e) {
      toast.error('Error al eliminar tema');
      throw e;
    }
  }
}

export default new TypographyService();
