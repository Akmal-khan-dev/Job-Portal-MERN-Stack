import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name is required"]
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        unique: true,
        validate : validator.isEmail
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        unique: true,
        validate : validator.isEmail
    },
    phone:{
        type:String,
        required: [true, "Phone is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    location: {
        type: String,
        default: "Pakistan"
    }
},{timestamps:true}
);
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model("Users", userSchema);