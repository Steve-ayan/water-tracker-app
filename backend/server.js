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
const allowedOrigins = [
  'https://water-tracker-app-live.vercel.app',   // your frontend vercel URL
  'https://water-tracker-app-eer3.onrender.com', // your backend render URL (needed for internal calls)
  'http://localhost:5173'                         // local dev
];

// CORS CONFIG
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// MIDDLEWARE
app.use(cors(corsOptions));
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
