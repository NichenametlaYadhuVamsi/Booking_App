import { MinKey } from "mongodb"
import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
import { Hotel } from "../models/hotels.js"

export const Create_Hotel = async(req,res)=>{
    const newHotel=new Hotel(req.body)
    try{
        let savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch(error){
        next()
    }
}

export const UpdateHotel=async(req,res,next)=>{
    try{
        let updateHotel
        updateHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:(req.body)},{new:true})
        console.log(updateHotel)
        res.status(200).json(updateHotel)
    }
    catch(error){
        console.log('Hello')
        return next(new ErrorHandler("Wrong id",505))
    }
}

export const DeleteHotel =async(req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted Successfully')
    }
    catch(error){
        next(new ErrorHandler("Wrong id",505))
    }
}

export const GetAll=async(req,res)=>{
    try{
        // console.log(req.query.feature)
       let  {min,max,limit,...Other}=req.query
       console.log(req.query)
        // let feature=
       let hotel= await Hotel.find({...Other,
        CheapestPrice:{$gt:min ||1 , $lt:max||9999 }
       }).limit(limit)
        res.status(200).json(hotel)
    }
    catch(error){
        console.log(error)
    }
}

export const GetHotel=async(req,res)=>{
    try{
       let hotel= await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(error){
        console.log("Wrong Id")
    }
}



