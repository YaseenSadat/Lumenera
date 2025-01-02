/**
 * LatestCollection.jsx
 * 
 * This component displays the latest collection of products.
 * It uses the ShopContext to access product data and dynamically
 * renders a grid of the latest collection, limited to 10 products.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import Title from './Title'; // Component for displaying a styled title
import ProductItem from './ProductItem'; // Component for rendering individual product details

const LatestCollection = () => {
  // Accessing the products from ShopContext
  const { products } = useContext(ShopContext);

  // State to store the filtered list of the latest collection
  const [latestCollection, setLatestCollection] = useState([]);

  /**
   * useEffect hook filters the products marked as `latestCollection`.
   * Updates the `latestCollection` state with up to 10 products.
   */
  useEffect(() => {
    const latestProduct = products.filter((item) => item.latestCollection); // Filter latest collection products
    setLatestCollection(latestProduct.slice(0, 10)); // Limit to 10 products
  }, [products]); // Dependency array ensures the effect runs when `products` changes

  return (
    <div className='my-10'>
      {/* Header section with title and description */}
      <div className='text-center py-8 text-3x1'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='marcellus-regular w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Level Up with the Newest and Most Exclusive Cards.
        </p>
      </div>

      {/* Grid layout for rendering the latest collection products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          // Map over the `latestCollection` array to render ProductItem components
          latestCollection.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price.toFixed(2)} // Format price to 2 decimal places
            />
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
