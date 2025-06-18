import multer from "multer";
import path from "path";
import fs from "fs";


// check folder is present or not

const uploadDir='uploads';

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

// storage configuration
const storage=multer.diskStorage(
    {
        destination:function(req,file,cb){

            cb(null,uploadDir);

        },
        filename:function(req,file,cb){
           const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
           cb(null,uniqueSuffix+path.extname(file.originalname));
        }
    }
)

// File filter
const filefilter=(req,file,cb)=>{
    const allowedFileTypes=/jpeg|jpg|png|webp/;
    const extname=allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=allowedFileTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null,true);
    }
    else{
        cb(new Error('Only image files are allowed (JPEG,JPG,PNG,WEBP)'));
    }
}

const upload=multer({
    storage,
    limits:{fileSize :10*1024*1024},// 10 MB max file size
    filefilter
})

export const uploadImage=upload.single('image');