const { body, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Errores de validación',
      data: null,
      error: errors.array().map(error => `${error.path}: ${error.msg}`).join(', ')
    });
  }
  next();
};

const validateRegistro = [
  body('documento')
    .notEmpty()
    .withMessage('Documento es requerido')
    .isLength({ min: 8, max: 15 })
    .withMessage('Documento debe tener entre 8 y 15 caracteres')
    .isNumeric()
    .withMessage('Documento debe contener solo números'),
  
  body('nombres')
    .notEmpty()
    .withMessage('Nombres es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombres debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Nombres solo puede contener letras y espacios'),
  
  body('email')
    .notEmpty()
    .withMessage('Email es requerido')
    .isEmail()
    .withMessage('Formato de email inválido')
    .normalizeEmail(),
  
  body('celular')
    .notEmpty()
    .withMessage('Celular es requerido')
    .isMobilePhone('es-CO')
    .withMessage('Formato de celular inválido (Colombia)'),
  
  body('password')
    .notEmpty()
    .withMessage('Password es requerido')
    .isLength({ min: 6 })
    .withMessage('Password debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password debe contener al menos una mayúscula, una minúscula y un número'),
  
  handleValidationErrors
];

const validateLogin = [
  body('documento')
    .optional()
    .isNumeric()
    .withMessage('Documento debe contener solo números'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Formato de email inválido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password es requerido'),
  
  // Validar que al menos documento o email esté presente
  body().custom((value, { req }) => {
    if (!req.body.documento && !req.body.email) {
      throw new Error('Documento o email es requerido');
    }
    return true;
  }),
  
  handleValidationErrors
];

const validateRecarga = [
  body('documento')
    .notEmpty()
    .withMessage('Documento es requerido')
    .isNumeric()
    .withMessage('Documento debe contener solo números'),
  
  body('celular')
    .notEmpty()
    .withMessage('Celular es requerido')
    .isMobilePhone('es-CO')
    .withMessage('Formato de celular inválido'),
  
  body('monto')
    .notEmpty()
    .withMessage('Monto es requerido')
    .isFloat({ min: 1, max: 999999 })
    .withMessage('Monto debe ser mayor a 0 y menor a 1,000,000'),
  
  handleValidationErrors
];

const validatePago = [
  body('monto')
    .notEmpty()
    .withMessage('Monto es requerido')
    .isFloat({ min: 1, max: 999999 })
    .withMessage('Monto debe ser mayor a 0 y menor a 1,000,000'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Descripción no puede exceder 255 caracteres'),
  
  handleValidationErrors
];

const validateConfirmarPago = [
  body('sessionId')
    .notEmpty()
    .withMessage('ID de sesión es requerido')
    .isUUID()
    .withMessage('Formato de ID de sesión inválido'),
  
  body('token')
    .notEmpty()
    .withMessage('Token es requerido')
    .isLength({ min: 6, max: 6 })
    .withMessage('Token debe tener 6 dígitos')
    .isNumeric()
    .withMessage('Token debe contener solo números'),
  
  handleValidationErrors
];

const validateSaldoQuery = [
  query('documento')
    .notEmpty()
    .withMessage('Documento es requerido')
    .isNumeric()
    .withMessage('Documento debe contener solo números'),
  
  query('celular')
    .notEmpty()
    .withMessage('Celular es requerido')
    .isMobilePhone('es-CO')
    .withMessage('Formato de celular inválido'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistro,
  validateLogin,
  validateRecarga,
  validatePago,
  validateConfirmarPago,
  validateSaldoQuery
};