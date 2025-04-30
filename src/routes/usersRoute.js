import { Router } from "express";
import { followAndUnfollow, getSingleUserProfile, getSuggestedUsers } from "../controllers/usersController.js";
import { proctectRoute } from "../../middleware/proctectRouter.js";

const router=Router()


//get single user frofile
router.get('/profile/:username',getSingleUserProfile)
// follow and unfollow
router.post('/follow/unfollow/:id',proctectRoute,followAndUnfollow)
//get suggested users
router.get('/suggested',proctectRoute,getSuggestedUsers)






export default router