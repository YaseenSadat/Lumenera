/**
 * Product.jsx
 * 
 * This page displays the details of a specific product. It allows users to:
 * - View product images and descriptions.
 * - Select a rarity (if applicable) for the product.
 * - Add the product to their cart.
 * - View related products based on the subcategory.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing URL parameters
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import RelatedProducts from '../components/RelatedProducts'; // Component for displaying related products

const Product = () => {
  const { productId } = useParams(); // Extracting the product ID from the URL
  const { products, currency, addToCart } = useContext(ShopContext); // Accessing global state and methods
  const [productData, setProductData] = useState(false); // State for storing product details
  const [image, setImage] = useState(''); // State for managing the selected image
  const [rarity, setRarity] = useState(''); // State for managing the selected rarity

  /**
   * Fetches the product data based on the product ID from the URL.
   * Sets the initial image and rarity for the product.
   */
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Default to the first image
        setRarity('Standard'); // Default to "Standard" rarity
        return null;
      }
    });
  };

  // Fetch product data when the component mounts or when the product ID changes
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Details Section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                src={img}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt="Product"
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="Selected Product" />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          {/* Product Name and Price */}
          <h1 className='marcellus-regular font-medium text-2x1 mt-2'>{productData.name}</h1>
          <p className='marcellus-regular mt-5 text-3xl font-medium'>
            {currency}{productData.price.toFixed(2)}
          </p>
          <p className='marcellus-regular mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Select Rarity Section */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='marcellus-regular'>Select Rarity</p>
            <div className='flex gap-2'>
              {productData.rarities && Object.entries(productData.rarities).map(([rarityKey, stock], index) => {
                const displayRarities = {
                  Gold: ['Standard', 'Runed', 'Sacred', 'Cursed'],
                  Silver: ['Standard', 'Runed'],
                  Bronze: ['Standard'],
                };

                // Ensure the rarity is applicable for the product category
                if (!displayRarities[productData.category].includes(rarityKey)) return null;

                return (
                  <button
                    onClick={() => {
                      setRarity(rarityKey);
                      const rarityToImageMap = {
                        Standard: productData.image[0],
                        Runed: productData.image[1],
                        Sacred: productData.image[2],
                        Cursed: productData.image[3],
                      };
                      setImage(rarityToImageMap[rarityKey]);
                    }}
                    className={`marcellus-regular text-sm border py-2 px-4 ${rarity === rarityKey ? 'border-orange-500' : ''
                      }`}
                    key={index}
                  >
                    {rarityKey} (Stock: {stock})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, rarity)}
            className='marcellus-regular bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          {/* Additional Information */}
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p className='marcellus-regular'>100% Authentic Cards</p>
            <p className='marcellus-regular'>Fast and Secure Delivery</p>
            <p className='marcellus-regular'>Meticulously Designed</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='mt-20'>
        <div className='flex '>
          <b className='marcellus-regular border px-5 py-3 text-md'>Overview</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
          <p>
            Every Lumenera card is designed to ignite your imagination and elevate your strategy.
            With exquisite detail and unmatched authenticity, this card is ready to shine in your
            collection or game.
          </p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
