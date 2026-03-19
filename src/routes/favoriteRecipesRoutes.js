const express = require('express');
const router = express.Router();
const favoriteRecipeController = require('../controllers/favoriteRecipeController');

/**
 * @swagger
 * /api/favorite-recipes:
 *   get:
 *     tags: Favorite Recipe
 *     summary: Get all favorite recipes
 *     description: Retrieve all favorite recipes across all users
 *     responses:
 *       200:
 *         description: List of favorite recipes
 */
router.get('/', favoriteRecipeController.getAllFavorites);

/**
 * @swagger
 * /api/favorite-recipes/user/{userId}:
 *   get:
 *     tags: Favorite Recipe
 *     summary: Get user favorite recipes
 *     description: Retrieve favorite recipes for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of user's favorite recipes
 */
router.get('/user/:userId', favoriteRecipeController.getUserFavorites);

/**
 * @swagger
 * /api/favorite-recipes:
 *   post:
 *     tags: Favorite Recipe
 *     summary: Add favorite recipe
 *     description: Mark a recipe as favorite for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - recipe_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               recipe_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Favorite added
 */
router.post('/', favoriteRecipeController.addFavorite);

/**
 * @swagger
 * /api/favorite-recipes/{id}:
 *   delete:
 *     tags: Favorite Recipe
 *     summary: Remove favorite recipe
 *     description: Remove a specific favorite entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Favorite removed
 */
router.delete('/:id', favoriteRecipeController.removeFavorite);

module.exports = router;
