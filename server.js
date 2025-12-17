const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Set default environment variables
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://support_db_user:Ark%402811@hardware-selection.dcnpff4.mongodb.net/hardware_selection?retryWrites=true&w=majority&appName=hardware-selection';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'hardwareSelectionSecretKey2024ProjectFinal';
process.env.PORT = process.env.PORT || '5000';

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const resetRoutes = require('./routes/reset-password');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/auth', resetRoutes);

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Serve React app for any non-API routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // Basic route for development
  app.get('/', (req, res) => {
    res.json({ message: 'Hardware Selection API is running' });
  });
}

// MongoDB connection with timeout options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection', {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    console.log('Server will continue without database');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});