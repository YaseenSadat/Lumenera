/**
 * mongodb.js
 * 
 * This module handles the connection to the MongoDB database using Mongoose.
 * It establishes the connection to the specified database and listens for 
 * connection events to confirm successful connection.
 */

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
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
        useNewUrlParser: true, // Ensures the use of the new MongoDB connection string parser
        useUnifiedTopology: true, // Uses the unified topology engine for better performance
    });
};

export default connectDB;
