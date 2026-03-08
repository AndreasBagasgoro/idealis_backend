const RecipeIngredientRepository = require('../repositories/recipeIngredientRepositories');

const getRecipeIngredients = async (recipeId) => {
    return await RecipeIngredientRepository.findByRecipeId(recipeId);
};

const addIngredientToRecipe = async (recipeId, ingredientId, quantity, unit) => {
    // Validasi: Pastikan recipe dan ingredient ada
    const existing = await RecipeIngredientRepository.findByRecipeAndIngredientId(recipeId, ingredientId);
    if (existing) throw new Error('Ingredient already added to recipe');
    
    return await RecipeIngredientRepository.addIngredientToRecipe(recipeId, ingredientId, quantity, unit);
};

const updateIngredientInRecipe = async (recipeId, ingredientId, quantity, unit) => {
    const updated = await RecipeIngredientRepository.updateIngredientInRecipe(recipeId, ingredientId, quantity, unit);
    if (!updated) throw new Error('Recipe ingredient not found');
    return updated;
};

const removeIngredientFromRecipe = async (recipeId, ingredientId) => {
    const deleted = await RecipeIngredientRepository.removeIngredientFromRecipe(recipeId, ingredientId);
    if (!deleted) throw new Error('Recipe ingredient not found');
    return deleted;
};

module.exports = {
    getRecipeIngredients,
    addIngredientToRecipe,
    updateIngredientInRecipe,
    removeIngredientFromRecipe
};