import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        // required: true
    },
    blogPhoto: {
        type:String,
        default:""
    },
    adminPhoto: {
        type:String,
        default:""
    },
    about: {
        type: String,
        required: true,
        minlength:[200,"should contain atleast 200 charators"]
    },
    madeBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export  const Blog = mongoose.model('Blog', blogSchema)