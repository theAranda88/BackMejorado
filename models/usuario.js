'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación 1:1 con Persona
      Usuario.belongsTo(models.Persona, {
        foreignKey: 'id_persona', // Asegúrate de que este campo exista en la tabla
        as: 'persona' // Alias para la relación
      });
    }
  }
  Usuario.init({
    n_ficha: DataTypes.STRING,
    jornada: DataTypes.STRING,
    nombre_del_programa: DataTypes.STRING,
    id_persona: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario'
  });
  return Usuario;
};