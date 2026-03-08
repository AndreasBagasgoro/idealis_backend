const IngredientRepository = require('../repositories/ingredientRepositories');

const getAllIngredient = async () => {
    const ingredient = await IngredientRepository.findAllIngredient();
    return ingredient;
}

const getIngredientById = async (id) => {
    const ingredient = await IngredientRepository.findIngredientById(id);
    return ingredient;
}

const createIngredient = async (ingredientData) => {
    const ingredient = await IngredientRepository.createIngredient(ingredientData);
    return ingredient;
}

const updateIngredient = async (id, ingredientData) => {
    const ingredient = await IngredientRepository.updateIngredient(id, ingredientData);
    return ingredient;
}

const deleteIngredient = async (id) => {
    const result = await IngredientRepository.deleteIngredient(id);
    return result;
}

module.exports = {
    getAllIngredient,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}