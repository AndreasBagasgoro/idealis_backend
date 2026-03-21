const ingredientRepositories = require('../repositories/ingredientRepositories');

const getAllIngredient = async () => {
    const existingIngredien = await ingredientRepositories.findAllIngredient();
    if(!existingIngredien || existingIngredien.length === 0){
        throw new Error('Data ingredient belum ada');
    }
    return existingIngredien;
}

const getIngredientById = async (id) => {
    const ingredient = await ingredientRepositories.findIngredientById(id);
    return ingredient;
}

const createIngredient = async (ingredientData) => {
    const ingredient = await ingredientRepositories.createIngredient(ingredientData);
    return ingredient;
}

const updateIngredient = async (id, ingredientData) => {
    const ingredient = await ingredientRepositories.updateIngredient(id, ingredientData);
    return ingredient;
}

const deleteIngredient = async (id) => {
    const result = await ingredientRepositories.deleteIngredient(id);
    return result;
}

module.exports = {
    getAllIngredient,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}