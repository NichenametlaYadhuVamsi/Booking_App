import { Timestamp } from "mongodb"
import mongoose from "mongoose"
// const {Schema}=moongoose

const RoomSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    MaxPeople:{
        type:Number,
        require:true,

    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{number:Number,unAvailableDates:{type:[Date]}}]


},{timestamps:true})
export const Room=mongoose.model("Room",RoomSchema)
