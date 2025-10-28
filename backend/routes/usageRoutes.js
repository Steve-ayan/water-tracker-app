// FILE: backend/routes/usageRoutes.js

const express = require('express');
const router = express.Router();
const { logUsage, getHistory } = require('../controllers/usageController');
const { protect } = require('../utils/authMiddleware'); // Import the security middleware!

// All routes here require the 'protect' middleware first
// The request will not proceed to the controller unless a valid token is provided.

router.route('/log').post(protect, logUsage); // POST request to log usage
router.route('/history').get(protect, getHistory); // GET request to fetch history

module.exports = router;