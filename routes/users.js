import express from "express"
import { IsAdmin, IsUser, isAuthenticated } from "../MiddleWare/Authent.js"
import { DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../Controller.js/users.js"
import { GetAll } from "../Controller.js/hotel.js"

let router=express.Router()

// router.get("/check/:id",isAuthenticated,IsAdmin,(req,res,next)=>{
//     res.send('You are auth')
// })
// router.get("/check",isAuthenticated,(req,res,next)=>{
//     res.send('You are auth')
// })

router.put("/:id",isAuthenticated,IsUser,UpdateUser)

router.delete("/:id",isAuthenticated,IsUser,DeleteUser)

router.get("/all",isAuthenticated,GetAllUsers)

router.get("/:id",isAuthenticated,GetUser)


export default router