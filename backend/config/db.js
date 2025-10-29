// FILE: backend/config/db.js (FINAL DEFINITIVE VERSION)

const { Pool } = require('pg');

// FINAL FIX: Hardcoded External Database URL to bypass environment variable loading issues
const RENDER_DB_URL = 'postgresql://water_tracker_db_live_user:3ke56efqYcn86MPJLtiJg0e52UlFJYpo@dpg-d40auec9c44c738p3bq0-a.ohio-postgres.render.com/water_tracker_db_live';

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    // Use the hardcoded URL directly
    connectionString: RENDER_DB_URL, 
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
        console.log('Ensure PostgreSQL is running and credentials are correct.');
        process.exit(1); // Exit process with failure
    }
};

module.exports = {
    pool,
    connectDB
};