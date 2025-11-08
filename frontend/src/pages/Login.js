import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../utils/validationSchemas';
import { authService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const response = await authService.login(values);
      
      if (response.success) {
        authService.setAuthData(response.data.token, response.data.usuario);
        onLogin(response.data.usuario);
        setAlert({ type: 'success', message: 'Login exitoso' });
      } else {
        setAlert({ type: 'error', message: response.message });
      }
    } catch (error) {
      setAlert({ type: 'error', message: getErrorMessage(error) });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu v-wallet</p>
        </div>
        
        {alert && (
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        )}

        <Formik
          initialValues={{
            documento: '',
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Documento (opcional si tienes email)</label>
                <Field
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  style={styles.input}
                />
                <ErrorMessage name="documento" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email (opcional si tienes documento)</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  style={styles.input}
                />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  style={styles.input}
                />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading || (!values.documento && !values.email)}
                style={styles.button}
              >
                {loading ? <LoadingSpinner message="" /> : 'Iniciar Sesión'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div style={styles.footer}>
          <p>¿No tienes cuenta? <a href="/registro" style={styles.link}>Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  error: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Login;