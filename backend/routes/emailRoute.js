/**
 * emailRoute.js
 *
 * This module defines routes for handling email-related operations.
 * 
 * Routes:
 * - POST `/send-email`: Sends a purchase confirmation email.
 * - POST `/subscribe`: Sends a subscription welcome email.
 * - POST `/forgot-password`: Sends a password reset email with a secure token.
 * - POST `/reset-password`: Resets the user's password using a token.
 *
 * Dependencies:
 * - express: For creating the router and handling HTTP requests.
 * - emailController: Contains the logic for sending various emails.
 * - userController: Contains the logic for resetting passwords.
 */

import express from 'express'; // Library for creating and managing routes.
import {
    sendPurchaseEmail,
    sendSubscriptionEmail,
    sendForgotPasswordEmail
} from '../controllers/emailController.js'; // Email controller functions.
import { resetPassword } from '../controllers/userController.js'; // User controller function for password reset.

const emailRouter = express.Router(); // Create a new router for email-related operations.

// Route to send a purchase confirmation email.
emailRouter.post('/send-email', sendPurchaseEmail);

// Route to send a subscription welcome email.
emailRouter.post('/subscribe', sendSubscriptionEmail);

// Route to send a password reset email.
emailRouter.post('/forgot-password', sendForgotPasswordEmail);

// Route to reset the user's password using a token.
emailRouter.post('/reset-password', resetPassword);

export default emailRouter;
