import Listing from "../models/Listing_model.js";
import User from "../models/user_models.js";
import { errorHnadle } from "../utils/error.js";
import bcrypt from "bcrypt";
export  const test = (req,res)=>{
    res.json(
        {
            Name :"zohaib",
            email:"zohaib24a@gmail.com",
            password:"*****"
        }
    )
}
 


export const userUpdate = async (req,res,next)=>{
   
  
    if(req.user.id !== req.params.id){
        return next(errorHnadle(401,"you can only update your account"));
    }
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar  
        }},{ new: true })

        const {password,...rest} = updateUser._doc;
        res.status(200).json(rest);
      
    } catch (error) {
        next(error)
    }
}

export const deleteUpdate = async (req,res,next)=>{

    if(req.user.id !== req.params.id){
        return next(errorHnadle(401,"you can only update your account"));
    }

    try {
       
        const user = await User.findByIdAndDelete(req.user.id);
        res.clearCookie("token").status(200).json("User has been deleted")
        
    } catch (error) {
        next(error)
    }


}


export const getListings = async (req,res,next)=>{

if(req.user.id === req.params.id){

try {
    const listings = await Listing.find({userRef:req.user.id})
    res.status(200).json(listings)
} catch (error) {
    next(err)
}

}
else{
    next(errorHnadle(404,"can't access"))
}

}


export const getUser= async (req,res,next)=>{

    try {
        const user  = await User.findById(req.params.id)
     if(!user){next(errorHnadle(404,"User not found"))}
     const {password,...rest} = user._doc; 
     res.status(200).json(rest)
    } catch (error) {
        next(err)
    }
    
}