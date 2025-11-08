import React from 'react';
import { buttonStyles } from '../styles/components';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  style = {},
  ...props 
}) => {
  // Combinar estilos base con variante
  const combinedStyles = {
    ...buttonStyles.base,
    ...buttonStyles[variant],
    ...style
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={combinedStyles}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;