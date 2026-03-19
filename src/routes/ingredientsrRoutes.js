const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     description: Retrieve a list of all ingredients
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ingredients
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
 *                     $ref: '#/components/schemas/Ingredient'
 *       401:
 *         description: Unauthorized
 */
router.get('/', ingredientController.getAllIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get ingredient by ID
 *     description: Retrieve a single ingredient by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ingredient ID (UUID)
 *     responses:
 *       200:
 *         description: Ingredient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', ingredientController.getIngredientById);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     description: Create a new ingredient
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - name
 *               - category
 *               - quantity
 *               - unit
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *                 maxLength: 150
 *               icon:
 *                 type: string
 *                 maxLength: 255
 *               category:
 *                 type: string
 *                 enum: [protein, carbohydrate, vegetable, fruit, dairy]
 *               quantity:
 *                 type: number
 *                 format: float
 *               unit:
 *                 type: string
 *                 maxLength: 50
 *               expired_at:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', ingredientController.createIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     summary: Update ingredient
 *     description: Update an existing ingredient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ingredient ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 150
 *               icon:
 *                 type: string
 *                 maxLength: 255
 *               category:
 *                 type: string
 *                 enum: [protein, carbohydrate, vegetable, fruit, dairy]
 *               quantity:
 *                 type: number
 *                 format: float
 *               unit:
 *                 type: string
 *                 maxLength: 50
 *               expired_at:
 *                 type: string
 *                 format: date
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
 *                   $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', ingredientController.updateIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Delete ingredient
 *     description: Delete an ingredient by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ingredient ID (UUID)
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
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
 *         description: Ingredient not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;