const UserProfileRepository = require('../repositories/userProfileRepositories');
const UserRepository = require('../repositories/userRepositories');

const getAllProfiles = async () => {
    return await UserProfileRepository.findAllWithUser();
};

const getProfileByUserId = async (userId) => {
    // Validate user exists
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    const profile = await UserProfileRepository.findByUserId(userId);
    if (!profile) {
        throw new Error('Profile not found for this user');
    }
    return profile;
};

const getProfileById = async (id) => {
    const profile = await UserProfileRepository.findByIdWithUser(id);
    if (!profile) {
        throw new Error('Profile not found');
    }
    return profile;
};

const createProfile = async (profileData) => {
    // Validate user exists
    const user = await UserRepository.findById(profileData.userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    return await UserProfileRepository.createProfile(profileData);
};

const updateProfile = async (userId, profileData) => {
    // Validate user exists
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    const updated = await UserProfileRepository.updateProfile(userId, profileData);
    if (!updated) {
        throw new Error('Profile not found for this user');
    }
    return updated;
};

const deleteProfile = async (userId) => {
    // Validate user exists
    const user = await UserRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    const deleted = await UserProfileRepository.deleteProfile(userId);
    if (!deleted) {
        throw new Error('Profile not found for this user');
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