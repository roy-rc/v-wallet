const databaseService = require('../services/databaseService');
const { sendPaymentToken } = require('../config/email');

// Generar token aleatorio de 6 dígitos
const generatePaymentToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const recarga = async (req, res) => {
  try {
    const { documento, celular, monto } = req.body;
    const userId = req.user.id;

    // Obtener datos del cliente autenticado
    const clienteResult = await databaseService.getClienteByDocumento(req.user.documento);
    if (!clienteResult.success) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Cliente no encontrado',
        data: null,
        error: 'Client not found'
      });
    }

    const cliente = clienteResult.data;

    // Validar que documento y celular coincidan
    if (cliente.documento !== documento || cliente.celular !== celular) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Documento y celular no coinciden con el usuario autenticado',
        data: null,
        error: 'Document and phone mismatch'
      });
    }

    // Calcular nuevo saldo
    const nuevoSaldo = parseFloat(cliente.saldo) + parseFloat(monto);

    // Actualizar saldo y crear transacción (transacción atómica manejada en DB service)
    await databaseService.updateSaldo(userId, nuevoSaldo);
    await databaseService.createTransaccion({
      clienteId: userId,
      tipo: 'RECARGA',
      monto: parseFloat(monto),
      descripcion: `Recarga de billetera - Monto: $${monto}`
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Recarga realizada exitosamente',
      data: {
        nuevoSaldo,
        monto: parseFloat(monto),
        fecha: new Date().toISOString()
      },
      error: null
    });
  } catch (error) {
    console.error('Error en recarga:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: 'Internal server error'
    });
  }
};

const iniciarPago = async (req, res) => {
  try {
    const { monto, descripcion } = req.body;
    const userId = req.user.id;

    // Obtener datos del cliente autenticado
    const clienteResult = await databaseService.getClienteByDocumento(req.user.documento);
    if (!clienteResult.success) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Cliente no encontrado',
        data: null,
        error: 'Client not found'
      });
    }

    const cliente = clienteResult.data;

    // Validar saldo suficiente
    if (parseFloat(cliente.saldo) < parseFloat(monto)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Saldo insuficiente',
        data: {
          saldoActual: cliente.saldo,
          montoRequerido: monto
        },
        error: 'Insufficient balance'
      });
    }

    // Generar token de 6 dígitos
    const token = generatePaymentToken();

    // Crear sesión de compra con expiración de 5 minutos
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const sesionResult = await databaseService.createSesionCompra({
      clienteId: userId,
      monto: parseFloat(monto),
      token,
      expiresAt: expiresAt.toISOString()
    });

    if (!sesionResult.success) {
      throw new Error('Error al crear sesión de compra');
    }

    // Enviar email con token
    const emailResult = await sendPaymentToken(cliente.email, token, monto);
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Pago iniciado. Token enviado al email registrado',
      data: {
        sessionId: sesionResult.data.id,
        expiresAt: expiresAt.toISOString(),
        emailSent: emailResult.success,
        monto: parseFloat(monto)
      },
      error: null
    });
  } catch (error) {
    console.error('Error en iniciar pago:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: 'Internal server error'
    });
  }
};

const confirmarPago = async (req, res) => {
  try {
    const { sessionId, token } = req.body;

    // Obtener sesión de compra
    const sesionResult = await databaseService.getSesionCompra(sessionId);
    if (!sesionResult.success) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Sesión de pago no encontrada',
        data: null,
        error: 'Session not found'
      });
    }

    const sesion = sesionResult.data;

    // Validaciones
    if (sesion.confirmado) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'El pago ya fue confirmado anteriormente',
        data: null,
        error: 'Payment already confirmed'
      });
    }

    if (new Date() > new Date(sesion.expiresAt)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'La sesión de pago ha expirado',
        data: null,
        error: 'Session expired'
      });
    }

    if (sesion.token !== token) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Token incorrecto',
        data: null,
        error: 'Invalid token'
      });
    }

    // Calcular nuevo saldo
    const nuevoSaldo = parseFloat(sesion.cliente.saldo) - parseFloat(sesion.monto);

    // Confirmar pago (transacción atómica en DB service)
    const confirmResult = await databaseService.confirmarSesionCompra(sessionId, nuevoSaldo);

    if (!confirmResult.success) {
      throw new Error('Error al confirmar el pago');
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Pago confirmado exitosamente',
      data: {
        sessionId,
        nuevoSaldo,
        montoDescontado: sesion.monto,
        fecha: new Date().toISOString()
      },
      error: null
    });
  } catch (error) {
    console.error('Error en confirmar pago:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: 'Internal server error'
    });
  }
};

const consultarSaldo = async (req, res) => {
  try {
    const { documento, celular } = req.query;

    // Obtener cliente por documento
    const clienteResult = await databaseService.getClienteByDocumento(documento);
    if (!clienteResult.success) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Cliente no encontrado',
        data: null,
        error: 'Client not found'
      });
    }

    const cliente = clienteResult.data;

    // Validar que el celular coincida
    if (cliente.celular !== celular) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'El celular no coincide con el documento',
        data: null,
        error: 'Phone number mismatch'
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Saldo consultado exitosamente',
      data: {
        documento: cliente.documento,
        nombres: cliente.nombres,
        saldo: cliente.saldo
      },
      error: null
    });
  } catch (error) {
    console.error('Error en consultar saldo:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  recarga,
  iniciarPago,
  confirmarPago,
  consultarSaldo
};