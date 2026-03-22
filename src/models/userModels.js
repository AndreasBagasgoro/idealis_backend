'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Recipe, {
        foreignKey: 'userId',
        as: 'recipe'
      });

      User.hasMany(models.Ingredient, {
        foreignKey: 'userId',
        as: 'ingredient'
      });

      User.hasOne(models.UserProfile, {
        foreignKey: 'userId',
        as: 'profile'
      });

      User.hasMany(models.FavoriteRecipe, {
        foreignKey: 'userId',
        as: 'favoriteRecipes'
      });

      User.hasMany(models.RecipeCook, {
        foreignKey: 'userId',
        as: 'recipeCooks'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Token JWT untuk memperbarui access token sesi login',
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
  });
  return User;
};