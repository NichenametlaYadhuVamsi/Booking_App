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
        required:true,

    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[
        {
            number:Number,
            unAvailableDates:[
            {
                startDate: {
                    type:Date,
                    required:true
                },
                endDate: {
                    type: Date,
                    required: true
                }
            }
            ]
        }
    ]


},{timestamps:true})
export const Room=mongoose.model("Room",RoomSchema)
