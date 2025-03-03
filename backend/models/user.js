const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol'
      });
      
      User.belongsToMany(models.Farm, {
        through: 'farm_user',
        foreignKey: 'id_user',
        otherKey: 'id_farm'
      });
      
      User.hasMany(models.Module, {
        foreignKey: 'created_by_user_id',
        as: 'createdModules'
      });
      
      User.belongsToMany(models.Module, {
        through: 'module_user',
        foreignKey: 'id_person',
        otherKey: 'id_module'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'rol',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  return User;
};
