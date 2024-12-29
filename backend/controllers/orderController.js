import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import productModel from "../models/productModel.js";

// global variables
const currency = 'CAD'
const serviceCharge = 1

// gateway init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing orders using cash on del.
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Check stock for each item in the order
        for (const item of items) {
            const productData = await productModel.findById(item._id);

            if (!productData) {
                return res.json({ success: false, message: `Product with ID ${item._id} not found.` });
            }

            if (productData.rarities[item.rarity] < item.quantity) {
                return res.json({ success: false, message: `Not enough stock for ${productData.name} (${item.rarity}).` });
            }
        }

        // Deduct stock from each item in the order
        for (const item of items) {
            const productData = await productModel.findById(item._id);
            if (productData) {
                productData.rarities[item.rarity] -= item.quantity;
                await productData.save();
            }
        }

        // Save the order to the database
        const orderData = { userId, items, address, amount, paymentMethod: "COD", payment: false, date: Date.now() };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        res.json({ success: true, message: "Order placed and stock updated." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


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
        }

        // Create a new order in the database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Prepare the line items for Stripe
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

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${origin}/success?orderId=${newOrder._id}`,
            cancel_url: `${origin}/cancel?orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === true || success === "true") {
            // Mark the order as paid
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });

            // Check if the order exists
            if (!order) {
                return res.json({ success: false, message: "Order not found" });
            }

            // Optionally, log the order to confirm the payment
            console.log("Order updated to payment status:", order);

            // Clear the user's cart after successful payment
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Deduct stock from each item in the order
            const items = order.items;
            for (const item of items) {
                const productData = await productModel.findById(item._id);
                
                if (productData) {
                    productData.rarities[item.rarity] -= item.quantity;
                    await productData.save();
                }
            }

            res.json({ success: true });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



//  All orders data for admin panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}) 
    }
}

// User order data for frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}) 
    }
}

// update order status from admin panel 
const updateStatus = async (req,res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}) 
    }
}

export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus}