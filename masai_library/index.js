const express=require("express")
const connection = require("./db")
const userRouter = require("./routes/user.routes")
const bookRouter = require("./routes/book.routes")
const orderRouter = require("./routes/order.routes")
const swaggerJsdoc=require("swagger-jsdoc")
const swaggerUI=require("swagger-ui-express")
require('dotenv').config()
const app=express()

app.use(express.json())

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API documentation",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const openApispecs=swaggerJsdoc(options)
app.use("/docs",swaggerUI.serve,swaggerUI.setup(openApispecs))


app.use("/user",userRouter)
app.use("/book",bookRouter)
app.use("/order",orderRouter)



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to the server")
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (error) {
       console.log(error.message) 
    }
})