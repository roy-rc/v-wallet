import React from 'react';

// Importar imágenes de iconos
import paymentBlackIcon from '../assets/icons/payment-b.svg';
import paymentWhiteIcon from '../assets/icons/payment-w.svg';
import rechargeBlackIcon from '../assets/icons/recharge-b.svg';
import rechargeWhiteIcon from '../assets/icons/recharge-w.svg';
import confirmBlackIcon from '../assets/icons/confirm-b.svg';
import confirmWhiteIcon from '../assets/icons/confirm-w.svg';
import searchBlackIcon from '../assets/icons/search-b.svg';
import searchWhiteIcon from '../assets/icons/search-w.svg';
import menuBlackIcon from '../assets/icons/menu-b.svg';
import menuWhiteIcon from '../assets/icons/menu-w.svg';

// Mapeo de nombres de iconos a imágenes
const iconMap = {
  // Iconos con variantes de color (nomenclatura: nombre-w, nombre-b)
    'payment-black': paymentBlackIcon,
    'payment-white': paymentWhiteIcon,
    'recharge-black': rechargeBlackIcon,
    'recharge-white': rechargeWhiteIcon,
    'confirm-black': confirmBlackIcon,
    'confirm-white': confirmWhiteIcon,
    'search-black': searchBlackIcon,
    'search-white': searchWhiteIcon,
    'menu-black': menuBlackIcon,
    'menu-white': menuWhiteIcon,
};

const Icon = ({ 
  name, 
  variant = 'default', // 'default', 'active', 'white', 'black'
  size = 24, 
  color = '#333', 
  style = {},
  className = '',
  alt = '',
  ...props 
}) => {
  // Lógica genérica para todas las variantes de iconos
  // Determinar sufijo basado en la variante
  let suffix = '';
  if (variant === 'active' || variant === 'white') {
    suffix = '-white'; // También compatible con -w
  } else if (variant === 'black') {
    suffix = '-black'; // También compatible con -b
  } else if (variant === 'default') {
    // Para default, intentar primero la versión black
    suffix = '-black';
  }
  
  // Construir nombres posibles del icono
  const fullIconName = `${name}${suffix}`;
  const shortSuffix = suffix.replace('-white', '-w').replace('-black', '-b');
  const shortIconName = `${name}${shortSuffix}`;
  
  // Buscar el icono: primero nomenclatura completa, luego corta, luego sin sufijo, luego fallback
  const iconSrc = iconMap[fullIconName] || iconMap[shortIconName] || iconMap[name] || iconMap[`${name}-black`] || iconMap[`${name}-b`];
  
  // Si es una imagen (string que termina en extensión de imagen)
  if (typeof iconSrc === 'string' && (iconSrc.includes('.png') || iconSrc.includes('.svg') || iconSrc.includes('.jpg') || iconSrc.includes('.webp'))) {
    const isSvg = iconSrc.includes('.svg');
    
    return (
      <img
        src={iconSrc}
        alt={alt || name}
        width={size}
        height={size}
        className={className}
        style={{
          // Para SVG, usar filtro más sutil para cambio de color
          filter: color !== '#333' ? (
            isSvg 
              ? `brightness(0) saturate(100%) invert(${color === '#ffffff' || color === 'white' ? '1' : '0.2'})` 
              : `brightness(0) saturate(100%) invert(1)`
          ) : 'none',
          display: 'inline-block',
          verticalAlign: 'middle',
          // SVG se escala mejor sin forzar dimensiones exactas
          maxWidth: isSvg ? '100%' : size,
          maxHeight: isSvg ? '100%' : size,
          ...style
        }}
        {...props}
      />
    );
  }
  
  // Si es un emoji o texto (fallback)
  return (
    <span
      className={className}
      style={{
        fontSize: `${size}px`,
        color: color,
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        ...style
      }}
      {...props}
    >
      {iconSrc || '¿?'}
    </span>
  );
};

export default Icon;