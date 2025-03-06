const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Notification extends Model {
    static associate(models) {
      // Define association with Module model (belongs to a module)
      Notification.belongsTo(models.Module, {
        foreignKey: 'id_module',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Notification.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_module: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'module',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_hour: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true
  });
  
  return Notification;
};

