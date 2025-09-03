import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UnauthorizedView.scss';

const UnauthorizedView = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="card-content">
          <div className="icon-container">
            <i className="fas fa-exclamation-triangle warning-icon"></i>
          </div>
          <h1>Acceso No Autorizado</h1>
          <p>Lo sentimos, no tienes permisos para acceder a esta página.</p>
          <div className="actions">
            <button onClick={goToHome} className="action-btn primary">
              <i className="fas fa-home"></i> 
              Ir al Inicio
            </button>
            <button onClick={goToLogin} className="action-btn secondary">
              <i className="fas fa-sign-in-alt"></i> 
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedView; 