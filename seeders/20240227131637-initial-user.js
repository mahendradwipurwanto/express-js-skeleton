'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Create users
      const users = [
        {
          id: '6f19c5d0-ded5-4a5d-bf16-511b6a47d929',
          username: 'admin',
          password: await bcrypt.hash('admin1@miftach', 10), // hash password
          email: 'admin@miftach.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '8f03df72-7b5c-4d20-b5d5-0eb5bf13ad86',
          username: 'user',
          password: await bcrypt.hash('user1@miftach', 10), // hash password
          email: 'user@miftach.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      await queryInterface.bulkInsert('m_user_auth', users, { returning: true });

      // Create roles
      const roles = [
        {
          id: 'b2c63a52-50e4-4d15-901e-3e072feff8c4',
          name: 'Admin',
          access: JSON.stringify({ user: ['create', 'read', 'update', 'delete'], dashboard: ['read'] }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2b2f7e09-6a3b-4248-b93d-8e47cd95ab39',
          name: 'User',
          access: JSON.stringify({ user: ['read'], dashboard: [] }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      await queryInterface.bulkInsert('m_roles', roles, { returning: true });
      // Associate users with roles
      await queryInterface.bulkInsert('m_user_roles', [
        {
          id: 'b55a05b2-b961-46ac-bcd5-3df7f19e5a25',
          m_user_auth_id: users[0].id, // Use user IDs generated from bulkInsert
          m_roles_id: roles[0].id, // Use role IDs generated from bulkInsert
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'bb8d1db5-42f7-47e3-b8d2-9d3e747d7817',
          m_user_auth_id: users[1].id, // Use user IDs generated from bulkInsert
          m_roles_id: roles[1].id, // Use role IDs generated from bulkInsert
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);

    } catch (error) {
      console.error("Error seeding data:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all data
    await queryInterface.bulkDelete('m_user_roles', null, {});
    await queryInterface.bulkDelete('m_user_auth', null, {});
    await queryInterface.bulkDelete('m_roles', null, {});
  }
};
