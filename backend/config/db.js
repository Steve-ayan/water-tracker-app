// FILE: backend/config/db.js (FINAL CLEAN VERSION)

const { Pool } = require('pg');

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    // CRITICAL FIX: Use the single DATABASE_URL connection string provided by Railway
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        // ESSENTIAL FIX: Bypasses strict SSL certificate checks for external cloud connections
        rejectUnauthorized: false 
    }
});

// Test the database connection once at startup
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('✅ Connected to the PostgreSQL database!');
    } catch (err) {
        // This will now catch genuine connection errors after the SSL fix
        console.error('❌ Database connection error:', err.stack);
        console.log('Ensure PostgreSQL is running and DATABASE_URL variable is correct.');
        process.exit(1); // Exit process with failure
    }
};

module.exports = {
    pool,
    connectDB
};