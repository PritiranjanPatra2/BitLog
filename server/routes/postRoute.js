import express from 'express';
import { addPost, getPosts, getSinglePost } from '../controllers/postController.js';

import { authUser } from '../middlewares/authUser.js';
const postRouter=express.Router();
postRouter.post('/addPost',authUser,addPost)
postRouter.get('/allPosts',getPosts)
postRouter.get('/:id',getSinglePost);
export default postRouter;