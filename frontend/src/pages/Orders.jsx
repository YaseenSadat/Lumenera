/**
 * Orders.jsx
 * 
 * This page displays the user's past orders. It fetches order data from the backend,
 * including details like item name, price, quantity, rarity, order date, payment method,
 * and order status. The user can also refresh the order status using the "Update Status" button.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import Title from '../components/Title'; // Title component for section headers
import axios from 'axios'; // For making HTTP requests to the backend

const Orders = () => {
  // Destructuring required context values
  const { backendUrl, token, currency } = useContext(ShopContext);

  // State to store order data
  const [orderData, setOrderData] = useState([]);

  /**
   * Fetches order data for the authenticated user from the backend.
   * Populates `orderData` with detailed item information, including order status, payment, and date.
   */
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null; // Do nothing if no token is available
      }

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            // Append additional order-level details to each item
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });

        // Reverse order data to show the latest orders first
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  // Fetch order data when the component mounts or when the token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      {/* Page Title */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Order Details */}
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* Order Item Information */}
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='marcellus-bold sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p className='marcellus-regular'>
                    {currency}{item.price.toFixed(2)}
                  </p>
                  <p className='marcellus-regular'>Quantity: {item.quantity}</p>
                  <p className='marcellus-regular'>Rarity: {item.rarity}</p>
                </div>
                <p className='marcellus-regular mt-1'>
                  Date: <span className='marcellus-regular text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='marcellus-regular mt-1'>
                  Payment: <span className='marcellus-regular text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status and Update Button */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='marcellus-regular text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className='marcellus-bold border px-4 py-2 text-sm font-medium rounded-sm'
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
