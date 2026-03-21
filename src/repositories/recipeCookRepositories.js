const BaseRepository = require('./baseRepositories');
const { RecipeCook, User, Recipe } = require('../models');

class RecipeCookRepository extends BaseRepository {
    constructor() {
        super(RecipeCook);
    }

    async findAllWithDetails() {
        return await this.model.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'username'] },
                { model: Recipe, as: 'recipe', attributes: ['id', 'name', 'photo_url'] }
            ],
            order: [['cooked_at', 'DESC']]
        });
    }

    async findByUserId(userId) {
        return await this.model.findAll({
            where: { userId },
            include: [
                { model: Recipe, as: 'recipe', attributes: ['id', 'name', 'photo_url'] }
            ],
            order: [['cooked_at', 'DESC']]
        });
    }

    async findByRecipeId(recipeId) {
        return await this.model.findAll({
            where: { recipeId },
            include: [
                { model: User, as: 'user', attributes: ['id', 'username'] }
            ],
            order: [['cooked_at', 'DESC']]
        });
    }

    async createCookLog(data, transaction = null) {
        const options = transaction ? { transaction } : {};
        return await this.model.create(data, options);
    }
}

module.exports = new RecipeCookRepository();
