const { RecipeCook, User, Recipe } = require('../models');

const recipeCookController = {
    async getAllCooks(req, res) {
        try {
            const cooks = await RecipeCook.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
                    { model: Recipe, as: 'recipe' }
                ]
            });
            res.status(200).json({ success: true, data: cooks });
        } catch (error) {
            console.error('Error fetching recipe cooks:', error);
            res.status(500).json({ success: false, message: 'Error fetching recipe cooks', error: error.message });
        }
    },

    async getUserCooks(req, res) {
        try {
            const { userId } = req.params;
            const cooks = await RecipeCook.findAll({
                where: { user_id: userId },
                include: [{ model: Recipe, as: 'recipe' }]
            });
            res.status(200).json({ success: true, data: cooks });
        } catch (error) {
            console.error('Error fetching user recipe cooks:', error);
            res.status(500).json({ success: false, message: 'Error fetching user recipe cooks', error: error.message });
        }
    },

    async recordCook(req, res) {
        try {
            const { user_id, recipe_id, servings_cooked } = req.body;
            const newCook = await RecipeCook.create({ 
                user_id, 
                recipe_id, 
                servings_cooked: servings_cooked || 1 
            });
            res.status(201).json({ success: true, message: 'Recipe cook recorded successfully', data: newCook });
        } catch (error) {
            console.error('Error recording recipe cook:', error);
            res.status(500).json({ success: false, message: 'Error recording recipe cook', error: error.message });
        }
    },

    async removeCook(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await RecipeCook.destroy({ where: { id } });
            if (deletedRows === 0) {
                return res.status(404).json({ success: false, message: 'Recipe cook record not found' });
            }
            res.status(200).json({ success: true, message: 'Recipe cook record removed successfully' });
        } catch (error) {
            console.error('Error removing recipe cook record:', error);
            res.status(500).json({ success: false, message: 'Error removing recipe cook record', error: error.message });
        }
    }
};

module.exports = recipeCookController;
