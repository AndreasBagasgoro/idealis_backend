const recipeIngredientRepository = require('../repositories/recipeIngredientRepositories');
const recipeRepository = require('../repositories/recipeRepositories');
const ingredientRepository = require('../repositories/ingredientRepositories');

const getRecipeIngredients = async (recipeId) => {
    const ingredients = await recipeIngredientRepository.findByRecipeId(recipeId);
    if (!ingredients || ingredients.length === 0) {
        throw new Error('Resep ini belum memiliki komposisi bahan');
    }
    return ingredients;
};

const getSpecificIngredient = async (recipeId, ingredientId) => {
    const ingredient = await recipeIngredientRepository.findByRecipeAndIngredientId(recipeId, ingredientId);
    if (!ingredient) {
        throw new Error('Bahan tersebut tidak ditemukan di dalam resep ini');
    }
    return ingredient;
};

const addIngredientToRecipe = async (recipeId, ingredientId, quantity_needed, unit, ingredient_name = null) => {
    // Validasi: Pastikan recipe dan ingredient referensi ada jika diperlukan, tapi error DB akan menangkapnya juga
    const existing = await recipeIngredientRepository.findByRecipeAndIngredientId(recipeId, ingredientId);
    if (existing) {
        throw new Error('Bahan ini sudah ada di dalam resep');
    }
    
    const newAddition = await recipeIngredientRepository.addIngredientToRecipe(recipeId, ingredientId, quantity_needed, unit, ingredient_name);
    if (!newAddition) {
        throw new Error('Gagal menambahkan bahan ke dalam resep');
    }
    return newAddition;
};

const updateIngredientInRecipe = async (recipeId, ingredientId, quantity_needed, unit, ingredient_name = null) => {
    const updated = await recipeIngredientRepository.updateIngredientInRecipe(recipeId, ingredientId, quantity_needed, unit, ingredient_name);
    if (!updated) {
        throw new Error('Gagal memperbarui; Bahan tidak ditemukan di dalam resep');
    }
    return updated;
};

const removeIngredientFromRecipe = async (recipeId, ingredientId) => {
    const deleted = await recipeIngredientRepository.removeIngredientFromRecipe(recipeId, ingredientId);
    if (!deleted) {
        throw new Error('Gagal menghapus; Bahan tidak ditemukan di dalam resep');
    }
    return deleted;
};

module.exports = {
    getRecipeIngredients,
    getSpecificIngredient,
    addIngredientToRecipe,
    updateIngredientInRecipe,
    removeIngredientFromRecipe
};