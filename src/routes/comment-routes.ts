import express, { Router } from 'express';
import * as c from '../controllers/comment-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const commentRouter: Router = express.Router();

commentRouter.get('/test', useDevOnly, c.getComments);
commentRouter.get('/:Id', c.getComment);
commentRouter.post('', requireAuth, c.postComment);
commentRouter.delete(':/Id', requireAuth, c.postComment);