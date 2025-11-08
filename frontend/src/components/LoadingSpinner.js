import React from 'react';
import { loadingStyles } from '../styles/components';

const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div style={loadingStyles.container}>
      <div style={loadingStyles.spinner}></div>
      {message && <p style={loadingStyles.message}>{message}</p>}
    </div>
  );
};

// Agregar keyframes CSS para la animación
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Insertar CSS en el documento
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

export default LoadingSpinner;