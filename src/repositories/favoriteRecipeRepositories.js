const BaseRepository = require('./baseRepositories');
const { FavoriteRecipe, User, Recipe } = require('../models');

class FavoriteRecipeRepository extends BaseRepository {
    constructor() {
        super(FavoriteRecipe);
    }

    async findAllFavorites() {
        return await this.model.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'username'] },
                { model: Recipe, as: 'recipe', attributes: ['id', 'name', 'photo_url'] }
            ]
        });
    }

    async findFavoritesByUserId(userId) {
        return await this.model.findAll({
            where: { userId },
            include: [
                { model: Recipe, as: 'recipe' }
            ]
        });
    }

    async createFavorite(data, transaction = null) {
        const options = transaction ? { transaction } : {};
        return await this.model.create(data, options);
    }

    async removeFavorite(id, transaction = null) {
        const options = transaction ? { where: { id }, transaction } : { where: { id } };
        const deletedRowsCount = await this.model.destroy(options);
        return deletedRowsCount > 0;
    }
}

module.exports = new FavoriteRecipeRepository();
