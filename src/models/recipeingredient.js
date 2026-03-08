'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    static associate(models) {
    
      RecipeIngredient.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipe'
      });
      
      RecipeIngredient.belongsTo(models.Ingredient, {
        foreignKey: 'ingredientId',
        as: 'ingredient'
      });
    }
  }
  RecipeIngredient.init({
    recipeId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
  });
  return RecipeIngredient;
};