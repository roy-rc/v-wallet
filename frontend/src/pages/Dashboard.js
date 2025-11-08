import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { recargaSchema, pagoSchema, confirmarPagoSchema, consultaSaldoSchema } from '../utils/validationSchemas';
import { billeteraService, authService } from '../services/api';
import { getErrorMessage, formatCurrency, getTimeRemaining } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Navigation from '../components/Navigation';
import Icon from '../components/Icon';
import Button from '../components/Button';
import useResponsive from '../utils/useResponsive';
import { baseStyles } from '../styles/components';

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
          <div>
            <h3 style={baseStyles.titleWithIcon}>
              <Icon name="recharge" size={28} style={baseStyles.titleIcon} />
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
                <Form style={baseStyles.form}>
                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Documento</label>
                    <Field
                      name="documento"
                      type="text"
                      style={{...baseStyles.input, backgroundColor: '#f8f9fa', cursor: 'not-allowed'}}
                      readOnly
                    />
                  </div>

                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Celular</label>
                    <Field
                      name="celular"
                      type="text"
                      style={{...baseStyles.input, backgroundColor: '#f8f9fa', cursor: 'not-allowed'}}
                      readOnly
                    />
                  </div>

                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Monto a recargar</label>
                    <Field
                      name="monto"
                      type="number"
                      placeholder="0"
                      style={baseStyles.input}
                    />
                    <ErrorMessage name="monto" component="div" style={baseStyles.error} />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                    style={{ marginTop: '1rem' }}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Recargar'}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        );

      case 'pagar':
        return (
          <div>
            <h3 style={baseStyles.titleWithIcon}>
              <Icon name="payment" variant="black" size={28} style={baseStyles.titleIcon} />
              Realizar Pago
            </h3>
            <div style={baseStyles.balanceInfo}>
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
                <Form style={baseStyles.form}>
                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Monto a pagar</label>
                    <Field
                      name="monto"
                      type="number"
                      placeholder="0"
                      style={baseStyles.input}
                    />
                    <ErrorMessage name="monto" component="div" style={baseStyles.error} />
                  </div>

                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Descripción (opcional)</label>
                    <Field
                      name="descripcion"
                      type="text"
                      placeholder="Concepto del pago"
                      style={baseStyles.input}
                    />
                    <ErrorMessage name="descripcion" component="div" style={baseStyles.error} />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                    style={{ marginTop: '1rem' }}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Iniciar Pago'}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        );

      case 'confirmar':
        return (
          <div>
            <h3 style={baseStyles.titleWithIcon}>
              <Icon name="confirm" size={28} style={baseStyles.titleIcon} />
              Confirmar Pago
            </h3>
            {paymentSession ? (
              <>
                <div style={baseStyles.sessionInfo}>
                  <p><strong>Monto:</strong> {formatCurrency(paymentSession.monto)}</p>
                  <p><strong>Sesión:</strong> {paymentSession.sessionId}</p>
                  {countdown && (
                    <p style={baseStyles.countdown}>
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
                    <Form style={baseStyles.form}>
                      <div style={baseStyles.inputGroup}>
                        <label style={baseStyles.label}>Token de confirmación (6 dígitos)</label>
                        <Field
                          name="token"
                          type="text"
                          placeholder="123456"
                          style={baseStyles.input}
                        />
                        <ErrorMessage name="token" component="div" style={baseStyles.error} />
                      </div>

                      <Button
                        type="submit"
                        variant="success"
                        disabled={isSubmitting || loading}
                        style={{ marginTop: '1rem' }}
                      >
                        {loading ? <LoadingSpinner message="" /> : 'Confirmar Pago'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <div style={baseStyles.noSession}>
                <p>No hay pagos pendientes de confirmación.</p>
                <Button 
                  variant="secondary"
                  onClick={() => setActiveTab('pagar')}
                  style={{ marginTop: '1rem' }}
                >
                  Iniciar Nuevo Pago
                </Button>
              </div>
            )}
          </div>
        );

      case 'consultar':
        return (
          <div>
            <h3 style={baseStyles.titleWithIcon}>
              <Icon name="search" size={28} style={baseStyles.titleIcon} />
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
                <Form style={baseStyles.form}>
                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Documento</label>
                    <Field
                      name="documento"
                      type="text"
                      placeholder="Número de documento"
                      style={baseStyles.input}
                    />
                    <ErrorMessage name="documento" component="div" style={baseStyles.error} />
                  </div>

                  <div style={baseStyles.inputGroup}>
                    <label style={baseStyles.label}>Celular</label>
                    <Field
                      name="celular"
                      type="text"
                      placeholder="3001234567"
                      style={baseStyles.input}
                    />
                    <ErrorMessage name="celular" component="div" style={baseStyles.error} />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                    style={{ marginTop: '1rem' }}
                  >
                    {loading ? <LoadingSpinner message="" /> : 'Consultar Saldo'}
                  </Button>
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
    <div style={baseStyles.dashboardContainer}>
      <div style={isMobile ? baseStyles.mobileDashboard : baseStyles.dashboard}>
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          paymentSession={paymentSession} 
        />

        <div style={isMobile ? baseStyles.mobileContent : baseStyles.content}>
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

export default Dashboard;