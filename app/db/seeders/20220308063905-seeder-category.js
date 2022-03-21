"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Business & Economic",
          user: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Art & Design",
          user: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Agriculture",
          user: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
