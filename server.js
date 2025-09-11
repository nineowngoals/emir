const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON body for API routes
app.use(express.json());

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

// ===== API routes for backend functions =====
const testFirebase = require('./dev/functions/testFirebase');
const registerUser = require('./dev/functions/register');

// Route for testing Firestore connection
app.get('/dev/functions/testFirebase', testFirebase);

// Route for user registration
app.post('/dev/functions/register', registerUser);

// ===== Catch-all 404 =====
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Production site: http://localhost:${PORT}/`);
  console.log(`Dev site: http://localhost:${PORT}/dev`);
});
