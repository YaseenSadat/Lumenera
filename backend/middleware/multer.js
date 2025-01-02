/**
 * multer.js
 *
 * Middleware for handling file uploads using Multer.
 * 
 * This module:
 * - Configures Multer to store files on the disk with their original names.
 * - Provides a reusable middleware for handling file uploads in routes.
 *
 * Dependencies:
 * - multer: For handling file uploads.
 */

import multer from "multer"; // Library for managing file uploads.

/**
 * Configures the Multer storage settings.
 * - The `filename` function determines how files are named when saved.
 * - Files are saved with their original names.
 */
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Save the file with its original name.
    }
});

// Initialize the Multer upload middleware with the configured storage.
const upload = multer({ storage });

export default upload;
