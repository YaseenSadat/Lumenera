/**
 * Collection.jsx
 * 
 * This page represents the "Collection" section of the Lumenera application.
 * It allows users to browse all available products, filter by categories, subcategories,
 * or search terms, and sort the displayed products by relevance or price.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import { assets } from '../assets/assets'; // Importing assets like icons
import Title from '../components/Title'; // Title component for section headers
import ProductItem from '../components/ProductItem'; // Component for rendering individual product cards

const Collection = () => {
  // Accessing global state and context values
  const { products, search: globalSearch, showSearch } = useContext(ShopContext);

  // Local state for filters and search
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavance');
  const [localSearch, setLocalSearch] = useState('');

  /**
   * Toggles category selection for filtering.
   */
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  /**
   * Toggles subcategory selection for filtering.
   */
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  /**
   * Applies all active filters to the product list.
   * Filters by global search, local search, categories, and subcategories.
   */
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && globalSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(globalSearch.toLowerCase())
      );
    }

    if (localSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(localSearch.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  /**
   * Sorts the filtered product list based on the selected sort type.
   */
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Apply filters when relevant dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, globalSearch, showSearch, localSearch, products]);

  // Sort products when the sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        {/* Filter Toggle for Small Screens */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='marcellus-regular my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='marcellus-regular mb-3 text-sm font-medium'>Tiers</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Bronze', 'Silver', 'Gold'].map((tier) => (
              <p key={tier} className='marcellus-regular flex items-center gap-2'>
                <input className='w-3' type='checkbox' value={tier} onChange={toggleCategory} />
                {tier}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='marcellus-regular mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Item', 'Human', 'Monster', 'Spirit', 'Dragon'].map((type) => (
              <p key={type} className='marcellus-regular flex items-center gap-2'>
                <input className='w-3' type='checkbox' value={type} onChange={toggleSubCategory} />
                {type}
              </p>
            ))}
          </div>
        </div>

        {/* Local Search Bar */}
        <div className={`marcellus-regular border border-gray-300 p-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <input
            type='text'
            placeholder='Search products...'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className='w-full border border-gray-300 px-2 py-1 text-sm'
          />
        </div>
      </div>

      {/* Product Listing */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='marcellus-regular border-2 border-gray-300 text-sm px-2'
          >
            <option value='relavance'>Relavance</option>
            <option value='low-high'>Price: Low-High</option>
            <option value='high-low'>Price: High-Low</option>
          </select>
        </div>

        {/* Render Filtered and Sorted Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price.toFixed(2)} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
