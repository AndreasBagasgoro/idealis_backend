'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeCook extends Model {
    static associate(models) {
      RecipeCook.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      RecipeCook.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipe'
      });
    }
  }

  RecipeCook.init({
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
    servings_cooked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RecipeCook',
    tableName: 'RecipeCooks',
    underscored: true,
    updatedAt: false,
    createdAt: 'cooked_at',
  });
  return RecipeCook;
};
