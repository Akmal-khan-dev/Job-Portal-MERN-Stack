import userModel from '../models/User.js'
export const registerController = async(req, res, next) =>{
    try {
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
        return res.status(200).send({
            success: true,
            message:"Registeration successful."
        })


    } catch (error) {
       next(error)
    }
}