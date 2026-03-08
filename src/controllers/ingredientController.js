const ingredientService = require('../services/ingredientService');

const ingredientController = {

    async getAllIngredient(req, res){
        try {
            const ingredient = await ingredientService.getAllIngredient();
            res.status(200).json({
                success: true,
                data: ingredient
            });
        } catch (error) {
            console.error('Error fetching ingredient: ', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching ingredient',
                error: error.message
            });
        }
    },

    async getIngredientById(req, res){
        try {
            const { id } = req.params;
            const ingredient = await ingredientService.getIngredientById(id);

            if(!ingredient){
                return res.status(404).json({
                    success: false,
                    message: 'Ingredient not found'
                });
            }

            res.status(200).json({
                success: true,
                data: ingredient
            })
        } catch (error) {
            console.error('Error fetching ingredient: ', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching ingredient',
                error: error.message
            });
        }
    },

    async createIngredient(req, res){
        try {
            const ingredientData = req.body;
            const newIngredient = await ingredientService.createIngredient(ingredientData);
            
            res.status(201).json({
                success: true,
                message: 'Berhasil membuat ingredient',
                data: newIngredient
            });
        } catch (error) {
            console.error('Error creating ingredient: ', error);
            res.status(500).json({
                success: false,
                message: 'Error creating ingredient',
                error: error.message
            });
        }
    },

    async updateIngredient(req, res){
        try {
            const { id } = req.params;
            const ingredientData = req.body;
            const updateIngredient = await ingredientService.updateIngredient(id, ingredientData);

            if(!updateIngredient){
                return res.status(404).json({
                    success: false,
                    message: 'Ingredient tidak ditemukan'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Berhasil memperbarui ingredient',
                data: updateIngredient
            })
        } catch (error) {
            console.error('Gagal memperbaruiingredient: ', error);
            res.status(500).json({
                success: false,
                message: 'Gagal memperbarui ingredient',
                error: error.message
            });
        }
    },

    async deleteIngredient(req, res){
        try {
            const { id } = req.params;
            const deletedIngredient = await ingredientService.deleteIngredient(id);

            if(!deletedIngredient){
                return res.status(404).json({
                    success: false,
                    message: 'Ingredient tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus ingredient',
            })
        } catch (error) {
            console.error('Gagal menghapus ingredient: ', error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus ingredient',
                error: error.message
            });
        }
    }

}

module.exports = ingredientController;