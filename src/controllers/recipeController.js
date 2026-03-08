const recipeService = require('../services/recipeService');

const recipeController = {
    async getAllRecipes(req, res) {
        try {
            const recipes = await recipeService.getAllRecipes();
            res.status(200).json({
                success: true,
                data: recipes
            });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching recipes',
                error: error.message
            });
        }
    },

    async getRecipeById(req, res) {
        try {
            const { id } = req.params;
            const recipe = await recipeService.getRecipeById(id);

            if (!recipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Recipe not found'
                });
            }

            res.status(200).json({
                success: true,
                data: recipe
            });
        } catch (error) {
            console.error('Error fetching recipe:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching recipe',
                error: error.message
            });
        }
    },

    async getRecipesByUserId(req, res) {
        try {
            const { userId } = req.params;
            const recipes = await recipeService.getRecipesByUserId(userId);

            res.status(200).json({
                success: true,
                data: recipes
            });
        } catch (error) {
            console.error('Error fetching recipes by user:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching recipes by user',
                error: error.message
            });
        }
    },

    async createRecipe(req, res) {
        try {
            const recipeData = req.body;
            const newRecipe = await recipeService.createRecipe(recipeData);

            res.status(201).json({
                success: true,
                message: 'Recipe created successfully',
                data: newRecipe
            });
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating recipe',
                error: error.message
            });
        }
    },

    async updateRecipe(req, res) {
        try {
            const { id } = req.params;
            const recipeData = req.body;
            const updatedRecipe = await recipeService.updateRecipe(id, recipeData);

            if (!updatedRecipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Recipe not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Recipe updated successfully',
                data: updatedRecipe
            });
        } catch (error) {
            console.error('Error updating recipe:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating recipe',
                error: error.message
            });
        }
    },

    async deleteRecipe(req, res) {
        try {
            const { id } = req.params;
            const deleted = await recipeService.deleteRecipe(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Recipe not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Recipe deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting recipe',
                error: error.message
            });
        }
    }
};

module.exports = recipeController;