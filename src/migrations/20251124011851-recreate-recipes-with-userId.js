'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // HAPUS tabel lama
    await queryInterface.dropTable('Recipes');
    
    // BUAT tabel baru dengan userId
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: { // TAMBAHKAN: Foreign key ke Users
        type: Sequelize.INTEGER,
        allowNull: true, // Atau false jika wajib
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      servings: {
        type: Sequelize.INTEGER
      },
      calories: {
        type: Sequelize.FLOAT
      },
      protein: {
        type: Sequelize.FLOAT
      },
      fat: {
        type: Sequelize.FLOAT
      },
      carbs: {
        type: Sequelize.FLOAT
      },
      tastePreference: {
        type: Sequelize.STRING
      },
      dietTarget: {
        type: Sequelize.STRING
      },
      steps: {
        type: Sequelize.JSON
      },
      spices: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: Hapus tabel baru
    await queryInterface.dropTable('Recipes');
  }
};