const express = require('express');
const router = express.Router();
const {
  recarga,
  iniciarPago,
  confirmarPago,
  consultarSaldo
} = require('../controllers/billeteraController');
const {
  validateRecarga,
  validatePago,
  validateConfirmarPago,
  validateSaldoQuery
} = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// Rutas protegidas (requieren autenticación)
router.post('/recarga', authMiddleware, validateRecarga, recarga);
router.post('/pagar', authMiddleware, validatePago, iniciarPago);
router.post('/confirmar-pago', validateConfirmarPago, confirmarPago);

// Ruta pública para consultar saldo
router.get('/saldo', validateSaldoQuery, consultarSaldo);

module.exports = router;