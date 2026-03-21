const recipeCookRepository = require('../repositories/recipeCookRepositories');

const getAllCookLogs = async () => {
    const logs = await recipeCookRepository.findAllWithDetails();
    if (!logs || logs.length === 0) {
        throw new Error('Belum ada log resep yang dimasak');
    }
    return logs;
};

const getCookLogsByUser = async (userId) => {
    const logs = await recipeCookRepository.findByUserId(userId);
    if (!logs || logs.length === 0) {
        throw new Error('User ini belum pernah memasak resep');
    }
    return logs;
};

const getCookLogsByRecipe = async (recipeId) => {
    const logs = await recipeCookRepository.findByRecipeId(recipeId);
    if (!logs || logs.length === 0) {
        throw new Error('Resep ini belum pernah dimasak');
    }
    return logs;
};

const recordCookLog = async (data) => {
    if (!data.userId || !data.recipeId || !data.servings_cooked) {
        throw new Error('User ID, Recipe ID, dan porsi yang dimasak (servings_cooked) wajib diisi');
    }

    const newLog = await recipeCookRepository.createCookLog(data);
    if (!newLog) {
        throw new Error('Gagal mencatat log masakan');
    }
    return newLog;
};

module.exports = {
    getAllCookLogs,
    getCookLogsByUser,
    getCookLogsByRecipe,
    recordCookLog
};
