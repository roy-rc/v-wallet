const axios = require('axios');

const DATABASE_SERVICE_URL = process.env.DATABASE_SERVICE_URL;

class DatabaseService {
  constructor() {
    this.client = axios.create({
      baseURL: `${DATABASE_SERVICE_URL}/api/db`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async createCliente(clienteData) {
    try {
      const response = await this.client.post('/clientes', clienteData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getClienteByDocumento(documento) {
    try {
      const response = await this.client.get(`/clientes?documento=${documento}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getClienteByEmail(email) {
    try {
      const response = await this.client.get(`/clientes?email=${email}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateSaldo(clienteId, nuevoSaldo) {
    try {
      const response = await this.client.put(`/clientes/${clienteId}/saldo`, {
        nuevoSaldo
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createTransaccion(transaccionData) {
    try {
      const response = await this.client.post('/transacciones', transaccionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createSesionCompra(sesionData) {
    try {
      const response = await this.client.post('/sesiones-compra', sesionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getSesionCompra(sessionId) {
    try {
      const response = await this.client.get(`/sesiones-compra/${sessionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async confirmarSesionCompra(sessionId, nuevoSaldo) {
    try {
      const response = await this.client.put(`/sesiones-compra/${sessionId}/confirmar`, {
        nuevoSaldo
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Error de respuesta del servidor
      return new Error(error.response.data.message || 'Error en el servicio de base de datos');
    } else if (error.request) {
      // Error de conexión
      return new Error('No se pudo conectar al servicio de base de datos');
    } else {
      // Error de configuración
      return new Error('Error interno del sistema');
    }
  }
}

module.exports = new DatabaseService();