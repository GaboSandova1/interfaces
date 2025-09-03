import React from 'react';
import './Services.scss';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Diseño Web',
      description: 'Creamos sitios web modernos y responsivos que se adaptan a todos los dispositivos.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Desarrollo de Apps',
      description: 'Desarrollamos aplicaciones móviles nativas y multiplataforma.'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'E-Commerce',
      description: 'Implementamos tiendas en línea completas con pasarelas de pago seguras.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Marketing Digital',
      description: 'Estrategias de marketing digital para aumentar tu presencia en línea.'
    }
  ];

  return (
    <section id="servicios" className="services">
      <div className="container">
        <div className="section-header">
          <h2>Nuestros Servicios</h2>
          <p>Soluciones digitales completas para tu negocio</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 