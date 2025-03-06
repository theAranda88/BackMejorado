const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ModuleUser extends Model {
    static associate(models) {
      // No additional associations needed as they are defined in the User and Module models
    }
  }

  ModuleUser.init({
    id_module: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    id_person: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'ModuleUser',
    tableName: 'module_user',
    timestamps: false
  });

  return ModuleUser;
};
