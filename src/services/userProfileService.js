const UserProfileRepository = require('../repositories/userProfileRepositories');
const UserRepository = require('../repositories/userRepositories');

const getAllProfiles = async () => {
    const profiles = await UserProfileRepository.findAllWithUser();
    if (!profiles || profiles.length === 0) {
        throw new Error('Belum ada data profil user');
    }
    return profiles;
};

const getProfileByUserId = async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    
    const profile = await UserProfileRepository.findByUserId(userId);
    if (!profile) {
        throw new Error('Profil untuk user ini tidak ditemukan');
    }
    return profile;
};

const getProfileById = async (id) => {
    const profile = await UserProfileRepository.findByIdWithUser(id);
    if (!profile) {
        throw new Error('Profil tidak ditemukan');
    }
    return profile;
};

const createProfile = async (profileData) => {
    const user = await UserRepository.findById(profileData.userId);
    if (!user) {
        throw new Error('User tidak ditemukan, tidak bisa membuat profil');
    }
    
    // Check if profile already exists for this user
    const existing = await UserProfileRepository.findByUserId(profileData.userId);
    if (existing) {
        throw new Error('Profil untuk user ini sudah ada');
    }
    
    const newProfile = await UserProfileRepository.createProfile(profileData);
    if (!newProfile) {
        throw new Error('Gagal membuat profil baru');
    }
    return newProfile;
};

const updateProfile = async (userId, profileData) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    
    const updated = await UserProfileRepository.updateProfile(userId, profileData);
    if (!updated) {
        throw new Error('Gagal memperbarui profil; Profil tidak ditemukan');
    }
    return updated;
};

const deleteProfile = async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    
    const deleted = await UserProfileRepository.deleteProfile(userId);
    if (!deleted) {
        throw new Error('Gagal menghapus; Profil tidak ditemukan');
    }
    return deleted;
};

module.exports = {
    getAllProfiles,
    getProfileByUserId,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
};