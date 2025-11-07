const express = require('express');
const router = express.Router();
const {
  createCliente,
  getClienteByDocumentoOrEmail,
  updateSaldo,
  createTransaccion,
  createSesionCompra,
  getSesionCompra,
  confirmarSesionCompra
} = require('../controllers/databaseController');

// Rutas para clientes
router.post('/clientes', createCliente);
router.get('/clientes', getClienteByDocumentoOrEmail);
router.put('/clientes/:clienteId/saldo', updateSaldo);

// Rutas para transacciones
router.post('/transacciones', createTransaccion);

// Rutas para sesiones de compra
router.post('/sesiones-compra', createSesionCompra);
router.get('/sesiones-compra/:sessionId', getSesionCompra);
router.put('/sesiones-compra/:sessionId/confirmar', confirmarSesionCompra);

module.exports = router;