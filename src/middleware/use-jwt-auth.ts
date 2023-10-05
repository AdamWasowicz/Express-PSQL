import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  
  const token = authHeader.split(' ')[1];
  let decodedToken;

  try { decodedToken = jwt.verify(token, process.env.APP_KEY!); } 
  catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.token = {
    userId: (decodedToken as any).userId,
    token: token
  }
  req.isAuth = true;
  next();
};

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuth === null || req.isAuth === undefined) {
    throw new Error('[Error] Authentication required');
  }
}
