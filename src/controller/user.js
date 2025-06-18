import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import {generateToken}from "../utils/util.js";
import mongoose from "mongoose";

export const signup=async (req,res)=>{

   try{
      const {email,password}=req.body;

       const hashpassword=await bcrypt.hash(password,5);

       const existinguser=await userModel.findOne({email});

       if(existinguser){
       return   res.status(401).json({
            message:"user already exist",
         })
       }

     const user=  userModel.create({
         email:email,
         password:hashpassword
       })
       const token= generateToken(user._id);
  res.status(201).json({
   success:true,

   message:"succesful user created",
   token,
   user:{
      id: user._id,
      email:user.email
   }

  })

   }
   catch(error){
       return    res.status(400).json({
            message:"fail to sign up"
          })
   }

}


export const signin=async (req,res)=>{
   const {email,password}=req.body;
   const user=await userModel.findOne({email});

   if(!user){
     return  res.status(401).status({
         message:"user not exist",
      })
   }
   
   const ispassword=await bcrypt.compare(password,user.password);
 const token =generateToken(user._id);
   if(ispassword && user.email ===email){
    return   res.status(200).json({
          success:true,
         message:"succesul login",
         token,
         user:{
            id:user._id,
            email:user.email
         }
      })
   }
  return  res.status(401).json({
    message:"fail to signin",
   })
}

export  const me=async (req,res)=>{
   try{
    console.log(req.userId);
 
    const user = await userModel.findOne({ _id: req.userId });

    
    if(!user){
     return  res.json({
         message:"Empty user"
      })
   }
    
   }
   catch(error){
      return res.status(400).json({
         message:"fail to login"
      })
   }

}