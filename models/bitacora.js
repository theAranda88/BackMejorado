'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bitacora extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bitacora.init({
    fecha: DataTypes.DATEONLY,
    descripcion: DataTypes.TEXT,
    id_modulo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bitacora',
  });
  return Bitacora;
};