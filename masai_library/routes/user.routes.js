const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel = require("../model/user.model")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            res.status(201).json({msg:"User already Exist!!"})
        }else{
            bcrypt.hash(password, 2, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    res.status(400).json({msg:err.message})
                }else{
                    const newUser=new UserModel({name,email,password:hash,isAdmin})
                    await newUser.save()
                    res.status(201).json({msg:"User has been added"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                    var token = jwt.sign({ role:user.isAdmin }, 'shhhhh');
                    res.status(200).json({msg:"Login Successfull",token:token})
                }else{
                    res.status(200).json({msg:"Invalid Password"})
                }
            });
        }else{
            res.status(200).json({msg:"User does not Exist!!"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message}) 
    }
})


module.exports=userRouter