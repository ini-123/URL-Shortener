const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorMiddleware');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToOriginal } = require('./controllers/urlController');

const app = express();

// Allows the server to receive JSON data
app.use(express.json());
app.use(rateLimiter);

connectDB();

// Authentication routes
app.use('/api', authRoutes);

// URL routes
app.use('/api/urls', urlRoutes);
app.get('/:shortCode', redirectToOriginal);

// Error handler
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
