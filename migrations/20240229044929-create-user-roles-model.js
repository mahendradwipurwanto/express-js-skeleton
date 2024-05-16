'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_user_roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, // Mengubah tipe data menjadi UUID
        defaultValue: Sequelize.UUIDV4 // Menambahkan nilai default UUID
      },
      m_user_auth_id: {
        type: Sequelize.UUID
      },
      m_roles_id: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('m_user_roles');
  }
};