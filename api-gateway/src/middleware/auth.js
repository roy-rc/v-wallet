const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token de acceso requerido',
        data: null,
        error: 'Unauthorized'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token expirado',
        data: null,
        error: 'Token expired'
      });
    }
    
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Token inválido',
      data: null,
      error: 'Invalid token'
    });
  }
};

module.exports = authMiddleware;