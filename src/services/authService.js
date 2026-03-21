const UserRepository = require('../repositories/userRepositories');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepositories = require('../repositories/userRepositories');

const registerUser = async(userData) => {
    const existingUser = userRepositories.findByEmail(userData.email);
    if(existingUser) throw new error("Email sudah digunakan");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userRepositories.createUser({ ...userData, password: hashedPassword});

    return newUser;
}

const loginUser = async(email, password) => {
    const user = await userRepositories.findByEmail(email);
    if(!user) throw new error("Email/Password tidak valid");

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if(!isPasswordValid) throw new error("Email/Password tidak valid");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { user, token };
}
module.exports = {
    registerUser,
    loginUser
}
