/**
 * Home.jsx
 * 
 * This page represents the homepage of the Lumenera application.
 * It combines multiple key components to showcase the main feature,
 * bestsellers, latest collections, store policies, and a newsletter subscription box.
 */

import React from 'react';
import MainFeature from '../components/MainFeature'; // Highlights the main feature of the store
import LatestCollection from '../components/LatestCollection'; // Displays the latest product collection
import BestSeller from '../components/BestSeller'; // Showcases the best-selling products
import OurPolicy from '../components/OurPolicy'; // Outlines the store's key policies
import NewsletterBox from '../components/NewsletterBox'; // Newsletter subscription box component

const Home = () => {
  return (
    <div>
      {/* Main Feature Section */}
      <MainFeature />

      {/* Best Sellers Section */}
      <BestSeller />

      {/* Latest Collection Section */}
      <LatestCollection />

      {/* Store Policies Section */}
      <OurPolicy />

      {/* Newsletter Subscription Section */}
      <NewsletterBox />
    </div>
  );
};

export default Home;
