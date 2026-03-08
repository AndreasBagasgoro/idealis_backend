'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ingredients = [];

    for(let i=0; i<20; i++){
      ingredients.push({
        name: faker.food.ingredient(),
        category: faker.helpers.arrayElement(['Protein', 'Karbohidrat', 'Sayur', 'Buah', 'Produk Susu']),
        quantity: faker.number.float({ min: 0.1, max: 10 }),
        unit: faker.helpers.arrayElement(['ekor','gram (gr)','mililiter (ml)', 'kilogram (kg)', 'buah', 'potong', 'bungkus']),
        expirationDate: faker.datatype.boolean(0.7) 
          ? faker.date.future() // Tanggal di masa depan
          : null,
        image: 'assets/images/placeholder_food.png',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Ingredients', ingredients);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
