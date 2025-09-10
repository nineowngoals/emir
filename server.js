const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve production files at root
app.use(express.static(path.join(__dirname, 'public')));

// Serve development files at /dev
app.use('/dev', express.static(path.join(__dirname, 'dev')));

// Optional: redirect /dev to index.html automatically
app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname, 'dev', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
