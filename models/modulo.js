'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Modulo.init({
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    especie_pescados: DataTypes.STRING,
    cantidad_pescados: DataTypes.STRING,
    edad_pescados: DataTypes.STRING,
    dimensiones: DataTypes.STRING,
    id_persona: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modulo',
  });
  return Modulo;
};