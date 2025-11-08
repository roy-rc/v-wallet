import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../utils/validationSchemas';
import { authService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const { confirmPassword, ...registerData } = values;
      const response = await authService.register(registerData);
      
      if (response.success) {
        setSuccess(true);
        setAlert({ type: 'success', message: 'Registro exitoso. Ya puedes iniciar sesión.' });
        resetForm();
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

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1>¡Registro Exitoso! ✅</h1>
            <p>Tu cuenta ha sido creada correctamente</p>
          </div>
          
          <div style={styles.successContent}>
            <p>Ya puedes iniciar sesión con tus credenciales.</p>
            <a href="/login" style={styles.loginLink}>
              Ir al Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1>Crear Cuenta</h1>
          <p>Regístrate para usar tu v-wallet</p>
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
            nombres: '',
            email: '',
            celular: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Documento *</label>
                <Field
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  style={styles.input}
                />
                <ErrorMessage name="documento" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombres completos *</label>
                <Field
                  name="nombres"
                  type="text"
                  placeholder="Nombres y apellidos"
                  style={styles.input}
                />
                <ErrorMessage name="nombres" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email *</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  style={styles.input}
                />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Celular *</label>
                <Field
                  name="celular"
                  type="text"
                  placeholder="3001234567"
                  style={styles.input}
                />
                <ErrorMessage name="celular" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña *</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  style={styles.input}
                />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirmar contraseña *</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Repite tu contraseña"
                  style={styles.input}
                />
                <ErrorMessage name="confirmPassword" component="div" style={styles.error} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                style={styles.button}
              >
                {loading ? <LoadingSpinner message="" /> : 'Crear Cuenta'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div style={styles.footer}>
          <p>¿Ya tienes cuenta? <a href="/login" style={styles.link}>Inicia sesión aquí</a></p>
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
    maxWidth: '500px',
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
    backgroundColor: '#28a745',
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
  successContent: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  loginLink: {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '1rem',
  },
};

export default Register;