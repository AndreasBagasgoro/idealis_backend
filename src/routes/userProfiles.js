const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get all user profiles
 *     description: Retrieve a list of all user profiles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user profiles
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
 *                     $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 */
router.get('/', userProfileController.getAllProfiles);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieve a single user profile by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', userProfileController.getProfileById);

/**
 * @swagger
 * /api/profiles/user/{userId}:
 *   get:
 *     summary: Get user profile by user ID
 *     description: Retrieve a user profile by the associated user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', userProfileController.getProfileByUserId);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new user profile
 *     description: Create a new user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - firstName
 *               - lastName
 *             properties:
 *               userId:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', userProfileController.createProfile);

/**
 * @swagger
 * /api/profiles/user/{userId}:
 *   put:
 *     summary: Update user profile
 *     description: Update an existing user profile by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.put('/user/:userId', userProfileController.updateProfile);

/**
 * @swagger
 * /api/profiles/user/{userId}:
 *   delete:
 *     summary: Delete user profile
 *     description: Delete a user profile by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
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
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/user/:userId', userProfileController.deleteProfile);

module.exports = router;