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
       // Relación con Módulo (N:1)
       this.belongsTo(models.Modulo, {
        foreignKey: 'id_modulo',   // Clave foránea en Bitacora
        as: 'modulo'               // Alias para la relación
      });

      // Si la bitácora está asociada a un usuario (ej: quien la creó):
      // this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
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