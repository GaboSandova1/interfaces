import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/auth';
import './LoginView.scss';

const LoginView = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [hideLoginPassword, setHideLoginPassword] = useState(true);
  const [hideRegisterPassword, setHideRegisterPassword] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnUrl, setReturnUrl] = useState('/admin');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Obtener URL de retorno si existe
    const returnUrlParam = searchParams.get('returnUrl');
    if (returnUrlParam) {
      setReturnUrl(returnUrlParam);
    }
  }, [searchParams]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginForm.email) {
      errors.email = 'El correo es requerido';
    } else if (!isValidEmail(loginForm.email)) {
      errors.email = 'Ingrese un correo válido';
    }
    
    if (!loginForm.password) {
      errors.password = 'La contraseña es requerida';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerForm.name) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!registerForm.email) {
      errors.email = 'El correo es requerido';
    } else if (!isValidEmail(registerForm.email)) {
      errors.email = 'Ingrese un correo válido';
    }
    
    if (!registerForm.password) {
      errors.password = 'La contraseña es requerida';
    } else if (registerForm.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!registerForm.password_confirmation) {
      errors.password_confirmation = 'Confirme la contraseña';
    } else if (registerForm.password !== registerForm.password_confirmation) {
      errors.password_confirmation = 'Las contraseñas no coinciden';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginChange = (field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    if (loginErrors[field]) {
      setLoginErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegisterChange = (field, value) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
    if (registerErrors[field]) {
      setRegisterErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await authService.login(loginForm);
      if (result.success) {
        // Emitir evento de cambio de autenticación
        window.dispatchEvent(new Event('auth-changed'));
        if (result.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await authService.register(registerForm);
      if (result.success) {
        // Emitir evento de cambio de autenticación
        window.dispatchEvent(new Event('auth-changed'));
        navigate(returnUrl);
      }
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToLanding = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="back-button-container">
          <button onClick={goToLanding} className="back-btn">
            <i className="fas fa-home button-icon"></i>
            Volver al Inicio
          </button>
        </div>
        
        <div className="card-content">
          <div className="tabs">
            <button 
              onClick={() => setActiveTab('login')} 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            >
              <i className="fas fa-sign-in-alt tab-icon"></i>
              Iniciar Sesión
            </button>
            <button 
              onClick={() => setActiveTab('register')} 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            >
              <i className="fas fa-user-plus tab-icon"></i>
              Registrarse
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={onLogin} className="form-container">
              <div className="form-field">
                <label>Correo Electrónico</label>
                <div className="input-group">
                  <i className="fas fa-envelope field-icon"></i>
                  <input 
                    value={loginForm.email}
                    onChange={(e) => handleLoginChange('email', e.target.value)}
                    type="email" 
                    required
                    className={loginErrors.email ? 'error' : ''}
                  />
                </div>
                {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
              </div>

              <div className="form-field">
                <label>Contraseña</label>
                <div className="input-group">
                  <i className="fas fa-lock field-icon"></i>
                  <input 
                    value={loginForm.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                    type={hideLoginPassword ? 'password' : 'text'} 
                    required
                    className={loginErrors.password ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    onClick={() => setHideLoginPassword(!hideLoginPassword)}
                    className="password-toggle"
                  >
                    <i className={hideLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
                {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? (
                  <div className="spinner"></div>
                ) : (
                  <i className="fas fa-sign-in-alt button-icon"></i>
                )}
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={onRegister} className="form-container">
              <div className="form-field">
                <label>Nombre</label>
                <div className="input-group">
                  <i className="fas fa-user field-icon"></i>
                  <input 
                    value={registerForm.name}
                    onChange={(e) => handleRegisterChange('name', e.target.value)}
                    type="text" 
                    required
                    className={registerErrors.name ? 'error' : ''}
                  />
                </div>
                {registerErrors.name && <span className="error-message">{registerErrors.name}</span>}
              </div>

              <div className="form-field">
                <label>Correo Electrónico</label>
                <div className="input-group">
                  <i className="fas fa-envelope field-icon"></i>
                  <input 
                    value={registerForm.email}
                    onChange={(e) => handleRegisterChange('email', e.target.value)}
                    type="email" 
                    required
                    className={registerErrors.email ? 'error' : ''}
                  />
                </div>
                {registerErrors.email && <span className="error-message">{registerErrors.email}</span>}
              </div>

              <div className="form-field">
                <label>Contraseña</label>
                <div className="input-group">
                  <i className="fas fa-lock field-icon"></i>
                  <input 
                    value={registerForm.password}
                    onChange={(e) => handleRegisterChange('password', e.target.value)}
                    type={hideRegisterPassword ? 'password' : 'text'} 
                    required
                    minLength="6"
                    className={registerErrors.password ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    onClick={() => setHideRegisterPassword(!hideRegisterPassword)}
                    className="password-toggle"
                  >
                    <i className={hideRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
                {registerErrors.password && <span className="error-message">{registerErrors.password}</span>}
              </div>

              <div className="form-field">
                <label>Confirmar Contraseña</label>
                <div className="input-group">
                  <i className="fas fa-lock field-icon"></i>
                  <input 
                    value={registerForm.password_confirmation}
                    onChange={(e) => handleRegisterChange('password_confirmation', e.target.value)}
                    type={hideRegisterPassword ? 'password' : 'text'} 
                    required
                    className={registerErrors.password_confirmation ? 'error' : ''}
                  />
                </div>
                {registerErrors.password_confirmation && <span className="error-message">{registerErrors.password_confirmation}</span>}
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? (
                  <div className="spinner"></div>
                ) : (
                  <i className="fas fa-user-plus button-icon"></i>
                )}
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginView; 