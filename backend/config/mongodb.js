import mongoose from "mongoose"; // Importing Mongoose for database interaction

/**
 * Establishes a connection to the MongoDB database.
 * 
 * @throws {Error} Throws an error if the connection fails.
 */
const connectDB = async () => {
    // Event listener for successful connection
    mongoose.connection.on('connected', () => {
        console.log("DB Connected"); // Logs a confirmation message on successful connection
    });

    // Connect to the database using the connection URI from environment variables
    console.log(process.env.MONGODB_URI);
    
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDB;
