'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove the old primary key and id column
    await queryInterface.removeColumn('Users', 'id');

    // 2. Add new UUID id column as primary key
    await queryInterface.addColumn('Users', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    });

    // 3. Rename existing columns to snake_case
    await queryInterface.renameColumn('Users', 'firstName', 'first_name');
    await queryInterface.renameColumn('Users', 'lastName', 'last_name');
    await queryInterface.renameColumn('Users', 'password', 'password_hash');
    await queryInterface.renameColumn('Users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Users', 'updatedAt', 'updated_at');

    // 4. Change column types and constraints
    await queryInterface.changeColumn('Users', 'first_name', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('Users', 'last_name', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('Users', 'password_hash', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    // 5. Add new columns
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      after: 'last_name',
    });

    await queryInterface.addColumn('Users', 'birth_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'height_cm', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'weight_kg', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove new columns
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'birth_date');
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'height_cm');
    await queryInterface.removeColumn('Users', 'weight_kg');

    // Rename columns back to camelCase
    await queryInterface.renameColumn('Users', 'first_name', 'firstName');
    await queryInterface.renameColumn('Users', 'last_name', 'lastName');
    await queryInterface.renameColumn('Users', 'password_hash', 'password');
    await queryInterface.renameColumn('Users', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Users', 'updated_at', 'updatedAt');

    // Change column types back
    await queryInterface.changeColumn('Users', 'firstName', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Users', 'lastName', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
    });

    // Restore original id column
    await queryInterface.removeColumn('Users', 'id');
    await queryInterface.addColumn('Users', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  }
};
