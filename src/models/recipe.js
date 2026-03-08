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
    }
  }
  
  Recipe.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    calories: DataTypes.FLOAT,
    protein: DataTypes.FLOAT,
    fat: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    tastePreference: DataTypes.STRING,
    dietTarget: DataTypes.STRING,
    steps: DataTypes.JSON,
    spices: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};