const BaseRepository = require('./baseRepositories');
const { User, UserProfile } = require('../models');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findAllWithProfile() {
        return await this.model.findAll({
            include: [{
                model: UserProfile,
                as: 'profile'
            }],
            attributes: { exclude: ['password_hash'] }
        });
    }

    async findByIdWithProfile(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: UserProfile,
                as: 'profile'
            }],
            attributes: { exclude: ['password_hash'] }
        });
    }

    async findByEmail(email) {
        return await this.model.findOne({
            where: { email },
            include: [{
                model: UserProfile,
                as: 'profile'
            }]
        });
    }

    async findByUsername(username) {
        return await this.model.findOne({
            where: { username },
            include: [{
                model: UserProfile,
                as: 'profile'
            }]
        });
    }

    async findByRefreshToken(refreshToken) {
        return await this.model.findOne({
            where: { refresh_token: refreshToken }
        });
    }

    async updateRefreshToken(id, refreshToken, transaction = null) {
        const options = transaction ? { where: { id }, transaction } : { where: { id } };
        return await this.model.update({ refresh_token: refreshToken }, options);
    }

    async createUser(userData, transaction = null) {
        const options = transaction ? { transaction } : {};
        return await this.model.create(userData, options);
    }

    async updateUser(id, userData, transaction = null) {
        const options = transaction ? { where: { id }, transaction } : { where: { id } };
        const [updatedRowsCount] = await this.model.update(userData, options);

        if (updatedRowsCount === 0) {
            return null;
        }

        return await this.findByIdWithProfile(id);
    }

    async deleteUser(id, transaction = null) {
        const options = transaction ? { where: { id }, transaction } : { where: { id } };
        const deleteRowsCount = await this.model.destroy(options);
        return deleteRowsCount > 0;
    }
}

module.exports = new UserRepository();