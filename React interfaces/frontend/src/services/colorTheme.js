// Servicio para consumir la API de temas de color
import api from './api';

const colorThemeService = {
  getThemes: async () => {
    try {
      const res = await api.get('/color-themes');
      if (Array.isArray(res.data)) return res.data;
      if (res.data && Array.isArray(res.data.data)) return res.data.data;
      return [];
    } catch (e) {
      return [];
    }
  },
  createTheme: async (theme) => {
    const res = await api.post('/color-themes', theme);
    return res.data;
  },
  updateTheme: async (id, theme) => {
    const res = await api.put(`/color-themes/${id}`, theme);
    return res.data;
  },
  deleteTheme: async (id) => {
    const res = await api.delete(`/color-themes/${id}`);
    return res.data;
  },
};

export default colorThemeService;
