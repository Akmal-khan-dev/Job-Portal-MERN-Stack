import express from "express"
const router = express.Router();
router.get('/test', function(req, res){
    return res.status(200).json({
        message:"Welcome"
    })
})

export default router