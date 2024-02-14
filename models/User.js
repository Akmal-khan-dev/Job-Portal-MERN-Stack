import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'


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
        required: [true, 'Password is required'],
        select: true
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

userSchema.methods.jwtCreate =  function(){
    return  JWT.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
}

userSchema.methods.comparedPassword = async function(userPassword){
    const isMatch= await bcrypt.compare(userPassword, this.password)
    return isMatch
}

export default mongoose.model("Users", userSchema);