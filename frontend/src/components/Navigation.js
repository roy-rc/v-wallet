import React, { useState } from 'react';
import useResponsive from '../utils/useResponsive';
import Icon from './Icon';

const MobileNavigation = ({ activeTab, setActiveTab, paymentSession }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: 'recarga', icon: 'recharge', label: 'Recargar' },
    { key: 'pagar', icon: 'payment', label: 'Pagar' },
    { 
      key: 'confirmar', 
      icon: 'confirm', 
      label: 'Confirmar',
      badge: paymentSession ? '!' : null 
    },
    { key: 'consultar', icon: 'search', label: 'Consultar' },
  ];

  const handleItemClick = (key) => {
    setActiveTab(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Button */}
      <div style={styles.mobileNavContainer}>
        <button 
          style={styles.mobileNavButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="menu" size={20} style={styles.menuIcon} />
          <span style={styles.menuText}>Opciones</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div style={styles.mobileNavMenu}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              style={{
                ...styles.mobileNavItem,
                ...(activeTab === item.key ? styles.mobileNavItemActive : {})
              }}
              onClick={() => handleItemClick(item.key)}
            >
              <span style={styles.navIcon}>
                <Icon 
                  name={item.icon} 
                  variant={activeTab === item.key ? 'active' : 'default'}
                  size={24} 
                />
              </span>
              <span style={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span style={styles.navBadge}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const DesktopSidebar = ({ activeTab, setActiveTab, paymentSession }) => {
  const menuItems = [
    { key: 'recarga', icon: 'recharge', label: 'Recargar' },
    { key: 'pagar', icon: 'payment', label: 'Pagar' },
    { 
      key: 'confirmar', 
      icon: 'confirm', 
      label: 'Confirmar',
      badge: paymentSession ? '!' : null 
    },
    { key: 'consultar', icon: 'search', label: 'Consultar' },
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.sidebarTitle}>Opciones</h3>
      {menuItems.map((item) => (
        <button
          key={item.key}
          style={activeTab === item.key ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab(item.key)}
        >
          <span style={styles.tabIcon}>
            <Icon 
              name={item.icon} 
              variant={activeTab === item.key ? 'active' : 'default'}
              size={20} 
            />
          </span>
          <span style={styles.tabLabel}>{item.label}</span>
          {item.badge && (
            <span style={styles.tabBadge}>{item.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
};

const Navigation = ({ activeTab, setActiveTab, paymentSession }) => {
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileNavigation 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      paymentSession={paymentSession}
    />
  ) : (
    <DesktopSidebar 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      paymentSession={paymentSession}
    />
  );
};

const styles = {
  // Mobile Navigation
  mobileNavContainer: {
    backgroundColor: 'white',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky',
    top: '80px', // Height of navbar
    zIndex: 100,
  },
  mobileNavButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: '1.2rem',
  },
  menuText: {
    fontSize: '1rem',
  },
  mobileNavMenu: {
    position: 'fixed',
    top: '140px', // Below navbar and mobile nav button
    left: '1rem',
    right: '1rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    padding: '0.5rem',
    zIndex: 1000,
    maxHeight: 'calc(100vh - 160px)',
    overflowY: 'auto',
  },
  mobileNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    padding: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '0.25rem',
    position: 'relative',
  },
  mobileNavItemActive: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  navIcon: {
    fontSize: '1.5rem',
  },
  navLabel: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '500',
  },
  navBadge: {
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },

  // Desktop Sidebar
  sidebar: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content',
    minWidth: '250px',
  },
  sidebarTitle: {
    marginBottom: '1rem',
    color: '#333',
    fontSize: '1.2rem',
  },
  activeTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.95rem',
    fontWeight: '500',
    position: 'relative',
  },
  inactiveTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: '#f8f9fa',
    color: '#333',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.95rem',
    fontWeight: '500',
    position: 'relative',
    transition: 'all 0.2s',
  },
  tabIcon: {
    fontSize: '1.2rem',
  },
  tabLabel: {
    flex: 1,
  },
  tabBadge: {
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
};

export default Navigation;