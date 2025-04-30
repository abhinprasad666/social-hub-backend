import mongoose from "mongoose";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";

//get single user Profile
export const getSingleUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found",
            });
        } else {
            return res.status(400).json({
                success: false,
                user,
            });
        }
    } catch (error) {
        console.error(`error me controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//follow and unfollow
export const followAndUnfollow = async (req, res) => {
    try {
        console.log("start");
        const { id } = req.params;
        //checking userId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid user id format !",
            });
        }
        const anotherUser = await User?.findOne({ _id: id });
        const currentUser = await User?.findById({ _id: req.existUser._id });

        console.log("1");
        if (!anotherUser) {
            console.log("2");
            return res.status(400).json({
                success: false,
                error: "User not found !",
            });
        }

        if (currentUser._id == id) {
            return res.status(400).json({
                success: false,
                error: "You can not Follow and Unfollow",
            });
        }
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            //unFollow
            await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: currentUser._id } });
            await User.findByIdAndUpdate({ _id: currentUser._id }, { $pull: { following: anotherUser._id } });
            return res.status(201).json({
                success: true,
                message: "Unfollow successfully",
                anotherUser,
                currentUser,
            });
        } else {
            //followers/following
            await User.findByIdAndUpdate({ _id: id }, { $push: { followers: currentUser._id } });
            await User.findByIdAndUpdate({ _id: currentUser._id }, { $push: { following: anotherUser._id } });

            //send notification
            const newNotification = new Notification({
                from: currentUser._id,
                to: anotherUser._id,
                type: "follow",
            });
            await newNotification.save();

            return res.status(201).json({
                success: true,
                message: "Follow successfully",
                currentUser,
                anotherUser,
            });
        }
    } catch (error) {
        console.error(`error in follow and unfollow controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get suggested users
export const getSuggestedUsers = async (req, res) => {
    try {
        const currentUserId = req.existUser._id;
        const userFollowedByMe = await User.findById({ _id: currentUserId }).select("-password");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: currentUserId },
                },
            },
            {
                $sample: {
                    size: 10,
                },
            },
        ]);
        //filter
        const fillteredUsers = users.filter((user) => !userFollowedByMe.following.includes(user._id));
        const suggestedUsers = fillteredUsers.slice(0, 4);
        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json({
            success: true,
            suggestedUsers,
        });
    } catch (error) {
        console.error(`error in getSuggestedUsers controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//update profile
export const updateProfile = async (req, res) => {
    try {
        let { username, fullname, email, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;

        let currentUserId = req.existUser._id;
        let currentUser = await User.findById({ _id: currentUserId });

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "Please provide both the New password and Current password !",
            });
        }

        if (currentPassword && newPassword) {
            const checkPssword = await bcrypt.compare(currentPassword, currentUser.password);
            if (!checkPssword) {
                return res.status(400).json({
                    success: false,
                    error: "Incurrect password!",
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: "Password Must have atleast 6 characters!",
                });
            }
            const salt = await bcrypt.genSalt(10);
            currentUser.password = await bcrypt.hash(newPassword, salt);
        }

        // profile photo  cloudinary
        // if(profileImg){
        //      if(currentUser.profileImg){
        //         await cloudinary.uploder.destroy(currentUser.profileImg.split("/").pop().split(".")[0])
        //      }

        //     const uplodedResponse=await cloudinary.uploder.upload(profileImg)
        //     profileImg=uplodedResponse.secure_url;
        // }

        // // profile photo  cloudinary
        // if(coverImg){
        //     if(currentUser.coverImg){
        //         await cloudinary.uploder.destroy(currentUser.coverImg.split("/").pop().split(".")[0])
        //      }

        //     const uplodedResponse=await cloudinary.uploder.upload(coverImg)
        //     profileImg=uplodedResponse.secure_url;
        // }
        //update current user
        currentUser.fullname = fullname ? fullname : currentUser.fullname;
        currentUser.email = email ? email : currentUser.email;
        currentUser.username = username ? username : currentUser.username;
        currentUser.link = link ? link : currentUser.link;
        currentUser.bio = bio ? bio : currentUser.bio;
        currentUser.profileImg = profileImg ? profileImg : currentUser.profileImg;
        currentUser.coverImg = coverImg ? coverImg : currentUser.coverImg;

        await currentUser.save();
        currentUser.password = null;
        res.status(201).json({
            success: true,
            message: "updated profile",
            currentUser,
        });
    } catch (error) {
        console.error(`error in upadate profile controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
