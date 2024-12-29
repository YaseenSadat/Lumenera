import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify'; 

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              rarity: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  const handleCheckout = () => {
    // Check if the cart quantity exceeds stock
    for (const item of cartData) {
      const productData = products.find((product) => product._id === item._id);
      if (item.quantity > productData.rarities[item.rarity]) {
        toast.error(`Not enough stock for ${productData.name} (${item.rarity})`);
        return;
      }
    }

    // If all quantities are valid, proceed to checkout
    navigate('/place-order');
  }

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='marcellus-regular text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='marcellus-regular'>{currency}{productData.price}</p>
                      <p className='marcellus-regular px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.rarity}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='marcellus-regular text-xs text-gray-500'>Stock: {productData.rarities[item.rarity]}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.rarity, Number(e.target.value))} className='marcellus-regular border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.rarity, 0)} className='marcellus-regular w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end mt-4'>
            <button onClick={handleCheckout} className='marcellus-regular bg-black text-white text-sm my -8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart