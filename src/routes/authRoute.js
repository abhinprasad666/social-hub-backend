import express from "express"
import { loginController, singupController } from "../controllers/authController.js"

const router=express.Router()


//singUp

router.post("/singup",singupController)
//
// router.get("/login")
router.post('/login',loginController)
//
// router.get("/logout")
//
// router.get("/me")


export default router
