const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const databaseService = require('../services/databaseService');

const login = async (req, res) => {
  try {
    const { documento, email, password } = req.body;

    // Buscar cliente por documento o email
    let clienteResult;
    if (documento) {
      clienteResult = await databaseService.getClienteByDocumento(documento);
    } else {
      clienteResult = await databaseService.getClienteByEmail(email);
    }

    if (!clienteResult.success) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Credenciales inválidas',
        data: null,
        error: 'Invalid credentials'
      });
    }

    const cliente = clienteResult.data;

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, cliente.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Credenciales inválidas',
        data: null,
        error: 'Invalid credentials'
      });
    }

    // Generar JWT
    const token = generateToken({
      id: cliente.id,
      documento: cliente.documento,
      email: cliente.email
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login exitoso',
      data: {
        token,
        usuario: {
          id: cliente.id,
          documento: cliente.documento,
          nombres: cliente.nombres,
          email: cliente.email,
          celular: cliente.celular,
          saldo: cliente.saldo
        }
      },
      error: null
    });
  } catch (error) {
    console.error('Error en login:', error);
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
  login
};