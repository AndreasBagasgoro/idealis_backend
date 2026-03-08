'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil recipe IDs yang ada
    const recipes = await queryInterface.sequelize.query(
      'SELECT id FROM Recipes;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Ambil ingredient IDs yang ada
    const ingredients = await queryInterface.sequelize.query(
      'SELECT id FROM Ingredients;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (recipes.length === 0) {
      console.log('No recipes found. Seed recipes first.');
      return;
    }

    if (ingredients.length === 0) {
      console.log('No ingredients found. Seed ingredients first.');
      return;
    }

    const recipeIngredients = [];
    const usedCombinations = new Set(); // Untuk mencegah duplikasi

    // Setiap recipe mendapat 3-7 ingredients random
    for (const recipe of recipes) {
      const ingredientCount = faker.number.int({ min: 3, max: 7 });
      const shuffledIngredients = faker.helpers.shuffle([...ingredients]);

      for (let i = 0; i < Math.min(ingredientCount, shuffledIngredients.length); i++) {
        const ingredient = shuffledIngredients[i];
        const combination = `${recipe.id}-${ingredient.id}`;

        // Skip jika kombinasi sudah ada
        if (usedCombinations.has(combination)) continue;
        usedCombinations.add(combination);

        recipeIngredients.push({
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: faker.number.float({ min: 10, max: 500, precision: 0.1 }),
          amountNeeded: faker.number.float({ min: 10, max: 500, precision: 0.1 }),
          unit: faker.helpers.arrayElement(['gram', 'ml', 'buah', 'sdm', 'sdt', 'potong', 'cup']),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('RecipeIngredients', recipeIngredients, {});
    console.log(`✅ Seeded ${recipeIngredients.length} recipe-ingredient relations`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecipeIngredients', null, {});
  }
};
