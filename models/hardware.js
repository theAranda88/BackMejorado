'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hardware extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación con Módulo (N:1)
      this.belongsTo(models.Modulo, {
        foreignKey: 'id_modulo', // Clave foránea en Hardware
        as: 'modulo' // Alias para la relación
      });

      // Relación con Sensor (1:N)
      this.hasMany(models.Sensor, {
        foreignKey: 'id_hardware', // Clave foránea en Sensor
        as: 'sensores' // Alias para la relación
      });
    }
  }
  Hardware.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    id_modulo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hardware',
  });
  return Hardware;
};