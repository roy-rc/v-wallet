require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
app.use(generalLimiter);

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000', // Frontend React
    'http://localhost:3001'  // Database Service (para health checks)
  ],
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: 'API Gateway is running',
    data: { 
      service: 'api-gateway', 
      port: PORT,
      databaseService: process.env.DATABASE_SERVICE_URL
    },
    error: null
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Endpoint no encontrado',
    data: null,
    error: 'Not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Error interno del servidor',
    data: null,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`🔗 Database Service URL: ${process.env.DATABASE_SERVICE_URL}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
});