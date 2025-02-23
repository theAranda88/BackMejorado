'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación con Módulo (1 notificación pertenece a 1 módulo)
      this.belongsTo(models.Modulo, {
        foreignKey: 'id_modulo', // Clave foránea en Notificacion
        as: 'modulo' // Alias para la relación
      });

      // Si la notificación está vinculada a un usuario (ej: quien la recibe):
      // this.belongsTo(models.Usuario, {
      //   foreignKey: 'id_usuario',
      //   as: 'usuario'
      // });
    }
  }
  Notificacion.init({
    tipo: DataTypes.STRING,
    mensaje: DataTypes.TEXT,
    fecha_hora: DataTypes.DATE,
    id_modulo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notificacion',
  });
  return Notificacion;
};