import jwt from 'jsonwebtoken';
import { asyncWrapper } from "./asyncWrapper.middleware.js";
import userModel from '../models/user.model.js';
import AppError from '../utils/AppError.js';

export let authMiddleware = asyncWrapper(async (req, res, next)=>{
    console.log(req.body);
    console.log("authmidl")
    let accessToken = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");
    
    if(!accessToken)
    {
        throw new AppError("Access token is missing. Please login", 401);
    }

    let decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken)
    {
        throw new AppError("Access token is invalid or has expired", 401);
    }

    let user = await userModel.findById(decodedToken._id);
    
    if(!user)
    {
        throw new AppError("User not found", 404);
    }

    console.log(user)
    req.user = user;
    next();
})