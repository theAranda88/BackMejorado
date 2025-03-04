const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Hardware extends Model {
    static associate(models) {
      Hardware.belongsTo(models.Module, {
        foreignKey: 'id_module',
        as: 'module'
      });
      
      Hardware.hasMany(models.Sensor, {
        foreignKey: 'id_hardware',
        as: 'sensors'
      });
    }
  }

  Hardware.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      id_module: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'module',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Hardware',
      tableName: 'hardware',
      timestamps: true
    }
  );

  return Hardware;
};
