import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams ] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            console.log("VERIFYING PAYMENT");
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}})
            if (response.data.success) {
                console.log("SUCCESS");
                setCartItems({});
                navigate('/orders'); // Ensure you redirect here after success
            } else {
                console.log("FAIL");
                navigate('/cart');
            }            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    },[token])

  return (
    <div>
    </div>
  )
}

export default Verify