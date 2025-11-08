import * as Yup from 'yup';

// Esquemas de validación
export const loginSchema = Yup.object().shape({
  documento: Yup.string()
    .matches(/^\d{8,15}$/, 'Documento debe contener entre 8 y 15 dígitos'),
  email: Yup.string()
    .email('Formato de email inválido'),
  password: Yup.string()
    .required('Contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
}).test(
  'documento-or-email',
  'Debes proporcionar documento o email',
  function(value) {
    return value.documento || value.email;
  }
);

export const registerSchema = Yup.object().shape({
  documento: Yup.string()
    .required('Documento es requerido')
    .matches(/^\d{8,15}$/, 'Documento debe contener entre 8 y 15 dígitos'),
  nombres: Yup.string()
    .required('Nombres son requeridos')
    .min(2, 'Nombres debe tener al menos 2 caracteres')
    .max(100, 'Nombres no puede exceder 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombres solo puede contener letras y espacios'),
  email: Yup.string()
    .required('Email es requerido')
    .email('Formato de email inválido'),
  celular: Yup.string()
    .required('Celular es requerido')
    .matches(/^3\d{9}$/, 'Formato de celular inválido (debe empezar con 3 y tener 10 dígitos)'),
  password: Yup.string()
    .required('Contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: Yup.string()
    .required('Confirma tu contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
});

export const recargaSchema = Yup.object().shape({
  documento: Yup.string()
    .required('Documento es requerido')
    .matches(/^\d{8,15}$/, 'Documento debe contener entre 8 y 15 dígitos'),
  celular: Yup.string()
    .required('Celular es requerido')
    .matches(/^3\d{9}$/, 'Formato de celular inválido'),
  monto: Yup.number()
    .required('Monto es requerido')
    .positive('El monto debe ser positivo')
    .min(1, 'El monto mínimo es $1')
    .max(999999, 'El monto máximo es $999,999')
});

export const pagoSchema = Yup.object().shape({
  monto: Yup.number()
    .required('Monto es requerido')
    .positive('El monto debe ser positivo')
    .min(1, 'El monto mínimo es $1')
    .max(999999, 'El monto máximo es $999,999'),
  descripcion: Yup.string()
    .max(255, 'La descripción no puede exceder 255 caracteres')
});

export const confirmarPagoSchema = Yup.object().shape({
  token: Yup.string()
    .required('Token es requerido')
    .matches(/^\d{6}$/, 'El token debe contener exactamente 6 dígitos')
});

export const consultaSaldoSchema = Yup.object().shape({
  documento: Yup.string()
    .required('Documento es requerido')
    .matches(/^\d{8,15}$/, 'Documento debe contener entre 8 y 15 dígitos'),
  celular: Yup.string()
    .required('Celular es requerido')
    .matches(/^3\d{9}$/, 'Formato de celular inválido')
});