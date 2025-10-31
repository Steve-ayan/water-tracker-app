// FILE: backend/config/db.js (FINAL, WORKING INTERNAL CONNECTION)

const { Pool } = require('pg');

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    // CRITICAL FIX: Use individual variables, relying on the PGHOST being the simple service name
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
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
        // This log directs the user to check individual PGHOST, PGUSER, etc.
        console.error('❌ Database connection error:', err.stack);
        console.log('Final check: Ensure PGHOST is the simple service name (e.g., water-tracker-db-final) and tables are created.');
        process.exit(1); 
    }
};

module.exports = {
    pool,
    connectDB
};