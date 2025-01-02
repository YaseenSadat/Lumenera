/**
 * Verify.jsx
 * 
 * This page handles the verification of payments made via Stripe.
 * It uses query parameters (`success` and `orderId`) to confirm the payment status
 * and updates the cart and order status accordingly. On success, it redirects the user 
 * to the "Orders" page; otherwise, it redirects them back to the cart.
 */

import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import { useSearchParams } from 'react-router-dom'; // For handling URL search parameters
import { toast } from 'react-toastify'; // For displaying notifications
import axios from 'axios'; // For making HTTP requests

const Verify = () => {
    // Accessing context values and helper functions
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

    // Extracting query parameters from the URL
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success'); // Payment success flag
    const orderId = searchParams.get('orderId'); // Order ID for verification

    /**
     * Verifies the payment status with the backend using the `success` flag and `orderId`.
     * Clears the cart on successful verification and redirects to the "Orders" page.
     * Redirects to the cart on failure.
     */
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null; // Exit if no authentication token is available
            }
            console.log("VERIFYING PAYMENT");

            // Send verification request to the backend
            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { success, orderId },
                { headers: { token } }
            );

            if (response.data.success) {
                console.log("SUCCESS");
                setCartItems({}); // Clear the cart
                navigate('/orders'); // Redirect to "Orders" page
            } else {
                console.log("FAIL");
                navigate('/cart'); // Redirect back to the cart
            }
        } catch (error) {
            console.error("Error during payment verification:", error);
            toast.error('An error occurred while verifying payment. Please try again.');
        }
    };

    // Trigger payment verification when the component mounts or when the token changes
    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div>
            {/* Empty page content as the logic is handled automatically */}
        </div>
    );
};

export default Verify;
