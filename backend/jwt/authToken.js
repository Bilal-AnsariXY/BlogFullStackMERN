import jwt from 'jsonwebtoken';
import {User} from '../model/user.model.js';
import dotenv from 'dotenv'
dotenv.config();
const createTokenAndSaveCookie = async(userId,res)=>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie('jwt',token,{
        httpOnly:false,
        sameSite:"none"
    })
    await User.findByIdAndUpdate(userId,{token})
    return token;
}

export default createTokenAndSaveCookie;