const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Suppress dotenv messages
process.env.DOTENV_SILENT = 'true';

// Load environment variables
dotenv.config({ silent: true, debug: false });

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
    res.send('StayNest API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 