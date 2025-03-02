'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING(100), // Tipo string con máximo 100 caracteres
      allowNull: true, // Se permite nulo, puedes cambiarlo según necesites
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "address");
  },
};
