const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth'); 
const {signup , login, getProfile, updateProfile} = require('../controllers/userController');
const router = express.Router();

// Signup route with validation
router.post(
    '/signup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    signup
);

// Login route with validation
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    login
);

// Get user profile (Protected)
router.get('/profile', auth, getProfile);

// Update user profile (Protected)
router.put('/profile', auth, updateProfile);

module.exports = router;
