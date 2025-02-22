'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdministradorInstructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdministradorInstructor.init({
    n_ficha: DataTypes.STRING,
    nombre_del_programa: DataTypes.STRING,
    id_persona: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdministradorInstructor',
  });
  return AdministradorInstructor;
};