import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Name should be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin"
        ],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    refreshToken: {
        type: String,
        default: null,
        select: false
    }
},
{
    timestamps: true
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

let userModel = mongoose.model("user", userSchema);

export default userModel;