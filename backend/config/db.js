const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 

// Load environmental variables
dotenv.config(); 

const connectDB = async() => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connected : ${conn.connection.host}`);

    } catch (error) {
        console.error('Error connecting with the database');
        process.exit(1);

    }
}; 
module.exports = connectDB;