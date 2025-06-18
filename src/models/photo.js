import mongoose from "mongoose";
const photoSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    
    },

    title:{
    type:String,
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