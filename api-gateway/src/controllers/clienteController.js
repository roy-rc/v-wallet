const bcrypt = require('bcrypt');
const databaseService = require('../services/databaseService');

const SALT_ROUNDS = 10;

const registro = async (req, res) => {
  try {
    const { documento, nombres, email, celular, password } = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crear cliente en la base de datos
    const result = await databaseService.createCliente({
      documento,
      nombres,
      email,
      celular,
      password: hashedPassword
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.message.includes('Duplicate entry')) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'El documento o email ya está registrado',
        data: null,
        error: 'Duplicate entry'
      });
    }

    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error al registrar cliente',
      data: null,
      error: error.message
    });
  }
};

module.exports = {
  registro
};