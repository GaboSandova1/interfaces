import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// Views
import LandingView from './views/LandingView';
import LoginView from './views/LoginView';
import UserView from './views/UserView';
import AdminView from './views/AdminView';
import UnauthorizedView from './views/UnauthorizedView';

// Guards
import AuthGuard from './guards/AuthGuard';
import AdminGuard from './guards/AdminGuard';

import Tangram3D from './views/Tangram3D';

import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div id="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/login" element={<LoginView />} />
          <Route 
            path="/user" 
            element={
              <AuthGuard>
                <UserView />
              </AuthGuard>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <AdminGuard>
                <AdminView />
              </AdminGuard>
            } 
          />
          <Route path="/unauthorized" element={<UnauthorizedView />} />
          <Route path="/tangram-3d" element={<Tangram3D />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
