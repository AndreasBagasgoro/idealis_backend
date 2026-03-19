'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {
        static associate(models) {
            UserProfile.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }
    
    UserProfile.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true,
        },
        height_cm: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        weight_kg: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'UserProfile',
        tableName: 'UserProfiles',
        underscored: true,
    });
    
    return UserProfile;
};