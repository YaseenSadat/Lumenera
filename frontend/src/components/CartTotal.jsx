/**
 * CartTotal.jsx
 * 
 * This component displays the cart total, including a subtotal,
 * a service fee, and the final total amount. It uses values 
 * from the ShopContext to dynamically calculate amounts.
 */

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import Title from './Title'; // Component for displaying styled titles

const CartTotal = () => {
    // Destructure currency symbol and cart amount calculation function from ShopContext
    const { currency, getCartAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            {/* Title section for the cart total */}
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            {/* Display subtotal, service fee, and total amount */}
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                {/* Subtotal section */}
                <div className='flex justify-between'>
                    <p className='marcellus-bold'>Subtotal</p>
                    <p className='marcellus-bold'>
                        {currency} {getCartAmount().toFixed(2)} {/* Display subtotal formatted to 2 decimal places */}
                    </p>
                </div>
                <hr /> {/* Divider line */}

                {/* Service fee section */}
                <div className='flex justify-between'>
                    <p className='marcellus-bold'>Service Fee</p>
                    <p className='marcellus-bold'>
                        {currency} {(getCartAmount() * 0.15).toFixed(2)} {/* Calculate 15% service fee */}
                    </p>
                </div>
                <hr /> {/* Divider line */}

                {/* Total amount section */}
                <div className='flex justify-between'>
                    <b className='marcellus-bold'>Total</b>
                    <b className='marcellus-bold'>
                        {currency} {(getCartAmount() + (getCartAmount() * 0.15)).toFixed(2)} {/* Add subtotal and service fee */}
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
