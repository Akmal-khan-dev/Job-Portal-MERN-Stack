import JWT from "jsonwebtoken"
const authMiddleware = async(req, res, next) =>{
 
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith('Bearer')){
        next("Auth failed")
    }
    const token = authToken.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId}
        
        next()
    } catch (error) {
        next("Auth failed")
    }
}

export default authMiddleware