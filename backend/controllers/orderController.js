import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import productModel from "../models/productModel.js";
import { sendPurchaseEmail } from "../controllers/emailController.js";

// gateway init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing orders using cash on del. not in use anymore
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

        const serviceFee = amount * 0.15;

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

         // Add a line item for the service fee
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

        // Create a Stripe session
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
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.json({ success: false, message: 'Order not found' });
            }

            // Deduct stock for each item in the order
            for (const item of order.items) {
                const productData = await productModel.findById(item._id);
                if (productData) {
                    productData.rarities[item.rarity] -= item.quantity;
                    await productData.save();
                }
            }

            // Update the order to mark it as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Trigger the email
            console.log(order);

            // Prepare product names and the correct images based on rarity
            const productNames = order.items.map(item => `<strong>${item.name}</strong>`).join(", ");
            const productImages = order.items.map(item => {
                let selectedImage;
                switch (item.rarity) {
                    case "Standard":
                        selectedImage = item.image[0];
                        break;
                    case "Runed":
                        selectedImage = item.image[1];
                        break;
                    case "Sacred":
                        selectedImage = item.image[2];
                        break;
                    case "Cursed":
                        selectedImage = item.image[3];
                        break;
                    default:
                        selectedImage = ""; // Fallback in case rarity is not recognized
                }
                return `<img src="${selectedImage}" alt="${item.name}" style="max-width: 200px; margin: 5px;">`;
            }).join("");

            // Trigger the email
            await sendPurchaseEmail(
                {
                    body: {
                        email: order.address.email,
                        productNames,
                        productImages // Pass the selected image based on rarity
                    }
                },
                {
                    status: () => ({ json: console.log }) // Simulated response object
                }
            );

            res.json({ success: true });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




//  All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel 
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus }