import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    checkAuthStatus();
    
    // Event listener para cerrar menús al hacer clic fuera
    const handleClickOutside = (event) => {
      // Cerrar user dropdown
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      
      // Cerrar menú móvil
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Event listener para cambios de autenticación
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('auth-changed', handleAuthChange);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, [isUserMenuOpen, isMenuOpen]);

  const checkAuthStatus = () => {
    setIsAuthenticated(authService.isAuthenticated());
    setCurrentUser(authService.getUser());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    
    // Emitir evento de cambio de autenticación
    window.dispatchEvent(new Event('auth-changed'));
    
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="highlight">Web</span>Design
        </Link>

        <nav className="nav-menu">
          <a className="menu" href="#servicios">Servicios</a>
          <a className="menu" href="#portafolio">Portafolio</a>
          <a className="menu" href="#contacto">Contacto</a>
          
          {!isAuthenticated ? (
            <Link to="/login" className="menu btn-login">
              <i className="fas fa-sign-in-alt icon-margin"></i>
              Iniciar Sesión
            </Link>
          ) : (
            <div className="user-menu" ref={userMenuRef}>
              <button className="user-menu-button" onClick={toggleUserMenu}>
                <i className="fas fa-user icon-margin"></i>
                {currentUser?.name}
              </button>
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  {currentUser?.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item">
                      <i className="fas fa-cog menu-icon"></i>
                      Panel Admin
                    </Link>
                  )}
                  {currentUser?.role === 'user' && (
                    <Link to="/user" className="dropdown-item">
                      <i className="fas fa-user-cog menu-icon"></i>
                      Mi Perfil
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    <i className="fas fa-sign-out-alt menu-icon"></i>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        <button 
          className="menu-button" 
          onClick={toggleMenu}
          ref={menuButtonRef}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`} ref={mobileMenuRef}>
        <a className="menu" href="#servicios" onClick={closeMenu}>Servicios</a>
        <a className="menu" href="#portafolio" onClick={closeMenu}>Portafolio</a>
        <a className="menu" href="#contacto" onClick={closeMenu}>Contacto</a>
        
        {!isAuthenticated ? (
          <Link to="/login" className="btn-mobile" onClick={closeMenu}>
            <i className="fas fa-sign-in-alt icon-margin"></i>
            Iniciar Sesión
          </Link>
        ) : (
          <>
            <div className="mobile-user-info">
              <span className="user-name">
                <i className="fas fa-user icon-margin"></i>
                {currentUser?.name}
              </span>
            </div>
            {currentUser?.role === 'admin' && (
              <Link to="/admin" className="btn-mobile" onClick={closeMenu}>
                <i className="fas fa-cog icon-margin"></i>
                Panel Admin
              </Link>
            )}
            {currentUser?.role === 'user' && (
              <Link to="/user" className="btn-mobile" onClick={closeMenu}>
                <i className="fas fa-user-cog icon-margin"></i>
                Mi Perfil
              </Link>
            )}
            <button 
              className="btn-mobile btn-danger" 
              onClick={() => { handleLogout(); closeMenu(); }}
            >
              <i className="fas fa-sign-out-alt icon-margin"></i>
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 