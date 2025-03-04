const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Binnacle extends Model {
    static associate(models) {
      Binnacle.belongsTo(models.Module, {
        foreignKey: 'id_module',
        onDelete: 'CASCADE',
      });
    }
  }

  Binnacle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_module: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'module',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Binnacle',
      tableName: 'binnacles',
      timestamps: true,
    }
  );

  return Binnacle;
};

