import { cookie } from "../Cookie/cookie.js"
import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
import { User } from "../models/users.js"
import bcrypt from "bcrypt"

export let register= async (req,res,next)=>{

    try{

    let user=null
    user=await User.findOne({email:req.body.email})
    if(user!=null)  return next(new ErrorHandler('User excisted,so login first',400))
    let hashedpassword=await bcrypt.hash(req.body.password,10)
    user= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    })
    // console.log(user)

    cookie(user,res,"Registered Successfully",200)
    }
    catch{
        next(new ErrorHandler())
    }
}

export let login=async(req,res,next)=>{
    try{
       let user=await User.findOne({email:req.body.email}).select("+password")

        if(!user) {
            next(ErrorHandler('User not excisted,register first',300))
        }
        let isMatch=await bcrypt.compare(req.body.password,user.password)
        if(!isMatch) return next(new ErrorHandler('Wrong Password try again',400))
        cookie(user,res,user,200)
        console.log('Vamso')

    }
    catch(error){
        next(new ErrorHandler('User not excisted,register first',300))
    }
}

export let logout = (req,res,next)=>{
    console.log('Hello')
    try{
        res.status(200).cookie("token","",{expires:new Date()}).send("Logout Successfully")
    }
    catch{
        next(new ErrorHandler('Login first to Logout'))
    }
}