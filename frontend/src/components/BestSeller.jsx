/**
 * BestSeller.jsx
 * 
 * This component displays the top 5 best-selling products.
 * It uses the ShopContext to access product data and dynamically 
 * renders a grid of best-seller products.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import Title from './Title'; // Component for displaying a styled title
import ProductItem from './ProductItem'; // Component for displaying individual product details

const BestSeller = () => {
    // Accessing the list of products from ShopContext
    const { products } = useContext(ShopContext);

    // State to store the filtered list of best-selling products
    const [bestSeller, setBestSeller] = useState([]);

    /**
     * useEffect hook runs when the `products` data changes.
     * Filters products to find those marked as `bestseller`
     * and selects the top 5 for display.
     */
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller); // Filter products with `bestseller` flag
        setBestSeller(bestProduct.slice(0, 5)); // Update state with top 5 best sellers
    }, [products]); // Dependency array ensures the effect runs when `products` changes

    return (
        <div className='my-10'>
            {/* Header section with title and description */}
            <div className='text-center text-3x1 py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='marcellus-regular w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Your Go-To Cards for Victory and Collection.
                </p>
            </div>

            {/* Grid layout for displaying best-selling products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    // Map over the `bestSeller` array to render ProductItem components
                    bestSeller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price.toFixed(2)} // Format price to 2 decimal places
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default BestSeller;
