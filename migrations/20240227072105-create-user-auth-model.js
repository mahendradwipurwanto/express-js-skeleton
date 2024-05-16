'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_user_auth', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, // Mengubah tipe data menjadi UUID
        defaultValue: Sequelize.UUIDV4 // Menambahkan nilai default UUID
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
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
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.UUID
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.UUID
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.UUID
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_user_auth');
  }
};