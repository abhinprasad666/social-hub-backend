import { Router } from "express";
import { proctectRoute } from "../../middleware/proctectRouter.js";
import {
    followAndUnfollow,
    getSingleUserProfile,
    getSuggestedUsers,
    updateProfile,
} from "../controllers/usersController.js";


const router = Router();

//get single user frofile
router.get("/profile/:username", getSingleUserProfile);
// follow and unfollow
router.post("/follow/unfollow/:id", proctectRoute, followAndUnfollow);
//get suggested users
router.get("/suggested", proctectRoute, getSuggestedUsers);
//update profile
router.put("/update/profile", proctectRoute, updateProfile);

export default router;
