// FILE: backend/config/db.js (FINAL GUARANTEED DEPLOYMENT VERSION)

const { Pool } = require('pg');

// FINAL FIX: Hardcoded Internal Database URL
// This bypasses the ENOTFOUND hostname error by using the direct connection string
const RENDER_DB_URL = 'postgresql://water_tracker_db_final_user:tN07NnMcZ1RYmaQkskthViDXMj2l15ec@dpg-d41ik13e5dus73dc4reg-a/water_tracker_db_final';

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    // Use the hardcoded URL directly
    connectionString: RENDER_DB_URL, 
    ssl: {
        // ESSENTIAL: Bypasses strict SSL certificate checks for internal Render connection
        rejectUnauthorized: false 
    }
});

// Test the database connection once at startup
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('✅ Connected to the PostgreSQL database!');
    } catch (err) {
        // This log now provides the final check, as all variables are bypassed
        console.error('❌ Database connection error:', err.stack);
        console.log('Final check: Ensure the tables are created in the database.');
        process.exit(1); 
    }
};

module.exports = {
    pool,
    connectDB
};