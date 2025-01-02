/**
 * Add.jsx
 * 
 * This page allows admins to add new products to the database.
 * It collects product details, including name, description, price, 
 * category, subcategory, rarities, stock, and images. The data is sent 
 * to the backend for processing and storage.
 */

import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Importing assets for upload icons
import axios from 'axios'; // For making HTTP requests to the backend
import { backendUrl } from '../App'; // Backend URL defined in the App component
import { toast } from 'react-toastify'; // For displaying notifications

const Add = ({ token }) => {
    // States for managing product details
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Bronze");
    const [subCategory, setSubCategory] = useState("Human");
    const [bestseller, setBestseller] = useState(false);
    const [latestCollection, setLatestCollection] = useState(false);
    const [rarities, setRarities] = useState({
        Standard: 0,
        Runed: 0,
        Sacred: 0,
        Cursed: 0
    });

    /**
     * Handles the form submission to add a new product.
     * Prepares and sends the product data, including images and rarities, to the backend.
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append product details to the form data
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("latestCollection", latestCollection);
            formData.append("rarities", JSON.stringify(rarities));

            // Append images if they exist
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            // Send product data to the backend
            const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);

                // Reset form fields on successful submission
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setRarities({ Standard: 0, Runed: 0, Sacred: 0, Cursed: 0 });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding the product. Please try again.');
        }
    };

    /**
     * Updates the stock quantity for a specific rarity.
     */
    const handleRarityChange = (rarity, value) => {
        setRarities((prev) => ({ ...prev, [rarity]: Number(value) }));
    };

    return (
        // Form for adding a new product
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            {/* Upload Images */}
            <div>
                <p className='marcellus-semibold mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {[image1, image2, image3, image4].map((image, index) => (
                        <label htmlFor={`image${index + 1}`} key={index}>
                            <img
                                className='w-20'
                                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                                alt="Upload Preview"
                            />
                            <input
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (index === 0) setImage1(file);
                                    else if (index === 1) setImage2(file);
                                    else if (index === 2) setImage3(file);
                                    else if (index === 3) setImage4(file);
                                }}
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Details */}
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='marcellus-regular w-full max-w-[500px] px-3 py-2'
                    type="text"
                    placeholder='Type here'
                    required
                />
            </div>
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='marcellus-regular w-full max-w-[500px] px-3 py-2'
                    placeholder='Write content here'
                    required
                />
            </div>

            {/* Dropdowns and Price */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Tier</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='marcellus-regular w-full px-3 py-2'
                    >
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                    </select>
                </div>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Type</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        className='marcellus-regular w-full px-3 py-2'
                    >
                        <option value="Item">Item</option>
                        <option value="Human">Human</option>
                        <option value="Monster">Monster</option>
                        <option value="Spirit">Spirit</option>
                        <option value="Dragon">Dragon</option>
                    </select>
                </div>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className='marcellus-regular w-full px-3 py-2 sm:w-[120px]'
                        type="number"
                        placeholder='9.99'
                        required
                    />
                </div>
            </div>

            {/* Rarities and Stock */}
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Rarities & Stock</p>
                <div className='flex flex-col gap-3'>
                    {Object.entries(rarities).map(([rarity, stock]) => (
                        <div key={rarity} className='flex items-center gap-2'>
                            <p className='marcellus-regular w-[100px]'>{rarity}</p>
                            <input
                                type="number"
                                value={stock || ''}
                                onChange={(e) => handleRarityChange(rarity, e.target.value)}
                                className='marcellus-regular border px-3 py-1 w-[120px]'
                                min="0"
                                placeholder="Stock"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestseller and Latest Collection */}
            <div className='flex flex-col gap-2 mt-2'>
                <div className='flex items-center gap-2'>
                    <input
                        onChange={() => setBestseller((prev) => !prev)}
                        checked={bestseller}
                        type="checkbox"
                        id="bestseller"
                    />
                    <label className='marcellus-semibold cursor-pointer' htmlFor="bestseller">
                        Add to Bestseller
                    </label>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                    <input
                        onChange={() => setLatestCollection((prev) => !prev)}
                        checked={latestCollection}
                        type="checkbox"
                        id="latestCollection"
                    />
                    <label className='marcellus-semibold cursor-pointer' htmlFor="latestCollection">
                        Add to Latest Collection
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type='submit'
                className='marcellus-semibold w-28 py-3 mt-4 bg-black text-white'
            >
                ADD
            </button>
        </form>
    );
};

export default Add;
