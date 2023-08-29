import dotenv  from "dotenv"
import express from "express"
import mongoose from "mongoose"
import HotelRouter from "./routes/hotels.js"
import AuthRouter from "./routes/auth.js"
import UserRouter from "./routes/users.js"
import RoomRouter from "./routes/rooms.js"
import errorMiddleWre, { ErrorHandler } from "./MiddleWare/ErrorHandler.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()
dotenv.config()

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database')
    }
    catch (error){
        console.log(error)
    }
}

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send('Hi')
    console.log(req.cookies)
})
app.use("/api/hotel",HotelRouter)
app.use("/api/auth",AuthRouter)
app.use("/api/user",UserRouter)
app.use("/api/rooms",RoomRouter)



app.use(errorMiddleWre)

app.listen(8000,()=>{
    connect()
    console.log(`connected to the 8000 `)
})