const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test user
    const testUser = new User({
      fullName: 'Test User',
      email: 'test@test.com',
      username: 'test',
      password: '123456'
    });

    await testUser.save();
    console.log('Test user created successfully');
    console.log('Username: test');
    console.log('Password: 123456');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createTestUser();