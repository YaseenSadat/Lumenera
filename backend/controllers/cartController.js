import userModel from "../models/userModel.js"

// add products to user cart

const addToCart = async (req,res) => {
    try {
        const { userId, itemId, rarity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][rarity]) {
                cartData[itemId][rarity] += 1
            }
            else{
                cartData[itemId][rarity] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][rarity] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Added to cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        const { userId, itemId, rarity, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][rarity] = quantity
        
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Cart updated"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// get user cart data
const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success: true, cartData});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {addToCart, updateCart, getUserCart}