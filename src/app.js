import express from "express"
import dotenv from "dotenv";






dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/auth",);

app.listen(PORT, () => console.log("Server running on port " + PORT));