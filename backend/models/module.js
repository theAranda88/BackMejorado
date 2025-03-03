const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Module extends Model {
    static associate(models) {
      Module.belongsTo(models.User, {
        foreignKey: 'created_by_user_id',
        as: 'creator'
      });

      Module.belongsTo(models.Farm, {
        foreignKey: 'id_farm',
        as: 'farm'
      })

      Module.hasMany(models.Hardware, {
        foreignKey: 'id_module',
        as: 'hardware'
      });
      
      Module.hasMany(models.Binnacle, {
        foreignKey: 'id_module',
        as: 'binnacles'
      });
      
      Module.hasMany(models.Notification, {
        foreignKey: 'id_module',
        as: 'notifications'
      });
      
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
    latitude: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(256),
      allowNull: false
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
    id_farm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'farms',
        key: 'id'
      }
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
    tableName: 'modules',
    timestamps: true
  });
  
  return Module;
};

