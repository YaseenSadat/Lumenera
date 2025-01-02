/**
 * productController.js
 *
 * This controller manages all product-related operations within the application.
 * It includes:
 * - Adding new products with dynamic image uploads.
 * - Listing all available products in the database.
 * - Removing a specific product by its ID.
 * - Retrieving details of a single product by its ID.
 * 
 * Dependencies:
 * - Cloudinary: For handling image uploads.
 * - MongoDB product model: For database operations related to products.
 */

import { v2 as cloudinary } from "cloudinary"; // Cloudinary library for image uploads.
import productModel from "../models/productModel.js"; // Product model for interacting with the database.

/**
 * Adds a new product to the database.
 * - Uploads multiple product images to Cloudinary.
 * - Parses and merges product rarities with default values.
 * 
 * @param {Object} req - The request object containing product details and image files.
 * @param {Object} res - The response object for sending the operation result.
 */
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, rarities, bestseller, latestCollection } = req.body;

        // Extract and filter image files from the request.
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary and collect URLs.
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Parse rarities and merge with default values.
        const parsedRarities = JSON.parse(rarities || '{}');
        const defaultRarities = {
            Standard: 0,
            Runed: 0,
            Sacred: 0,
            Cursed: 0
        };
        const finalRarities = { ...defaultRarities, ...parsedRarities };

        // Construct product data.
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            latestCollection: latestCollection === "true" ? true : false,
            rarities: finalRarities,
            image: imagesUrl,
            date: Date.now()
        };

        // Save the new product to the database.
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Lists all products in the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing all products.
 */
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Removes a product from the database by its ID.
 * 
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object for sending the operation result.
 */
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Retrieves details of a single product by its ID.
 * 
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object containing product details.
 */
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: "true", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Export all controller functions.
export { listProducts, addProduct, removeProduct, singleProduct };
