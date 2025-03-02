const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Module extends Model {
    static associate(models) {
      // Define association with User (creator relationship)
      Module.belongsTo(models.User, {
        foreignKey: 'created_by_user_id',
        as: 'creator'
      });
      
      // Define many-to-many relationship with User through module_user
      Module.belongsToMany(models.User, {
        through: 'module_user',
        foreignKey: 'id_module',
        otherKey: 'id_person',
        as: 'users'
      });
      
      // Define one-to-many relationship with Hardware
      Module.hasMany(models.Hardware, {
        foreignKey: 'id_module',
        as: 'hardware'
      });
      
      // Define one-to-many relationship with Binnacle
      Module.hasMany(models.Binnacle, {
        foreignKey: 'id_module',
        as: 'binnacles'
      });
      
      // Define one-to-many relationship with Notification
      Module.hasMany(models.Notification, {
        foreignKey: 'id_module',
        as: 'notifications'
      });
      
      // Define one-to-many relationship with Report
      Module.hasMany(models.Report, {
        foreignKey: 'id_module',
        as: 'reports'
      });
    }
  }
  
  Module.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT
    },
    species_fish: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fish_quantity: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fish_age: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dimensions: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'module',
    timestamps: true
  });
  
  return Module;
};

