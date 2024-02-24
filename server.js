//api doc ui
import swaggerUi from 'swagger-ui-express'
import swaggerdoc from 'swagger-jsdoc'

//import important packages
import express, { json } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import xss from 'xss-clean'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
//import important files
import { DBConnection } from './config/db.js'
import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import authMiddleware from './middleware/authMiddleware.js'


//configure enviroment
dotenv.config()

//mongodb connection
DBConnection();

//swagger api config
//swagger options
const options={
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Job Portal Application",
            description:"Node Express Job Portal"
        },
        servers:[
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis:['./routes/*.js'],
}

const spec = swaggerdoc(options)

//create server
const app = express();

//middleware
app.use(helmet())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(xss())


//routes
app.use('/api/v1/test',authMiddleware, testRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/job', jobRoute)

//api doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))

//Validation Middleware
app.use(errorMiddleware)

const Port = process.env.PORT|| 8000
app.listen(Port, (req, res)=>{
    console.log(`server is running in ${process.env.DEV_MODE} at ${Port}`)
})