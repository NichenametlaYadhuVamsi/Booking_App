import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
import { User } from "../models/users.js"

export const Create_User = async(req,res)=>{
    const newUser=new User(req.body)
    try{
        let savedUser=await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(error){
        next()
    }
}

export const UpdateUser=async(req,res,next)=>{
    try{
        let updateUser
        updateUser=await User.findByIdAndUpdate(req.params.id,{$set:(req.body)},{new:true})
        console.log(updateUser)
        res.status(200).json(updateUser)
    }
    catch(error){
        console.log('Hello')
        return next(new ErrorHandler("Wrong id",505))
    }
}

export const DeleteUser =async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted Successfully')
    }
    catch(error){
        next(new ErrorHandler("Wrong id",505))
    }
}

export const GetAllUsers=async(req,res)=>{
    try{
       let user= await User.find()
        res.status(200).json(user)
    }
    catch(error){
        next(new ErrorHandler())
    }
}

export const GetUser=async(req,res)=>{
    try{
       let user= await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error){
        next(new ErrorHandler('wrong User id',505))
    }
}



