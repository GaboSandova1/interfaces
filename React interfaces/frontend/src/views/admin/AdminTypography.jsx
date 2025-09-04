import React, { useState, useEffect, useContext } from 'react';
import { TypographyContext } from '../../context/TypographyContext';
import typographyService from '../../services/typography';
import fontService from '../../services/font';
import TypographyPreview from '../../components/admin/TypographyPreview';

const DEFAULT_SERIF_FONTS = [
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Playfair Display', value: 'Playfair Display, serif' },
  { label: 'Merriweather', value: 'Merriweather, serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Lora', value: 'Lora, serif' }
];
const DEFAULT_SANS_SERIF_FONTS = [
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' }
];

const AdminTypography = () => {
  const { reloadTypography } = useContext(TypographyContext);
  const [headingFont, setHeadingFont] = useState(DEFAULT_SERIF_FONTS[0].value);
  const [headingSize, setHeadingSize] = useState('32px');
  const [bodyFont, setBodyFont] = useState(DEFAULT_SANS_SERIF_FONTS[0].value);
  const [bodySize, setBodySize] = useState('18px');

  // Fuentes personalizadas
  const [fonts, setFonts] = useState([]);
  const [serifFonts, setSerifFonts] = useState(DEFAULT_SERIF_FONTS);
  const [sansSerifFonts, setSansSerifFonts] = useState(DEFAULT_SANS_SERIF_FONTS);
  const [fontFile, setFontFile] = useState(null);
  const [fontDisplayName, setFontDisplayName] = useState('');
  useEffect(() => {
    fetchFonts();
  }, []);

  const fetchFonts = async () => {
    try {
      const data = await fontService.getFonts();
      setFonts(data);
      updateFontOptions(data);
    } catch (e) {}
  };

  const updateFontOptions = (fontList) => {
    const customFonts = (fontList || []).filter(f => f.is_active).map(f => ({ label: f.display_name, value: f.font_family }));
    setSerifFonts([...DEFAULT_SERIF_FONTS, ...customFonts]);
    setSansSerifFonts([...DEFAULT_SANS_SERIF_FONTS, ...customFonts]);
  };

  const handleFontUpload = async () => {
    if (!fontFile || !fontDisplayName) return;
    const formData = new FormData();
    formData.append('font_file', fontFile);
    formData.append('display_name', fontDisplayName);
    setLoading(true);
    try {
      await fontService.uploadFont(formData);
      setFontFile(null);
      setFontDisplayName('');
      fetchFonts();
    } catch (e) {}
    setLoading(false);
  };

  const handleDeleteFont = async (id) => {
    setLoading(true);
    try {
      await fontService.deleteFont(id);
      fetchFonts();
    } catch (e) {}
    setLoading(false);
  };

  const handleToggleFont = async (id) => {
    setLoading(true);
    try {
      await fontService.toggleFontActive(id);
      fetchFonts();
    } catch (e) {}
    setLoading(false);
  };


  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const data = await typographyService.getThemes();
      setThemes(data);
    } catch (e) {}
    setLoading(false);
  };

  const handleSaveTheme = async () => {
    setLoading(true);
    try {
      await typographyService.createTheme({
        name: `Tema ${themes.length + 1}`,
        heading_font_family: headingFont,
        heading_font_size: headingSize,
        body_font_family: bodyFont,
        body_font_size: bodySize,
        is_default: false
      });
      // Recargar temas y seleccionar el último guardado
      const data = await typographyService.getThemes();
      setThemes(data);
      if (data && data.length > 0) {
        const last = data[data.length - 1];
        setSelectedTheme(last.id);
        setHeadingFont(last.heading_font_family);
        setHeadingSize(last.heading_font_size);
        setBodyFont(last.body_font_family);
        setBodySize(last.body_font_size);
      }
    } catch (e) {}
    setLoading(false);
  };

  const handleLoadTheme = (theme) => {
    setSelectedTheme(theme.id);
    setHeadingFont(theme.heading_font_family);
    setHeadingSize(theme.heading_font_size);
    setBodyFont(theme.body_font_family);
    setBodySize(theme.body_font_size);
  };

  return (
    <div className="admin-typography" style={{ maxWidth: 1100, margin: '0 auto', padding: 32, minHeight: '70vh' }}>
      <h2 style={{ marginBottom: 24 }}>Gestión de Tipografía</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'stretch' }}>
  <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h3>Configuración</h3>
          <div style={{ marginBottom: 16 }}>
            <label>Fuente para títulos:</label>
            <select value={headingFont} onChange={e => setHeadingFont(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }}>
              {serifFonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Tamaño de títulos:</label>
            <input type="text" value={headingSize} onChange={e => setHeadingSize(e.target.value)} placeholder="32px" style={{ width: '100%', padding: 8, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Fuente para contenido:</label>
            <select value={bodyFont} onChange={e => setBodyFont(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }}>
              {sansSerifFonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Tamaño de contenido:</label>
            <input type="text" value={bodySize} onChange={e => setBodySize(e.target.value)} placeholder="18px" style={{ width: '100%', padding: 8, marginTop: 4 }} />
          </div>

          {/* Fuentes personalizadas (.ttf) */}
          <div style={{ margin: '24px 0' }}>
            <h4>Fuentes personalizadas (.ttf)</h4>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <input type="file" accept=".ttf" onChange={e => setFontFile(e.target.files[0])} />
            </div>
            <div>
              <input type="text" placeholder="Nombre para mostrar" value={fontDisplayName} onChange={e => setFontDisplayName(e.target.value)} style={{ padding: 8, marginRight: 8 }} />
              <button onClick={handleFontUpload} disabled={loading || !fontFile || !fontDisplayName} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }}>Subir fuente</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleSaveTheme} disabled={loading} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }}>Guardar tema</button>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <TypographyPreview headingFont={headingFont} headingSize={headingSize} bodyFont={bodyFont} bodySize={bodySize} />
        </div>
      </div>
      {/* Tabla de temas guardados fuera del div de configuración */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <table style={{ width: '100%', maxWidth: 900, borderCollapse: 'collapse', minHeight: 250, boxShadow: '0 2px 8px #0001', background: '#fff', transition: 'width 0.2s' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ border: '1px solid #d1d5db', padding: 6 }}>ID</th>
              <th style={{ border: '1px solid #d1d5db', padding: 6 }}>Nombre</th>
              <th style={{ border: '1px solid #d1d5db', padding: 6 }}>Por Defecto</th>
              <th style={{ border: '1px solid #d1d5db', padding: 6 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {themes.map(theme => (
              <tr key={theme.id}>
                <td style={{ border: '1px solid #d1d5db', padding: 6 }}>{theme.id}</td>
                <td style={{ border: '1px solid #d1d5db', padding: 6 }}>{theme.name}</td>
                <td style={{ border: '1px solid #d1d5db', padding: 6, textAlign: 'center' }}>{theme.is_default ? '✔️' : ''}</td>
                <td style={{ border: '1px solid #d1d5db', padding: 6 }}>
                  {!theme.is_default && (
                    <button onClick={async () => {
                      setLoading(true);
                      await typographyService.setDefaultTheme(theme.id);
                      await fetchThemes();
                      if (reloadTypography) await reloadTypography();
                      setLoading(false);
                    }} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', marginRight: 8 }}>Usar como predeterminado</button>
                  )}
                  <button onClick={() => handleLoadTheme(theme)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Cargar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTypography;