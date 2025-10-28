// FILE: backend/utils/authMiddleware.js

const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    // Check for token in headers (Standard practice: Bearer Token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (removes 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB and attach to request object
            const query = 'SELECT user_id, email, first_name FROM users WHERE user_id = $1';
            const { rows } = await pool.query(query, [decoded.id]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Attach user data to the request object (req.user)
            req.user = rows[0]; 
            next(); // Move on to the protected route controller

        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };