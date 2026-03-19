const { FavoriteRecipe, User, Recipe } = require('../models');

const favoriteRecipeController = {
    async getAllFavorites(req, res) {
        try {
            const favorites = await FavoriteRecipe.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
                    { model: Recipe, as: 'recipe' }
                ]
            });
            res.status(200).json({ success: true, data: favorites });
        } catch (error) {
            console.error('Error fetching favorites:', error);
            res.status(500).json({ success: false, message: 'Error fetching favorites', error: error.message });
        }
    },

    async getUserFavorites(req, res) {
        try {
            const { userId } = req.params;
            const favorites = await FavoriteRecipe.findAll({
                where: { user_id: userId },
                include: [{ model: Recipe, as: 'recipe' }]
            });
            res.status(200).json({ success: true, data: favorites });
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            res.status(500).json({ success: false, message: 'Error fetching user favorites', error: error.message });
        }
    },

    async addFavorite(req, res) {
        try {
            const { user_id, recipe_id } = req.body;
            const newFavorite = await FavoriteRecipe.create({ user_id, recipe_id });
            res.status(201).json({ success: true, message: 'Favorite added successfully', data: newFavorite });
        } catch (error) {
            console.error('Error adding favorite:', error);
            res.status(500).json({ success: false, message: 'Error adding favorite', error: error.message });
        }
    },

    async removeFavorite(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await FavoriteRecipe.destroy({ where: { id } });
            if (deletedRows === 0) {
                return res.status(404).json({ success: false, message: 'Favorite not found' });
            }
            res.status(200).json({ success: true, message: 'Favorite removed successfully' });
        } catch (error) {
            console.error('Error removing favorite:', error);
            res.status(500).json({ success: false, message: 'Error removing favorite', error: error.message });
        }
    }
};

module.exports = favoriteRecipeController;
