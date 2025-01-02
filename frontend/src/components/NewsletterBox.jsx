/**
 * NewsletterBox.jsx
 * 
 * This component renders a subscription box where users can enter their email
 * address to subscribe to a newsletter. It integrates with the backend to handle
 * subscription requests and provides feedback messages based on the response.
 */

import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import axios from 'axios'; // For making HTTP requests to the backend

const NewsletterBox = () => {
    // State to store the entered email address
    const [email, setEmail] = useState('');

    // State to store feedback messages after form submission
    const [message, setMessage] = useState('');

    // Accessing the backend URL from the ShopContext
    const { backendUrl } = useContext(ShopContext);

    /**
     * Handles form submission for newsletter subscription.
     * Sends the email to the backend and displays a success or failure message.
     */
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Send email data to the backend endpoint
            const response = await axios.post(`${backendUrl}/api/email/subscribe`, { email });

            if (response.data.success) {
                // Successful subscription
                setMessage('Thank you for subscribing! Check your email for exciting updates.');
                setEmail(''); // Clear the email input field
            } else {
                // Subscription failed
                setMessage('Subscription failed. Please try again.');
            }
        } catch (error) {
            // Handle errors from the backend or network
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="text-center">
            {/* Header for the subscription box */}
            <p className="marcellus-regular text-2xl font-medium text-gray-800">
                Get exclusive insights and tips, subscribe now!
            </p>
            <p className="marcellus-regular text-gray-400 mt-3">
                Be the first to know about new arrivals, exclusive offers, and special events.
            </p>

            {/* Form for email input and subscription */}
            <form
                onSubmit={onSubmitHandler}
                className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
            >
                {/* Email input field */}
                <input
                    className="marcellus-regular w-full sm:flex-1 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    required // Make the email field mandatory
                />

                {/* Submit button */}
                <button
                    type="submit"
                    className="marcellus-bold font-bold bg-black text-white text-xs px-10 py-4"
                >
                    SUBSCRIBE
                </button>
            </form>

            {/* Feedback message displayed after form submission */}
            {message && (
                <p className="marcellus-regular text-sm text-gray-600 mt-4">{message}</p>
            )}
        </div>
    );
};

export default NewsletterBox;
