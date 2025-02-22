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