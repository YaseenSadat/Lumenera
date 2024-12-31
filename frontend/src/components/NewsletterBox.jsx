import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const {backendUrl} = useContext(ShopContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            // Send email to the backend
            const response = await axios.post(backendUrl + '/api/email/subscribe', { email });
            if (response.data.success) {
                setMessage('Thank you for subscribing! Check your email for exciting updates.');
                setEmail(''); // Clear the input field
            } else {
                setMessage('Subscription failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="text-center">
            <p className="marcellus-regular text-2xl font-medium text-gray-800">
                Get exclusive insights and tips, subscribe now!
            </p>
            <p className="marcellus-regular text-gray-400 mt-3">
                Be the first to know about new arrivals, exclusive offers, and special events.
            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input
                    className="marcellus-regular w-full sm:flex-1 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="marcellus-bold font-bold bg-black text-white text-xs px-10 py-4">
                    SUBSCRIBE
                </button>
            </form>
            {message && <p className="marcellus-regular text-sm text-gray-600 mt-4">{message}</p>}
        </div>
    );
};

export default NewsletterBox;
