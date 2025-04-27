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
                await newUser.save()
                return res.status(200).json(newUser)
            }else{
                return res.status(400).json({
                    error:"Invalid User D   ata"
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

}

//logout Controller
export const logoutController=async (req,res)=>{

}

// Controller
export const Controller=async (req,res)=>{

}


