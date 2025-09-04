import React, { useEffect, useState } from 'react';
import colorThemeService from '../../services/colorTheme';

const DEFAULT_COLORS = {
  text_color: '#333333',
  title_color: '#000000',
  background_color: '#ffffff',
  highlight_color: '#007bff',
  button_color: '#0056b3',
};

const colorFields = [
  { key: 'text_color', label: 'Color de Texto', placeholder: '#333333' },
  { key: 'title_color', label: 'Color de Títulos', placeholder: '#000000' },
  { key: 'background_color', label: 'Color de Fondo', placeholder: '#ffffff' },
  { key: 'highlight_color', label: 'Color Resaltador', placeholder: '#007bff' },
  { key: 'button_color', label: 'Color de Botones', placeholder: '#0056b3' },
];

function AdminColors() {
  const [themes, setThemes] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', ...DEFAULT_COLORS, is_default: false });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await colorThemeService.getThemes();
      setThemes(Array.isArray(data) ? data : []);
    } catch (e) {
      setThemes([]);
      setError('Error al cargar los temas de color.');
    }
    setLoading(false);
  };

  const handleInput = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEdit = theme => {
    setEditId(theme.id);
    setForm({
      name: theme.name,
      text_color: theme.text_color,
      title_color: theme.title_color,
      background_color: theme.background_color,
      highlight_color: theme.highlight_color,
      button_color: theme.button_color,
      is_default: theme.is_default,
    });
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este tema?')) return;
    setLoading(true);
    await colorThemeService.deleteTheme(id);
    fetchThemes();
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (editId) {
      await colorThemeService.updateTheme(editId, form);
    } else {
      await colorThemeService.createTheme(form);
    }
    setEditId(null);
    setForm({ name: '', ...DEFAULT_COLORS, is_default: false });
    fetchThemes();
    setLoading(false);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', ...DEFAULT_COLORS, is_default: false });
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Configuración de Colores</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001', maxWidth: 600, marginBottom: 32 }}>
            <h3>{editId ? 'Editar tema' : 'Nuevo tema de color'}</h3>
            <div style={{ marginBottom: 16 }}>
              <label>Nombre del tema:</label>
              <input name="name" value={form.name} onChange={handleInput} required style={{ width: '100%', padding: 8, marginTop: 4 }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {colorFields.map(f => (
                <div key={f.key} style={{ flex: 1, minWidth: 180 }}>
                  <label>{f.label}</label>
                  <input name={f.key} value={form[f.key]} onChange={handleInput} placeholder={f.placeholder} style={{ width: '70%', padding: 8, marginTop: 4, marginRight: 8 }} />
                  <input type="color" name={f.key} value={form[f.key]} onChange={handleInput} style={{ width: 40, height: 40, border: 'none', background: 'none', verticalAlign: 'middle' }} />
                </div>
              ))}
            </div>
            <div style={{ margin: '16px 0' }}>
              <label>
                <input type="checkbox" name="is_default" checked={form.is_default} onChange={handleInput} />
                {' '}Establecer como tema por defecto
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={loading} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600 }}>
                {editId ? 'Actualizar' : 'Guardar'}
              </button>
              {editId && (
                <button type="button" onClick={handleCancel} style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600 }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          {/* Vista previa */}
          <div style={{ background: form.background_color, borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001', maxWidth: 600 }}>
            <h3 style={{ color: form.title_color }}>Vista Previa</h3>
            <h1 style={{ color: form.title_color }}>Título Principal</h1>
            <p style={{ color: form.text_color }}>Este es un texto normal que muestra el color base para el contenido.</p>
            <span style={{ color: form.highlight_color, fontWeight: 600 }}>Este es un texto resaltado</span>
            <div style={{ margin: '24px 0' }}>
              <button style={{ background: form.button_color, color: form.background_color, border: 'none', borderRadius: 4, padding: '8px 24px', marginRight: 12 }}>Botón Principal</button>
              <button style={{ color: form.button_color, border: `1px solid ${form.button_color}`, background: 'transparent', borderRadius: 4, padding: '8px 24px' }}>Botón Secundario</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
              <h4 style={{ color: form.title_color }}>Tarjeta de Ejemplo</h4>
              <p style={{ color: form.text_color }}>Contenido de ejemplo para mostrar cómo se ven los diferentes elementos en una tarjeta.</p>
              <button style={{ background: form.button_color, color: form.background_color, border: 'none', borderRadius: 4, padding: '6px 18px' }}>Acción</button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabla de temas */}
      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>
      )}
      <div style={{ margin: '40px 0 0 0', width: '100%' }}>
        <h3 style={{ marginBottom: 16 }}>Temas guardados</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', fontSize: '1.08rem' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Nombre</th>
              <th style={{ padding: 12 }}>Por Defecto</th>
              <th style={{ padding: 12 }}>Vista Previa</th>
              <th style={{ padding: 12 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(themes) ? themes : []).map(theme => (
              <tr key={theme.id}>
                <td style={{ padding: 12 }}>{theme.id}</td>
                <td style={{ padding: 12 }}>{theme.name}</td>
                <td style={{ padding: 12, textAlign: 'center' }}>{theme.is_default ? '✔️' : ''}</td>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div title="Fondo" style={{ width: 28, height: 28, background: theme.background_color, border: '1px solid #ccc', borderRadius: 4 }} />
                    <div title="Texto" style={{ width: 28, height: 28, background: theme.text_color, border: '1px solid #ccc', borderRadius: 4 }} />
                    <div title="Títulos" style={{ width: 28, height: 28, background: theme.title_color, border: '1px solid #ccc', borderRadius: 4 }} />
                    <div title="Resaltado" style={{ width: 28, height: 28, background: theme.highlight_color, border: '1px solid #ccc', borderRadius: 4 }} />
                    <div title="Botón" style={{ width: 28, height: 28, background: theme.button_color, border: '1px solid #ccc', borderRadius: 4 }} />
                  </div>
                </td>
                <td style={{ padding: 12 }}>
                  <button onClick={() => handleEdit(theme)} style={{ marginRight: 8, background: '#fbbf24', color: '#222', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600 }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(theme.id)} disabled={theme.is_default} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, opacity: theme.is_default ? 0.5 : 1, cursor: theme.is_default ? 'not-allowed' : 'pointer' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminColors;