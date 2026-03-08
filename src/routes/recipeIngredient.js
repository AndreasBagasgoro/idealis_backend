const express = require('express');
const router = express.Router();
const recipeIngredientController = require('../controllers/recipeIngredientController');

/**
 * @swagger
 * /api/recipeIngredients/{recipeId}/ingredients:
 *   get:
 *     summary: Get ingredients for a recipe
 *     description: Retrieve all ingredients associated with a specific recipe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: List of recipe ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Recipe not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:recipeId/ingredients', recipeIngredientController.getRecipeIngredients);

/**
 * @swagger
 * /api/recipeIngredients/{recipeId}/ingredients:
 *   post:
 *     summary: Add ingredient to recipe
 *     description: Add an ingredient to a specific recipe with quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingredientId
 *               - quantity
 *             properties:
 *               ingredientId:
 *                 type: integer
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ingredient added to recipe successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RecipeIngredient'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Recipe or ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:recipeId/ingredients', recipeIngredientController.addIngredientToRecipe);

/**
 * @swagger
 * /api/recipeIngredients/{recipeId}/ingredients/{ingredientId}:
 *   put:
 *     summary: Update ingredient in recipe
 *     description: Update the quantity of an ingredient in a specific recipe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Recipe ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:recipeId/ingredients/:ingredientId', recipeIngredientController.updateIngredientInRecipe);

/**
 * @swagger
 * /api/recipeIngredients/{recipeId}/ingredients/{ingredientId}:
 *   delete:
 *     summary: Remove ingredient from recipe
 *     description: Remove an ingredient from a specific recipe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Recipe ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:recipeId/ingredients/:ingredientId', recipeIngredientController.removeIngredientFromRecipe);

module.exports = router;