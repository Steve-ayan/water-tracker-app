// FILE: backend/config/db.js (FINAL RENDER CLEAN VERSION)

const { Pool } = require('pg');

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    // CRITICAL FIX: Use individual variables from the environment
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        // ESSENTIAL: For any cloud connection, even internal/private
        rejectUnauthorized: false 
    }
});

// Test the database connection once at startup
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('✅ Connected to the PostgreSQL database!');
    } catch (err) {
        console.error('❌ Database connection error:', err.stack);
        console.log('Ensure individual PGHOST, PGUSER, etc. variables are set.');
        process.exit(1); 
    }
};

module.exports = {
    pool,
    connectDB
};