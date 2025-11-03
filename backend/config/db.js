// backend/config/db.js
const { Pool } = require('pg');

// Create a pool variable
let pool;

/**
 * Connect to PostgreSQL database using Render's DATABASE_URL.
 * Uses SSL with rejectUnauthorized false for cloud compatibility.
 */
const connectDB = async () => {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // required for Render-hosted Postgres
      },
    });

    // Test connection
    await pool.connect();
    console.log("✅ Connected to PostgreSQL database!");

    // Make the pool globally accessible
    global.pgPool = pool;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // stop server if DB fails
  }
};

// Export the connect function and the pool
module.exports = { connectDB, pool };

