import React, { useState } from 'react';

const AdminGallery = ({ onAddImage, onAddVideo, onDeleteImage, onDeleteVideo, images, videos }) => {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  return (
    <div>
      <h2>Administrar Galería</h2>
      <div style={{ marginBottom: 24 }}>
        <h3>Agregar Imagen</h3>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        <button onClick={() => imageFile && onAddImage(imageFile)}>Subir Imagen</button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3>Agregar Video</h3>
        <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
        <button onClick={() => videoFile && onAddVideo(videoFile)}>Subir Video</button>
      </div>
      <div>
        <h3>Imágenes actuales</h3>
        <ul>
          {images.map((img, idx) => (
            <li key={idx}>
              <img src={img.url} alt={img.name || `Imagen ${idx + 1}`} style={{ width: 100, height: 'auto' }} />
              <button onClick={() => onDeleteImage(img)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Videos actuales</h3>
        <ul>
          {videos.map((video, idx) => (
            <li key={idx}>
              <video src={video.url} style={{ width: 100 }} controls />
              <button onClick={() => onDeleteVideo(video)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminGallery;
