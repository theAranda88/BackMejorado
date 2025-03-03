'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('roles', {
      name: {
        [Sequelize.Op.in]: ['admin', 'owner', 'user']
      }
    }, {});
  }
};
