import React, { useState } from 'react';
import useResponsive from '../utils/useResponsive';
import { navbarStyles } from '../styles/components';

const Navbar = ({ user, onLogout }) => {
  const { isMobile, isTablet } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <nav style={navbarStyles.navbar}>
      <div style={navbarStyles.navContent}>
        {/* Brand */}
        <div style={navbarStyles.brand}>
          <h2 style={{...navbarStyles.brandTitle, fontSize: isMobile ? '1.2rem' : '1.5rem'}}>
            V-Wallet
          </h2>
        </div>
        
        {user && (
          <>
            {/* Desktop/Tablet Layout */}
            {!isMobile && (
              <div style={navbarStyles.userInfo}>
                <span style={navbarStyles.userName}>
                  Hola, {user.nombres}
                </span>
                <span style={navbarStyles.userBalance}>
                  {formatCurrency(user.saldo || 0)}
                </span>
                <button style={navbarStyles.logoutBtn} onClick={onLogout}>
                  {isTablet ? 'Salir' : 'Cerrar Sesión'}
                </button>
              </div>
            )}

            {/* Mobile Layout */}
            {isMobile && (
              <div style={{ position: 'relative' }}>
                <button 
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                  }}
                  onClick={toggleMenu}
                  aria-label="Abrir menú"
                >
                  <div style={{
                    width: '25px',
                    height: '3px',
                    backgroundColor: 'white',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                  }}></div>
                  <div style={{
                    width: '25px',
                    height: '3px',
                    backgroundColor: 'white',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                  }}></div>
                  <div style={{
                    width: '25px',
                    height: '3px',
                    backgroundColor: 'white',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                  }}></div>
                </button>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: '#0056b3',
                    borderRadius: '8px',
                    padding: '1rem',
                    minWidth: '250px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    marginTop: '0.5rem',
                    zIndex: 1001,
                  }}>
                    <div style={{
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                      paddingBottom: '1rem',
                      marginBottom: '1rem',
                    }}>
                      <span style={{
                        display: 'block',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: '0.5rem',
                      }}>
                        {user.nombres}
                      </span>
                      <span style={{
                        display: 'block',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                        {formatCurrency(user.saldo || 0)}
                      </span>
                    </div>
                    <button 
                      style={{
                        width: '100%',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            zIndex: 999,
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;