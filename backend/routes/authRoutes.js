// FILE: backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Defines the POST /api/auth/register endpoint
router.post('/register', registerUser);

module.exports = router;