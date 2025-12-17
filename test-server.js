const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test registration without database
app.post('/api/auth/register', (req, res) => {
  console.log('Registration request:', req.body);
  res.json({ message: 'Registration successful!' });
});

// Test login
app.post('/api/auth/login', (req, res) => {
  console.log('Login request:', req.body);
  res.json({ 
    token: 'test-token',
    user: { username: req.body.username }
  });
});

app.listen(5001, () => {
  console.log('Test server running on port 5001');
});