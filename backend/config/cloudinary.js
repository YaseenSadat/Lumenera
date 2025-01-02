/**
 * cloudinary.js
 * 
 * This module handles the configuration for Cloudinary, a cloud-based 
 * media management service. It initializes the Cloudinary SDK with the 
 * required credentials from environment variables.
 */

import { v2 as cloudinary } from "cloudinary"; // Importing the Cloudinary SDK

/**
 * Initializes the Cloudinary configuration using environment variables.
 * Ensures secure access to Cloudinary's API for media uploads and management.
 */
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, // Cloudinary account name
        api_key: process.env.CLOUDINARY_API_KEY, // API key for authentication
        api_secret: process.env.CLOUDINARY_SECRET_KEY // Secret key for secure API access
    });
};

export default connectCloudinary;
