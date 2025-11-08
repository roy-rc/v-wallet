# 💰 v-wallet - Aplicación de Microservicios

Una aplicación completa de v-wallet desarrollada con arquitectura de microservicios, incluyendo dos servicios backend REST, un frontend en React y base de datos MySQL.

## 📋 Tabla de Contenidos

- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [🔧 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🚀 Ejecución de la Aplicación](#-ejecución-de-la-aplicación)
- [🔒 Características de Seguridad](#-características-de-seguridad)
- [📡 API Endpoints](#-api-endpoints)
- [🧪 Testing con Postman](#-testing-con-postman)
- [📱 Uso de la Aplicación](#-uso-de-la-aplicación)
- [🐛 Troubleshooting](#-troubleshooting)

## 🏗️ Arquitectura del Sistema

La aplicación sigue una arquitectura de microservicios con tres componentes principales:

### 🗄️ Database Service (Puerto 3001)
- **Propósito**: Único servicio con acceso directo a MySQL
- **Tecnología**: Node.js + Express + Prisma ORM
- **Responsabilidad**: Operaciones CRUD en base de datos
- **Acceso**: Solo para comunicación interna entre servicios

### 🌐 API Gateway (Puerto 3002)
- **Propósito**: Intermediario entre cliente y Database Service
- **Tecnología**: Node.js + Express + JWT + Nodemailer
- **Responsabilidad**: Lógica de negocio, validaciones, autenticación
- **Acceso**: Endpoints públicos para el frontend y Postman

### 🖥️ Frontend React (Puerto 3000)
- **Propósito**: Interfaz de usuario
- **Tecnología**: React + Formik + Yup + Axios
- **Responsabilidad**: UI/UX, validación de formularios
- **Acceso**: Aplicación web accesible por usuarios

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js 18+**: Runtime de JavaScript
- **Express.js**: Framework web
- **Prisma ORM**: Object-Relational Mapping
- **MySQL**: Base de datos relacional
- **JWT**: Autenticación y autorización
- **bcrypt**: Hash de contraseñas
- **Nodemailer**: Envío de emails
- **Helmet**: Seguridad HTTP headers
- **express-rate-limit**: Rate limiting
- **express-validator**: Validación de datos

### Frontend
- **React 18**: Biblioteca de UI
- **React Router DOM**: Navegación
- **Formik**: Manejo de formularios
- **Yup**: Validación de esquemas
- **Axios**: Cliente HTTP
- **Sistema de Diseño Centralizado**: Tokens y componentes reutilizables
- **CSS-in-JS Optimizado**: 70% reducción de código CSS duplicado

### Base de Datos
- **MySQL 8.0**: Sistema de gestión de base de datos
- **XAMPP**: Stack de desarrollo local

## 🎨 Sistema de Diseño y Optimización CSS

### Arquitectura de Estilos Centralizada

El frontend implementa un **sistema de diseño robusto** que elimina la duplicación de CSS y garantiza consistencia visual en toda la aplicación.

#### 📊 Resultados de Optimización
- ✅ **70% reducción** de código CSS (de ~480 a ~150 líneas)
- ✅ **11 archivos** refactorizados con estilos centralizados
- ✅ **Sistema de tokens** de diseño implementado
- ✅ **Componentes reutilizables** para mantener consistencia

### 🎯 Estructura del Sistema de Diseño

#### 1. **Design Tokens** (`src/styles/tokens.js`)
Sistema centralizado de variables de diseño:

```javascript
// Paleta de colores sistemática
colors: {
  primary: { main: '#007bff', light: '#66b3ff', dark: '#0056b3' },
  success: { main: '#28a745', light: '#6bcf7f', dark: '#1e7e34' },
  danger: { main: '#dc3545', light: '#e976814', dark: '#bd2130' },
  neutral: { white: '#ffffff', light: '#f8f9fa', dark: '#343a40' }
}

// Espaciado consistente
spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 }

// Tipografía unificada
typography: {
  sizes: { small: 14, medium: 16, large: 18, xlarge: 24 },
  weights: { normal: 400, medium: 500, semibold: 600, bold: 700 }
}
```

#### 2. **Componentes Reutilizables** (`src/styles/components.js`)
Estilos base para patrones comunes:

```javascript
// Estilos base para formularios y layouts
baseStyles: {
  form: { /* Estilos de formulario consistentes */ },
  card: { /* Cards con sombras y bordes uniformes */ },
  input: { /* Campos de entrada estandarizados */ }
}

// Sistema completo de botones
buttonStyles: {
  base: { /* Estilos base para todos los botones */ },
  primary: { /* Botón principal de la aplicación */ },
  success: { /* Botones de éxito/confirmación */ },
  danger: { /* Botones de advertencia/eliminación */ },
  outline: { /* Variante de botones con borde */ }
}
```

#### 3. **Componente Button Centralizado**
Un solo componente para todos los botones de la aplicación:

```jsx
<Button variant="primary" size="large" onClick={handleClick}>
  Acción Principal
</Button>

<Button variant="success" size="medium">
  Confirmar
</Button>

<Button variant="danger" size="small" outline>
  Cancelar
</Button>
```

### 🔧 Implementación en Componentes

#### Antes de la Optimización:
```jsx
// ❌ CSS duplicado en cada componente
const styles = {
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  }
}
```

#### Después de la Optimización:
```jsx
// ✅ Estilos centralizados y reutilizables
import { Button } from './components/Button';
import { baseStyles } from './styles/components';

<Button variant="primary">Enviar</Button>
<div style={baseStyles.form}>
  {/* Contenido del formulario */}
</div>
```

### 📈 Beneficios Implementados

#### ✅ **Mantenibilidad**
- **Cambios globales** en un solo lugar
- **Consistencia automática** en toda la aplicación
- **Refactoring simplificado** para futuras actualizaciones

#### ✅ **Performance**
- **Bundle size reducido** con 70% menos CSS
- **Reutilización máxima** de estilos
- **Menos código** para cargar y procesar

#### ✅ **Escalabilidad**
- **Patrones establecidos** para nuevos componentes
- **Sistema extensible** fácil de ampliar
- **Guías claras** para el equipo de desarrollo

#### ✅ **Consistencia Visual**
- **Colores unificados** en toda la interfaz
- **Espaciado sistemático** siguiendo reglas de diseño
- **Tipografía coherente** con jerarquías claras

### 📋 Componentes Optimizados

| Componente | Estado | Beneficios |
|------------|--------|------------|
| `Button.js` | ✅ Centralizado | Variantes reutilizables |
| `Alert.js` | ✅ Optimizado | Estilos sistemáticos |
| `LoadingSpinner.js` | ✅ Refactorizado | Animaciones consistentes |
| `Navigation.js` | ✅ Actualizado | Estilos de navegación unificados |
| `Navbar.js` | ✅ Mejorado | Header consistente |
| `Login.js` | ✅ Refactorizado | Formularios estandarizados |
| `Register.js` | ✅ Optimizado | Validación visual unificada |
| `Dashboard.js` | ✅ Actualizado | Layout sistemático |
| `App.js` | ✅ Centralizado | Estructura base optimizada |

### 🚀 Uso del Sistema de Diseño

Para desarrolladores que trabajen en nuevas funcionalidades:

```jsx
// 1. Importar tokens y estilos base
import { tokens } from '../styles/tokens';
import { baseStyles, buttonStyles } from '../styles/components';

// 2. Usar el componente Button centralizado
import Button from '../components/Button';

// 3. Aplicar tokens en estilos personalizados
const customStyles = {
  container: {
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.neutral.light,
    borderRadius: tokens.borderRadius.md
  },
  title: {
    fontSize: tokens.typography.sizes.xlarge,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.primary.main
  }
};

// 4. Componente final optimizado
const MyComponent = () => (
  <div style={customStyles.container}>
    <h2 style={customStyles.title}>Mi Componente</h2>
    <Button variant="primary">Acción Principal</Button>
  </div>
);
```

## 📁 Estructura del Proyecto

```
v-wallet/
├── database-service/          # Servicio 1 - Puerto 3001
│   ├── src/
│   │   ├── config/           # Configuración Prisma
│   │   ├── controllers/      # Controladores DB
│   │   ├── routes/           # Rutas internas
│   │   └── server.js         # Servidor principal
│   ├── prisma/
│   │   └── schema.prisma     # Esquema de base de datos
│   ├── .env                  # Variables de entorno
│   └── package.json
│
├── api-gateway/              # Servicio 2 - Puerto 3002
│   ├── src/
│   │   ├── config/           # JWT, email, variables
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── middleware/       # Auth, validación, rate-limit
│   │   ├── routes/           # Rutas públicas
│   │   ├── services/         # Cliente HTTP para Servicio 1
│   │   └── server.js         # Servidor principal
│   ├── .env                  # Variables de entorno
│   └── package.json
│
├── frontend/                 # React App - Puerto 3000
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── Button.js     # Componente Button centralizado
│   │   │   ├── Alert.js      # Sistema de alertas optimizado
│   │   │   ├── LoadingSpinner.js # Spinner centralizado
│   │   │   ├── Navigation.js # Navegación optimizada
│   │   │   └── Navbar.js     # Barra de navegación
│   │   ├── pages/            # Vistas principales
│   │   │   ├── Login.js      # Login con estilos optimizados
│   │   │   ├── Register.js   # Registro con estilos optimizados
│   │   │   └── Dashboard.js  # Dashboard con estilos optimizados
│   │   ├── styles/           # 🎨 Sistema de diseño centralizado
│   │   │   ├── tokens.js     # Tokens de diseño (colores, espaciado, tipografía)
│   │   │   └── components.js # Estilos de componentes reutilizables
│   │   ├── services/         # Axios con interceptors
│   │   ├── utils/            # Validaciones, helpers
│   │   └── App.js            # Componente principal optimizado
│   ├── public/
│   │   └── index.html        # Página base
│   ├── .env                  # Variables de entorno
│   └── package.json
│
├── init-db.js                # Script de inicialización
├── package.json              # Dependencias del script
├── V_Wallet_API.postman_collection.json
└── README.md                 # Esta documentación
```

## ⚡ Instalación y Configuración

### Prerrequisitos

1. **XAMPP** instalado y corriendo (MySQL en puerto 3306)
2. **Node.js 18+** y npm
3. **Git** (opcional)

### Pasos de Instalación

#### 1. 📥 Clonar/Descargar el proyecto

```bash
# Si tienes Git
git clone [URL_DEL_REPOSITORIO]
cd v-wallet

# O descargar y extraer en c:\path\to\project\v-wallet\
```
1. Crear archivos .env a partir de los archivos .env.sample (v-wallet\\.env, v-wallet\\frontend\\.env, v-wallet\\database-service\\.env, v-wallet\\api-gateway\\.env)
2. Modificar los paramentros necesarios en cada uno de los archivos

#### 2. 🔧 Configurar XAMPP

1. Abrir el panel de control de XAMPP
2. Iniciar **Apache** y **MySQL**
3. Verificar que MySQL esté corriendo en el puerto 3306

#### 3. 🗄️ Inicializar la base de datos

**IMPORTANTE**: Este paso debe ejecutarse ANTES del paso 4, ya que configura automáticamente el database-service.

```bash
# En la raíz del proyecto
npm install      # Instala dependencias del script de inicialización
npm run init     # Ejecuta el script de configuración automática
```

Este script ejecuta automáticamente:
- ✅ Verifica la conexión a MySQL
- ✅ Crea la base de datos `wallet_db`
- ✅ **Instala dependencias del database-service automáticamente**
- ✅ Genera el cliente de Prisma
- ✅ Ejecuta las migraciones de Prisma
- ✅ Crea un usuario de prueba

#### 4. 📦 Instalar dependencias de los servicios restantes

**NOTA**: Las dependencias del database-service ya fueron instaladas en el paso 3.

```bash
# Database Service (ya instalado en paso 3)
# cd database-service
# npm install  ← NO ES NECESARIO, ya se hizo automáticamente

# API Gateway  
cd api-gateway
npm install

# Frontend
cd frontend
npm install
```

#### 5. ⚙️ Configurar variables de entorno

Las variables ya están configuradas en los archivos `.env`, pero puedes personalizarlas:

**database-service/.env**
```env
DATABASE_URL="mysql://root@localhost:3306/wallet_db"
PORT=3001
```

**api-gateway/.env**
```env
PORT=3002
DATABASE_SERVICE_URL=http://localhost:3001
JWT_SECRET=tu_secreto_muy_seguro_aleatorio_para_jwt_2024
JWT_EXPIRES_IN=30m
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_app
```

**frontend/.env**
```env
REACT_APP_API_URL=http://localhost:3002
```

## 🚀 Ejecución de la Aplicación

### Método Recomendado (3 terminales)

#### Terminal 1 - Database Service
```bash
cd database-service
npm run dev
```
✅ Servicio corriendo en http://localhost:3001

#### Terminal 2 - API Gateway
```bash
cd api-gateway
npm run dev
```
✅ Servicio corriendo en http://localhost:3002

#### Terminal 3 - Frontend React
```bash
cd frontend
npm start
```
✅ Aplicación web en http://localhost:3000

### Verificación de Servicios

Visita estos endpoints para verificar que todo esté funcionando:

- **Database Service**: http://localhost:3001/health
- **API Gateway**: http://localhost:3002/health
- **Frontend**: http://localhost:3000

## 🔒 Características de Seguridad

### Autenticación y Autorización
- **JWT**: Tokens con expiración de 30 minutos
- **bcrypt**: Hash de contraseñas con salt rounds: 10
- **Bearer Token**: Autenticación en headers HTTP

### Protecciones Implementadas
- **Helmet**: Seguridad en HTTP headers
- **Rate Limiting**: 
  - General: 100 requests/15min por IP
  - Login: 5 intentos/15min por IP
  - Registro: 3 intentos/hora por IP
- **CORS**: Configurado para dominios específicos
- **Validación**: express-validator en todos los endpoints
- **Sanitización**: Limpieza de inputs maliciosos

### Validaciones de Datos
- **Documento**: 8-15 dígitos numéricos
- **Email**: Formato válido + normalización
- **Celular**: Formato colombiano (3XXXXXXXXX)
- **Password**: Mínimo 6 caracteres, 1 mayúscula, 1 minúscula, 1 número
- **Montos**: Rangos válidos ($1 - $999,999)

## 📡 API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/clientes/registro` | Registrar nuevo cliente | No |
| POST | `/api/auth/login` | Iniciar sesión | No |

### Billetera (Requieren Auth)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/billetera/recarga` | Recargar saldo | Sí |
| POST | `/api/billetera/pagar` | Iniciar pago | Sí |
| POST | `/api/billetera/confirmar-pago` | Confirmar pago | No |
| GET | `/api/billetera/saldo` | Consultar saldo | No |

### Health Checks
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servicio |

## 🧪 Testing con Postman

### Importar Colección

1. Abrir Postman
2. Click en **Import**
3. Seleccionar `V_Wallet_API.postman_collection.json`
4. La colección se importará con todas las pruebas configuradas

### Flujo de Pruebas Recomendado

1. **Health Checks**: Verificar que los servicios estén corriendo
2. **Registro**: Crear un nuevo cliente
3. **Login**: Obtener token JWT (se guarda automáticamente)
4. **Recarga**: Agregar saldo a la billetera
5. **Iniciar Pago**: Generar token y sesión de pago
6. **Confirmar Pago**: Usar el token del email para confirmar
7. **Consultar Saldo**: Verificar saldo actualizado

### Usuario de Prueba Pre-creado

- **Documento**: 12345678
- **Email**: test@billetera.com
- **Contraseña**: 123456
- **Celular**: 3001234567
- **Saldo inicial**: $50,000

## 📱 Uso de la Aplicación

### 1. 🔐 Registro/Login
- Acceder a http://localhost:3000
- Crear una cuenta nueva o usar las credenciales de prueba
- El sistema valida todos los campos automáticamente

### 2. 💳 Recargar Billetera
- Ingresar documento, celular y monto
- Los datos del usuario autenticado se validan automáticamente
- El saldo se actualiza inmediatamente

### 3. 💸 Realizar Pagos
- Especificar monto y descripción opcional
- Se verifica que tengas saldo suficiente
- Se genera un token de 6 dígitos enviado por email
- Sesión válida por 5 minutos

### 4. 🔐 Confirmar Pagos
- Ingresar el token de 6 dígitos del email
- El pago se procesa y el saldo se descuenta
- Confirmación inmediata

### 5. 🔍 Consultar Saldos
- Función pública (no requiere autenticación)
- Ingresar documento y celular
- Ver saldo actual

## 🐛 Troubleshooting

### Problemas Comunes

#### 🔴 Error de conexión a MySQL
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solución**: 
- Verificar que XAMPP esté corriendo
- Reiniciar el servicio MySQL en XAMPP
- Comprobar que no haya otro proceso usando el puerto 3306

#### 🔴 Error de migraciones de Prisma
```
Error: P1001: Can't reach database server
```
**Solución**:
```bash
cd database-service
npx prisma migrate reset
npx prisma db push
npx prisma generate
```

#### 🔴 Puerto ya en uso
```
Error: listen EADDRINUSE :::3001
```
**Solución**:
```bash
# Encontrar proceso usando el puerto
netstat -ano | findstr :3001
# Matar el proceso (reemplazar PID)
taskkill /PID [PID_NUMBER] /F
```

#### 🔴 Frontend no carga
**Solución**:
```bash
cd frontend
rm -rf node_modules
npm install
npm start
```

#### 🔴 CORS Error
**Solución**: Verificar que los servicios estén corriendo en los puertos correctos:
- Database Service: 3001
- API Gateway: 3002  
- Frontend: 3000

### Logs de Debug

Para ver logs detallados:

```bash
# Database Service
cd database-service
DEBUG=* npm run dev

# API Gateway  
cd api-gateway
DEBUG=* npm run dev
```

## 📈 Características Técnicas

### Escalabilidad
- Arquitectura de microservicios
- Comunicación HTTP entre servicios
- Base de datos centralizada con ORM
- Sistema de diseño modular y extensible

### Performance
- Rate limiting para prevenir abuso
- Timeouts configurados en requests HTTP
- Validaciones optimizadas
- **CSS optimizado**: 70% reducción de código con sistema centralizado
- **Bundle size mejorado**: Eliminación de CSS duplicado

### Mantenibilidad
- Código modular y organizado
- Middleware reutilizable
- Esquemas de validación centralizados
- Logging estructurado
- **Sistema de tokens de diseño**: Cambios globales centralizados
- **Componentes reutilizables**: Patrones consistentes y escalables

### Seguridad
- Autenticación JWT con expiración
- Hash de contraseñas con bcrypt
- Validación exhaustiva de inputs
- Headers de seguridad con Helmet
- Rate limiting por IP

### Frontend Optimizado
- **Design System**: Tokens centralizados para colores, espaciado y tipografía
- **Component Library**: Estilos reutilizables para formularios, botones y navegación
- **Consistent UI**: Interfaz unificada con patrones establecidos
- **Developer Experience**: Fácil mantenimiento y extensión del sistema visual

## 🤝 Contribuir

### Antes de Contribuir
1. **Usar componentes existentes**: Aprovecha los tokens y estilos centralizados
2. **Seguir patrones establecidos**: Mantén la consistencia del código

### Proceso de Contribución
1. Fork del proyecto
2. Crear branch para feature (`git checkout -b feature/amazing-feature`)
3. **Implementar usando el sistema de diseño** (tokens.js y components.js)
4. Commit de cambios (`git commit -m 'Add amazing feature'`)
5. Push al branch (`git push origin feature/amazing-feature`)
6. Abrir Pull Request

### Guías de Desarrollo Frontend
- **Usar tokens de diseño**: Importa colores, espaciado y tipografía desde `tokens.js`
- **Reutilizar componentes**: Usa `Button`, `Alert`, etc. en lugar de crear nuevos estilos
- **Seguir patrones**: Consulta `components.js` para estilos base de formularios y layouts
- **Evitar CSS duplicado**: Antes de crear estilos nuevos, verifica si ya existen en el sistema

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Troubleshooting](#-troubleshooting)
2. Verifica que todos los servicios estén corriendo
3. Confirma la configuración de las variables de entorno
4. Comprueba los logs de los servicios

**¡Disfruta usando tu v-wallet!** 💰✨