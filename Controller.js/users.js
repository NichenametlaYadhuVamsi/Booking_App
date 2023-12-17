import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
import { Hotel } from "../models/hotels.js"
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

export const UpdateFav=async(req,res,next)=>{
    const {hotelId}=req.body
    try{
        console.log(req.params.id)
        const user=await User.findById(req.params.id);
        console.log(user)
        if(!user){
            return next(new ErrorHandler("no user",566))
        }

        user.favourite.push(hotelId)
        await user.save()
        res.status(200).json(user)
    }
    catch (error){
        console.log(Error)
        return next(new ErrorHandler("something error",567))
    }
}

export const deleteFav=async(req,res,next)=>{
    const {hotelId}=req.body
    console.log(hotelId)
    try{
        console.log(req.params.id)
        const user=await User.findById(req.params.id);
        console.log(user)
        if(!user){
            return next(new ErrorHandler("no user",566))
        }

        user.favourite=user.favourite.filter(id => id !== hotelId);
        await user.save()
        res.status(200).json(user)
    }
    catch (error){
        console.log(Error)
        return next(new ErrorHandler("something error",567))
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

export const Favourite=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        console.log(user)
        if(!user){
            return next(new ErrorHandler("no user",566))
        }
        const hotelIds=user.favourite
        // console.log(hotelIds)
        const hotels=await Hotel.find({_id:{$in:hotelIds}})
        console.log(hotels)
        // if (hotels.length === 0) {
        //     return res.status(200).json('User has no favorite hotels' );
        // }

        return res.status(200).json(hotels)
        
    }
    catch{
        return next(new ErrorHandler('something wrong',505))
    }
    
}



