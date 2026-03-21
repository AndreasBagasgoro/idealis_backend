const favoriteRecipeRepository = require('../repositories/favoriteRecipeRepositories');

const getAllFavorites = async () => {
    const favorites = await favoriteRecipeRepository.findAllFavorites();
    if (!favorites || favorites.length === 0) {
        throw new Error('Belum ada resep favorit yang didaftarkan');
    }
    return favorites;
};

const getUserFavorites = async (userId) => {
    const favorites = await favoriteRecipeRepository.findFavoritesByUserId(userId);
    if (!favorites || favorites.length === 0) {
        throw new Error('User ini belum memiliki resep favorit');
    }
    return favorites;
};

const addFavorite = async (data) => {
    if (!data.userId || !data.recipeId) {
        throw new Error('User ID dan Recipe ID wajib diisi');
    }
    
    // Check if it already exists to prevent duplicates
    const userFavorites = await favoriteRecipeRepository.findFavoritesByUserId(data.userId);
    const alreadyFavorited = userFavorites.find(fav => fav.recipeId === data.recipeId);
    
    if (alreadyFavorited) {
        throw new Error('Resep ini sudah ada di daftar favorit');
    }

    const newFavorite = await favoriteRecipeRepository.createFavorite(data);
    if (!newFavorite) {
        throw new Error('Gagal menambahkan ke daftar favorit');
    }
    return newFavorite;
};

const removeFavorite = async (id) => {
    const isDeleted = await favoriteRecipeRepository.removeFavorite(id);
    if (!isDeleted) {
        throw new Error('Gagal menghapus; Resep favorit tidak ditemukan');
    }
    return isDeleted;
};

module.exports = {
    getAllFavorites,
    getUserFavorites,
    addFavorite,
    removeFavorite
};
