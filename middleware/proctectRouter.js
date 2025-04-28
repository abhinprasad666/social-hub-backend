import jwt from "jsonwebtoken"
import User from "../src/models/userModel.js";

export const proctectRoute=async(req,res,next)=>{
    try {
        let token
         token=req.cookies.jwt;
        //check token
        if(!token){
          return  res.status(400).json({
                success:false,
                error:"Unauthorized: No token provided !"
            })
        }

            //verify
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            
            if(!decoded){
             return   res.status(400).json({
                    success:false,
                    error:"Unauthorized :Invalid token !"
                })
            }

           const existUser=await User.findOne({_id:decoded.userId}).select("-password")

           //checking existing user
           if(!existUser){
            return res.status(400).json({
                success:false,
                error:"User not found !"
            })
           }
           req.existUser=existUser
           next()


    } catch (error) {
        console.error(`error in proctectRouter:${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }
}