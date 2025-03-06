'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 3 users with hashed passwords
    const saltRounds = 10;
    
    const users = [
      {
        name: faker.person.fullName(),
        email: 'admin@example.com',
        password: await bcrypt.hash('password', saltRounds),
        dni: faker.string.numeric(10),
        id_rol: 1, // Admin role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.person.fullName(),
        email: 'owner_1@example.com',
        password: await bcrypt.hash('password', saltRounds),
        dni: faker.string.numeric(10),
        id_rol: 2, // Owner
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.person.fullName(),
        email: 'owner_2@example.com',
        password: await bcrypt.hash('password', saltRounds),
        dni: faker.string.numeric(10),
        id_rol: 2, // Owner
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.person.fullName(),
        email: 'user@example.com',
        password: await bcrypt.hash('password', saltRounds),
        dni: faker.string.numeric(10),
        id_rol: 3, // User Role
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Bulk insert users with correct table name (lowercase)
    return await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded users with correct table name (lowercase)
    return await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: ['admin@example.com', 'owner_1@example.com', 'owner_2@example.com', 'user@example.com']
      }
    }, {});
  }
};
