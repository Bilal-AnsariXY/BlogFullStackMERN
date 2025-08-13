import { User } from '../model/user.model.js'
import cloudinary from '../cloudinary.js';
import bcrypt from 'bcryptjs'
import createTokenAndSaveCookie from '../jwt/authToken.js';
export const register = async (req, res) => {
    try {
        const { name, email, education, role, password, phone } = req.body;


        if (!name || !email || !education || !role || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required for the Register",
                received: { name, email, education, role, password: password ? "*" : undefined, phone }
            })
        }

        // Check if photo file was uploaded
        if (!req.files || !req.files.photo) {
            return res.status(400).json({
                message: "Photo is required for registration",
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            })
        }

        let cloudinaryResponse;
        let imageUrl;

        try {
            console.log('Attempting to upload to Cloudinary...');

            // Get the photo file from req.files
            const photoFile = req.files.photo;

            // Upload to Cloudinary with file path
            cloudinaryResponse = await cloudinary.uploader.upload(photoFile.tempFilePath, {
                folder: 'users',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { quality: 'auto' }
                ]
            });

            // console.log('image data ', cloudinaryResponse);
            imageUrl = cloudinaryResponse.secure_url;

        } catch (cloudinaryError) {
            console.error('Cloudinary upload error:', cloudinaryError);
            return res.status(400).json({
                message: "Failed to upload image",
                error: cloudinaryError.message
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            education,
            role,
            password: hashPassword,
            phone,
            photo: imageUrl
        });

        await newUser.save();

        const token = await createTokenAndSaveCookie(newUser._id, res)
        // console.log('token = ', token)
        return res.status(201).json({
            message: "User registered successfully ccv",
            user: newUser,
            token: token
        })

    }
    catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            message: "Something went wrong during registration",
            err: err.message,

        })
    }
}


export const login = async (req, res) => {
    const { email, role, password } = req.body;

    try {
        if (!email || !role || !password) {
            return res.status(400).json({
                message: 'Please fill all the fields for login'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User is not registered, please register first'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Password is incorrect'
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: 'Role is incorrect'
            });
        }

        const token = await createTokenAndSaveCookie(user._id, res);
        
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                userId: user._id,
                userName: user.name,
                userEmail: user.email
            },
            token: token
        });

    } catch (err) {
        console.log("error in login", err);
        return res.status(400).json({
            message: 'Problem while logging in',
            error: err.message
        });
    }
};


export const logout = async (req, res) => {

    try {
        res.clearCookie('jwt', { httpOnly: true });
        res.status(200).json({
            message: "user logout successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            message: "user not login",
            err
        })
    }
}


export const myProfile = async(req,res)=>{
    const user = await req.user;
    return res.status(200).json(user)
}

export const allAdmins = async(req,res)=>{
    const admin = await User.find({role:"admin"});
    res.status(200).json(admin);
}