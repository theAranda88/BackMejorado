'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      location: {
        type: Sequelize.TEXT
      },
      species_fish: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      fish_quantity: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      fish_age: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      dimensions: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_by_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('modules');
  }
};
