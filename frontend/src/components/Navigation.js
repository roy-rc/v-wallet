import React, { useState } from 'react';
import useResponsive from '../utils/useResponsive';
import Icon from './Icon';
import { navigationStyles } from '../styles/components';

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
      <div style={navigationStyles.mobileNavContainer}>
        <button 
          style={navigationStyles.mobileNavButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="menu" size={20} />
          <span>Opciones</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div style={navigationStyles.mobileNavMenu}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              style={{
                ...navigationStyles.mobileNavItem,
                ...(activeTab === item.key ? navigationStyles.mobileNavItemActive : {})
              }}
              onClick={() => handleItemClick(item.key)}
            >
              <span>
                <Icon 
                  name={item.icon} 
                  variant={activeTab === item.key ? 'active' : 'default'}
                  size={24} 
                />
              </span>
              <span style={{ flex: 1, textAlign: 'left', fontWeight: '500' }}>{item.label}</span>
              {item.badge && (
                <span style={navigationStyles.tabBadge}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          style={navigationStyles.overlay}
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
    <div style={navigationStyles.sidebar}>
      <h3 style={navigationStyles.sidebarTitle}>Opciones</h3>
      {menuItems.map((item) => (
        <button
          key={item.key}
          style={activeTab === item.key ? navigationStyles.activeTab : navigationStyles.inactiveTab}
          onClick={() => setActiveTab(item.key)}
        >
          <span style={navigationStyles.tabIcon}>
            <Icon 
              name={item.icon} 
              variant={activeTab === item.key ? 'active' : 'default'}
              size={20} 
            />
          </span>
          <span style={navigationStyles.tabLabel}>{item.label}</span>
          {item.badge && (
            <span style={navigationStyles.tabBadge}>{item.badge}</span>
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

export default Navigation;