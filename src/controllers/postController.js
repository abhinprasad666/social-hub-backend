import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import cloudinary  from 'cloudinary';




//create post
export const createPostController=async(req,res)=>{
try {
    const {text}=req.body;
    let{image}=req.body;

    const currentUserId=req.existUser._id;
    const currentUser=await User.findOne({_id:currentUserId})

    if(!image && !text){
     return res.status(404).json({
         success:false,
         error:"Post must have text or image"
     })
    }
    if(image){
     const uploadedResponse=await cloudinary.uploader.upload(image)
     image =uploadedResponse.secure_url
    }

    //create new post
    const newPost=await Post({
     user:currentUserId,
     text:text?text :"",
     image:image?image :""
    })
  if(newPost){
     await newPost.save()

     return res.status(201).json({
         success:true,
         newPost
     })
  }
    



    if(!currentUser){
     return res.status(404).json({
         success:false,
         error:"User not found !"
     })
    }


} catch (error) {
    console.error(`error in post controller:${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
}
}

//like post
export const likePostController=async(req,res)=>{
    try {
       
    } catch (error) {
        console.error(`error in like post controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
    //comment post
export const commentPostController=async(req,res)=>{
    try {
     


    } catch (error) {
        console.error(`error in comment post controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
    //delete post
export const deletePostController=async()=>{
    try {
       
    } catch (error) {
        console.error(`error in delete post controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }