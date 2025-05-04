import express from 'express';
import { commentPostController, createPostController, deletePostController, likePostController } from '../controllers/postController.js';
import { proctectRoute } from '../../middleware/proctectRouter.js';

const router=express.Router()


//create post
router.post('/create',proctectRoute,createPostController)
//create post
router.post('/like/:id',proctectRoute,likePostController)
//create post
router.post('/comment/:id',proctectRoute,commentPostController)
//create post
router.delete('/',proctectRoute,deletePostController)




export default router
