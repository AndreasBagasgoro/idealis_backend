const BaseRepository = require('./baseRepositories');
const { RecipeIngredient, Recipe, Ingredient } = require('../models');

class RecipeIngredientRepository extends BaseRepository {
    constructor() {
        super(RecipeIngredient);
    }

    async findByRecipeId(recipeId) {
        return await this.model.findAll({
            where: { recipeId },
            include: [
                {
                    model: Ingredient,
                    as: 'ingredient'
                }
            ]
        });
    }

    async findByRecipeAndIngredientId(recipeId, ingredientId) {
        return await this.model.findOne({
            where: { recipeId, ingredientId },
            include: [
                {
                    model: Ingredient,
                    as: 'ingredient'
                },
                {
                    model: Recipe,
                    as: 'recipe'
                }
            ]
        });
    }

    async addIngredientToRecipe(recipeId, ingredientId, quantity_needed, unit, ingredient_name = null) {
        return await this.model.create({
            recipeId,
            ingredientId,
            quantity_needed,
            unit,
            ingredient_name
        });
    }

    async removeIngredientFromRecipe(recipeId, ingredientId) {
        const deletedRowsCount = await this.model.destroy({
            where: { recipeId, ingredientId }
        });
        return deletedRowsCount > 0;
    }

    async updateIngredientInRecipe(recipeId, ingredientId, quantity_needed, unit, ingredient_name = null) {
        const [updatedRowsCount] = await this.model.update(
            { quantity_needed, unit, ingredient_name },
            { where: { recipeId, ingredientId } }
        );
        if (updatedRowsCount === 0) return null;
        return await this.findByRecipeAndIngredientId(recipeId, ingredientId);
    }
}

module.exports = new RecipeIngredientRepository();