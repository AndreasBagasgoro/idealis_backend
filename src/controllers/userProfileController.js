const userProfileService = require('../services/userProfileService');

const userProfileController = {
    async getAllProfiles(req, res) {
        try {
            const profiles = await userProfileService.getAllProfiles();
            res.status(200).json({
                success: true,
                data: profiles
            });
        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching profiles',
                error: error.message
            });
        }
    },

    async getProfileByUserId(req, res) {
        try {
            const { userId } = req.params;
            const profile = await userProfileService.getProfileByUserId(userId);
            res.status(200).json({
                success: true,
                data: profile
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    },

    async getProfileById(req, res) {
        try {
            const { id } = req.params;
            const profile = await userProfileService.getProfileById(id);
            res.status(200).json({
                success: true,
                data: profile
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    },

    async createProfile(req, res) {
        try {
            const profileData = req.body;
            const newProfile = await userProfileService.createProfile(profileData);
            res.status(201).json({
                success: true,
                message: 'Profile created successfully',
                data: newProfile
            });
        } catch (error) {
            const statusCode = error.message.includes('already exists') ? 409 : 
                               error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    },

    async updateProfile(req, res) {
        try {
            const { userId } = req.params;
            const profileData = req.body;
            const updatedProfile = await userProfileService.updateProfile(userId, profileData);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    },

    async deleteProfile(req, res) {
        try {
            const { userId } = req.params;
            await userProfileService.deleteProfile(userId);
            res.status(200).json({
                success: true,
                message: 'Profile deleted successfully'
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = userProfileController;