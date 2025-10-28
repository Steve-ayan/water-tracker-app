// FILE: backend/routes/authRoutes.js (CLEANED)

const express = require('express'); // <-- ONLY OCCURRENCE
const router = express.Router();
// Import both functions from the controller
const { registerUser, loginUser } = require('../controllers/authController'); 

// Defines the POST /api/auth/register endpoint
router.post('/register', registerUser);

// Defines the POST /api/auth/login endpoint
router.post('/login', loginUser);

module.exports = router;