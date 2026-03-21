const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

// GET all profiles
router.get('/', userProfileController.getAllProfiles);

// GET profile by Profile ID
router.get('/:id', userProfileController.getProfileById);

// GET profile by User ID 
router.get('/user/:userId', userProfileController.getProfileByUserId);

// POST create new profile
router.post('/', userProfileController.createProfile);

// PUT update profile by User ID
router.put('/user/:userId', userProfileController.updateProfile);

// DELETE profile by User ID
router.delete('/user/:userId', userProfileController.deleteProfile);

module.exports = router;
