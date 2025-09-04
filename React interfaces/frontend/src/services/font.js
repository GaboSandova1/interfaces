import api from './api';
import { toast } from 'react-toastify';

class FontService {
  async getFonts() {
    try {
      const res = await api.get('/fonts');
      return res.data.data;
    } catch (e) {
      toast.error('Error al cargar fuentes');
      throw e;
    }
  }

  async uploadFont(formData) {
    try {
      const res = await api.post('/fonts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Fuente subida');
      return res.data.data;
    } catch (e) {
      toast.error('Error al subir fuente');
      throw e;
    }
  }

  async deleteFont(id) {
    try {
      await api.delete(`/fonts/${id}`);
      toast.success('Fuente eliminada');
    } catch (e) {
      toast.error('Error al eliminar fuente');
      throw e;
    }
  }

  async toggleFontActive(id) {
    try {
      const res = await api.patch(`/fonts/${id}/toggle`);
      toast.success('Estado de fuente actualizado');
      return res.data.data;
    } catch (e) {
      toast.error('Error al actualizar estado de fuente');
      throw e;
    }
  }
}

export default new FontService();
