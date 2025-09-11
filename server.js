const express = require('express');
const path = require('path');
const cors = require('cors'); // optional, useful for API requests from other domains

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded forms
app.use(cors()); // enable CORS (optional, can restrict origins later)

// ===== Serve production files at root =====
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== Serve development files at /dev =====
app.use('/dev', express.static(path.join(__dirname, 'dev')));
app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname, 'dev', 'index.html'));
});

// ===== API routes =====
const testFirebase = require('./dev/functions/testFirebase');
const registerUser = require('./dev/functions/register');

// Base path for all dev functions
const apiBase = '/dev/functions';

app.get(`${apiBase}/testFirebase`, testFirebase);
app.post(`${apiBase}/register`, registerUser);

// ===== Placeholder routes for future features =====
app.post(`${apiBase}/login`, (req, res) => {
  // TODO: implement login logic
  res.send({ message: 'Login endpoint placeholder' });
});

app.post(`${apiBase}/logout`, (req, res) => {
  // TODO: implement logout logic
  res.send({ message: 'Logout endpoint placeholder' });
});

app.get(`${apiBase}/users`, (req, res) => {
  // TODO: return list of users or user info
  res.send({ message: 'Users list placeholder' });
});

// ===== Catch-all 404 =====
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ===== Global error handler (optional) =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ error: 'Internal Server Error', details: err.message });
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Production site: http://localhost:${PORT}/`);
  console.log(`Dev site: http://localhost:${PORT}/dev`);
});
