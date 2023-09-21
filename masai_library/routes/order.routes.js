const express=require("express")
const auth = require("../middleware/auth.middleware")
// const OrderModel = require("../model/order.model")


const orderRouter=express.Router()


// orderRouter.get("/",auth,async(req,res)=>{
//     try {
//        const orders=OrderModel.find()
//        res.status(200).json({orders:orders}) 
//     } catch (error) {
//         res.status(400).json(error.message)
//     }
// })




module.exports=orderRouter