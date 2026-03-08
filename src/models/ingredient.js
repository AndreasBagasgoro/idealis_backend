'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsToMany(models.Recipe,{
        through: models.RecipeIngredient,
        foreignKey: 'ingredientId',
        as: 'recipes'
      });
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    unit: DataTypes.STRING,
    expirationDate: DataTypes.DATEONLY,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};