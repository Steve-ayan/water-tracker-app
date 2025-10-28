// FILE: backend/server.js (FINAL CLEAN VERSION)

// 1. Load Environment Variables
require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const { connectDB } = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5000; 

// --- Database Connection (Establish the connection and wait) ---
connectDB(); // Call the connection test function

// -----------------------------------------------------------

// 2. Middleware Setup 
app.use(express.json()); 

// 3. Root Route (Health Check)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Water Tracker API is running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// 4. Register API Routes
// Import the routes
const authRoutes = require('./routes/authRoutes'); 
const usageRoutes = require('./routes/usageRoutes'); // NEW ROUTE IMPORT!

// Attach the routes to the server
app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes); // NEW ROUTE ACTIVATION!

// 5. Start the Server
app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`Local Test URL: http://localhost:${PORT}`);
});