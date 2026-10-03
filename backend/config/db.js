const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 

// Load environnemennal variables
dotenv.config(); 

const connectDB = async() => {

    try {
        // Connexion with database in sucess
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connected : ${conn.connection.host}`);

    } catch (error) {
        // Error connexion with database
        console.error('Error connecting with the database');
        process.exit(1);

    }
}; 
module.exports = connectDB;
