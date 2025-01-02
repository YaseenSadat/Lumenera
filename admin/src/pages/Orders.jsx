/**
 * Orders.jsx
 * 
 * This page allows admins to view and manage all customer orders.
 * Admins can update the order status, view order details, and see customer information.
 * It fetches the order data from the backend and allows real-time updates.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { backendUrl, currency } from '../App'; // Backend URL and currency symbol
import { toast } from 'react-toastify'; // For displaying notifications
import { assets } from '../assets/assets'; // Importing assets such as icons

const Orders = ({ token }) => {
  // State for storing all orders
  const [orders, setOrders] = useState([]);

  /**
   * Fetches all orders from the backend and updates the `orders` state.
   * Displays an error toast if the request fails.
   */
  const fetchAllOrders = async () => {
    if (!token) return null; // Exit if no authentication token exists

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });

      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Reverse the order list to show the latest first
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('An error occurred while fetching orders.');
    }
  };

  /**
   * Handles the order status update.
   * Sends the updated status to the backend and refreshes the order list on success.
   */
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders(); // Refresh the orders list
        toast.success('Order status updated successfully.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating the order status.');
    }
  };

  // Fetch all orders when the component mounts or when the token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      {/* Page Title */}
      <h3 className='marcellus-bold'>Order Page</h3>

      {/* Orders List */}
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            {/* Order Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />

            {/* Order Items and Customer Info */}
            <div>
              <div>
                {/* List of Items in the Order */}
                {order.items.map((item, itemIndex) => (
                  <p className='py-0.5' key={itemIndex}>
                    {item.name} x {item.quantity} <span>{item.rarity}</span>
                    {itemIndex < order.items.length - 1 ? ',' : ''}
                  </p>
                ))}
              </div>
              {/* Customer Details */}
              <p className='marcellus-semibold mt-3 mb-2'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className='marcellus-semibold mt-3 mb-2'>{order.address.email}</p>
              <div>
                <p className='marcellus-regular'>{order.address.address},</p>
                <p className='marcellus-regular'>
                  {order.address.city}, {order.address.province}, {order.address.country}, {order.address.postalCode}
                </p>
              </div>
              <p className='marcellus-regular'>{order.address.phone}</p>
            </div>

            {/* Order Summary */}
            <div>
              <p className='marcellus-bold text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='marcellus-regular mt-3'>Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Order Amount */}
            <p className='marcellus-bold text-sm sm:text-[15px]'>
              {currency}{order.amount.toFixed(2)}
            </p>

            {/* Order Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='marcellus-regular p-2'
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Finalizing">Finalizing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
