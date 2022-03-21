"use strict";
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('rahasia', 10)
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          email: 'admin@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sangg",
          email: 'sangga@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
