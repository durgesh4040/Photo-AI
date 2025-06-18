import photoModel from "../models/photo.js";
import { processImage, processImageBackground } from "../services/service.js";
import path from "path";
import fs from "fs";

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

        // res.status(201).json({
        //     success:true,
        //     message:'photo upload and processed successfully',
        //     photo
        // })

    
    const absolutePath = path.resolve(processedImagePath);
    res.setHeader("Content-Type", "image/jpeg"); // or image/png
    res.setHeader("Content-Disposition", "inline");

    // Stream the image to the response
    fs.createReadStream(absolutePath).pipe(res);

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

export const removeBackground = async (req, res) => {
    console.log("hello the world");
    
    try {
        // Check if file exists first
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image uploaded'
            });
        }
        
        const { originalname, filename, path: filePath } = req.file;
        const { description, tags } = req.body;
        
        console.log('Processing image:', originalname);
        
        // Call the background removal function (different name)
        const processedImagePath = await processImageBackground(filePath);
        
        console.log('Image processed successfully:', processedImagePath);
        
        const photo = await photoModel.create({
            user: req.userId,
            title: req.body.title || originalname,
            description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            originalImage: filePath,
            processedImage: processedImagePath
        });
        
        console.log('Photo saved to database:', photo._id);
        
        // Return the processed image
        const absolutePath = path.resolve(processedImagePath);
        
        // Check if processed file exists
        if (!fs.existsSync(absolutePath)) {
            throw new Error('Processed image file not found');
        }
        
        res.setHeader("Content-Type", "image/png"); // PNG for transparency
        res.setHeader("Content-Disposition", "inline");
        res.setHeader("Cache-Control", "no-cache");
        
        // Stream the processed image to response
        fs.createReadStream(absolutePath).pipe(res);
        
    } catch (error) {
        console.error('upload photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload and process photo',
            error: error.message
        });
    }
};
