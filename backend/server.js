/**
 * server.js
 *
 * The main server file for the application.
 * 
 * Features:
 * - Initializes and configures the Express application.
 * - Connects to the MongoDB database and Cloudinary for file storage.
 * - Configures middleware for JSON parsing and Cross-Origin Resource Sharing (CORS).
 * - Sets up API routes for users, products, carts, orders, and email-related operations.
 * - Provides a basic health check endpoint.
 *
 * Dependencies:
 * - express: For creating and managing the server.
 * - cors: For enabling CORS to allow cross-origin requests.
 * - dotenv/config: For loading environment variables from a `.env` file.
 * - connectDB: Custom function to connect to MongoDB.
 * - connectCloudinary: Custom function to configure Cloudinary.
 * - Routers: Handles requests for various functionalities (users, products, carts, orders, and emails).
 */

import express from "express"; // Framework for creating server and handling HTTP requests.
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS).
import "dotenv/config"; // Automatically loads environment variables from a .env file.
import connectDB from "./config/mongodb.js"; // Custom function to connect to MongoDB.
import connectCloudinary from "./config/cloudinary.js"; // Custom function to configure Cloudinary.
import userRouter from "./routes/userRoute.js"; // Router for user-related operations.
import productRouter from "./routes/productRoute.js"; // Router for product-related operations.
import cartRouter from "./routes/cartRoute.js"; // Router for cart-related operations.
import orderRouter from "./routes/orderRoute.js"; // Router for order-related operations.
import emailRouter from "./routes/emailRoute.js"; // Router for email-related operations.

// App Configuration
const app = express(); // Initialize the Express application.
const PORT = process.env.PORT || 4000;

connectDB(); // Connect to the MongoDB database.
connectCloudinary(); // Configure Cloudinary for file storage.

// Middleware
app.use(express.json()); // Middleware to parse JSON in incoming requests.
app.use(cors()); // Middleware to enable CORS for all routes.

// API Endpoints
app.use("/api/user", userRouter); // User-related routes.
app.use("/api/product", productRouter); // Product-related routes.
app.use("/api/cart", cartRouter); // Cart-related routes.
app.use("/api/order", orderRouter); // Order-related routes.
app.use("/api/email", emailRouter); // Email-related routes.

// Health Check Endpoint
app.get("/", (req, res) => {
    res.send("API Working"); // Responds with a basic message to verify the server is running.
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for testing
export default app;
