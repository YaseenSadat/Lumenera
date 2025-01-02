/**
 * App.jsx
 * 
 * This is the main application file for the React app.
 * It sets up the structure and routing for the entire application,
 * including global components like the Navbar and Footer, 
 * and integrates React Toastify for notifications.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing page components for routing
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Importing layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing React Toastify for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px[7vw] lg:px-[9vw]'>
      {/* ToastContainer is used to display notifications across the app */}
      <ToastContainer />

      {/* Navbar is displayed at the top of the application */}
      <Navbar />

      {/* Routes component defines the application's routing structure */}
      <Routes>
        {/* Public routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dynamic route for viewing individual product details */}
        <Route path="/product/:productId" element={<Product />} />

        {/* User-specific routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />

        {/* Verification route */}
        <Route path="/verify" element={<Verify />} />
      </Routes>

      {/* Footer is displayed at the bottom of the application */}
      <Footer />
    </div>
  );
};

export default App;
