const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Rol extends Model {
    static associate(models) {
      // define association here
      Rol.hasMany(models.User, {
        foreignKey: 'id_rol',
        as: 'users'
      });
    }
  }
  
  Rol.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    timestamps: true // Assuming the table doesn't have createdAt and updatedAt fields
  });
  
  return Rol;
};

