import express, { Router } from 'express';
import * as c from '../controllers/auth-controller';

const authRouter: Router = express.Router();

/**
 *  @openapi
 *  /register:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Create new account
 *          description: Create new account
 *          requestBody:
 *              content:
 *                  appliaction/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: New account created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      appliaction/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
authRouter.post('/register', c.register);

/**
 *  @openapi
 *  /login:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Login to account
 *          description: Login to account
 *          requestBody:
 *              content:
 *                  appliaction/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Login succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *              404:
 *                  description: User not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      appliaction/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
authRouter.post('/login', c.login);

export default authRouter;