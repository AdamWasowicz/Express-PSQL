import express, { Router } from 'express';
import * as c from '../controllers/product-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const productRouter: Router = express.Router();

/**
 *  @openapi
 *  /product/test:
 *      get:
 *          tags:
 *          - Product
 *          summary: Get all products
 *          description: Get all products, used in tests
 *          responses:
 *              200:
 *                  description: Returns all products
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
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
productRouter.get('/test', useDevOnly, c.getProducts);

/**
 *  @openapi
 *  /comment/{Id}:
 *      get:
 *          tags:
 *          - Product
 *          summary: Get Product by selected Id
 *          parameters:
 *          - name: Id
 *            in: path
 *            description: The Id of product
 *            required: true
 *          responses:
 *              200:
 *                  description: Product with selected Id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product with selected Id is missing
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
productRouter.get('/:Id', c.getProduct);

/**
 *  @openapi
 *  /comment:
 *      post:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Product
 *          summary: Create new product
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateProductDto'
 *          responses:
 *              201:
 *                  description: New product created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Product'
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
productRouter.post('', requireAuth, c.postProduct);

/**
 *  @openapi
 *  /comment/{Id}:
 *      delete:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Product
 *          summary: Delete product with selected Id
 *          responses:
 *              204:
 *                  description: Product deleted
 *              403:
 *                  description: No permission to resource
 *              404:
 *                  description: No product with selected Id
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
productRouter.delete('/:Id', requireAuth, c.deleteProduct)

export default productRouter;