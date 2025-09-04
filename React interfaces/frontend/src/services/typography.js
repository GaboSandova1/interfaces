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

  async setDefaultTheme(id) {
    try {
      // Obtener el tema actual para enviar todos los campos requeridos
      const { data } = await api.get(`/typography-themes/${id}`);
      const theme = data.data;
      const payload = {
        name: theme.name,
        heading_font_family: theme.heading_font_family,
        heading_font_size: theme.heading_font_size,
        body_font_family: theme.body_font_family,
        body_font_size: theme.body_font_size,
        is_default: true
      };
      const res = await api.put(`/typography-themes/${id}`, payload);
      toast.success('Tema establecido como predeterminado');
      return res.data.data;
    } catch (e) {
      toast.error('Error al establecer tema predeterminado');
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
