'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const base = require(__dirname + '/../config/config.json')[env];
const mysql2 = require('mysql2')
const db = {};


const config = {
  username: process.env.ORM_DB_USER,
  password: process.env.ORM_DB_PASSWORD,
  database: process.env.ORM_DB_NAME,
  host: process.env.ORM_DB_HOST,
  dialect: "mysql",
  port: process.env.ORM_PORT,
  dialectModule: mysql2,
}

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);


// Cargar modelos
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    try {
      console.log("Cargando modelo:", file); // 👀 Identifica el archivo
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } catch (error) {
      console.error(">>> Error en el archivo:", file); // Mostrará el modelo con error
      throw error;
    }
  });

// Ejecutar associate si existe
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// /******************************* RELACIONES *******************************/

// // 1. Rol - Persona
// db.Rol.hasMany(db.Persona, {
//   foreignKey: 'id_rol',
//   as: 'personas'
// });
// db.Persona.belongsTo(db.Rol, {
//   foreignKey: 'id_rol',
//   as: 'rol'
// });

// // 2. Persona - AdministradorInstructor (1:1)
// db.Persona.hasOne(db.AdministradorInstructor, {
//   foreignKey: 'id_persona',
//   as: 'instructor'
// });
// db.AdministradorInstructor.belongsTo(db.Persona, {
//   foreignKey: 'id_persona',
//   as: 'persona'
// });

// // 3. Persona - Usuario (1:1)
// db.Persona.hasOne(db.Usuario, {
//   foreignKey: 'id_persona',
//   as: 'usuario'
// });
// db.Usuario.belongsTo(db.Persona, {
//   foreignKey: 'id_persona',
//   as: 'persona'
// });

// // 4. Módulo - Hardware (1:N)
// db.Modulo.hasMany(db.Hardware, {
//   foreignKey: 'id_modulo',
//   as: 'hardwares'
// });
// db.Hardware.belongsTo(db.Modulo, {
//   foreignKey: 'id_modulo',
//   as: 'modulo'
// });

// // 5. Hardware - Sensor (1:N)
// db.Hardware.hasMany(db.Sensor, {
//   foreignKey: 'id_hardware',
//   as: 'sensores'
// });
// db.Sensor.belongsTo(db.Hardware, {
//   foreignKey: 'id_hardware',
//   as: 'hardware'
// });

// // 6. Sensor - Umbral (1:1)
// db.Sensor.hasOne(db.Umbral, {
//   foreignKey: 'id_sensor',
//   as: 'umbral'
// });
// db.Umbral.belongsTo(db.Sensor, {
//   foreignKey: 'id_sensor',
//   as: 'sensor'
// });

// // 7. Sensor - Parámetro (1:N)
// db.Sensor.hasMany(db.Parametro, {
//   foreignKey: 'id_sensor',
//   as: 'parametros'
// });
// db.Parametro.belongsTo(db.Sensor, {
//   foreignKey: 'id_sensor',
//   as: 'sensor'
// });

// // 8. Módulo - Bitácora (1:N)
// db.Modulo.hasMany(db.Bitacora, {
//   foreignKey: 'id_modulo',
//   as: 'bitacoras'
// });
// db.Bitacora.belongsTo(db.Modulo, {
//   foreignKey: 'id_modulo',
//   as: 'modulo'
// });

// // 9. Módulo - Notificación (1:N)
// db.Modulo.hasMany(db.Notificacion, {
//   foreignKey: 'id_modulo',
//   as: 'notificaciones'
// });
// db.Notificacion.belongsTo(db.Modulo, {
//   foreignKey: 'id_modulo',
//   as: 'modulo'
// });

// // 10. Módulo - Reporte (1:N)
// db.Modulo.hasMany(db.Reporte, {
//   foreignKey: 'id_modulo',
//   as: 'reportes'
// });
// db.Reporte.belongsTo(db.Modulo, {
//   foreignKey: 'id_modulo',
//   as: 'modulo'
// });

// // 11. Módulo - Usuario (N:M)
// db.Persona.belongsToMany(db.Modulo, {
//   through: 'ModuloUsuario',
//   foreignKey: 'id_persona',
//   as: 'modulos'
// });
// db.Modulo.belongsToMany(db.Persona, {
//   through: 'ModuloUsuario',
//   foreignKey: 'id_modulo',
//   as: 'usuarios'
// });

/******************************* FIN RELACIONES *******************************/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;