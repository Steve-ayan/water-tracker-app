// backend/config/db.js
const { Client } = require('pg');

const connectDB = async () => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    await client.connect();

    console.log("✅ Connected to the PostgreSQL database!");

    global.pgClient = client; // make available everywhere
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
