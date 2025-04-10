import express from "express"
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";






dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth",authRoute);

app.listen(PORT, () => console.log("Server running on port " + PORT));