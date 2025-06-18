import path from 'path';
import fs from 'fs';
import { createCanvas,loadImage } from 'canvas';
import sharp from 'sharp';
import fetch from "node-fetch"; 
import FormData from "form-data"; 


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

export const processImageBackground = async (inputPath, options = {}) => {
  try {
    const apiKey="y4A1W3PJCJGifmvn91msfvpV";
    const ext = path.extname(inputPath);
    const outputPath = inputPath.replace(ext, "_no_bg.png");
    const imageBuffer = fs.readFileSync(inputPath);
      const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", imageBuffer, {
      filename: path.basename(inputPath),
    });
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Remove.bg API error ${response.status}: ${errorText}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outputPath, resultBuffer);
    return outputPath;
  } catch (error) {
    throw new Error(`Background removal failed: ${error.message}`);
  }
};