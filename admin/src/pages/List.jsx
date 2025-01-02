/**
 * List.jsx
 * 
 * This page displays the list of all products in the database.
 * Admins can view product details and remove products directly from this page.
 * It fetches product data from the backend and handles deletion requests.
 */

import axios from 'axios'; // For making HTTP requests to the backend
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App'; // Backend URL and currency symbol
import { toast } from 'react-toastify'; // For displaying notifications

const List = ({ token }) => {
    // State for storing the list of products
    const [list, setList] = useState([]);

    /**
     * Fetches the product list from the backend and updates the `list` state.
     * Displays an error toast if the request fails.
     */
    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching product list:', error);
            toast.error('An error occurred while fetching the product list.');
        }
    };

    /**
     * Removes a product by its ID by sending a request to the backend.
     * Updates the product list after a successful deletion.
     */
    const removeProduct = async (id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Refresh the product list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('An error occurred while removing the product.');
        }
    };

    // Fetch the product list when the component mounts
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            {/* Page Title */}
            <p className='marcellus-bold mb-2'>All Products List</p>

            {/* Product List Container */}
            <div className='flex flex-col gap-2'>
                {/* Table Header (visible on larger screens) */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-small'>
                    <b className='marcellus-bold'>Image</b>
                    <b className='marcellus-bold'>Name</b>
                    <b className='marcellus-bold'>Category</b>
                    <b className='marcellus-bold'>Price</b>
                    <b className='marcellus-bold text-center'>Action</b>
                </div>

                {/* Product List Rows */}
                {list.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
                        key={index}
                    >
                        {/* Product Image */}
                        <img className='w-12' src={item.image[0]} alt="Product" />

                        {/* Product Name */}
                        <p className='marcellus-regular'>{item.name}</p>

                        {/* Product Category */}
                        <p className='marcellus-regular'>{item.category}</p>

                        {/* Product Price */}
                        <p className='marcellus-regular'>
                            {currency}{item.price.toFixed(2)}
                        </p>

                        {/* Delete Product Action */}
                        <p
                            onClick={() => removeProduct(item._id)}
                            className='marcellus-regular text-right md:text-center cursor-pointer text-lg text-red-500'
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
