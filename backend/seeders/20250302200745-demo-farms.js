'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('farms', [
      {
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const [farmRows] = await queryInterface.sequelize.query('SELECT id FROM farms');
    
    for (const farm of farmRows) {

      const [usersRows] = await queryInterface.sequelize.query('SELECT id FROM users where id_rol = 2');
      const userIdList = usersRows.map(user => user.id);

      await queryInterface.bulkInsert('farm_user', [
        {
          id_user: faker.helpers.arrayElement(userIdList),
          id_farm: farm.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_user: faker.helpers.arrayElement(userIdList),
          id_farm: farm.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('farm_user', null, {});
    await queryInterface.bulkDelete('farms', null, {});
  }
};
