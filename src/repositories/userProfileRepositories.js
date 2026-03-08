const BaseRepository = require('./baseRepositories');
const { UserProfile, User } = require('../models');

class UserProfileRepository extends BaseRepository {
    constructor() {
        super(UserProfile);
    }

    async findAllWithUser() {
        return await this.model.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] }
            }]
        });
    }

    async findByUserId(userId) {
        return await this.model.findOne({
            where: { userId },
            include: [{
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] }
            }]
        });
    }

    async findByIdWithUser(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] }
            }]
        });
    }

    async createProfile(profileData) {
        // Check if profile already exists for this user
        const existing = await this.model.findOne({
            where: { userId: profileData.userId }
        });
        if (existing) {
            throw new Error('Profile already exists for this user');
        }
        return await this.model.create(profileData);
    }

    async updateProfile(userId, profileData) {
        const [updatedRowsCount] = await this.model.update(profileData, {
            where: { userId }
        });
        
        if (updatedRowsCount === 0) {
            return null;
        }
        
        return await this.findByUserId(userId);
    }

    async deleteProfile(userId) {
        const deletedRowsCount = await this.model.destroy({
            where: { userId }
        });
        return deletedRowsCount > 0;
    }
}

module.exports = new UserProfileRepository();
