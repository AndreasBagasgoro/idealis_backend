const RecipeRepository = require('../repositories/recipeRepositories');

const getAllRecipes = async () => {
    const recipe = await RecipeRepository.findAllRecipes();
    return recipe;
};

const getRecipeById = async (id) => {
    const recipe = await RecipeRepository.findRecipeById(id);
    return recipe;
};

const getRecipesByUserId = async (userId) => {
    const recipes = await RecipeRepository.findRecipesByUserId(userId);
    return recipes;
};

const createRecipe = async (recipeData) => {
    const recipe = await RecipeRepository.createRecipe(recipeData);
    return recipe;
};

const updateRecipe = async (id, recipeData) => {
    const recipe = await RecipeRepository.updateRecipe(id, recipeData);
    return recipe;
};

const deleteRecipe = async (id) => {
    const result = await RecipeRepository.deleteRecipe(id);
    return result;
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    getRecipesByUserId,
    createRecipe,
    updateRecipe,
    deleteRecipe
};