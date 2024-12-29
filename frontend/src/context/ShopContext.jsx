import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const service_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate = useNavigate();


    const addToCart = async (itemId, rarity) => {

        if (!rarity) {
            toast.error('Select Product Rarity')
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {

            if (cartData[itemId][rarity]) {
                cartData[itemId][rarity] += 1;
            }
            else{
                cartData[itemId][rarity] = 1;
            }  
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][rarity] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/add', {itemId, rarity}, {headers:{token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount =() => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, rarity, quantity) => {
        let cartData = structuredClone(cartItems); 

        cartData[itemId][rarity] = quantity;

        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', {itemId, rarity, quantity}, {headers:{token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId); 
            if (itemInfo) {
                for (const rarity in cartItems[itemId]) {
                    try {
                        if (cartItems[itemId][rarity] > 0) {
                            totalAmount += itemInfo.price * cartItems[itemId][rarity];
                        }
                    } catch (error) {
                        console.error("Error calculating cart amount:", error);
                    }
                }
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }
    

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products, currency, service_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;