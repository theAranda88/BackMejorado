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
       // Relación con Hardware
       this.hasMany(models.Hardware, {
        foreignKey: 'id_modulo',
        as: 'hardwares'
      });

      // Relación con Bitacora
      this.hasMany(models.Bitacora, {
        foreignKey: 'id_modulo',
        as: 'bitacoras'
      });

      // Relación con Notificacion
      this.hasMany(models.Notificacion, {
        foreignKey: 'id_modulo',
        as: 'notificaciones'
      });

      // Relación con Reporte
      this.hasMany(models.Reporte, {
        foreignKey: 'id_modulo',
        as: 'reportes'
      });

      // Relación N:M con Persona
      this.belongsToMany(models.Persona, {
        through: 'ModuloUsuario',
        foreignKey: 'id_modulo',
        as: 'usuarios'
      });
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