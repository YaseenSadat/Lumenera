/**
 * orderController.js
 *
 * This controller handles all operations related to orders in the application.
 * It includes:
 * - Placing orders using Stripe for payment.
 * - Verifying Stripe payments and updating order/payment status.
 * - Managing inventory stock based on orders.
 * - Providing order data for admin and user interfaces.
 * - Updating order status from the admin panel.
 * 
 * Dependencies:
 * - Stripe: For handling payment gateways.
 * - MongoDB models for orders, products, and users.
 * - Email service for sending purchase confirmation emails.
 */

import orderModel from "../models/orderModel.js"; // Model for handling order-related data.
import userModel from "../models/userModel.js"; // Model for user-related data.
import Stripe from 'stripe'; // Stripe library for payment integration.
import productModel from "../models/productModel.js"; // Model for product-related data.
import { sendPurchaseEmail } from "../controllers/emailController.js"; // Email service for sending purchase confirmation emails.
import { log } from "console";
import { loadavg } from "os";

// Gateway initialization with Stripe API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Handles placing orders using cash on delivery.
 * Note: This method is no longer in use.
 * 
 * @param {Object} req - The request object containing user ID, items, amount, and address.
 * @param {Object} res - The response object for sending the result.
 */
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Verify stock availability for each item in the order.
        for (const item of items) {
            const productData = await productModel.findById(item._id);

            if (!productData) {
                return res.json({ success: false, message: `Product with ID ${item._id} not found.` });
            }

            if (productData.rarities[item.rarity] < item.quantity) {
                return res.json({ success: false, message: `Not enough stock for ${productData.name} (${item.rarity}).` });
            }
        }

        // Deduct stock for each item in the order.
        for (const item of items) {
            const productData = await productModel.findById(item._id);
            if (productData) {
                productData.rarities[item.rarity] -= item.quantity;
                await productData.save();
            }
        }

        // Save the order to the database.
        const orderData = { userId, items, address, amount, paymentMethod: "COD", payment: false, date: Date.now() };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        res.json({ success: true, message: "Order placed and stock updated." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Places an order and initiates payment via Stripe.
 * 
 * @param {Object} req - The request object containing user ID, items, amount, and address.
 * @param {Object} res - The response object for sending the result.
 */
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const serviceFee = amount * 0.15; // Calculate service fee (15% of the total amount).

        // Create a new order in the database.
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Prepare line items for Stripe.
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'CAD',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Add a line item for the service fee.
        line_items.push({
            price_data: {
                currency: 'CAD',
                product_data: {
                    name: 'Service Fee'
                },
                unit_amount: Math.round(serviceFee * 100)
            },
            quantity: 1
        });

        // Create a Stripe session for payment.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Verifies the result of a Stripe payment and updates the order/payment status.
 * 
 * @param {Object} req - The request object containing order ID, success status, and user ID.
 * @param {Object} res - The response object for sending the result.
 */
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.json({ success: false, message: 'Order not found' });
            }

            // Deduct stock for each item in the order.
            for (const item of order.items) {
                const productData = await productModel.findById(item._id);
                if (productData) {
                    productData.rarities[item.rarity] -= item.quantity;
                    await productData.save();
                }
            }

            // Mark the order as paid.
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Prepare and send a purchase confirmation email.
            const productNames = order.items.map(item => `<strong>${item.name} (${item.rarity}) x${item.quantity}</strong>`).join(", ");
            const productImages = order.items.map(item => {
                let selectedImage;
                switch (item.rarity) {
                    case "Standard": selectedImage = item.image[0]; break;
                    case "Runed": selectedImage = item.image[1]; break;
                    case "Sacred": selectedImage = item.image[2]; break;
                    case "Cursed": selectedImage = item.image[3]; break;
                    default: selectedImage = ""; // Default fallback.
                }
                return new Array(item.quantity).fill(`<img src="${selectedImage}" alt="${item.name} (${item.rarity})" style="max-width: 200px; margin: 5px;">`).join(" ");
            }).join("<hr>");

            await sendPurchaseEmail(
                { body: { email: order.address.email, productNames, productImages } },
                { status: () => ({ json: console.log }) } // Simulated response object.
            );

            res.json({ success: true });
        } else {
            // Delete the order if payment failed.
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Fetches all orders for the admin panel.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing all orders.
 */
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


/**
 * Fetches orders for a specific user.
 * 
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object containing user-specific orders.
 */
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Updates the status of an order from the admin panel.
 * 
 * @param {Object} req - The request object containing order ID and status.
 * @param {Object} res - The response object for sending the result.
 */
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Export all controller functions.
export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
