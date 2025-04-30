import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import dbConnected from "./DB/DB_connect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRoute.js";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    //db connecting
    dbConnected();
});
