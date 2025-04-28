import { generateToken } from "../../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


//singup Controller
export const singupController=async(req,res)=>{

    try {
        const {username,fullname,email,password,confirmPassword}=req.body 

        // email validation
        const emailRejex=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRejex.test(email)){
            return res.status(400).json({
                error:"Invalid email format!"
            })
        }
        //existing username or email
          const existEmail=await User.findOne({email})
          const existUsername=await User.findOne({username})

          if(existEmail||existUsername){
          return  res.status(400).json({
                error:"Already Exist Email or Username! "
            })
          }
          //checking password and confirm password
          if(password!=confirmPassword){
            return res.status(400).json({
                error:"Please check your password!"
            })
          }
          //checking password length
          if(password.length<6){
            return res.status(400).json({
                error:"Password must have atleast 6 characters!"
            })
          }
        
            //hashing the password
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            
            //creating new user
            const newUser=await new User({
                username,
                fullname,
                email,
                password:hashedPassword
            })
            if(newUser){
                //create token
                generateToken(newUser._id,res)
                await newUser.save()
                return res.status(200).json(newUser)
            }else{
                return res.status(400).json({
                    error:"Invalid User Data"
                })
            }
    } catch (error) {
        console.error(`Error in singup controller:${error}`)
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
  
}

//login Controller
export const loginController=async (req,res)=>{
   
    try {
        const {email,username,password}=req.body
        let existUser;
        let checkPassword;
          
        //checking useremail and username
        if(email){
            existUser=await User.findOne({email})
         
        }else{
            existUser=await User.findOne({username})
        }
        
          if(existUser){
             checkPassword=await bcrypt.compare(password,existUser?.password ||"")
          }
         

          if(!existUser || !checkPassword){
            res.status(400).json({error:"Invalid Username or Password"})
          }
           generateToken(existUser._id,res)
          res.status(200).json({
             success:true,
             message:"Login successfully",
             existUser
          })
        

    } catch (error) {
        
        console.error(`error in login controller:${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }



}

//logout Controller
export const logoutController=async (req,res)=>{

    try {
        res.cookie('jwt', "",{maxAge:0});
        res.status(200).json({
         success:true,
         message:"Logout Successfullly"
        })
    } catch (error) {
        console.error(`error in logout controller:${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }
 
}

// Controller
export const meController=async (req,res)=>{
    try {
        const existUser= await User.findOne({_id:req.existUser._id}).select("-password")
        res.status(200).json({
            success:true,
            message:"You are admin",
            existUser
        })
        
    } catch (error) {
        console.error(`error me controller:${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }

}


