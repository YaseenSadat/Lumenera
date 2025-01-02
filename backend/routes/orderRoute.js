/**
 * orderRoute.js
 *
 * This module defines routes for handling order-related operations.
 * 
 * Routes:
 * - Admin Features:
 *   - POST `/list`: Fetches all orders for the admin panel (requires admin authentication).
 *   - POST `/status`: Updates the status of an order (requires admin authentication).
 * 
 * - Payment Features:
 *   - POST `/place`: Places an order using cash on delivery (requires user authentication).
 *   - POST `/stripe`: Places an order using Stripe payment (requires user authentication).
 * 
 * - User Features:
 *   - POST `/userorders`: Fetches orders for a specific user (requires user authentication).
 * 
 * - Verify Payment:
 *   - POST `/verifyStripe`: Verifies Stripe payment and updates order/payment status (requires user authentication).
 *
 * Middleware:
 * - adminAuth: Ensures admin authentication for sensitive operations.
 * - authUser: Ensures user authentication for user-related operations.
 *
 * Dependencies:
 * - express: For creating the router and handling HTTP requests.
 * - orderController: Contains the logic for order operations.
 */

import express from 'express'; // Library for creating and managing routes.
import {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
} from '../controllers/orderController.js'; // Order controller functions.
import adminAuth from '../middleware/adminAuth.js'; // Middleware for admin authentication.
import authUser from '../middleware/auth.js'; // Middleware for user authentication.

const orderRouter = express.Router(); // Create a new router for order-related operations.

// Admin features.
orderRouter.post('/list', adminAuth, allOrders); // Fetch all orders for admin.
orderRouter.post('/status', adminAuth, updateStatus); // Update order status for admin.

// Payment features.
orderRouter.post('/place', authUser, placeOrder); // Place an order using cash on delivery.
orderRouter.post('/stripe', authUser, placeOrderStripe); // Place an order using Stripe payment.

// User features.
orderRouter.post('/userorders', authUser, userOrders); // Fetch orders for a specific user.

// Verify payment.
orderRouter.post('/verifyStripe', authUser, verifyStripe); // Verify Stripe payment.

export default orderRouter;
