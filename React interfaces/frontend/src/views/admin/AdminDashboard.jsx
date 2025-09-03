import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Dashboard</h2>
      <p>Bienvenido al panel de administración</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Temas de Color</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Tipografías</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 