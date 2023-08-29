import  jwt  from "jsonwebtoken"
import { ErrorHandler } from "./ErrorHandler.js"
import { User } from "../models/users.js"

export const isAuthenticated =async (req,res,next)=>{
    try{
    if(!req.cookies.token){
        return  next(new ErrorHandler("Login First",500))
    }
    jwt.verify(req.cookies.token,process.env.Secret,async (err,user)=>{
        if(err) return new ErrorHandler("Token Not valid")
        req.user=await User.findById(user._id)
        
        // console.log(user)
        next()
    })
}
catch(error){
    next(new ErrorHandler())
}
    // console.log(req.user._id)
}

export const IsUser=async(req,res,next)=>{
    try{
        if(req.user._id.toString()===req.params.id || req.user.isAdmin){
            next()
        }

        else{
            next(new ErrorHandler('Not Authenticated'))
        }
    }
    catch(error){
        next(new ErrorHandler())
    }
}
export const IsAdmin=async(req,res,next)=>{
    try{
    isAuthenticated(req,res,()=>{
        // console.log('Virat')
        // console.log(req.user)
        // next()
        if(req.user.isAdmin){
            next()
        }

        else{
            next(new ErrorHandler('You are not admin'))
        }
    })
    }
    catch(error){
        next (new ErrorHandler())
    }
}
