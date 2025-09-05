import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import VideoCarousel from './VideoCarousel';
import api from '../services/api';

const API_URL = '/carousel';

export default function AdminCarouselManager() {
  // Eliminar todas las imágenes
  const handleDeleteAllImages = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar TODAS las imágenes?')) return;
    setLoading(true);
    try {
      for (const img of images) {
        await api.delete(API_URL, { data: { type: 'image', name: img.name } });
      }
      fetchFiles();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthError(true);
      }
    }
    setLoading(false);
  };
  const [authError, setAuthError] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  const fetchFiles = async () => {
    try {
      const [imgRes, vidRes] = await Promise.all([
        api.get(API_URL, { params: { type: 'image' } }),
        api.get(API_URL, { params: { type: 'video' } })
      ]);
      setImages(imgRes.data);
      setVideos(vidRes.data);
  setPreviewImages((Array.isArray(imgRes.data) ? imgRes.data : []).map(i => ({ url: i.url, name: i.name })));
  setPreviewVideos((Array.isArray(vidRes.data) ? vidRes.data : []).map(v => ({ url: v.url, name: v.name, type: v.type || 'video/mp4' })));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthError(true);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (type) => {
    setLoading(true);
    const file = type === 'image' ? imageFile : videoFile;
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    try {
      await api.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchFiles();
      if (type === 'image') setImageFile(null);
      else setVideoFile(null);
      // Limpiar previews locales después de subir
      if (type === 'image') setPreviewImages([]);
      else setPreviewVideos([]);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthError(true);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (type, name) => {
    if (!window.confirm('¿Seguro que deseas eliminar este archivo?')) return;
    setLoading(true);
    try {
      await api.delete(API_URL, { data: { type, name } });
      fetchFiles();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthError(true);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {authError && (
        <div style={{ background: '#ef4444', color: 'white', padding: 16, borderRadius: 8, marginBottom: 24, fontWeight: 600, textAlign: 'center' }}>
          Tu sesión ha expirado o no tienes permisos. Por favor, <a href="/login" style={{ color: '#fff', textDecoration: 'underline' }}>inicia sesión</a> de nuevo.
        </div>
      )}
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <h2>Administrar Carrusel de Img</h2>
          <input type="file" accept="image/*" multiple onChange={async e => {
            const files = Array.from(e.target.files);
            setImageFile(files[0] || null);
            if (files.length > 0) {
              const imgs = files.map(file => ({ url: URL.createObjectURL(file), name: file.name }));
              setPreviewImages(imgs);
              setImages(imgs); // Actualiza el carrusel con las imágenes locales
            } else {
              setPreviewImages([]);
              setImages([]);
            }
          }} />
          <button disabled={!imageFile || loading} onClick={() => handleUpload('image')} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, marginLeft: 8 }}>
            Subir Imagen
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, margin: '16px 0' }}>
            {previewImages.map(img => (
              <div key={img.name} style={{ position: 'relative' }}>
                <img src={img.url.startsWith('http') ? img.url : `${window.location.origin}${img.url}`} alt={img.name} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                <button style={{ position: 'absolute', top: 0, right: 0, background: '#ef4444', color: 'white', border: 'none', borderRadius: '0 8px 0 8px', padding: '2px 8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleDelete('image', img.name)}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Administrar Carrusel de Videos</h2>
          <input type="file" accept="video/*" onChange={e => {
            const file = e.target.files[0];
            setVideoFile(file);
            if (file) {
              setPreviewVideos([{ url: URL.createObjectURL(file), name: file.name, type: file.type }]);
            } else {
              setPreviewVideos([]);
            }
          }} />
          <button disabled={!videoFile || loading} onClick={() => handleUpload('video')} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, marginLeft: 8 }}>
            Subir Video
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, margin: '16px 0' }}>
            {videos.map(vid => (
              <div key={vid.name} style={{ position: 'relative' }}>
                <video src={vid.url && vid.url.startsWith('http') ? vid.url : `${window.location.origin}${vid.url}`} controls style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, maxWidth: 120, maxHeight: 80, minWidth: 120, minHeight: 80, display: 'block' }} />
                <button style={{ position: 'absolute', top: 0, right: 0, background: '#ef4444', color: 'white', border: 'none', borderRadius: '0 8px 0 8px', padding: '2px 8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleDelete('video', vid.name)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: 8 }}>Preview Carrusel de Imágenes</h3>
          <ImageCarousel images={images} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: 8 }}>Preview Carrusel de Videos</h3>
          <VideoCarousel videos={videos} />
        </div>
      </div>
    </div>
  );
}
