import { User } from '../model/user.model.js'
import jwt from 'jsonwebtoken'

// authentication 

export const isAuthnticated = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        // console.log("token is === ",token)
        if(!token){
            return res.status(400).json({
                message:"user is not authntiated there is no token"
            })
        }

        const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decode.userId);
        if(!user){
            res.status(400).json({
            message:"user not found in authtication"
        })
        }
        req.user = user

    }catch(err){
        console.log('error occor in authtication while creating blog',err)
        res.status(400).json({
            message:"error occor in authtication while creating blog"
        })
    }
    next();
}


// authorization 

export const isAdmin = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                message:`user with given role ${req.user.role} not allowed`
            })
        }
        next();
    }
}