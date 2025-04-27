import express from "express"
import { singupController } from "../controllers/authController.js"

const router=express.Router()


//singUp

router.post("/singup",singupController)
//
// router.get("/login")
//
// router.get("/logout")
//
// router.get("/me")


export default router
