import jwt from 'jsonwebtoken';
import {User} from '../model/user.model.js';
import dotenv from 'dotenv'
dotenv.config();
const createTokenAndSaveCookie = async(userId,res)=>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    // res.cookie('jwt',token,{
    //     httpOnly:false,
    //     sameSite:"none"
    // })
    res.cookie("jwt",token,{
        httpOnly:true, //prevent XSS attacks cross-site scripting attacks-- more secure
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV!=="development",
    })
    await User.findByIdAndUpdate(userId,{token})
    return token;
}

export default createTokenAndSaveCookie;