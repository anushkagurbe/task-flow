import jwt from 'jsonwebtoken';

export let generateAccessToken = (name, email, id) =>{
    return jwt.sign(
        {
            name: name, 
            email: email,
            _id: id
        }, process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export let generateRefreshToken = (email, id) =>{
    return jwt.sign(
        {
            email: email,
            _id: id
        }, process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}