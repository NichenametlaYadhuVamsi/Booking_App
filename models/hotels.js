import mongoose from "mongoose"
// const {Schema}=moongoose

const HotelSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
        required:true,
    },
    photos:{
        type:[String],
        // required:true,
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:10,
        required:true
    },
    rooms:{
        type:[String],
        // required:true,
    },
    CheapestPrice:{
        type:Number,
        required:true
    },

    feature:{
        type:Boolean,
        default:false,
    }


})
export const Hotel=mongoose.model("Hotel",HotelSchema)
