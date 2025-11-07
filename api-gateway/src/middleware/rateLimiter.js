const rateLimit = require('express-rate-limit');

// Límite general para todas las rutas
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana por IP
  message: {
    success: false,
    statusCode: 429,
    message: 'Demasiadas solicitudes, intenta de nuevo más tarde',
    data: null,
    error: 'Too many requests'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Límite estricto para login (prevenir ataques de fuerza bruta)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos de login por IP
  message: {
    success: false,
    statusCode: 429,
    message: 'Demasiados intentos de login, intenta de nuevo en 15 minutos',
    data: null,
    error: 'Too many login attempts'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Límite para registro
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // máximo 3 registros por IP por hora
  message: {
    success: false,
    statusCode: 429,
    message: 'Demasiados intentos de registro, intenta de nuevo más tarde',
    data: null,
    error: 'Too many registration attempts'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  loginLimiter,
  registerLimiter
};