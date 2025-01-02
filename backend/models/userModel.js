/**
 * userModel.js
 *
 * This module defines the schema and model for managing users in the database.
 * 
 * User Schema:
 * - name: User's name (required).
 * - email: User's email (required, unique).
 * - password: User's hashed password (required).
 * - cartData: Object storing the user's cart information (default: empty object).
 * - resetToken: Token for password reset operations.
 * - resetTokenExpiry: Expiry time for the reset token.
 *
 * Options:
 * - `minimize: false`: Ensures empty objects are saved to the database instead of being removed.
 *
 * Dependencies:
 * - mongoose: For creating and interacting with MongoDB schemas and models.
 */

import mongoose from "mongoose"; // Library for MongoDB object modeling.

/**
 * Defines the schema for a user.
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name.
    email: { type: String, required: true, unique: true }, // User's email address (unique).
    password: { type: String, required: true }, // Hashed password for authentication.
    cartData: { type: Object, default: {} }, // User's cart data (default: empty object).
    resetToken: String, // Token used for password reset operations.
    resetTokenExpiry: Date, // Expiry timestamp for the reset token.
}, { minimize: false }); // Prevent removal of empty objects in the database.

/**
 * Create or retrieve the user model.
 */
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
