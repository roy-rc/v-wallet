import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

// Crear instancia de axios
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests - agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo de errores y token expirado
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/clientes/registro', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  getUserData: () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  setAuthData: (token, userData) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
  }
};

// Servicios de billetera
export const billeteraService = {
  recarga: async (recargarData) => {
    const response = await api.post('/billetera/recarga', recargarData);
    return response.data;
  },

  iniciarPago: async (pagoData) => {
    const response = await api.post('/billetera/pagar', pagoData);
    return response.data;
  },

  confirmarPago: async (confirmacionData) => {
    const response = await api.post('/billetera/confirmar-pago', confirmacionData);
    return response.data;
  },

  consultarSaldo: async (documento, celular) => {
    const response = await api.get(`/billetera/saldo?documento=${documento}&celular=${celular}`);
    return response.data;
  }
};

export default api;