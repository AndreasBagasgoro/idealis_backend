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
                attributes: { exclude: ['password']}
        });
    };

    async findByIdWithProfile(id){
        return await this.model.findByPk(id,{
            include: [{
                    model: UserProfile,
                    as: 'profile'
                }],
                attributes: { exclude: ['password']}
        });
    };

    async createUser(userData){
        return await this.model.create(userData);
    }

    async updateUser(id, userData){
        const [updatedRowsCount] = await this.model.update(userData, {
            where: { id}
        });

        if (updatedRowsCount === 0){
            return null;
        }

        return await this.findByIdWithProfile(id);
    }

    async deleteUser(id){
        const deleteRowsCount = await this.model.destroy({
            where: { id }
        });
        return deleteRowsCount > 0;
    }
}

module.exports = new UserRepository();