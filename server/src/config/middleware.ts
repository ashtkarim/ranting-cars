import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload }  from 'jsonwebtoken';

declare global {
    namespace Express {
      interface Request {
        userData?: string; 
      }
    }
  }




export const verifyToken= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token =req.cookies['jwt']
        if (!token) {
            return res.status(401).json({error:"Token not found in cookies"});
        }
        const decoded= jwt.verify(token,"hello1234") as JwtPayload;
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token payload" });
        }
        req.userData = decoded.id
        next()
    }catch(err){
        console.error('error verifing token',err)
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        return res.status(500).json({error:'Internal server error'})
    }
}
