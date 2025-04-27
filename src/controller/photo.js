import photoModel from "../models/photo.js";
import { processImage } from "../services/service.js";
export const upload=async(req ,res)=>{
    console.log(upload);

    const {originalname,filename,path:filePath}=req.file;
    const {description,tags}=req.body;

    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'No image uploaded'
            })
        }

        const processedImagePath=await processImage(filePath);
        const photo=await photoModel.create({
            user: req.userId,
            title:req.body.title || originalname,
            description,
            tags:tags?tags.split(',').map(tag=>tag.trim()):[],
            originalImage:filePath,
            processedImage:processedImagePath
        })

        res.status(201).json({
            success:true,
            message:'photo upload and processed successfully',
            photo
        })
    }
    catch(error){
        console.error('upload photo error:',error)
        res.status(500).json({
            success:false,
            message:'Failed to upload and process photo',
            error:error.message
        });
    }
}

export const enhance=async(req,res)=>{
    console.log("enhance");
    return res.json({
        message:
            "proper enhance"
        
    })
}

export const removeBackground=async(req,res)=>{
    console.log("hello the world");
}