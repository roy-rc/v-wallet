// Formatear números como moneda
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Formatear fecha
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// Validar si una fecha ha expirado
export const isExpired = (date) => {
  return new Date() > new Date(date);
};

// Calcular tiempo restante en minutos
export const getTimeRemaining = (expirationDate) => {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diffMs = expiry - now;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return {
    total: diffMs,
    minutes: diffMins,
    seconds: diffSecs,
    expired: diffMs <= 0
  };
};

// Limpiar y validar número de teléfono
export const cleanPhoneNumber = (phone) => {
  return phone.replace(/\D/g, '');
};

// Validar formato de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generar mensaje de error amigable
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Ha ocurrido un error inesperado';
};