const express = require('express');
const router = express.Router();
const { registro } = require('../controllers/clienteController');
const { validateRegistro } = require('../middleware/validation');
const { registerLimiter } = require('../middleware/rateLimiter');

router.post('/registro', registerLimiter, validateRegistro, registro);

module.exports = router;