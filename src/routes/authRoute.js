import express from "express"
import { loginController, logoutController, meController, singupController } from "../controllers/authController.js"

const router=express.Router()


//singUp

router.post("/singup",singupController)
// router.get("/login")
router.post('/login',loginController)
// router.get("/logout")
router.post('/logout',logoutController)
// router.get("/me")
router.post('/me',meController)


export default router
