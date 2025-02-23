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
       // Relación con Sensor (N:1)
       this.belongsTo(models.Sensor, {
        foreignKey: 'id_sensor', // Clave foránea en Parametro
        as: 'sensor' // Alias para la relación
      });

      // Si tienes más relaciones (ej: con Reporte o Notificación):
      // this.belongsTo(models.Reporte, { foreignKey: 'id_reporte' });
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