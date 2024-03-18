import { User } from "../models/user.model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";
import sendJwtToken from "../utlis/JwtToken.js";

const register = async(req,res,next) => {
    const avatar = req.file;
    console.log(res.file);
    if(!avatar){
        return res.status(400).json({
            success:false,
            message:"Avatar is required"
        });
    }

    const response = await uploadFileOnCloudinary(avatar);

    const {name,email,password,age} = req.body;
    if(!name || !email || !password || !age){
        return res.status(200).json({
            success:false,
            message:"All fields are required"
        })
    }

    const isAlreadyExist = await User.findOne({email});
    if(isAlreadyExist){
        return res.status(400).json({
            success:false,
            message:"user already registered"
        });
    }

    const user = await User.create({name,email,password,age,avatar:response.url});
    if(!user){
        return res.status(500).json({
            success:false,
            message:"server error"
        });
    }

    sendJwtToken(200,"successfully registered",user,res);

}

const login = async (req,res,next) => {
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }


        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Not registered user"
            });
        }

        const correctPasword = await user.comparePassword(password);
        console.log(correctPasword);

        if(!correctPasword){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        sendJwtToken(200,"user LoggedIn",user,res);

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async (req,res,next) => {
    
}

const update = async (req,res,next) => {
    
}

const userProfile = async (req,res,next) => {
    
}

export {
    register,
    login,
    logout,
    update,
    userProfile
}