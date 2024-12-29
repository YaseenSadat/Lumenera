import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

const {productId} = useParams();
const {products, currency, addToCart } = useContext(ShopContext);
const [productData, setProductData] = useState(false);
const [image, setImage] = useState('');
const [rarity, setRarity] = useState('');

const fetchProductData = async () => {

  products.map((item)=>{
    if (item._id === productId) {
      setProductData(item)
      setImage(item.image[0])
      return null;
    }
  })

}

useEffect(()=> {
  fetchProductData();
}, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
              <h1 className='marcellus-regular font-medium text-2x1 mt-2'>{productData.name}</h1>
              <p className='marcellus-regular mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='marcellus-regular mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                <p className='marcellus-regular'>Select Rarity</p>
                <div className='flex gap-2'>
                  {productData.rarities.map((item,index)=>(
                    <button onClick={()=>setRarity(item)} className={`marcellus-regular border py-2 px-4 bg-gray-100 ${item === rarity ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                  ))}
                </div>
              </div>
              <button onClick={()=>addToCart(productData._id, rarity)} className='marcellus-regular bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p className='marcellus-regular'>100% Authentic Cards</p>
                <p className='marcellus-regular'>Fast and Secure Delivery</p>
                <p className='marcellus-regular'>Meticulously Designed</p>
              </div>
        </div>
      </div>
      {/* Description*/}
      <div className='mt-20'>
        <div className='flex '>
          <b className='marcellus-regular border px-5 py-3 text-md'>Overview</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
          <p>Every Lumenera card is designed to ignite your imagination and elevate your strategy. With exquisite detail and unmatched authenticity, this card is ready to shine in your collection or game.</p>
          <p></p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product