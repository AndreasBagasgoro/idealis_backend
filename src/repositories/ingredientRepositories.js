const BaseRepository = require('./baseRepositories');
const { Ingredient, User, Recipe } = require('../models');
const { Op } = require('sequelize');

class IngredientRepository extends BaseRepository {
    constructor() {
        super(Ingredient);
    }

    async findAllWithCreator() {
        return await this.model.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username']
            }]
        });
    }

    async findByName(name) {
        return await this.model.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username']
            }]
        });
    }

    async findWithRecipes(id) {
        return await this.model.findByPk(id, {
            include: [
                {
                    model: Recipe,
                    as: 'recipe',
                    through: { attributes: ['amount', 'unit', 'notes'] }
                }
            ]
        });
    }

    async createIngredient(data, transaction = null) {
        const options = transaction ? { transaction } : {};
        return await this.model.create(data, options);
    }
}

module.exports = new IngredientRepository();
