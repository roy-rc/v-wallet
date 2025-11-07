require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3002';

// Middlewares
app.use(cors({
  origin: [API_GATEWAY_URL], // Solo permitir API Gateway
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/db', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: 'Database service is running',
    data: { service: 'database-service', port: PORT },
    error: null
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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Ruta no encontrada',
    data: null,
    error: 'Not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Database Service running on port ${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL?.replace(/\/\/.*@/, '//***@')}`);
});