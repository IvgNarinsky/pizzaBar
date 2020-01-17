const keys=require('../config/keys')
const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    let token=req.header("token")
    try{
        var decode=jwt.verify(token,keys.SECRET)
        next()
    }
    catch(err){
        res.send(err)
        
    }
}