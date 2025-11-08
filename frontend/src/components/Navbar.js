import React, { useState } from 'react';
import useResponsive from '../utils/useResponsive';

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
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Brand */}
        <div style={styles.brand}>
          <h2 style={{...styles.brandTitle, fontSize: isMobile ? '1.2rem' : '1.5rem'}}>
            V-Wallet
          </h2>
        </div>
        
        {user && (
          <>
            {/* Desktop/Tablet Layout */}
            {!isMobile && (
              <div style={styles.userInfo}>
                <span style={styles.userName}>
                  Hola, {user.nombres}
                </span>
                <span style={styles.userBalance}>
                  {formatCurrency(user.saldo || 0)}
                </span>
                <button style={styles.logoutBtn} onClick={onLogout}>
                  {isTablet ? 'Salir' : 'Cerrar Sesión'}
                </button>
              </div>
            )}

            {/* Mobile Layout */}
            {isMobile && (
              <div style={styles.mobileHeader}>
                <button 
                  style={styles.hamburgerBtn} 
                  onClick={toggleMenu}
                  aria-label="Abrir menú"
                >
                  <div style={styles.hamburgerLine}></div>
                  <div style={styles.hamburgerLine}></div>
                  <div style={styles.hamburgerLine}></div>
                </button>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                  <div style={styles.mobileMenu}>
                    <div style={styles.mobileUserInfo}>
                      <span style={styles.mobileUserName}>
                        {user.nombres}
                      </span>
                      <span style={styles.mobileUserBalance}>
                        {formatCurrency(user.saldo || 0)}
                      </span>
                    </div>
                    <button 
                      style={styles.mobileLogoutBtn} 
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
          style={styles.overlay} 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  brandTitle: {
    margin: 0,
    fontWeight: 'bold',
  },
  // Desktop/Tablet User Info
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
  },
  userBalance: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    whiteSpace: 'nowrap',
  },
  // Mobile Layout
  mobileHeader: {
    position: 'relative',
  },
  hamburgerBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  hamburgerLine: {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '2px',
    transition: 'all 0.2s',
  },
  mobileMenu: {
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
  },
  mobileUserInfo: {
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  mobileUserName: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  mobileUserBalance: {
    display: 'block',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mobileLogoutBtn: {
    width: '100%',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
};

export default Navbar;