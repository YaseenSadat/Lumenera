/**
 * userRoute.js
 *
 * This module defines routes for handling user authentication and registration operations.
 * 
 * Routes:
 * - POST `/register`: Registers a new user.
 * - POST `/login`: Logs in a user by verifying credentials.
 * - POST `/admin`: Logs in an admin by verifying admin credentials.
 *
 * Dependencies:
 * - express: For creating the router and handling HTTP requests.
 * - userController: Contains the logic for user and admin authentication/registration.
 */

import express from "express"; // Library for creating and managing routes.
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js"; // User controller functions.

const userRouter = express.Router(); // Create a new router for user-related operations.

// Route to register a new user.
userRouter.post('/register', registerUser);

// Route to log in a user.
userRouter.post('/login', loginUser);

// Route to log in an admin.
userRouter.post('/admin', adminLogin);

export default userRouter;
