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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    ingredient_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Ingredients',
        key: 'id',
      },
    },
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Fallback jika bahan tidak ada di inventaris',
    },
    quantity_needed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
    tableName: 'RecipeIngredients',
    underscored: true,
    timestamps: false,
  });
  return RecipeIngredient;
};
