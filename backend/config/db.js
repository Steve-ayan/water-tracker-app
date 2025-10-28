// FILE: backend/config/db.js

const { Pool } = require('pg');

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Test the database connection once at startup
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('✅ Connected to the PostgreSQL database!');
    } catch (err) {
        console.error('❌ Database connection error:', err.stack);
        console.log('Ensure PostgreSQL is running and .env variables are correct.');
        process.exit(1); // Exit process with failure
    }
};

module.exports = {
    pool,
    connectDB
};