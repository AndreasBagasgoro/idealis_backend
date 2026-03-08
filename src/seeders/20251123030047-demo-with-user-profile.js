'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
// const user = require('../models/user');
// const userprofile = require('../models/userprofile');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];

    const salt = await bcrypt.genSalt(12);
    const hashedPassword  = await bcrypt.hash('rahasia123', salt);

    for (let i=0; i<20; i++){
      users.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Users', users);

    const usersFromDB = await queryInterface.sequelize.query(
      "SELECT id from Users ORDER BY id DESC LIMIT 20;"
    )

    const userRows = usersFromDB[0];
    const userProfiles = [];

    userRows.forEach(user =>{
      userProfiles.push({
        userId: user.id, // Sambungkan ID-nya
        birthDate: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
        gender: faker.helpers.arrayElement(['Laki-laki', 'Perempuan']),
        heightCm: faker.number.float({ min: 150, max: 190, precision: 0.1 }), // Tinggi random 150-190
        weightKg: faker.number.float({ min: 45, max: 90, precision: 0.1 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await queryInterface.bulkInsert('UserProfiles', userProfiles);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('UserProfiles', null, {});
    await queryInterface.bulkDelete('Users',{email: 'andreas@test.com'}, {});
  }
};
