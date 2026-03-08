'use strict';

const { faker } = require('@faker-js/faker'); // Pastikan install faker

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil user IDs yang ada untuk relasi
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      console.log('No users found. Seed users first.');
      return;
    }

    const recipes = [];
    for (let i = 0; i < 10; i++) { 
      recipes.push({
        userId: faker.helpers.arrayElement(users).id,
        name: faker.food.dish(),
        image: faker.image.url(), 
        duration: faker.number.int({ min: 10, max: 120 }),
        servings: faker.number.int({ min: 1, max: 8 }),
        calories: faker.number.float({ min: 100, max: 1000, precision: 0.1 }),
        protein: faker.number.float({ min: 5, max: 50, precision: 0.1 }),
        fat: faker.number.float({ min: 1, max: 30, precision: 0.1 }),
        carbs: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
        tastePreference: faker.helpers.arrayElement(['Manis', 'Pedas', 'Gurih', 'Asam']),
        dietTarget: faker.helpers.arrayElement(['Rendah Kalori', 'Tinggi Protein', 'Bebas Gluten', 'Vegetarian']),
        steps: JSON.stringify([
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence()
        ]),
        spices: JSON.stringify([
          faker.food.spice(),
          faker.food.spice()
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Recipes', recipes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
