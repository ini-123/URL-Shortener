const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();


// Allows the server to receive JSON data
app.use(express.json());
app.use(rateLimiter);

connectDB();

// Authentication routes
app.use('/api', authRoutes);

// Error handler
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
