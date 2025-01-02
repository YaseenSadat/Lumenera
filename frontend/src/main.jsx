/**
 * main.jsx
 * 
 * Entry point for the React application.
 * This file initializes the React app, sets up context providers, 
 * and wraps the app in a router for enabling client-side routing.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main App component and styles
import App from './App.jsx';
import './index.css';

// Importing BrowserRouter for client-side routing
import { BrowserRouter } from 'react-router-dom';

// Importing ShopContextProvider to manage global application state
import ShopContextProvider from './context/ShopContext.jsx';

// Rendering the React application to the root DOM element
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* Wrapping the app in ShopContextProvider to provide global state */}
    <ShopContextProvider>
      {/* Main application component */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
