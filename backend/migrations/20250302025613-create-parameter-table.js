'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parameters', {
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
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      date_hour: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('parameters');
  }
};
