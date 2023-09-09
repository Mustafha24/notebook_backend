const dotenv=require('dotenv').config({})
const jwt=require('jsonwebtoken')
const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token')

    if(!token)
    {
        res.status(400).json({
            message:"go and login to get authentication token"
        })
    }
    const data=jwt.verify(token,process.env.JWT_SECRET)
    req.user=data
    next()
}
module.exports={fetchUser}