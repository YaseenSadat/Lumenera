/**
 * cartRoute.js
 *
 * This module defines routes for handling cart-related operations.
 * 
 * Routes:
 * - POST `/get`: Fetches the current user's cart data (requires authentication).
 * - POST `/add`: Adds an item to the user's cart (requires authentication).
 * - POST `/update`: Updates items in the user's cart (requires authentication).
 *
 * Middleware:
 * - authUser: Ensures the user is authenticated before accessing the routes.
 *
 * Dependencies:
 * - express: For creating the router and handling HTTP requests.
 * - cartController: Contains the logic for cart operations.
 * - authUser: Middleware for user authentication.
 */

import express from 'express'; // Library for creating and managing routes.
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'; // Cart controller functions.
import authUser from '../middleware/auth.js'; // Middleware for user authentication.

const cartRouter = express.Router(); // Create a new router for cart operations.

// Route to fetch the current user's cart data.
cartRouter.post('/get', authUser, getUserCart);

// Route to add an item to the user's cart.
cartRouter.post('/add', authUser, addToCart);

// Route to update items in the user's cart.
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
