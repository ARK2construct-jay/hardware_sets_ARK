const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { fullName, email, username, password } = req.body;
    
    // Validate input
    if (!fullName || !email || !username || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser.username);
      return res.status(400).json({ message: `User with ${existingUser.email === email ? 'email' : 'username'} already exists` });
    }

    // Create new user
    console.log('Creating new user...');
    const user = new User({ fullName, email, username, password });
    await user.save();
    console.log('User registered successfully:', username);
    
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error details:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { username, password } = req.body;
    
    console.log('Looking for user:', username);
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found, checking password...');
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', username);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        fullName: user.fullName, 
        username: user.username 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;