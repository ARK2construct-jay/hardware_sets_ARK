const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { username, email, newPassword } = req.body;
    
    if (!username || !email || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by username and email
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: 'User not found or email does not match' });
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;