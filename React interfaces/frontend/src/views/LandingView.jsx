import React, { useEffect, useState } from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import ImageCarousel from '../components/ImageCarousel';
import VideoCarousel from '../components/VideoCarousel';
import ContactForm from '../components/contact-form/ContactForm';
import './LandingView.scss';

import api from '../services/api';

const LandingView = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const [imgRes, vidRes] = await Promise.all([
          api.get('/carousel', { params: { type: 'image' } }),
          api.get('/carousel', { params: { type: 'video' } })
        ]);
        setImages(Array.isArray(imgRes.data) ? imgRes.data : []);
        setVideos((Array.isArray(vidRes.data) ? vidRes.data : []).map(v => ({ ...v, type: v.type || 'video/mp4' })));
      } catch (err) {
        // Puedes mostrar un mensaje de error aquí si lo deseas
      }
    };
    fetchFiles();
  }, []);

  const handleVideoFiles = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file, idx) => ({
      id: idx,
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setVideos(newVideos);
  };

  // Si quieres permitir selección local en landing, mantén el handler. Si solo quieres sincronizar desde admin, puedes eliminarlo.

  return (
    <div className="landing-page">
      <Hero />
      <Services />
      {/* Carrusel de imágenes */}
      <section className="image-carousel-section">
        <div className="container">
          <div className="section-header">
            <h2>Carrusel de Imágenes</h2>
            <p>Imágenes destacadas de nuestros proyectos</p>
          </div>
          <ImageCarousel images={images} large />
        </div>
      </section>
      {/* Carrusel de videos */}
      <section className="video-carousel-section">
        <div className="container">
          <div className="section-header">
            <h2>Carrusel de Videos</h2>
            <p>Videos destacados de nuestros proyectos</p>
          </div>
          <VideoCarousel videos={videos} large />
        </div>
      </section>
      <ContactForm />
    </div>
  );
};

export default LandingView; 