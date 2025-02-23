'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla de unión ModuloUsuario
    await queryInterface.createTable('ModuloUsuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_modulo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Modulos',    // Nombre de la tabla Modulo (asegúrate que coincida con tu modelo)
          key: 'id'            // Clave primaria de Modulo
        },
        onUpdate: 'CASCADE',   // Actualiza en cascada si el id_modulo cambia
        onDelete: 'CASCADE'    // Elimina en cascada si el módulo se borra
      },
      id_persona: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Personas',   // Nombre de la tabla Persona (asegúrate que coincida con tu modelo)
          key: 'id'            // Clave primaria de Persona
        },
        onUpdate: 'CASCADE',   // Actualiza en cascada si el id_persona cambia
        onDelete: 'CASCADE'    // Elimina en cascada si la persona se borra
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
    // Eliminar la tabla de unión ModuloUsuario
    await queryInterface.dropTable('ModuloUsuario');
  }
};