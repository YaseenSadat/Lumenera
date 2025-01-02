/**
 * index.js
 * 
 * This is the entry point for the admin package of the application.
 * It initializes the React application, wraps the `App` component with a `BrowserRouter`
 * for client-side routing, and renders the app into the root DOM element.
 */

import React from 'react';
import ReactDOM from 'react-dom/client'; // For rendering the React app
import App from './App.jsx'; // Main application component
import './index.css'; // Global styles
import { BrowserRouter } from 'react-router-dom'; // For enabling routing in the app

// Rendering the React application into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App /> {/* Wrapping the main application with `BrowserRouter` for routing */}
  </BrowserRouter>
);
