import React from 'react';
import './ImageCarousel.scss';

const ImageCarousel = () => {
  const images = [
    {
      id: 1,
      title: 'Diseño Web Moderno',
      description: 'Sitios web responsivos y atractivos'
    },
    {
      id: 2,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y multiplataforma'
    },
    {
      id: 3,
      title: 'E-Commerce',
      description: 'Tiendas en línea completas'
    }
  ];

  return (
    <section id="portafolio" className="image-carousel">
      <div className="container">
        <div className="section-header">
          <h2>Nuestro Portafolio</h2>
          <p>Proyectos destacados que hemos desarrollado</p>
        </div>
        <div className="carousel-container">
          {images.map((image, index) => (
            <div key={image.id} className="carousel-item">
              <div className="item-content">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel; 