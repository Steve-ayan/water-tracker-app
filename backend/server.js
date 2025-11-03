// FILE: backend/server.js

require('dotenv').config();

const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');

const app = express();

// Render will assign PORT automatically → fallback to 3000 locally
const PORT = process.env.PORT;

// CONNECT DATABASE (this MUST run)
connectDB();

// ALLOWED ORIGINS
// CORS - SIMPLE VERSION (REQUIRED FOR RENDER + VERCEL)
app.use(cors({
  origin: [
    "https://water-tracker-app-live.vercel.app",
    "https://water-tracker-app-eer3.onrender.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Water Tracker API is running!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
const usageRoutes = require('./routes/usageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`Local Test URL: http://localhost:${PORT}`);
});

module.exports = app;
