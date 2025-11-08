const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Asume que no hay contraseña por defecto en XAMPP
  database: process.env.DB_NAME || 'wallet_db'
};

// Función para construir URL de conexión
const buildDatabaseUrl = (includeDatabase = true) => {
  const passwordPart = DB_CONFIG.password ? `:${DB_CONFIG.password}` : '';
  const databasePart = includeDatabase ? `/${DB_CONFIG.database}` : '';
  return `mysql://${DB_CONFIG.user}${passwordPart}@${DB_CONFIG.host}:${DB_CONFIG.port}${databasePart}`;
};

// URL de conexión completa para Prisma
const DATABASE_URL = process.env.DATABASE_URL || buildDatabaseUrl(true);

async function initializeDatabase() {
  let connection;
  
  try {
    console.log('🚀 Iniciando configuración de la base de datos...');
    
    // Conectar a MySQL sin especificar base de datos
    console.log('📡 Conectando a MySQL...');
    const connectionConfig = {
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
      // No incluimos 'database' porque la vamos a crear
    };
    connection = await mysql.createConnection(connectionConfig);
    
    // Verificar conexión
    await connection.execute('SELECT 1');
    console.log('✅ Conexión a MySQL exitosa');
    
    // Crear base de datos si no existe
    console.log(`📊 Creando base de datos "${DB_CONFIG.database}" si no existe...`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\``);
    console.log('✅ Base de datos creada o ya existía');
    
    // Cerrar conexión inicial
    await connection.end();
    
    // Ejecutar migraciones de Prisma
    console.log('🔄 Ejecutando migraciones de Prisma...');
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    const path = require('path');
    
    // Guardar directorio actual y cambiar al database-service
    const originalDir = process.cwd();
    const databaseServiceDir = path.join(originalDir, 'database-service');
    
    console.log(`📁 Cambiando al directorio: ${databaseServiceDir}`);
    process.chdir(databaseServiceDir);
    
    try {
      // Verificar que el directorio node_modules exista
      console.log('📦 Instalando dependencias de database-service...');
      await execAsync('npm install');
      console.log('✅ Dependencias instaladas');
      
      // Generar cliente de Prisma
      console.log('📦 Generando cliente de Prisma...');
      await execAsync('npx prisma generate');
      console.log('✅ Cliente de Prisma generado');
      
      // Aplicar migraciones
      console.log('🔧 Aplicando migraciones...');
      await execAsync('npx prisma migrate dev --name init');
      console.log('✅ Migraciones aplicadas');
      
    } catch (migrateError) {
      console.log('⚠️ Error en migraciones (puede que ya existan):', migrateError.message);
      
      // Intentar push como alternativa
      try {
        console.log('🔄 Intentando sincronizar esquema...');
        await execAsync('npx prisma db push');
        console.log('✅ Esquema sincronizado');
      } catch (pushError) {
        console.log('⚠️ Error en sincronización:', pushError.message);
      }
    } finally {
      // Volver al directorio original
      process.chdir(originalDir);
    }
    
    // Crear usuario de prueba
    await createTestUser();
    
    console.log('🎉 ¡Inicialización completada exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Base de datos: ${DB_CONFIG.database}`);
    console.log(`   - URL: ${DATABASE_URL}`);
    console.log('   - Usuario de prueba creado');
    console.log('\n🚀 Puedes iniciar los servicios ahora:');
    console.log('   1. cd database-service && npm run dev');
    console.log('   2. cd api-gateway && npm run dev');
    console.log('   3. cd frontend && npm start');
    
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function createTestUser() {
  try {
    console.log('👤 Creando usuario de prueba...');
    
    // Importar Prisma Client desde el directorio correcto
    const { PrismaClient } = require('./database-service/node_modules/@prisma/client');
    const prisma = new PrismaClient();
    
    // Datos del usuario de prueba
    const testUser = {
      documento: '12345678',
      nombres: 'Usuario de Prueba',
      email: 'test@billetera.com',
      celular: '3001234567',
      password: await bcrypt.hash('123456', 10),
      saldo: 50000 // $50,000 COP de saldo inicial
    };
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.cliente.findFirst({
      where: {
        OR: [
          { documento: testUser.documento },
          { email: testUser.email }
        ]
      }
    });
    
    if (existingUser) {
      console.log('ℹ️ El usuario de prueba ya existe');
    } else {
      const user = await prisma.cliente.create({
        data: testUser
      });
      console.log('✅ Usuario de prueba creado exitosamente');
      console.log(`   - Documento: ${user.documento}`);
      console.log(`   - Email: ${user.email}`);
      console.log(`   - Contraseña: 123456`);
      console.log(`   - Saldo inicial: $${user.saldo.toLocaleString('es-CO')}`);
    }
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Error creando usuario de prueba:', error.message);
  }
}

async function checkDependencies() {
  console.log('🔍 Verificando dependencias...');
  
  try {
    // Verificar si MySQL está corriendo
    const connectionConfig = {
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    };
    const connection = await mysql.createConnection(connectionConfig);
    await connection.execute('SELECT 1');
    await connection.end();
    console.log('✅ MySQL está corriendo');
  } catch (error) {
    console.error('❌ MySQL no está disponible. Asegúrate de que XAMPP esté corriendo.');
    process.exit(1);
  }
  
  // Verificar Node.js y npm
  const nodeVersion = process.version;
  console.log(`✅ Node.js versión: ${nodeVersion}`);
  
  if (parseInt(nodeVersion.substring(1)) < 14) {
    console.error('❌ Se requiere Node.js versión 14 o superior');
    process.exit(1);
  }
}

// Función principal
async function main() {
  console.log('💰 Inicializador de v-wallet');
  console.log('=====================================\n');
  
  await checkDependencies();
  await initializeDatabase();
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  initializeDatabase,
  createTestUser,
  checkDependencies
};