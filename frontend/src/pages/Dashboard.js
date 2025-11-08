import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { recargaSchema, pagoSchema, confirmarPagoSchema, consultaSaldoSchema } from '../utils/validationSchemas';
import { billeteraService, authService } from '../services/api';
import { getErrorMessage, formatCurrency, getTimeRemaining } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Navigation from '../components/Navigation';
import Icon from '../components/Icon';
import useResponsive from '../utils/useResponsive';

const Dashboard = ({ user, onUserUpdate }) => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('recarga');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [paymentSession, setPaymentSession] = useState(null);
  const [countdown, setCountdown] = useState(null);

  // Actualizar datos del usuario en el estado
  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    authService.setAuthData(localStorage.getItem('auth_token'), updatedUser);
    onUserUpdate(updatedUser);
  };

  // Manejar recarga
  const handleRecarga = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const response = await billeteraService.recarga(values);
      
      if (response.success) {
        setAlert({ type: 'success', message: `Recarga exitosa por ${formatCurrency(response.data.monto)}` });
        updateUserData({ saldo: response.data.nuevoSaldo });
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

  // Manejar inicio de pago
  const handleIniciarPago = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const response = await billeteraService.iniciarPago(values);
      
      if (response.success) {
        setPaymentSession(response.data);
        setAlert({ type: 'success', message: 'Token enviado a tu email. Revisa tu bandeja de entrada.' });
        setActiveTab('confirmar');
        resetForm();
        
        // Iniciar countdown
        startCountdown(response.data.expiresAt);
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

  // Manejar confirmación de pago
  const handleConfirmarPago = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const response = await billeteraService.confirmarPago({
        sessionId: paymentSession.sessionId,
        token: values.token
      });
      
      if (response.success) {
        setAlert({ type: 'success', message: `Pago confirmado por ${formatCurrency(response.data.montoDescontado)}` });
        updateUserData({ saldo: response.data.nuevoSaldo });
        setPaymentSession(null);
        setCountdown(null);
        resetForm();
        setActiveTab('recarga');
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

  // Manejar consulta de saldo
  const handleConsultarSaldo = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setAlert(null);
      
      const response = await billeteraService.consultarSaldo(values.documento, values.celular);
      
      if (response.success) {
        setAlert({ 
          type: 'info', 
          message: `Saldo de ${response.data.nombres}: ${formatCurrency(response.data.saldo)}` 
        });
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

  // Iniciar countdown para la expiración del token
  const startCountdown = (expirationDate) => {
    const updateCountdown = () => {
      const time = getTimeRemaining(expirationDate);
      if (time.expired) {
        setCountdown(null);
        setPaymentSession(null);
        setAlert({ type: 'warning', message: 'El token ha expirado. Inicia un nuevo pago.' });
        return;
      }
      setCountdown(time);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recarga':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.titleWithIcon}>
              <Icon name="recharge" size={28} style={styles.titleIcon} />
              Recargar Billetera
            </h3>
            <Formik
              initialValues={{
                documento: user.documento,
                celular: user.celular,
                monto: '',
              }}
              validationSchema={recargaSchema}
              onSubmit={handleRecarga}
            >
              {({ isSubmitting }) => (
                <Form style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Documento</label>
                    <Field
                      name="documento"
                      type="text"
                      style={styles.input}
                      readOnly
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Celular</label>
                    <Field
                      name="celular"
                      type="text"
                      style={styles.input}
                      readOnly
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Monto a recargar</label>
                    <Field
                      name="monto"
                      type="number"
                      placeholder="0"
                      style={styles.input}
                    />
                    <ErrorMessage name="monto" component="div" style={styles.error} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    style={styles.primaryButton}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Recargar'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        );

      case 'pagar':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.titleWithIcon}>
              <Icon name="payment" variant="black" size={28} style={styles.titleIcon} />
              Realizar Pago
            </h3>
            <div style={styles.balanceInfo}>
              <p>Saldo disponible: <strong>{formatCurrency(user.saldo)}</strong></p>
            </div>
            <Formik
              initialValues={{
                monto: '',
                descripcion: '',
              }}
              validationSchema={pagoSchema}
              onSubmit={handleIniciarPago}
            >
              {({ isSubmitting }) => (
                <Form style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Monto a pagar</label>
                    <Field
                      name="monto"
                      type="number"
                      placeholder="0"
                      style={styles.input}
                    />
                    <ErrorMessage name="monto" component="div" style={styles.error} />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Descripción (opcional)</label>
                    <Field
                      name="descripcion"
                      type="text"
                      placeholder="Concepto del pago"
                      style={styles.input}
                    />
                    <ErrorMessage name="descripcion" component="div" style={styles.error} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    style={styles.primaryButton}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Iniciar Pago'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        );

      case 'confirmar':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.titleWithIcon}>
              <Icon name="confirm" size={28} style={styles.titleIcon} />
              Confirmar Pago
            </h3>
            {paymentSession ? (
              <>
                <div style={styles.sessionInfo}>
                  <p><strong>Monto:</strong> {formatCurrency(paymentSession.monto)}</p>
                  <p><strong>Sesión:</strong> {paymentSession.sessionId}</p>
                  {countdown && (
                    <p style={styles.countdown}>
                      <strong>Tiempo restante:</strong> {countdown.minutes}:{String(countdown.seconds).padStart(2, '0')}
                    </p>
                  )}
                </div>
                <Formik
                  initialValues={{ token: '' }}
                  validationSchema={confirmarPagoSchema}
                  onSubmit={handleConfirmarPago}
                >
                  {({ isSubmitting }) => (
                    <Form style={styles.form}>
                      <div style={styles.inputGroup}>
                        <label style={styles.label}>Token de confirmación (6 dígitos)</label>
                        <Field
                          name="token"
                          type="text"
                          placeholder="123456"
                          style={styles.input}
                        />
                        <ErrorMessage name="token" component="div" style={styles.error} />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        style={styles.primaryButton}
                      >
                        {loading ? <LoadingSpinner message="" /> : 'Confirmar Pago'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <div style={styles.noSession}>
                <p>No hay pagos pendientes de confirmación.</p>
                <button 
                  style={styles.secondaryButton} 
                  onClick={() => setActiveTab('pagar')}
                >
                  Iniciar Nuevo Pago
                </button>
              </div>
            )}
          </div>
        );

      case 'consultar':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.titleWithIcon}>
              <Icon name="search" size={28} style={styles.titleIcon} />
              Consultar Saldo
            </h3>
            <Formik
              initialValues={{
                documento: '',
                celular: '',
              }}
              validationSchema={consultaSaldoSchema}
              onSubmit={handleConsultarSaldo}
            >
              {({ isSubmitting }) => (
                <Form style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Documento</label>
                    <Field
                      name="documento"
                      type="text"
                      placeholder="Número de documento"
                      style={styles.input}
                    />
                    <ErrorMessage name="documento" component="div" style={styles.error} />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Celular</label>
                    <Field
                      name="celular"
                      type="text"
                      placeholder="3001234567"
                      style={styles.input}
                    />
                    <ErrorMessage name="celular" component="div" style={styles.error} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    style={styles.primaryButton}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Consultar Saldo'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={isMobile ? styles.mobileDashboard : styles.dashboard}>
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          paymentSession={paymentSession} 
        />

        <div style={isMobile ? styles.mobileContent : styles.content}>
          {alert && (
            <Alert 
              type={alert.type} 
              message={alert.message} 
              onClose={() => setAlert(null)} 
            />
          )}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#f5f5f5',
    paddingBottom: '2rem',
  },
  dashboard: {
    display: 'flex',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  mobileDashboard: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  mobileContent: {
    backgroundColor: 'white',
    margin: '1rem',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tabContent: {
    maxWidth: '100%',
    width: '100%',
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.5rem',
  },
  titleIcon: {
    flexShrink: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  error: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  primaryButton: {
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
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  balanceInfo: {
    backgroundColor: '#e9ecef',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  sessionInfo: {
    backgroundColor: '#d1ecf1',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  countdown: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  noSession: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
};

export default Dashboard;