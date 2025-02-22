'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parametro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parametro.init({
    valor: DataTypes.DECIMAL,
    fecha_hora: DataTypes.DATE,
    id_sensor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Parametro',
  });
  return Parametro;
};