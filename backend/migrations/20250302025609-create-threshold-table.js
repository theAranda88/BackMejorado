'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thresholds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_sensor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sensors',
          key: 'id'
        }
      },
      min_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      max_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('thresholds');
  }
};
