const jwt=require("jsonwebtoken");
const UserModel = require("../model/user.model");


const auth=(req,res,next)=>{
   const token= req.headers.authorization?.split(" ")[1]
   if(token){
    try {
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            if(decoded.role){
                next()
            }else{
                res.status(200).json({msg:"Not authorized"})  
            }
        }else{
            res.status(200).json({msg:"Token invalid"})
        }  
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
   }else{
    res.status(200).json({msg:"please login first"})
   }
}


module.exports=auth