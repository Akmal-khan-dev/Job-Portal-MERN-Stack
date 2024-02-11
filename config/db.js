import mongoose from "mongoose";
export const DBConnection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb at ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB error ${error}`)
    }
}