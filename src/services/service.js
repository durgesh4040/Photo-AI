import path from 'path';
import fs from 'fs';
import { createCanvas,loadImage } from 'canvas';
import sharp from 'sharp';


// Process image with basic Ai enhancements
export const processImage=async(imagePath)=>{
    const outputPath = path.join('uploads', `processed_${path.basename(imagePath)}`);
    try{
    await sharp(imagePath)
          .resize(1200,1200,{fit:'inside',withoutEnlargement:true})
          .sharpen()
          .normalise()
          .toFile(outputPath);
          return outputPath;
} catch(error){
    console.error('Image processing error',error);
    throw new Error('failed to process image')

}
}


// Enhance image quality with AI

export const enhanceImageQuality=async(imagePath)=>{
    try{
        await sharp(imagePath)
        .resize(1200,1200,{fit:'inside',withoutEnlargement:true})
        .sharpen({sigma:1.5})
        .normalise()
        .modulate({brightness:1.05,saturation:1.2})
        .toFile(outputPath)

        return outputPath;

    } catch(error){
       console.error('Image emhancement error:',error);
       throw new Error('failed to enhance image');
    }
}