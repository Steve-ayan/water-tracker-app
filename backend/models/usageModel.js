// FILE: backend/models/usageModel.js

const { pool } = require('../config/db'); 

// Function to log a new day's water usage
const createUsageLog = async (userId, totalUsageL) => {
    // Note: log_date defaults to today's date in the DB if not provided,
    // but here we force the current server date for the log
    const query = `
        INSERT INTO usage_log (user_id, log_date, total_usage_L)
        VALUES ($1, CURRENT_DATE, $2)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, totalUsageL]);
    return rows[0];
};

// Function to fetch all usage logs for a user
const getUsageLogsByUserId = async (userId) => {
    const query = `
        SELECT log_id, log_date, total_usage_L, created_at
        FROM usage_log
        WHERE user_id = $1
        ORDER BY log_date DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
};

module.exports = {
    createUsageLog,
    getUsageLogsByUserId,
};