import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

let cookieOptions = {
    httpOnly: true,
    sameSite: "strict"
}

export let signup = asyncWrapper(async (req, res)=>{
    console.log(req.body)
    let { name, email ,password } = req.body;

    let isUserExists = await userModel.findOne({ 
        $or: [
            { email },
            { name }
        ]
    });

    if(isUserExists)
    {
        throw new AppError("An account with the provided email or name already exists", 409);
    }

    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    let user = await userModel.create({
        email,
        name,
        password: hashedPassword
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
})


export let login = asyncWrapper(async (req, res)=>{
    let { email, password } = req.body;

    let user = await userModel.findOne({ 
        email 
    }).select("+password");

    if(!user)
    {
        throw new AppError("Invalid email or password", 401);
    }

    let isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch)
    {
        throw new AppError("Invalid email or password", 401);
    }

    let accessToken = generateAccessToken(user.name, user.email, user._id);
    let refreshToken = generateRefreshToken(user.email, user._id);

    await userModel.findByIdAndUpdate(
        user._id,
        {
            $set: {
                refreshToken
            }
        }
    )

    return res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 10 * 24 * 60 * 60 * 1000
    }).json({
        success: true,
        message: "Login successfully",
        accessToken,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user._id
        }
    })

})

export let getMe = asyncWrapper(async (req, res)=>{
    let user = await userModel.findById(req.user._id);
    return res.status(200).json({
        success: true,
        user,
        message: "User fetched successfully"
    })
})


export let updateName = asyncWrapper(async (req, res)=>{
    console.log(req.body.name);
    if(!req.body.name)
    {
        throw new AppError("Name is required", 400);
    }
    let user = await userModel.findByIdAndUpdate(req.user._id,{
        $set: {
            name: req.body.name
        } 
    })

    return res.status(200).json({
        success: true,
        message: "Name updated successfully"
    })
})

export let updatePassword = asyncWrapper(async (req, res)=>{
    let { oldPassword, newPassword } = req.body;

    let user = await userModel.findById(req.user._id).select("+password");
    
    let isPasswordMatch = await user.comparePassword(oldPassword);

    if(!isPasswordMatch)
    {
        throw new AppError("Invalid old password", 401);
    }

    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(req.user._id, {
        $set: {
            password: hashedPassword
        }
    })

    return res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })


})