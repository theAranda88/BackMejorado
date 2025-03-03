const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FarmUser extends Model {
    static associate(models) {
      // Associations are defined in the Farm and User models
      // But we could add additional methods or scopes here if needed
    }
  }

  FarmUser.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    id_farm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'farm',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'FarmUser',
    tableName: 'farm_user',
    timestamps: true
  });

  return FarmUser;
};
