// FILE: backend/config/db.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// optional connection test
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL (Render)');
  } catch (err) {
    console.error('❌ Database connection error:', err.stack);
  }
};

module.exports = { pool, connectDB };
