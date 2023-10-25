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

  try { 
    decodedToken = jwt.verify(token, process.env.APP_KEY!); 
  } 
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
  return next();
};

/**
 * Requires authentication in order to procced to the next step
 * @returns next() if auth is present, 401 if not
 */
export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuth == false) {
    return res.status(401).send();
  }
  return next();
}
