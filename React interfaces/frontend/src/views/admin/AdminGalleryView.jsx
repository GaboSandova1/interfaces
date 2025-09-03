import React, { useState } from 'react';
import AdminGallery from '../../components/AdminGallery';

// Datos de ejemplo para pruebas
const initialImages = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', name: 'Paisaje' },
  { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', name: 'Montaña' }
];
const initialVideos = [
  { url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'Video 1', type: 'video/mp4' }
];

const AdminGalleryView = () => {
  const [images, setImages] = useState(initialImages);
  const [videos, setVideos] = useState(initialVideos);

  // Simulación de agregar y eliminar
  const onAddImage = (file) => {
    // Aquí iría la lógica de subida al backend
    const url = URL.createObjectURL(file);
    setImages([...images, { url, name: file.name }]);
  };
  const onAddVideo = (file) => {
    const url = URL.createObjectURL(file);
    setVideos([...videos, { url, name: file.name, type: file.type }]);
  };
  const onDeleteImage = (img) => {
    setImages(images.filter(i => i.url !== img.url));
  };
  const onDeleteVideo = (vid) => {
    setVideos(videos.filter(v => v.url !== vid.url));
  };

  return (
    <div className="admin-gallery-view">
      <h2>Gestión de Carruseles</h2>
      <AdminGallery
        images={images}
        videos={videos}
        onAddImage={onAddImage}
        onAddVideo={onAddVideo}
        onDeleteImage={onDeleteImage}
        onDeleteVideo={onDeleteVideo}
      />
    </div>
  );
};

export default AdminGalleryView;
