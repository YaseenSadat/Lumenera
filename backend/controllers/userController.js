/**
 * userController.js
 *
 * This controller manages all authentication-related operations for the application.
 * It includes:
 * - User registration with validation and password hashing.
 * - User login with password comparison and token generation.
 * - Admin login with secure token generation.
 * - Password reset functionality using tokens.
 *
 * Dependencies:
 * - bcrypt: For hashing and verifying passwords.
 * - jwt: For generating and verifying JSON Web Tokens.
 * - validator: For validating email formats.
 * - MongoDB user model: For database operations related to users.
 */

import userModel from "../models/userModel.js"; // Model for user-related database operations.
import validator from "validator"; // Library for validating email formats.
import bcrypt from "bcrypt"; // Library for hashing and comparing passwords.
import jwt from 'jsonwebtoken'; // Library for JSON Web Token generation.
import User from '../models/userModel.js'; // Alias for userModel, included for specific references.

/**
 * Creates a JWT token for a user.
 * 
 * @param {String} id - The user's ID.
 * @returns {String} - The generated JWT token.
 */
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

/**
 * Logs in a user by verifying credentials.
 * 
 * @param {Object} req - The request object containing email and password.
 * @param {Object} res - The response object for sending the operation result.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Registers a new user with validation and password hashing.
 * 
 * @param {Object} req - The request object containing name, email, and password.
 * @param {Object} res - The response object for sending the operation result.
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists.
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format and password length.
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be more than 8 characters" });
        }

        // Hash the password before saving.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database.
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Logs in an admin by verifying credentials and generating a token.
 * 
 * @param {Object} req - The request object containing email and password.
 * @param {Object} res - The response object for sending the operation result.
 */
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token, isAdmin: true });
        } else {
            return res.json({ success: false, message: "INVALID CREDENTIALS" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * Resets a user's password using a secure token.
 * 
 * @param {Object} req - The request object containing token and new password.
 * @param {Object} res - The response object for sending the operation result.
 */
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find the user with the reset token and ensure it hasn't expired.
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Ensure token is still valid.
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }

        // Hash the new password.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token.
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred while resetting the password.' });
    }
};

// Export all authentication controller functions.
export { loginUser, registerUser, adminLogin };
