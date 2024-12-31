import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, service_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm '>
                <div className='flex justify-between'>
                    <p className='marcellus-bold'>Subtotal</p>
                    <p className='marcellus-bold'>{currency} {getCartAmount().toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='marcellus-bold'>Service Fee</p>
                    <p className='marcellus-bold'>{currency} {service_fee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b className='marcellus-bold'>Total</b>
                    <b className='marcellus-bold'>
                        {currency} {(getCartAmount() === 0 ? 0 : (getCartAmount() + service_fee)).toFixed(2)}
                    </b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal