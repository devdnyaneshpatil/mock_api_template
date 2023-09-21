const express=require("express")
const BookModel = require("../model/book.model")
const auth = require("../middleware/auth.middleware")


const bookRouter=express.Router()

bookRouter.get("/",async(req,res)=>{
    try {
        const books=await BookModel.find()
        res.status(200).json({books:books})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

bookRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id
    try {
        const books=await BookModel.find({_id:ID})
        res.status(200).json({books:books})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

bookRouter.get("/search",async(req,res)=>{
    const category=req.query.category
    try {
        const books=await BookModel.find({category:category})
        res.status(200).json({books:books})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

bookRouter.get("/books",async(req,res)=>{
    const {author,category}=req.query
    try {
        const books=await BookModel.find({author:author,category:category})
        res.status(200).json({books:books})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})







//protected routes

bookRouter.post("/add",auth,async(req,res)=>{
    const payload=req.body
    try {
        const book= new BookModel(payload)
        await book.save()
        res.status(200).json({msg:"new Book has been added"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

bookRouter.patch("/update/:id",auth,async(req,res)=>{
    const Id=req.params.id
    const payload=req.body
    try {
        await BookModel.findByIdAndUpdate({_id:Id},payload)
        res.status(200).json({msg:"Book has been updated"})
    } catch (error) {
        res.status(400).json({msg:error.message}) 
    }
})

bookRouter.delete("/delete/:id",auth,async(req,res)=>{
    const Id=req.params.id
    try {
        await BookModel.findByIdAndDelete({_id:Id})
        res.status(200).json({msg:"Book has been Deleted"})
    } catch (error) {
        res.status(400).json({msg:error.message}) 
    }
})

module.exports=bookRouter