const BaseRepository = require('./baseRepositories');
const { Ingredient, Recipe } = require('../models');


class IngredientRepository extends BaseRepository {
    constructor() {
        super(Ingredient);
    }

    async findAllIngredient() {
        return await this.model.findAll({
            include: [{
                model: Recipe,
                as: 'recipes'
            }],
        });
    };

    async findIngredientById(id){
        return await this.model.findByPk(id,{
            include: [{
                model: Recipe,
                as: 'recipes'
            }]
        });
    }

    async createIngredient(ingredientData){
        return await this.model.create(ingredientData);
    }

    async updateIngredient(id, ingredientData){
        const [updateRowsCount] = await this.model.update(ingredientData, {
            where: { id }
        });

        if(updateRowsCount === 0){
            return null;
        }

        return await this.model.findByPk(id);
    }

    async deleteIngredient(id){
        const deletedRowsCount = await this.model.destroy({
            where: { id }
        });
        return deletedRowsCount > 0;
    }
}

module.exports = new IngredientRepository();

