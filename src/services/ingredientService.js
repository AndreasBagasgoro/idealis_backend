const ingredientRepository = require('../repositories/ingredientRepositories');

const getAllIngredient = async () => {
    const ingredients = await ingredientRepository.findAllWithCreator();
    if (!ingredients || ingredients.length === 0) {
        throw new Error('Data bahan/ingredient belum ada');
    }
    return ingredients;
};

const getIngredientById = async (id) => {
    const ingredient = await ingredientRepository.findWithRecipes(id);
    if (!ingredient) {
        throw new Error('Bahan tidak ditemukan');
    }
    return ingredient;
};

const searchIngredientByName = async (name) => {
    if (!name) throw new Error('Query nama dibutuhkan');
    const ingredients = await ingredientRepository.findByName(name);
    if (!ingredients || ingredients.length === 0) {
        throw new Error('Bahan dengan keyword tersebut tidak ditemukan');
    }
    return ingredients;
};

const createIngredient = async (ingredientData) => {
    if (!ingredientData.name || !ingredientData.user_id || !ingredientData.quantity || !ingredientData.unit) {
        throw new Error('Lengkapi data pembuatan ingredient: name, user_id, quantity, dan unit wajib ada');
    }
    
    // Perbaikan: pakai fungsi spesifik di repo
    const newIngredient = await ingredientRepository.createIngredient(ingredientData);
    if (!newIngredient) {
        throw new Error('Gagal menambahkan bahan ke sistem');
    }
    return newIngredient;
};

const updateIngredient = async (id, ingredientData) => {
    // Cek keberadaan dulu karena parameter menggunakan base repository "update" yang melempar exception murni
    const existing = await ingredientRepository.findById(id);
    if (!existing) {
        throw new Error('Bahan yang ingin diubah tidak ditemukan');
    }

    try {
        const updatedIngredient = await ingredientRepository.update(id, ingredientData);
        return updatedIngredient;
    } catch (error) {
        throw new Error(error.message || 'Gagal memperbarui data bahan');
    }
};

const deleteIngredient = async (id) => {
    const existing = await ingredientRepository.findById(id);
    if (!existing) {
        throw new Error('Bahan yang ingin dihapus tidak ditemukan');
    }

    try {
        const result = await ingredientRepository.delete(id);
        return result;
    } catch (error) {
        throw new Error(error.message || 'Gagal menghapus data bahan');
    }
};

module.exports = {
    getAllIngredient,
    getIngredientById,
    searchIngredientByName,
    createIngredient,
    updateIngredient,
    deleteIngredient
};