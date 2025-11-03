// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Initialize Express
const app = express();

// Render will assign a PORT via environment variable; fallback to 3000 for local dev
const PORT = process.env.PORT || 3000;

// Connect to PostgreSQL
connectDB();

// Enable JSON parsing
app.use(express.json());

// CORS configuration: allow Vercel frontend + local dev
app.use(
  cors({
    origin: [
      "https://water-tracker-app-live.vercel.app",   // your deployed frontend
      "https://water-tracker-app-eer3.onrender.com", // Render preview
      "http://localhost:5173",                       // local frontend dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    message: '💧 Water Tracker API is running!',
    environment: process.env.NODE_ENV || 'development',
  });
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
const usageRoutes = require('./routes/usageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
  } else {
    console.log(`📡 Server running on port ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Local Test URL: http://localhost:${PORT}`);
    }
  }
});

module.exports = app;

