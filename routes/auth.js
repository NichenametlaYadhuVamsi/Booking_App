import express from "express"
import { login, logout, register } from "../Controller.js/auth.js"
import { isAuthenticated } from "../MiddleWare/Authent.js"
// import { login, register } from "../Controller.js/users.js"
// import router from "./hotels"

let router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)

export default router