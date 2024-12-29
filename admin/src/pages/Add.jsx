import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

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
    const [rarities, setRarities] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("subCategory",subCategory)
            formData.append("bestseller",bestseller)
            formData.append("rarities",JSON.stringify(rarities))
            
            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
            
            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='marcellus-semibold mb-2'>Upload Image</p>

            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                </label>
                <label htmlFor="image2">
                    <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                </label>
                <label htmlFor="image3">
                    <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                </label>
                <label htmlFor="image4">
                    <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                </label>
            </div>
        </div>
        <div className='w-full'>
            <p className='marcellus-semibold mb-2'>Product Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='marcellus-regular w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>
        <div className='w-full'>
            <p className='marcellus-semibold mb-2'>Product Description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='marcellus-regular w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='marcellus-semibold mb-2'>Product Tier</p>
                <select onChange={(e)=>setCategory(e.target.value)} className='marcellus-regular w-full px-3 py-2'>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                </select>
            </div>
            <div>
                <p className='marcellus-semibold mb-2'>Product Type</p>
                <select onChange={(e)=>setSubCategory(e.target.value)} className='marcellus-regular w-full px-3 py-2'>
                    <option value="Item">Item</option>
                    <option value="Human">Human</option>
                    <option value="Monster">Monster</option>
                    <option value="Spirit">Spirit</option>
                    <option value="Dragon">Dragon</option>

                </select>
            </div>
            <div>
                <p className='marcellus-semibold mb-2'>Product Price</p>
                <input onChange={(e)=>setPrice(e.target.value)} value={price} className='marcellus-regular w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='9.99' />
            </div>
        </div>
        <div className='mb-2'>
            <p className='marcellus-semibold mb-2'>Product Rarities</p>
            <div className='flex gap-3'>
                <div onClick={()=>setRarities(prev => prev.includes("Standard") ? prev.filter(item => item !== "Standard") : [...prev,"Standard"])} >
                    <p className={`${rarities.includes("Standard") ? "marcellus-regular bg-black text-white" : "marcellus-regular bg-slate-200"} px-3 py-1 cursor-pointer`}>Standard</p>
                </div>
                <div onClick={()=>setRarities(prev => prev.includes("Runed") ? prev.filter(item => item !== "Runed") : [...prev,"Runed"])} >
                    <p className={`${rarities.includes("Runed") ? "marcellus-regular bg-black text-white" : "marcellus-regular bg-slate-200"} px-3 py-1 cursor-pointer`}>Runed</p>
                </div>
                <div onClick={()=>setRarities(prev => prev.includes("Sacred") ? prev.filter(item => item !== "Sacred") : [...prev,"Sacred"])} >
                    <p className={`${rarities.includes("Sacred") ? "marcellus-regular bg-black text-white" : "marcellus-regular bg-slate-200"} px-3 py-1 cursor-pointer`}>Sacred</p>
                </div>
                <div onClick={()=>setRarities(prev => prev.includes("Cursed") ? prev.filter(item => item !== "Cursed") : [...prev,"Cursed"])} >
                    <p className={`${rarities.includes("Cursed") ? "marcellus-regular bg-black text-white" : "marcellus-regular bg-slate-200"} px-3 py-1 cursor-pointer`}>Cursed</p>
                </div>   
            </div>
        </div>

        <div className='flex items-center gap-2 mt-2'>
            <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
            <label className='marcellus-semibold cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>
        <button type='submit' className='marcellus-semibold w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>

  )
}

export default Add