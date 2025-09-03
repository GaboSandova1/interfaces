import React from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import ImageCarousel from '../components/ImageCarousel';
import VideoCarousel from '../components/VideoCarousel';
import ContactForm from '../components/contact-form/ContactForm';
import './LandingView.scss';

const LandingView = () => {
  // Ejemplo de datos temporales
  const images = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', name: 'Paisaje' },
  { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', name: 'Montaña' },
  { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', name: 'Ciudad' }
  ];
  const videos = [
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'Video 1', type: 'video/mp4' },
    { url: 'https://www.w3schools.com/html/movie.mp4', name: 'Video 2', type: 'video/mp4' }
  ];

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
          <ImageCarousel images={images} />
        </div>
      </section>
      {/* Carrusel de videos */}
      <section className="video-carousel-section">
        <div className="container">
          <div className="section-header">
            <h2>Carrusel de Videos</h2>
            <p>Videos destacados de nuestros proyectos</p>
          </div>
          <VideoCarousel videos={videos} />
        </div>
      </section>
      <ContactForm />
    </div>
  );
};

export default LandingView; 