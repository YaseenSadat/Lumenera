/**
 * cartController.js
 * 
 * This controller handles cart-related operations for users, including:
 * - Adding products to the cart
 * - Updating cart quantities
 * - Fetching cart data
 */

import userModel from "../models/userModel.js"; // Importing the user model

/**
 * Adds a product to the user's cart.
 * 
 * @param {Object} req - The request object containing userId, itemId, and rarity.
 * @param {Object} res - The response object to send the operation result.
 */
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, rarity } = req.body;

        // Fetch the user's cart data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Update or initialize the cart data
        if (cartData[itemId]) {
            if (cartData[itemId][rarity]) {
                cartData[itemId][rarity] += 1; // Increment quantity if item and rarity exist
            } else {
                cartData[itemId][rarity] = 1; // Initialize rarity quantity to 1
            }
        } else {
            cartData[itemId] = { [rarity]: 1 }; // Initialize item and rarity in cart
        }

        // Save the updated cart data to the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Updates the quantity of a specific product in the user's cart.
 * 
 * @param {Object} req - The request object containing userId, itemId, rarity, and quantity.
 * @param {Object} res - The response object to send the operation result.
 */
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, rarity, quantity } = req.body;

        // Fetch the user's cart data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (itemId === null && rarity === null) {
            // Clear the entire cart
            cartData = {};        
        } else if (quantity === 0) {
            // Remove the rarity if the quantity is zero
            delete cartData[itemId][rarity];

            // If no rarities are left for the item, remove the item entirely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            // Update the quantity for the specified item and rarity
            cartData[itemId][rarity] = quantity;
        }

        // Save the updated cart data to the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Fetches the user's cart data.
 * 
 * @param {Object} req - The request object containing userId.
 * @param {Object} res - The response object to send the cart data.
 */
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch the user's cart data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
