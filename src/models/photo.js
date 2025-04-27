import mongoose from "mongoose";
const photoSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    title:{
    type:String,
     required:true,
     trim :true
    },

    description:{
        type:String,
        trim:true
    }
      ,
    tags:[String],
    originalImage:{
        type:String,
    },
    processedImage:{
        type:String,
    },
    enhancedImage:{
        type:String,
    }

    
})

const photoModel=mongoose.model("photo",photoSchema);
export  default photoModel;