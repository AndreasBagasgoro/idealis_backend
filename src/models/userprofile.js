'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  UserProfile.init({
    userId: DataTypes.INTEGER,
    birthDate: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    heightCm: DataTypes.FLOAT,
    weightKg: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};