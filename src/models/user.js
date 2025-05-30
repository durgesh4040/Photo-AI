import  mongoose from "mongoose";
import connectdb from "./db.js";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{

        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const userModel=mongoose.model("user",userSchema);
export default userModel;