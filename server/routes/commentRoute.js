import express from 'express';
import { 
  AddComment,
  deleteComment,
  deletePost,
  likePost,
  showComments,
  toSeeAnotherPersonProfile 
} from '../controllers/commentController.js';
import { authUser } from '../middlewares/authUser.js';

const commentRouter = express.Router();

commentRouter.post('/addComment', authUser, AddComment);
commentRouter.get('/allComments/:postId', showComments);
commentRouter.post('/addLike', authUser, likePost);
commentRouter.delete('/delete/comment/:commentId', authUser, deleteComment);
commentRouter.delete('/delete/post/:postId', authUser, deletePost);
commentRouter.get('/seeProfile/:id', toSeeAnotherPersonProfile);

export default commentRouter;
