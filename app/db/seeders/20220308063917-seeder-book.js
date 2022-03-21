'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Business & Economic",
          author: "David",
          image: 'uploads/image 1.jpeg',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 2,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Coffie and milk",
          author: "Hamda",
          image: 'uploads/image 2.jpeg',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 2,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
