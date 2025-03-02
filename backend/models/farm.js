const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Farm extends Model {
    static associate(models) {
      // Many-to-many relationship with User through farm_user
      Farm.belongsToMany(models.User, {
        through: 'farm_user',
        foreignKey: 'id_farm',
        otherKey: 'id_user'
      });
    }
  }

  Farm.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Farm',
    tableName: 'farm',
    timestamps: true
  });

  return Farm;
};

