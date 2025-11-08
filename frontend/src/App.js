import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Button from './components/Button';
import { appStyles } from './styles/components';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    if (authService.isAuthenticated()) {
      const userData = authService.getUserData();
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <div style={appStyles.appLoading}>
        <div style={appStyles.appLoadingSpinner}></div>
        <p style={appStyles.appLoadingText}>Cargando aplicación...</p>
      </div>
    );
  }

  return (
    <Router>
      <div style={appStyles.app}>
        <Navbar user={user} onLogout={handleLogout} />
        
        <main style={appStyles.main}>
          <Routes>
            <Route 
              path="/login" 
              element={
                !user ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            
            <Route 
              path="/registro" 
              element={
                !user ? (
                  <Register />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard user={user} onUserUpdate={handleUserUpdate} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="*" 
              element={
                <div style={appStyles.notFound}>
                  <h1 style={appStyles.notFoundTitle}>404 - Página no encontrada</h1>
                  <p style={appStyles.notFoundText}>La página que buscas no existe.</p>
                  <Button 
                    variant="primary"
                    onClick={() => window.location.href = '/'}
                  >
                    Ir al inicio
                  </Button>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;