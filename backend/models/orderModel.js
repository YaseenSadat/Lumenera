/**
 * orderModel.js
 *
 * This module defines the schema and model for managing orders in the database.
 * 
 * Order Schema:
 * - userId: ID of the user placing the order.
 * - items: Array containing details of items in the order.
 * - amount: Total amount for the order.
 * - address: Object containing delivery address details.
 * - status: Current status of the order (default: "Order Placed").
 * - paymentMethod: Method of payment used for the order.
 * - payment: Boolean indicating if the payment was completed (default: false).
 * - date: Timestamp representing the date of the order.
 *
 * Dependencies:
 * - mongoose: For creating and interacting with MongoDB schemas and models.
 */

import mongoose from 'mongoose'; // Library for MongoDB object modeling.

/**
 * Defines the schema for an order.
 */
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user placing the order.
    items: { type: Array, required: true }, // Array of items in the order.
    amount: { type: Number, required: true }, // Total order amount.
    address: { type: Object, required: true }, // Delivery address details.
    status: { type: String, required: true, default: 'Order Placed' }, // Current order status.
    paymentMethod: { type: String, required: true }, // Payment method used.
    payment: { type: Boolean, required: true, default: false }, // Payment completion status.
    date: { type: Number, required: true }, // Order date timestamp.
});

// Create or retrieve the order model.
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
