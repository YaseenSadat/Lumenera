/**
 * PlaceOrder.jsx
 * 
 * This page handles the order placement process. It collects user delivery 
 * information, calculates the order total, and integrates with a payment gateway 
 * (e.g., Stripe) to process the payment. The form validates required fields and 
 * handles submission securely.
 */

import React, { useContext, useState } from 'react';
import Title from '../components/Title'; // Component for section titles
import CartTotal from '../components/CartTotal'; // Component for displaying cart totals
import { assets } from '../assets/assets'; // Importing assets such as images
import { ShopContext } from '../context/ShopContext'; // Global state context
import axios from 'axios'; // For making HTTP requests
import { toast } from 'react-toastify'; // For displaying notifications

const PlaceOrder = () => {
  // State for managing the selected payment method
  const [method, setMethod] = useState('stripe');

  // Accessing global state and helper methods
  const { backendUrl, token, cartItems, products, getCartAmount } = useContext(ShopContext);

  // State for managing form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  /**
   * Handles input changes and updates the corresponding field in `formData`.
   */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  /**
   * Handles form submission, validates inputs, and sends the order data to the backend.
   * Integrates with the payment gateway (e.g., Stripe) to process payments.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Prepare order items by processing the cart items
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.rarity = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Create order data object
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
      };

      // Handle payment processing based on the selected method
      switch (method) {
        case 'stripe': {
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
            headers: { token },
          });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url); // Redirect to Stripe session
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing your order. Please try again.');
    }
  };

  return (
    // Form layout for order placement
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side: Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Input fields for delivery details */}
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="province"
            value={formData.province}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Province"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="postalCode"
            value={formData.postalCode}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Postal Code/Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="marcellus-regular border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone Number"
        />
        <p className="marcellus-regular text-xs text-gray-500 mt-1">
          * Please provide a valid email address as it will be where the product is sent. *
        </p>
      </div>

      {/* Right Side: Cart Total and Payment Method */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''
                  }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="marcellus-regular bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
            <p className="text-xs text-gray-500 mt-2">
              *Ensure you are logged in before placing your order
            </p>
          </div>
        </div>
      </div>
    </form>

  );
};

export default PlaceOrder;
