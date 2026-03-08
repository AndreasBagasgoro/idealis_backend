const UserRepository = require("../repositories/userRepositories")


const getAllUsers = async () => {
    const user = await UserRepository.findAllWithProfile();
    return user;
};

const getUserById = async (id) => {
    const user = await UserRepository.findByIdWithProfile(id);
    return user;
};

const createUser = async (userData) => {
    const user = await UserRepository.createUser(userData);
    return user;
}

const updateUser = async (id, userData) => {
    const user = await UserRepository.updateUser(id, userData);
    return user;
}

const deleteUser = async (id) => {
    const result = await UserRepository.deleteUser(id);
    return result;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}