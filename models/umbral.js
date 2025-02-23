'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Umbral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Relación 1:1 con Sensor (Un umbral pertenece a un sensor)
       this.belongsTo(models.Sensor, {
        foreignKey: 'id_sensor', // Clave foránea en Umbral
        as: 'sensor' // Alias para la relación
      });
    }
  }
  Umbral.init({
    valor_min: DataTypes.DECIMAL,
    valor_max: DataTypes.DECIMAL,
    id_sensor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Umbral',
  });
  return Umbral;
};