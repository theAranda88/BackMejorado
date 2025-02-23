'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación con Módulo (1 Reporte pertenece a 1 Módulo)
      this.belongsTo(models.Modulo, {
        foreignKey: 'id_modulo', // Clave foránea en Reporte
        as: 'modulo' // Alias para acceder desde consultas
      });

      // Si Reporte está relacionado con otros modelos (ej: Usuario), añade aquí:
      // this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    }
  }
  Reporte.init({
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    datos: DataTypes.JSON,
    id_modulo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reporte',
  });
  return Reporte;
};