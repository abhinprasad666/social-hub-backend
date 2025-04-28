import express from "express"
import { loginController, logoutController, meController, singupController } from "../controllers/authController.js"
import { proctectRoute } from "../../middleware/proctectRouter.js"

const router=express.Router()


//singUp

router.post("/singup",singupController)
// router.get("/login")
router.post('/login',loginController)
// router.get("/logout")
router.post('/logout',logoutController)
// router.get("/me")
router.get('/me',proctectRoute,meController)


export default router
