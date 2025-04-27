import mongoose from "mongoose";

const connectdb=async ()=>{
    try{
     await    mongoose.connect("mongodb+srv://durgesh21gcebit081:uuqmVKR9TFKD288X@cluster0.n18lfqh.mongodb.net/photo-ai");
        console.log("connected to the database ");
    }
    catch(error){
        console.log("fail to connect to the database");
    }
}

export default connectdb;