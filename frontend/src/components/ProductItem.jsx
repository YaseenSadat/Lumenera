/**
 * ProductItem.jsx
 * 
 * This component represents an individual product card in the product listing or grid.
 * It displays the product's image, name, and price, and links to the detailed product page.
 */

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import { Link } from 'react-router-dom'; // For navigation to the product details page

const ProductItem = ({ id, image, name, price }) => {
    // Accessing the currency symbol from the ShopContext
    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            {/* Product Image */}
            <div className='overflow-hidden'>
                <img 
                    className='hover:scale-110 transition ease-in-out' 
                    src={image[0]} 
                    alt={`${name} image`} 
                />
            </div>

            {/* Product Name */}
            <p className='marcellus-bold pt-3 pb-1 text-sm'>{name}</p>

            {/* Product Price */}
            <p className='marcellus-regular text-sm font-medium'>
                {currency}{price}
            </p>
        </Link>
    );
}

export default ProductItem;
