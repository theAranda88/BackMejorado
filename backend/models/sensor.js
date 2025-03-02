const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Sensor extends Model {
    static associate(models) {
      // Sensor belongs to Hardware
      Sensor.belongsTo(models.Hardware, {
        foreignKey: 'id_hardware',
        as: 'hardware'
      });

      // Sensor has one threshold
      Sensor.hasOne(models.Threshold, {
        foreignKey: 'id_sensor',
        as: 'threshold'
      });

      // Sensor has many parameters
      Sensor.hasMany(models.Parameter, {
        foreignKey: 'id_sensor',
        as: 'parameters'
      });
    }
  }

  Sensor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_hardware: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hardware',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Sensor',
    tableName: 'sensor',
    timestamps: true
  });

  return Sensor;
};

