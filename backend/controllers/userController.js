import userModel from "../models/userModel.js";
import validator from  "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';


const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//  Route for user login
const loginUser = async (req,res) => {

    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message: 'Invalid credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
    
}

// Route for user registration

const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        // Checking user already exists or not
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }
        // validation email format and password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Invalid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message: "Password must be more than 8 characters"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token, isAdmin: true }); // Include isAdmin flag
        } else {
            return res.json({ success: false, message: "INVALID CREDENTIALS" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Find the user with the reset token and ensure it's not expired
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, // Check token expiry
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and clear the reset token
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      return res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred while resetting the password.' });
    }
  };

export {loginUser, registerUser, adminLogin}