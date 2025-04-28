import express from "express"
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import dbConnected from "./DB/DB_connect.js";
import cookieParser from "cookie-parser";






dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/v1/auth",authRoute);

app.listen(PORT, () =>{
     console.log("Server running on port " + PORT)
     //db connecting
       dbConnected()
});