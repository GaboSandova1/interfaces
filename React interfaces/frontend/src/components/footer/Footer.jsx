import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>WebDesign</h3>
            <p>
              Creamos soluciones digitales innovadoras para impulsar tu presencia en línea.
              Nuestro equipo está comprometido con la excelencia y la satisfacción del cliente.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#portafolio">Portafolio</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Servicios</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#servicios">Diseño Web</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#servicios">Desarrollo de Apps</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#servicios">E-Commerce</a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i>
                <a href="#servicios">Marketing Digital</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contacto</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Ciudad de México, México</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+52 (55) 1234-5678</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>contacto@webdesign.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} WebDesign. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 