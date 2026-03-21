const UserRepository = require("../repositories/userRepositories");

const getAllUsers = async () => {
    const users = await UserRepository.findAllWithProfile();
    if (!users || users.length === 0) {
        throw new Error('Belum ada data user yang terdaftar');
    }
    return users;
};

const getUserById = async (id) => {
    const user = await UserRepository.findByIdWithProfile(id);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    return user;
};

const getUserByEmail = async (email) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
        throw new Error('User dengan email tersebut tidak ditemukan');
    }
    return user;
};

const getUserByUsername = async (username) => {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
        throw new Error('User dengan username tersebut tidak ditemukan');
    }
    return user;
};

const createUser = async (userData) => {
    if (!userData.username || !userData.email) {
        throw new Error('Username dan email wajib diisi');
    }

    const newUser = await UserRepository.createUser(userData);
    if (!newUser) {
        throw new Error('Gagal membuat user baru');
    }
    return newUser;
};

const updateUser = async (id, userData) => {
    const existing = await UserRepository.findById(id);
    if (!existing) {
        throw new Error('User yang ingin diubah tidak ditemukan');
    }
    
    const updatedUser = await UserRepository.updateUser(id, userData);
    if (!updatedUser) {
        throw new Error('Gagal memperbarui data user');
    }
    return updatedUser;
};

const deleteUser = async (id) => {
    const existing = await UserRepository.findById(id);
    if (!existing) {
        throw new Error('User tidak ditemukan');
    }
    
    const result = await UserRepository.deleteUser(id);
    if (!result) {
        throw new Error('Gagal menghapus user');
    }
    return result;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};