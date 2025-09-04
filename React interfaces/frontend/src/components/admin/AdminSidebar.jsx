import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.scss';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin',
      icon: 'fas fa-tachometer-alt',
      label: 'Dashboard'
    },
    {
      path: '/admin/users',
      icon: 'fas fa-users',
      label: 'Usuarios'
    },
    {
      path: '/admin/colors',
      icon: 'fas fa-palette',
      label: 'Colores'
    },
    {
      path: '/admin/typography',
      icon: 'fas fa-font',
      label: 'Tipografía'
    },
    {
      path: '/admin/gallery',
      icon: 'fas fa-images',
      label: 'Carrusel'
    }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar; 