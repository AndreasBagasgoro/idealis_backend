const recipeIngredientService = require('../services/recipeIngredientService');

const recipeIngredientController = {
    async getRecipeIngredients(req, res) {
        try {
            const { recipeId } = req.params;
            const ingredients = await recipeIngredientService.getRecipeIngredients(recipeId);
            res.status(200).json({
                success: true,
                data: ingredients
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching recipe ingredients',
                error: error.message
            });
        }
    },

    async addIngredientToRecipe(req, res) {
        try {
            const { recipeId } = req.params;
            const { ingredientId, quantity, unit } = req.body;
            const newEntry = await recipeIngredientService.addIngredientToRecipe(recipeId, ingredientId, quantity, unit);
            res.status(201).json({
                success: true,
                message: 'Ingredient added to recipe',
                data: newEntry
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async updateIngredientInRecipe(req, res) {
        try {
            const { recipeId, ingredientId } = req.params;
            const { quantity, unit } = req.body;
            const updated = await recipeIngredientService.updateIngredientInRecipe(recipeId, ingredientId, quantity, unit);
            res.status(200).json({
                success: true,
                message: 'Ingredient updated in recipe',
                data: updated
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async removeIngredientFromRecipe(req, res) {
        try {
            const { recipeId, ingredientId } = req.params;
            const deleted = await recipeIngredientService.removeIngredientFromRecipe(recipeId, ingredientId);
            res.status(200).json({
                success: true,
                message: 'Ingredient removed from recipe'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = recipeIngredientController;