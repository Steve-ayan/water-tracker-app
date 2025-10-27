// FILE: backend/controllers/authController.js

const { findUserByEmail, createUser } = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { email, password, first_name } = req.body;

    // Simple validation (Professional Practice)
    if (!email || !password || !first_name) {
        return res.status(400).json({ message: 'Please include email, password, and name.' });
    }

    try {
        // 1. Check if user already exists
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: 'User already exists with this email address.' });
        }

        // 2. Create user via the model (which handles hashing)
        const newUser = await createUser(email, password, first_name);

        // 3. Respond with success (Do NOT send the password hash back)
        res.status(201).json({
            user_id: newUser.user_id,
            email: newUser.email,
            first_name: newUser.first_name,
            message: 'Registration successful. User created.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

module.exports = {
    registerUser,
};