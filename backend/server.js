// FILE: backend/server.js (FINAL DEPLOYMENT VERSION)

// 1. Load Environment Variables
require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors'); // CORS middleware import

const app = express(); // Initialize Express application

// CRITICAL: Render often uses port 10000+, but process.env.PORT handles it
const PORT = process.env.PORT || 3000; 

// --- Database Connection ---
connectDB(); // Call the connection test function

// -----------------------------------------------------------

// --- 2. Middleware Setup (Including CORS) ---

// Define allowed origins for CORS
const allowedOrigins = [
    'https://water-tracker-nhhknl5nt-stephen-ayankosos-projects.vercel.app', // Your VERCEL URL
    'http://localhost:5173' // Allows local testing
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow if origin is in the list, or if the origin is undefined (e.g., direct API calls/same origin)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // FINAL FIX: Explicitly list all allowed methods, including OPTIONS (preflight check)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true,
};

app.use(cors(corsOptions)); // 1. Enable CORS middleware FIRST
app.use(express.json());   // 2. Enable JSON parsing middleware SECOND

// -----------------------------------------------------------

// 3. Root Route (Health Check)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Water Tracker API is running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// 4. Register API Routes
const authRoutes = require('./routes/authRoutes'); 
const usageRoutes = require('./routes/usageRoutes'); 

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);

// 5. Start the Server
app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`Local Test URL: http://localhost:${PORT}`);
});