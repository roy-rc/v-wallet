import React from 'react';
import { alertStyles } from '../styles/components';

const Alert = ({ type, message, onClose }) => {
  const getStyles = () => {
    return {
      ...alertStyles.base,
      ...alertStyles[type] || {}
    };
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
      <div style={alertStyles.content}>
        <span style={alertStyles.icon}>{getIcon()}</span>
        <span style={alertStyles.message}>{message}</span>
      </div>
      {onClose && (
        <button style={alertStyles.closeBtn} onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;