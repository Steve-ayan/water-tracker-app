// FILE: backend/controllers/usageController.js

const { createUsageLog, getUsageLogsByUserId } = require('../models/usageModel');

// @desc    Log a new water usage entry
// @route   POST /api/usage/log
// @access  Private (Requires JWT token)
const logUsage = async (req, res) => {
    // req.user is attached by authMiddleware
    const userId = req.user.user_id; 
    const { totalUsageL } = req.body;

    if (!totalUsageL || totalUsageL <= 0) {
        return res.status(400).json({ message: 'Please provide a valid total usage amount in Liters.' });
    }

    try {
        const newLog = await createUsageLog(userId, totalUsageL);
        res.status(201).json({ 
            message: 'Water usage successfully logged.', 
            log: newLog 
        });
    } catch (error) {
        console.error('Usage logging error:', error);
        // Specifically check for database constraint errors (e.g., trying to log twice in one day)
        if (error.code === '23505') { 
             return res.status(409).json({ message: 'Usage already logged for today.' });
        }
        res.status(500).json({ message: 'Server error while logging usage.' });
    }
};


// @desc    Get all water usage history for the logged-in user
// @route   GET /api/usage/history
// @access  Private (Requires JWT token)
const getHistory = async (req, res) => {
    // req.user is attached by authMiddleware
    const userId = req.user.user_id;

    try {
        const logs = await getUsageLogsByUserId(userId);
        res.status(200).json(logs);
    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({ message: 'Server error while fetching history.' });
    }
};

module.exports = {
    logUsage,
    getHistory,
};