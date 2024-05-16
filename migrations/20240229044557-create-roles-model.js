'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, // Mengubah tipe data menjadi UUID
        defaultValue: Sequelize.UUIDV4 // Menambahkan nilai default UUID
      },
      name: {
        type: Sequelize.STRING
      },
      access: {
        type: Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_roles');
  }
};