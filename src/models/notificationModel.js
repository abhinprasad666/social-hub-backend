import mongoose, { model, Schema } from "mongoose";


//notification schema
const notificationSchema=Schema({
           
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    type:{
        type:String,
        require:true,
        enum:[follow,like,comment,viewProfile]
    },
    read:{
        type:String,
        default:false
    }
},{timeStamps:true})

const Notification= model("Notification",notificationSchema)

export default Notification