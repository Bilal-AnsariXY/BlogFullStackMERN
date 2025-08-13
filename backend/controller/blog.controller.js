import { Blog } from '../model/blog.model.js';
import cloudinary from '../cloudinary.js';
import mongoose from 'mongoose';

export const createBlog = async (req, res) => {
    try {
        const { title, category, about } = req.body;
        // console.log('req.user in the createBlog',req.user)
        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo;
        const madeBy = req?.user?._id;


        // Validate required fields
        if (!title || !category || !about) {
            return res.status(400).json({
                message: "title, category, about are required"
            });
        }
        // Validate 'about' length
        if (about.length < 200) {
            return res.status(400).json({
                message: "About should contain at least 200 characters"
            });
        }
        // Validate photos
        const blogPhoto = req.files.blogPhoto
        if (!blogPhoto) {
            return res.status(400).json({
                message: "Both blog photo  are required"
            });
        }

        // Upload blog photo to Cloudinary
        const blogPhotoUpload = await cloudinary.uploader.upload(blogPhoto.tempFilePath, {
            folder: 'blogs',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' }
            ]
        });

        // Upload admin photo to Cloudinary
        // const adminPhotoUpload = await cloudinary.uploader.upload(req.files.adminPhoto.tempFilePath, {
        //     folder: 'admins',
        //     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        //     transformation: [
        //         { width: 300, height: 300, crop: 'limit' },
        //         { quality: 'auto' }
        //     ]
        // });

        // Create blog post
        const newBlog = new Blog({
            title,
            category,
            adminName,
            about,
            blogPhoto: blogPhotoUpload.secure_url,
            adminPhoto,
            madeBy
        });

        await newBlog.save();

        return res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({
            message: "Server error while creating blog",
            error: error.message
        });
    }
};


export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(400).json({
                message: "blog cant find so cant delete the blog"
            })
        }
        await blog.deleteOne();
        res.status(200).json({
            message: "blog deleted sucessfully"
        })

    } catch (err) {
        res.status(200).json({
            message: "something is wrong while deleting"
        })
    }
}


export const getAllBlog = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json({ allBlogs });
    } catch (err) {
        res.status(200).json({
            message: "something is wrong while getting all Blogs"
        })
    }
}


export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params
        const singleBlog = await Blog.findById(id);
        if (singleBlog) {

            return res.status(200).json({ singleBlog });
        }
        res.status(400).json({
            message: "something is wrong while finding the id"
        })
    } catch (err) {
        res.status(400).json({
            message: "something is wrong while getting Single Blogs"
        })
    }
}


export const myBlogs = async (req, res) => {
    const myBlog = await Blog.find({ madeBy: req.user._id });
    return res.status(200).json({ myBlog });
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id is invalid"
        })
    }

    const updatingTheBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatingTheBlog) {
        return res.status(400).json({
            message: "some thing is wrong while updating the blog"
        })
    }
    return res.status(200).json({
        message: "blog updated successfully",
        updatingTheBlog
    })
}
