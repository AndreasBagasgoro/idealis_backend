'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteRecipe extends Model {
    static associate(models) {
      FavoriteRecipe.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      FavoriteRecipe.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipe'
      });
    }
  }

  FavoriteRecipe.init({
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
    recipe_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'FavoriteRecipe',
    tableName: 'FavoriteRecipes',
    underscored: true,
    updatedAt: false,
  });
  return FavoriteRecipe;
};
