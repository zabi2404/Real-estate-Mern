import jwt from "jsonwebtoken"
import { errorHnadle } from "../utils/error.js";


export const verfiyToken = (req,res,next)=>{
    const token = req.cookies.token;   
    
    if(!token)return next(errorHnadle(401,"Unautharized"));

    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error)return next(errorHnadle(403,"Forbidden"))
   req.user = user;
next();
   
        })


}