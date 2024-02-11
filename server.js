//import important packages
import express, { json } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

//import important files
import { DBConnection } from './config/db.js'
import userRoute from './routes/userRoute.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'


//configure enviroment
dotenv.config()

//mongodb connection
DBConnection();

//create server
const app = express();

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//routes
app.use('/api/v1/user', userRoute)

//Validation Middleware
app.use(errorMiddleware)

const Port = process.env.PORT|| 8000
app.listen(Port, (req, res)=>{
    console.log(`server is running in ${process.env.DEV_MODE} at ${Port}`)
})