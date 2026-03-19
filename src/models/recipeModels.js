'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator'
      });
      Recipe.belongsToMany(models.Ingredient, {
        through: models.RecipeIngredient,
        foreignKey: 'recipeId',
        as: 'ingredients'
      });

      Recipe.hasMany(models.FavoriteRecipe, {
        foreignKey: 'recipeId',
        as: 'favoriteRecipes'
      });

      Recipe.hasMany(models.RecipeCook, {
        foreignKey: 'recipeId',
        as: 'recipeCooks'
      });
    }
  }

  Recipe.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    flavor_preferences: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '["sweet","spicy","savory","sour"]',
    },
    diet_targets: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '["low_calorie","high_protein","gluten_free","vegetarian"]',
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ingredients_used: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Daftar bahan + jumlah yang dipakai',
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Langkah-langkah memasak dari AI',
    },
  }, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'Recipes',
    underscored: true,
    updatedAt: false,
  });
  return Recipe;
};