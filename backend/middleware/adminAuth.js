/**
 * adminAuth.js
 *
 * Middleware for authenticating admin access.
 * 
 * This middleware ensures that:
 * - A valid token is present in the request headers.
 * - The token decodes to the correct admin credentials (email and password concatenated).
 * - Unauthorized or invalid requests are rejected with appropriate error messages.
 *
 * Dependencies:
 * - jwt: For decoding and verifying JSON Web Tokens.
 */

import jwt from 'jsonwebtoken'; // Library for JSON Web Token handling.

/**
 * Middleware to verify admin authentication.
 * 
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send the operation result.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers; // Extract the token from request headers.

        // Check if the token is missing.
        if (!token) {
            return res.json({ success: "false", message: "Not Authorized" });
        }

        // Decode and verify the token.
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Validate the decoded token against the admin credentials.
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: "false", message: "Not Authorized" });
        }

        // If valid, pass control to the next middleware or route handler.
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message });
    }
};

export default adminAuth;
