/**
 * ShopContext.jsx
 * 
 * This file defines the ShopContext and its provider component.
 * It manages the global state of the application, including products, cart items,
 * user authentication token, and search functionality. It also handles interactions
 * with the backend for cart and product data.
 */

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; // For showing toast notifications
import { useNavigate } from "react-router-dom"; // For navigation within the app
import axios from 'axios'; // For making HTTP requests

// Creating the ShopContext for global state management
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Global application constants and state variables
    const currency = '$'; // Currency symbol for the app
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend base URL from environment variables
    const [search, setSearch] = useState(''); // Search query state
    const [showSearch] = useState(false); // Toggle visibility of search input
    const [cartItems, setCartItems] = useState({}); // Stores items in the user's cart
    const [products, setProducts] = useState([]); // List of products fetched from backend
    const [token, setToken] = useState(''); // User authentication token
    const navigate = useNavigate(); // Navigation helper

    /**
     * Adds a product to the cart with specified rarity.
     * Validates the product and rarity, updates local state,
     * and sends the cart update to the backend if authenticated.
     */
    const addToCart = async (itemId, rarity) => {
        if (!rarity) {
            toast.error('Select Product Rarity');
            return;
        }

        let cartData = structuredClone(cartItems); // Clone current cart state
        const productData = products.find(product => product._id === itemId); // Find product details

        if (!productData) {
            toast.error("Product not found");
            return;
        }

        const availableStock = productData.rarities[rarity]; // Check stock for the selected rarity

        if (cartData[itemId]) {
            if (cartData[itemId][rarity] !== undefined) {
                if (cartData[itemId][rarity] + 1 <= availableStock) {
                    cartData[itemId][rarity] += 1; // Increment quantity
                } else {
                    toast.error("Insufficient stock for this product.");
                    return;
                }
            } else {
                cartData[itemId][rarity] = 1; // Add new rarity to cart
            }
        } else {
            cartData[itemId] = { [rarity]: 1 }; // Add new item with rarity
        }

        setCartItems(cartData); // Update cart state

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, rarity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    /**
     * Calculates the total number of items in the cart.
     * Iterates through cart data and sums up the quantities.
     */
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    };

    /**
     * Updates the quantity of a specific item in the cart.
     * Reflects changes in local state and sends the update to the backend.
     */
    const updateQuantity = async (itemId, rarity, quantity) => {
        let cartData = structuredClone(cartItems); // Clone cart data
        cartData[itemId][rarity] = quantity; // Update quantity for the item

        setCartItems(cartData); // Update cart state

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, rarity, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    /**
     * Calculates the total cost of items in the cart.
     * Uses product data and cart quantities to compute the total.
     */
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const rarity in cartItems[itemId]) {
                    if (cartItems[itemId][rarity] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][rarity];
                    }
                }
            }
        }
        return totalAmount;
    };

    /**
     * Fetches the list of products from the backend and updates the state.
     * Displays an error notification if the request fails.
     */
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    /**
     * Fetches the user's cart data from the backend and updates the cart state.
     */
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Fetch product data on component mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Retrieve token from localStorage and fetch user cart on load
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    // Provide context value to children
    const value = {
        products,
        currency,
        search,
        setSearch,
        showSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
