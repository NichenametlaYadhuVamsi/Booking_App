import { ErrorHandler } from "../MiddleWare/ErrorHandler.js";
import { Room } from "../models/Rooms.js";
import { Hotel } from "../models/hotels.js";
// import { Room } from "../models/rooms.js";


export let Create_Room=async(req,res,next)=>{
    console.log(req.params)
    // console.log('Hello')
    const hotelId=req.params.hotelId;
    const newRoom=new Room(req.body)

    try{
       const savedRoom =await newRoom.save()
       try{
          await Hotel.findByIdAndUpdate(hotelId,{$push :{
            rooms:savedRoom._id
          },})
       }
       catch(error){
        console.log(error)
       }
       res.status(200).send(savedRoom)
    }
    catch(error){
        console.log(error)
    }
}

export let UpdateRoom=async(req,res,next)=>{
 
    try{
        let updateRoom
        updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:(req.body)},{new:true})
        console.log(updateRoom)
        res.status(200).json(updateRoom)
    }
    catch(error){
        console.log('Hello')
        return next(new ErrorHandler("Wrong id",505))
    }

}

export let UpdateRoomAvailabilty=async(req,res,next)=>{
 
  try{
      await Room.updateOne(
        {"roomNumbers._id" : req.params.id},
        {
          $push :{
            "roomNumbers.$.unAvailableDates":req.body.dates
          },

        }
      
      )

      // await Room.updateOne(
      //   {"roomNumbers._id": req.params.id},
      //   {
      //     $set: {
      //       "roomNumbers.$.unAvailableDates": updatedDates
      //     }
      //   }
      // );

      res.status(200).send("Room Updated Successfully")
  }

  
  
  catch(error){
      console.log(error)
      return next(new ErrorHandler("Wrong id",505))
  }

}

export let DeleteRoom =async(req,res,next)=>{
  try{
    console.log(req.params.id)
    console.log(req.params.hotelId)
    // res.status(200).send('Deleted Successfully')
    // console.log()
    
    await Room.findByIdAndDelete(req.params.id)
    try{
      await Hotel.findByIdAndUpdate(req.params.hotelId,{$pull :{
        rooms:req.params.id
      },})
      res.status(200).send('Deleted Successfully')
    }
    catch(error){
      next(new ErrorHandler)
    }
    // res.status(200).send('Deleted Successfully')
  }
    catch(error){
      console.log(error)
      // next(new ErrorHandler("Wrong id",505))
    }
}

export let GetAllRooms=async(req,res,next)=>{
  try{
    // console.log('vamsi')
    let hotel= await Room.find()
     res.status(200).json(hotel)
 }
 catch(error){
     console.log(error)
 }
}

export let GetRooms=async(req,res,next)=>{
  try{
    let room= await Room.findById(req.params.id)
     res.status(200).json(room)
  }
  catch(error){
     console.log("Wrong Id")
  }

}

export let GeTAllRoomsOFAhOTEL=async(req,res,next)=>{
  try{
    let hotelId=req.params.hotelId
    let hotel=await Hotel.findById(hotelId)
    // let rooms=hotel.rooms
    // // console.log(rooms)
    // let room=[]
    // for(let roomId of rooms){
    //   let roomInfo=await Room.findById(roomId)
    //   room.push(roomInfo)
    // }

    const roomList=await Promise.all(
      hotel.rooms.map((room)=>(
        Room.findById(room)
      ))
    )
    res.status(200).send(roomList)
  }
  catch(error){
    // console.log(error)
    next(new ErrorHandler('There are no rooms',600))
  }
}

