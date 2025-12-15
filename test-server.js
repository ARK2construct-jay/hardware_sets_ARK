const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server is running!' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ token: 'test-token', user: { username: 'test' } });
});

app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Registration successful' });
});

app.post('/api/data/fetch', (req, res) => {
  res.json([{ description: 'Test Hardware', brand: req.body.brand }]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});