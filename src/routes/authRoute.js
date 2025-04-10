import express from "express"
import { singupController } from "../controllers/authController.js"

const router=express.Router()


//singUp

router.get("/singup",singupController)
//
// router.get("/login")
//
// router.get("/logout")
//
// router.get("/me")


export default router
