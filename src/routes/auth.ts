import express, { Router } from 'express';
import * as c from '../controllers/auth';

const authRouter: Router = express.Router();

authRouter.post('/register', c.register);
authRouter.post('/login', c.login);

export default authRouter;