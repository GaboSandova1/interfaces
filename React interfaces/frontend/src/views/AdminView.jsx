import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminColors from './admin/AdminColors';
import AdminTypography from './admin/AdminTypography';
import authService from '../services/auth';
import './AdminView.scss';

const AdminView = () => {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate('/');
  };

  const logout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <header className="admin-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-gear"></i> Panel de Administración
            </h1>
            <div className="header-actions">
              <button onClick={goToLanding} className="btn-primary">
                <i className="fas fa-home"></i>
                Volver al Inicio
              </button>
              <button onClick={logout} className="btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/colors" element={<AdminColors />} />
          <Route path="/typography" element={<AdminTypography />} />
          <Route path="/gallery" element={require('./admin/AdminGalleryView').default()} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminView; 