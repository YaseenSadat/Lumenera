import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Bronze");
    const [subCategory, setSubCategory] = useState("Human");
    const [bestseller, setBestseller] = useState(false);
    const [rarities, setRarities] = useState({
        Standard: 0,
        Runed: 0,
        Sacred: 0,
        Cursed: 0
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("rarities", JSON.stringify(rarities))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
                setRarities({ Standard: 0, Runed: 0, Sacred: 0, Cursed: 0 })
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleRarityChange = (rarity, value) => {
        setRarities(prev => ({ ...prev, [rarity]: Number(value) }));
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='marcellus-semibold mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {[image1, image2, image3, image4].map((image, index) => (
                        <label htmlFor={`image${index + 1}`} key={index}>
                            <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                            <input onChange={(e) => {
                                if (index === 0) setImage1(e.target.files[0]);
                                else if (index === 1) setImage2(e.target.files[0]);
                                else if (index === 2) setImage3(e.target.files[0]);
                                else if (index === 3) setImage4(e.target.files[0]);
                            }} type="file" id={`image${index + 1}`} hidden />
                        </label>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='marcellus-regular w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='marcellus-regular w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Tier</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='marcellus-regular w-full px-3 py-2'>
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                    </select>
                </div>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Type</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='marcellus-regular w-full px-3 py-2'>
                        <option value="Item">Item</option>
                        <option value="Human">Human</option>
                        <option value="Monster">Monster</option>
                        <option value="Spirit">Spirit</option>
                        <option value="Dragon">Dragon</option>
                    </select>
                </div>
                <div>
                    <p className='marcellus-semibold mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='marcellus-regular w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='9.99' />
                </div>
            </div>
            <div className='w-full'>
                <p className='marcellus-semibold mb-2'>Product Rarities & Stock</p>
                <div className='flex flex-col gap-3'>
                    {Object.entries(rarities).map(([rarity, stock]) => (
                        <div key={rarity} className='flex items-center gap-2'>
                            <p className='marcellus-regular w-[100px]'>{rarity}</p>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => handleRarityChange(rarity, e.target.value)}
                                className='marcellus-regular border px-3 py-1 w-[120px]'
                                min="0"
                                placeholder="Stock"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label className='marcellus-semibold cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>
            <button type='submit' className='marcellus-semibold w-28 py-3 mt-4 bg-black text-white'>ADD</button>
        </form>
    )
}

export default Add
