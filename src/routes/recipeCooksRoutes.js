const express = require('express');
const router = express.Router();
const recipeCookController = require('../controllers/recipeCookController');

/**
 * @swagger
 * /api/recipe-cooks:
 *   get:
 *     summary: Get all recipe cook records
 *     description: Retrieve all recorded recipe cooks across all users
 *     responses:
 *       200:
 *         description: List of recipe cook records
 */
router.get('/', recipeCookController.getAllCooks);

/**
 * @swagger
 * /api/recipe-cooks/user/{userId}:
 *   get:
 *     summary: Get user recipe cook records
 *     description: Retrieve recipe cooks for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of user's recipe cook records
 */
router.get('/user/:userId', recipeCookController.getUserCooks);

/**
 * @swagger
 * /api/recipe-cooks:
 *   post:
 *     summary: Record recipe cook
 *     description: Record that a user cooked a recipe
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
 *               servings_cooked:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Recipe cook recorded
 */
router.post('/', recipeCookController.recordCook);

/**
 * @swagger
 * /api/recipe-cooks/{id}:
 *   delete:
 *     summary: Remove recipe cook record
 *     description: Remove a specific recipe cook entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Recipe cook record removed
 */
router.delete('/:id', recipeCookController.removeCook);

module.exports = router;
