import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../utils/validationSchemas';
import { authService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { baseStyles } from '../styles/components';

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
    <div style={baseStyles.container}>
      <div style={{...baseStyles.card, maxWidth: '400px'}}>
        <div>
          <h1 style={baseStyles.heading}>Iniciar Sesión</h1>
          <p style={baseStyles.subtitle}>Accede a tu v-wallet</p>
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
            <Form style={baseStyles.form}>
              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Documento (opcional si tienes email)</label>
                <Field
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  style={baseStyles.input}
                />
                <ErrorMessage name="documento" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Email (opcional si tienes documento)</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  style={baseStyles.input}
                />
                <ErrorMessage name="email" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  style={baseStyles.input}
                />
                <ErrorMessage name="password" component="div" style={baseStyles.error} />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || loading || (!values.documento && !values.email)}
                style={{ marginTop: '1rem' }}
              >
                {loading ? <LoadingSpinner message="" /> : 'Iniciar Sesión'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <div style={baseStyles.formFooter}>
          <p>¿No tienes cuenta? <a href="/registro" style={baseStyles.link}>Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;