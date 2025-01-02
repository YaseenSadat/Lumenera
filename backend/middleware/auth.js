/**
 * auth.js
 *
 * Middleware for authenticating regular users.
 * 
 * This middleware ensures that:
 * - A valid token is present in the request headers.
 * - The token decodes successfully and contains the user's ID.
 * - Unauthorized or invalid requests are rejected with appropriate error messages.
 *
 * Dependencies:
 * - jwt: For decoding and verifying JSON Web Tokens.
 */

import jwt from 'jsonwebtoken'; // Library for handling JSON Web Tokens.

/**
 * Middleware to verify user authentication.
 * 
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send the operation result.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 */
const authUser = async (req, res, next) => {
    const { token } = req.headers; // Extract the token from request headers.

    // Check if the token is missing.
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        // Decode and verify the token.
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user's ID to the request body for further processing.
        req.body.userId = token_decode.id;

        // Pass control to the next middleware or route handler.
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
