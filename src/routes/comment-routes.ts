import express, { Router } from 'express';
import * as c from '../controllers/comment-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const commentRouter: Router = express.Router();

/**
 *  @openapi
 *  /comment/test:
 *      get:
 *          tags:
 *          - Comment
 *          summary: Get all comments
 *          description: Get all comments, used in tests
 *          responses:
 *              200:
 *                  description: Returns all comments
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Comment'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
commentRouter.get('/test', useDevOnly, c.getComments);

/**
 *  @openapi
 *  /comment/{Id}:
 *      get:
 *          tags:
 *          - Comment
 *          summary: Get comment by Id
 *          parameters:
 *          - name: Id
 *            in: path
 *            description: The Id of comment
 *            required: true
 *          responses:
 *              200:
 *                  description: Comment with selected Id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              404:
 *                  description: Comment with selected Id is not present
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *               500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
commentRouter.get('/:Id', c.getComment);

/**
 *  @openapi
 *  /comment:
 *      post:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Comment
 *          summary: Create new comment
 *          requestBody:
 *              content:
 *                  appliaction/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCommentDto'
 *          responses:
 *              201:
 *                  description: New comment created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Comment'
 *             401:
 *                  description: Unauthorized
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
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string 
 */
commentRouter.post('', requireAuth, c.postComment);

/**
 *  @openapi
 *  /comment/{Id}:
 *      delete:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Comment
 *          summary: Delete comment with seclected Id
 *          responses:
 *              204:
 *                  description: Comment deleted
 *              403:
 *                  description: No permission to resource
 *              404:
 *                  description: No comment with selected Id
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
commentRouter.delete(':/Id', requireAuth, c.postComment);