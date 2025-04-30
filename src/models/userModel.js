import mongoose, { model, Schema } from "mongoose";

// creating user schema

const UserSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        frofileImg: {
            type: String,
            default: "",
        },
        coverImg: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
    },
    { timeStamps: true }
);

// creating user model

const User = model("User", UserSchema);

export default User;
