import mongoose from "mongoose"; // Importing Mongoose for database interaction

/**
 * Establishes a connection to the MongoDB database.
 * 
 * @throws {Error} Throws an error if the connection fails.
 */
const connectDB = async () => {
    try {
        // Determine which database URI to use based on the environment
        const dbURI = process.env.NODE_ENV === "test" 
            ? process.env.TEST_MONGODB_URI 
            : `${process.env.MONGODB_URI}/e-commerce`;

        // Event listener for successful connection
        mongoose.connection.on('connected', () => {
            console.log(`Connected to ${process.env.NODE_ENV === "test" ? "Test" : "Production"} Database`);
        });

        // Connect to the database using the chosen URI
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
