const recipeRepositories = require('../repositories/recipeRepositories');

const getAllRecipes = async () => {
    const recipes = await recipeRepositories.findAllRecipes();
    if (!recipes || recipes.length === 0) {
        throw new Error('Data recipes belum ada');
    }
    return recipes;
};

const getRecipeById = async (id) => {
    const recipe = await recipeRepositories.findRecipeById(id);
    if (!recipe) {
        throw new Error('Recipe tidak ditemukan');
    }
    return recipe;
};

const getRecipesByUserId = async (userId) => {
    const recipes = await recipeRepositories.findRecipesByUserId(userId);
    if (!recipes || recipes.length === 0) {
        throw new Error('User belum memiliki resep');
    }
    return recipes;
};

const createRecipe = async (recipeData) => {
    if (!recipeData.name || !recipeData.user_id) {
        throw new Error('Nama dan Id User wajib diisi untuk membuat resep');
    }
    
    const newRecipe = await recipeRepositories.createRecipe(recipeData);
    if (!newRecipe) {
        throw new Error('Gagal membuat resep baru');
    }
    
    return newRecipe;
};

const updateRecipe = async (id, recipeData) => {
    const existingRecipe = await recipeRepositories.findRecipeById(id);
    if (!existingRecipe) {
        throw new Error('Resep yang ingin diubah tidak ditemukan');
    }
    
    const updatedRecipe = await recipeRepositories.updateRecipe(id, recipeData);
    if (!updatedRecipe) {
        throw new Error('Gagal memperbarui resep');
    }
    
    return updatedRecipe;
};

const deleteRecipe = async (id) => {
    const existingRecipe = await recipeRepositories.findRecipeById(id);
    if (!existingRecipe) {
        throw new Error('Recipe yang ingin dihapus tidak ditemukan');
    }
    
    const isDeleted = await recipeRepositories.deleteRecipe(id);
    if (!isDeleted) {
        throw new Error('Gagal menghapus recipe');
    }
    
    return isDeleted;
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    getRecipesByUserId,
    createRecipe,
    updateRecipe,
    deleteRecipe
};