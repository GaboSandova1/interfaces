import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth';

const AdminGuard = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminGuard; 