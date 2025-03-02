const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Parameter extends Model {
    static associate(models) {
      // Parameter belongs to a Sensor
      Parameter.belongsTo(models.Sensor, {
        foreignKey: 'id_sensor',
        as: 'sensor'
      });
    }
  }

  Parameter.init({
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
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date_hour: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Parameter',
    tableName: 'parameters',
    timestamps: true
  });

  return Parameter;
};

