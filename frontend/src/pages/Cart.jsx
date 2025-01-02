/**
 * Cart.jsx
 * 
 * This page represents the shopping cart of the Lumenera application.
 * It displays all the items in the user's cart, allows updating quantities,
 * and handles navigation to the checkout process. It also verifies stock 
 * availability before proceeding to checkout.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import Title from '../components/Title'; // Title component for section headers
import { assets } from '../assets/assets'; // Importing assets like icons
import CartTotal from '../components/CartTotal'; // Component for displaying cart total
import { toast } from 'react-toastify'; // For showing toast notifications

const Cart = () => {
  // Accessing required context data and methods
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  // State to store processed cart data for rendering
  const [cartData, setCartData] = useState([]);

  /**
   * Processes `cartItems` and matches them with `products` to build a detailed
   * list of cart items with relevant data like name, image, and stock availability.
   */
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              rarity: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  /**
   * Handles the checkout process by validating the cart data.
   * Ensures the cart is not empty and that the quantities do not exceed stock availability.
   * Navigates to the checkout page if all validations pass.
   */
  const handleCheckout = () => {
    if (cartData.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    for (const item of cartData) {
      const productData = products.find((product) => product._id === item._id);
      if (item.quantity > productData.rarities[item.rarity]) {
        toast.error(`Not enough stock for ${productData.name} (${item.rarity})`);
        return;
      }
    }

    navigate('/place-order');
  };

  return (
    <div className='border-t pt-14'>
      {/* Cart Title */}
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              {/* Product Information */}
              <div className='flex items-start gap-6'>
                {productData.image && productData.image.length > 0 && (
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                )}
                <div>
                  <p className='marcellus-regular text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='marcellus-regular'>
                      {currency}
                      {productData.price.toFixed(2)}
                    </p>
                    <p className='marcellus-regular px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                      {item.rarity}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='marcellus-regular text-xs text-gray-500'>
                      Stock: {productData.rarities[item.rarity]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.rarity, Number(e.target.value))
                }
                className='marcellus-regular border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Button */}
              <img
                onClick={() => updateQuantity(item._id, item.rarity, 0)}
                className='marcellus-regular w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total and Checkout Button */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end mt-4'>
            <button
              onClick={handleCheckout}
              className='marcellus-regular bg-black text-white text-sm my -8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
