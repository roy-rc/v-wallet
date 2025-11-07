const prisma = require('../config/database');

// Crear cliente
const createCliente = async (req, res) => {
  try {
    const { documento, nombres, email, celular, password } = req.body;
    
    const cliente = await prisma.cliente.create({
      data: {
        documento,
        nombres,
        email,
        celular,
        password
      }
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Cliente creado exitosamente',
      data: { id: cliente.id, documento: cliente.documento, email: cliente.email },
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al crear cliente',
      data: null,
      error: error.message
    });
  }
};

// Obtener cliente por documento o email
const getClienteByDocumentoOrEmail = async (req, res) => {
  try {
    const { documento, email } = req.query;
    
    const whereClause = {};
    if (documento) whereClause.documento = documento;
    if (email) whereClause.email = email;
    
    const cliente = await prisma.cliente.findFirst({
      where: whereClause
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Cliente no encontrado',
        data: null,
        error: 'Cliente no existe'
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cliente encontrado',
      data: cliente,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: error.message
    });
  }
};

// Actualizar saldo
const updateSaldo = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { nuevoSaldo } = req.body;

    const cliente = await prisma.cliente.update({
      where: { id: parseInt(clienteId) },
      data: { saldo: nuevoSaldo }
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Saldo actualizado exitosamente',
      data: { id: cliente.id, saldo: cliente.saldo },
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al actualizar saldo',
      data: null,
      error: error.message
    });
  }
};

// Crear transacción
const createTransaccion = async (req, res) => {
  try {
    const { clienteId, tipo, monto, descripcion } = req.body;

    const transaccion = await prisma.transaccion.create({
      data: {
        clienteId: parseInt(clienteId),
        tipo,
        monto,
        descripcion
      }
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Transacción creada exitosamente',
      data: transaccion,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al crear transacción',
      data: null,
      error: error.message
    });
  }
};

// Crear sesión de compra
const createSesionCompra = async (req, res) => {
  try {
    const { clienteId, monto, token, expiresAt } = req.body;

    const sesion = await prisma.sesionCompra.create({
      data: {
        clienteId: parseInt(clienteId),
        monto,
        token,
        expiresAt: new Date(expiresAt)
      }
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Sesión de compra creada exitosamente',
      data: sesion,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al crear sesión de compra',
      data: null,
      error: error.message
    });
  }
};

// Obtener sesión de compra
const getSesionCompra = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const sesion = await prisma.sesionCompra.findUnique({
      where: { id: sessionId },
      include: { cliente: true }
    });

    if (!sesion) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Sesión no encontrada',
        data: null,
        error: 'Sesión no existe'
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Sesión encontrada',
      data: sesion,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error interno del servidor',
      data: null,
      error: error.message
    });
  }
};

// Confirmar sesión de compra
const confirmarSesionCompra = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { nuevoSaldo } = req.body;

    // Iniciar transacción
    const result = await prisma.$transaction(async (tx) => {
      // Actualizar sesión como confirmada
      const sesion = await tx.sesionCompra.update({
        where: { id: sessionId },
        data: { confirmado: true }
      });

      // Actualizar saldo del cliente
      const cliente = await tx.cliente.update({
        where: { id: sesion.clienteId },
        data: { saldo: nuevoSaldo }
      });

      // Crear registro de transacción
      const transaccion = await tx.transaccion.create({
        data: {
          clienteId: sesion.clienteId,
          tipo: 'COMPRA',
          monto: sesion.monto,
          descripcion: `Pago confirmado - Sesión: ${sessionId}`
        }
      });

      return { sesion, cliente, transaccion };
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Pago confirmado exitosamente',
      data: {
        sessionId: result.sesion.id,
        nuevoSaldo: result.cliente.saldo,
        transaccionId: result.transaccion.id
      },
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al confirmar pago',
      data: null,
      error: error.message
    });
  }
};

module.exports = {
  createCliente,
  getClienteByDocumentoOrEmail,
  updateSaldo,
  createTransaccion,
  createSesionCompra,
  getSesionCompra,
  confirmarSesionCompra
};