/**
 * productRoute.js
 *
 * This module defines routes for handling product-related operations.
 * 
 * Routes:
 * - POST `/add`: Adds a new product to the database (requires admin authentication and file upload).
 * - POST `/remove`: Removes a product by its ID (requires admin authentication).
 * - POST `/single`: Fetches details of a single product by its ID.
 * - GET `/list`: Lists all products in the database.
 *
 * Middleware:
 * - adminAuth: Ensures admin authentication for sensitive operations.
 * - multer: Handles file uploads for product images.
 *
 * Dependencies:
 * - express: For creating the router and handling HTTP requests.
 * - productController: Contains the logic for product operations.
 * - multer: Middleware for handling file uploads.
 */

import express from "express"; // Library for creating and managing routes.
import {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct
} from "../controllers/productController.js"; // Product controller functions.
import upload from "../middleware/multer.js"; // Middleware for handling file uploads.
import adminAuth from "../middleware/adminAuth.js"; // Middleware for admin authentication.

const productRouter = express.Router(); // Create a new router for product-related operations.

// Route to add a new product with image uploads (requires admin authentication).
productRouter.post(
    '/add',
    adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    addProduct
);

// Route to remove a product by its ID (requires admin authentication).
productRouter.post('/remove', adminAuth, removeProduct);

// Route to fetch details of a single product by its ID.
productRouter.post('/single', singleProduct);

// Route to list all products in the database.
productRouter.get('/list', listProducts);

export default productRouter;
