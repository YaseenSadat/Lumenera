/**
 * RelatedProducts.jsx
 * 
 * This component displays a grid of related products based on the provided subcategory.
 * It uses the ShopContext to access product data, filters the products to match the 
 * subcategory, and renders up to 5 related products.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import ProductItem from './ProductItem'; // Component for rendering individual product cards
import Title from './Title'; // Component for displaying section titles

const RelatedProducts = ({ subCategory }) => {
    // Accessing the list of products from ShopContext
    const { products } = useContext(ShopContext);

    // State to store the filtered list of related products
    const [related, setRelated] = useState([]);

    /**
     * Filters products to find those that match the provided subcategory.
     * Updates the `related` state with up to 5 matching products.
     */
    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice(); // Clone the products array
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory); // Filter by subcategory
            setRelated(productsCopy.slice(0, 5)); // Limit to 5 products
        }
    }, [products]); // Dependency array ensures the effect runs when `products` changes

    return (
        <div className='my-24'>
            {/* Section Title */}
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            {/* Grid layout for displaying related products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price.toFixed(2)} // Format price to 2 decimal places
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
