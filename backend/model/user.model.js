import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    photo: {
        type:String,
        default:""
    },
    password: {
        type: String,
        required: true,
        
    },
    token: {
        type: String, 
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    }
},{timestamps:true})

export const User = mongoose.model('User', userSchema)