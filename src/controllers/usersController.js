import mongoose from "mongoose";
import User from "../models/userModel.js";

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
