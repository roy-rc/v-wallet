const express = require('express');
const router = express.Router();

const clientesRoutes = require('./clientes');
const authRoutes = require('./auth');
const billeteraRoutes = require('./billetera');

router.use('/clientes', clientesRoutes);
router.use('/auth', authRoutes);
router.use('/billetera', billeteraRoutes);

module.exports = router;