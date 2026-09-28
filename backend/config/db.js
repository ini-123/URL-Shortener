const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 

// Load environmental variables
dotenv.config(); 

const connectDB = async() => {

    try {
        // Connection with database in sucess
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connected : ${conn.connection.host}`);

    } catch (error) {
        // Error connection with database
        console.error('One problem with connection with database');
        process.exit(1);

    }
}; 
module.exports = connectDB;