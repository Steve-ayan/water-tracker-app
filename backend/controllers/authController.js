// FILE: backend/controllers/authController.js (CLEAN FINAL VERSION)

const { findUserByEmail, createUser } = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Needed to compare passwords
const generateToken = require('../utils/generateToken'); // Necessary for Login

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
            // NOTE: Token could be generated here, but we'll stick to login for now
            message: 'Registration successful. User created.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Check for user existence
    const user = await findUserByEmail(email);

    // 2. If user exists, check password validity
    if (user && (await bcrypt.compare(password, user.password_hash))) {
        // Password is correct! Issue a token.
        res.status(200).json({
            user_id: user.user_id,
            first_name: user.first_name,
            email: user.email,
            token: generateToken(user.user_id), // Generate the secure JWT
        });
    } else {
        // Failed login attempt
        res.status(401).json({ message: 'Invalid credentials (email or password).' });
    }
};

module.exports = {
    registerUser,
    loginUser, // EXPORT NEW FUNCTION
};