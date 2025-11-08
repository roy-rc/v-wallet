import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const getStyles = () => {
    const baseStyles = {
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
        };
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeaa7',
        };
      case 'info':
        return {
          ...baseStyles,
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          border: '1px solid #bee5eb',
        };
      default:
        return baseStyles;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ⓘ';
      default:
        return '';
    }
  };

  return (
    <div style={getStyles()}>
      <div style={styles.content}>
        <span style={styles.icon}>{getIcon()}</span>
        <span style={styles.message}>{message}</span>
      </div>
      {onClose && (
        <button style={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

const styles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: '0.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  message: {
    fontSize: '0.9rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '1rem',
    opacity: 0.7,
  },
};

export default Alert;