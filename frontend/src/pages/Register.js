import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../utils/validationSchemas';
import { authService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { baseStyles } from '../styles/components';

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
      <div style={baseStyles.container}>
        <div style={baseStyles.card}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={baseStyles.heading}>¡Registro Exitoso! ✅</h1>
            <p style={baseStyles.subtitle}>Tu cuenta ha sido creada correctamente</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ marginBottom: '1rem' }}>Ya puedes iniciar sesión con tus credenciales.</p>
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/login'}
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              Ir al Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.card}>
        <div>
          <h1 style={baseStyles.heading}>Crear Cuenta</h1>
          <p style={baseStyles.subtitle}>Regístrate para usar tu v-wallet</p>
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
            <Form style={baseStyles.form}>
              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Documento *</label>
                <Field
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  style={baseStyles.input}
                />
                <ErrorMessage name="documento" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Nombres completos *</label>
                <Field
                  name="nombres"
                  type="text"
                  placeholder="Nombres y apellidos"
                  style={baseStyles.input}
                />
                <ErrorMessage name="nombres" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Email *</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  style={baseStyles.input}
                />
                <ErrorMessage name="email" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Celular *</label>
                <Field
                  name="celular"
                  type="text"
                  placeholder="3001234567"
                  style={baseStyles.input}
                />
                <ErrorMessage name="celular" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Contraseña *</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  style={baseStyles.input}
                />
                <ErrorMessage name="password" component="div" style={baseStyles.error} />
              </div>

              <div style={baseStyles.inputGroup}>
                <label style={baseStyles.label}>Confirmar contraseña *</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Repite tu contraseña"
                  style={baseStyles.input}
                />
                <ErrorMessage name="confirmPassword" component="div" style={baseStyles.error} />
              </div>

              <Button
                type="submit"
                variant="success"
                disabled={isSubmitting || loading}
                style={{ marginTop: '1rem' }}
              >
                {loading ? <LoadingSpinner message="" /> : 'Crear Cuenta'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <div style={baseStyles.formFooter}>
          <p>¿Ya tienes cuenta? <a href="/login" style={baseStyles.link}>Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;