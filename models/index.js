'use strict';
// Este archivo define y configura las conexiones a la base de datos y las relaciones entre los modelos.
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


// Cargar todos los modelos de la carpeta 'models' y establecer las conexiones a la base de datos.
// Cada archivo de modelo exporta una función que define un modelo de Sequelize.
// Se cargan todos los modelos y se almacenan en el objeto 'db'.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Después de definir todos los modelos

// Rol - Persona
Rol.hasMany(Persona, { foreignKey: 'id_rol' });
Persona.belongsTo(Rol, { foreignKey: 'id_rol' });

// Persona - AdministradorInstructor
Persona.hasOne(AdministradorInstructor, { foreignKey: 'id_persona' });
AdministradorInstructor.belongsTo(Persona, { foreignKey: 'id_persona' });

// Persona - Usuario
Persona.hasOne(Usuario, { foreignKey: 'id_persona' });
Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });

// Modulo - Hardware
Modulo.hasMany(Hardware, { foreignKey: 'id_modulo' });
Hardware.belongsTo(Modulo, { foreignKey: 'id_modulo' });

// Hardware - Sensor
Hardware.hasMany(Sensor, { foreignKey: 'id_hardware' });
Sensor.belongsTo(Hardware, { foreignKey: 'id_hardware' });

// Sensor - Umbral
Sensor.hasOne(Umbral, { foreignKey: 'id_sensor' });
Umbral.belongsTo(Sensor, { foreignKey: 'id_sensor' });

// Sensor - Parametro
Sensor.hasMany(Parametro, { foreignKey: 'id_sensor' });
Parametro.belongsTo(Sensor, { foreignKey: 'id_sensor' });

// Modulo - Bitacora
Modulo.hasMany(Bitacora, { foreignKey: 'id_modulo' });
Bitacora.belongsTo(Modulo, { foreignKey: 'id_modulo' });

// Modulo - Notificacion
Modulo.hasMany(Notificacion, { foreignKey: 'id_modulo' });
Notificacion.belongsTo(Modulo, { foreignKey: 'id_modulo' });

// Modulo - Reporte
Modulo.hasMany(Reporte, { foreignKey: 'id_modulo' });
Reporte.belongsTo(Modulo, { foreignKey: 'id_modulo' });

// Modulo - Usuario (Many-to-Many)
Persona.belongsToMany(Modulo, { through: 'ModuloUsuario', foreignKey: 'id_persona' });
Modulo.belongsToMany(Persona, { through: 'ModuloUsuario', foreignKey: 'id_modulo' });

module.exports = db;
