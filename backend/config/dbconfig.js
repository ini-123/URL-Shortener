const mongose = require('mongoose'); 
const dotenv = require('dotenv'); 

// Load environnemennal variables
dotenv.config(); 

const connectDB = async() => {

    try {
        // Connexion with database in sucess
        const conn = mongose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connected : ${conn.connexion.host}`);

    } catch (error) {
        // Error connexion with database
        console.error('One problem with connexion with database');
        process.exit(1);

    }
}; 
module.exports = connectDB;