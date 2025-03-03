const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Threshold extends Model {
    static associate(models) {
      // A threshold belongs to a sensor
      Threshold.belongsTo(models.Sensor, {
        foreignKey: 'id_sensor',
        as: 'sensor'
      });
    }
  }

  Threshold.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_sensor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sensor',
          key: 'id'
        }
      },
      min_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      max_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Threshold',
      tableName: 'thresholds',
      timestamps: true
    }
  );

  return Threshold;
};

