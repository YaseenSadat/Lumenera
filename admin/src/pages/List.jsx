import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'


const List = ({token}) => {

    const [list,setList] = useState([])
    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchList()
    },[])

  return (
    <>
        <p className='marcellus-bold mb-2'>All Products List</p>
        <div className='flex flex-col gap-2'>

            {/* List Table Title */}
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-small'>
                <b className='marcellus-bold'>Image</b>
                <b className='marcellus-bold'>Name</b>
                <b className='marcellus-bold'>Category</b>
                <b className='marcellus-bold'>Price</b>
                <b className='marcellus-bold text-center'>Action</b>
            </div>

            {/* Product List */}
            {
                list.map((item,index)=> (
                    <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 bprder text-sm' key={index}>
                        <img className='w-12' src={item.image[0]} alt="" />
                        <p className='marcellus-regular'>{item.name}</p>
                        <p className='marcellus-regular'>{item.category}</p>
                        <p className='marcellus-regular'>{currency}{item.price}</p>
                        <p onClick={()=>removeProduct(item._id)} className='marcellus-regular text-right md:text-center cursor-pointer text-lg'>X</p>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default List