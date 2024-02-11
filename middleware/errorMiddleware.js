//error middleware to handle errors
export const errorMiddleware = (err, req, res, next) =>{
    console.log(err)
    const defaultErrors ={
        statusCode: 500,
        message: err
    }
    
    //check validation error
   if(err.name === 'ValidationError'){
    defaultErrors.statusCode = 400,
    defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
   }

   //duplicate value error
   if(err.code && err.code === 11000){
    defaultErrors.statusCode = 400,
    defaultErrors.message =`${Object.keys(err.keyValue)} field has to be unique.`
   }



   res.status(defaultErrors.statusCode).json({
    sucess:false,
    message: defaultErrors.message
   })
}