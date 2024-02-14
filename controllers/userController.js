import userModel from '../models/User.js'
export const registerController = async(req, res, next) =>{
        const {name, email, phone, password, location} = req.body
        if(!name){
            next("name is required.")
        }
        if(!email){
           next("email is required.")
        }
        if(!phone){
           next("phone number is required")
        }
        if(!password){
            next("password is required.")
        }
        
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({
                success:false,
                message:"This email already exists."
            })
        }
        
        const user = await userModel.create({name,email, phone, password})
        const token = user.jwtCreate();
        return res.status(200).send({
            success: true,
            message:"Registeration successful.",
            user,
            token
        })
}

export const loginController = async(req, res, next) =>{
    const {email, password} = req.body
    if(!email || !password){
        next("All fields are required")
    }
 
   
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next("Invalid email or password");
    }
    console.log("password:",password)
     const isMatch = await user.comparedPassword(password)
     if(!isMatch){
        next("Invalid email or password")
     }
     
     const token = user.jwtCreate()
     user.password = undefined

     return res.status(200).send({
        success:true,
        messsage:"Login is successful",
        token,
        user
     })
}

export const updateController = async(req, res, next) =>{
    const{name, email, phone, location} = req.body
    if(!name || !email || !phone){
        next("All field are required")
    }
    const user = await userModel.findOne({_id:req.user.userId})
    user.name= name
    user.email = email
    user.phone = phone
    user.location = location
    await user.save()
    const token= user.jwtCreate()
    return res.status(200).send({
        success:true,
        message:"Account updated successfully",
        user,
        token
    })
    
}