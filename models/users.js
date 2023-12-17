import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    favourite:{
        type:[String],

    }
},{timestamps:true})

export const User=mongoose.model("User",UserSchema)