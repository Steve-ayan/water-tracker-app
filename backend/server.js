// FILE: backend/server.js

// 1. Load Environment Variables (Professional Practice)
// This must be done first to access PORT, PG_HOST, etc.
require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const { Pool } = require('pg'); // Import the PostgreSQL client
const path = require('path');
const app = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000; 

// --- Database Connection (Establish the connection pool) ---
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Test the database connection once at startup
pool.connect()
    .then(client => {
        console.log('✅ Connected to the PostgreSQL database!');
        client.release(); // Release the client back to the pool
    })
    .catch(err => {
        console.error('❌ Database connection error:', err.stack);
        console.log('Ensure PostgreSQL is running and .env variables are correct.');
    });

// -----------------------------------------------------------

// 2. Middleware Setup (Required for handling JSON data)
app.use(express.json()); // Allows the server to parse JSON from incoming requests

// 3. Root Route (A simple test endpoint)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Water Tracker API is running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// 4. Register API Routes
const authRoutes = require('./routes/authRoutes');

// Attach the authentication routes to the server
app.use('/api/auth', authRoutes);

// Placeholder for future Usage Routes:
// const usageRoutes = require('./routes/usageRoutes');
// app.use('/api/usage', usageRoutes);

// 5. Start the Server
app.listen(PORT, () => {
    console.log(`📡 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`Local Test URL: http://localhost:${PORT}`);
});

// Export the pool to be used by the models/controllers
module.exports = { pool };