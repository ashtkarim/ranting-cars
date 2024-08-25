import { Request, Response, NextFunction } from 'express';
import  redisClient from "./db";

declare global {
    namespace Express {
      interface Request {
        userData?: any; 
      }
    }
  }


export const verifyToken= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token =req.cookies['token']
        if (!token) {
            return res.status(401).json({error:"Token not found in cookies"});
        }
        const reply =await redisClient.get(token)
        if(reply){
            req.userData=reply;
            next()
        }else{
            return res.status(401).json({error:'invalid token'})
        }
    }catch(err){
        console.error('error verifing token',err)
        return res.status(500).json({error:'Internal server error'})
    }
}
