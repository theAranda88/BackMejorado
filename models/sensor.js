'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1. Relación con Hardware (N:1)
      this.belongsTo(models.Hardware, {
        foreignKey: 'id_hardware', // Asegúrate de que exista en la tabla Sensor
        as: 'hardware' // Alias para la relación
      });

      // 2. Relación 1:1 con Umbral
      this.hasOne(models.Umbral, {
        foreignKey: 'id_sensor', // Debe existir en la tabla Umbral
        as: 'umbral' // Alias
      });

      // 3. Relación 1:N con Parametro
      this.hasMany(models.Parametro, {
        foreignKey: 'id_sensor', // Debe existir en la tabla Parametro
        as: 'parametros' // Alias
      });
    }
  }
  Sensor.init({
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    id_hardware: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};