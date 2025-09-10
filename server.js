const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve all files inside public/ (including /dev)
app.use(express.static(path.join(__dirname, 'public')));

// Root route → production site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /dev route → development site
app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dev', 'index.html'));
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Production site: http://localhost:${PORT}/`);
  console.log(`Dev site: http://localhost:${PORT}/dev`);
});
