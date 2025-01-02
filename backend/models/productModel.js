/**
 * productModel.js
 *
 * This module defines the schema and model for managing products in the database.
 * 
 * Product Schema:
 * - name: Name of the product (required).
 * - description: Description of the product (required).
 * - price: Price of the product (required).
 * - image: Array of image URLs for the product (required).
 * - category: Main category of the product (required).
 * - subCategory: Subcategory of the product (required).
 * - rarities: Object defining stock quantities for different rarities.
 *   - Standard: Default quantity is 0.
 *   - Runed: Default quantity is 0.
 *   - Sacred: Default quantity is 0.
 *   - Cursed: Default quantity is 0.
 * - bestseller: Boolean indicating if the product is a bestseller.
 * - latestCollection: Boolean indicating if the product belongs to the latest collection.
 * - date: Timestamp representing the date the product was added (required).
 *
 * Dependencies:
 * - mongoose: For creating and interacting with MongoDB schemas and models.
 */

import mongoose from "mongoose"; // Library for MongoDB object modeling.

/**
 * Defines the schema for a product.
 */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the product.
    description: { type: String, required: true }, // Description of the product.
    price: { type: Number, required: true }, // Price of the product.
    image: { type: Array, required: true }, // Array of image URLs for the product.
    category: { type: String, required: true }, // Main category of the product.
    subCategory: { type: String, required: true }, // Subcategory of the product.
    rarities: {
        Standard: { type: Number, default: 0 }, // Quantity for Standard rarity.
        Runed: { type: Number, default: 0 }, // Quantity for Runed rarity.
        Sacred: { type: Number, default: 0 }, // Quantity for Sacred rarity.
        Cursed: { type: Number, default: 0 }, // Quantity for Cursed rarity.
    },
    bestseller: { type: Boolean }, // Indicates if the product is a bestseller.
    latestCollection: { type: Boolean }, // Indicates if the product is part of the latest collection.
    date: { type: Number, required: true }, // Timestamp representing when the product was added.
});

// Create or retrieve the product model.
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
