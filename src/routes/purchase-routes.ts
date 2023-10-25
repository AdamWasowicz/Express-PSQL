import express, { Router } from 'express';
import * as c from '../controllers/purchase-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const purchaseRouter: Router = express.Router();

/**
 *  @openapi
 *  /purchase:
 *      post:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Purchase
 *          summary: Create new purchase
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreatePurchaseDto'
 *          responses:
 *              201:
 *                  description: New purchase created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Purchase'
 *              401:
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
purchaseRouter.post('', requireAuth, c.postPurchase);

/**
 *  @openapi
 *  /purchase/{Id}:
 *      get:
 *          tags:
 *          - Purchase
 *          summary: Get Purchase by selected Id
 *          parameters:
 *          - name: Id
 *            in: path
 *            description: The Id of purchase
 *            required: true
 *          responses:
 *              200:
 *                  description: Purchase with selected Id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Purchase'
 *              404:
 *                  description: Purchase with selected Id is missing
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
purchaseRouter.get('/:Id', c.getPurchase);

/**
 *  @openapi
 *  /purchase/test:
 *      get:
 *          tags:
 *          - Product
 *          summary: Get all purchases
 *          description: Get all purchases, used in tests
 *          responses:
 *              200:
 *                  description: Returns all purchases
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Purchase'
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
purchaseRouter.get('/test', useDevOnly, c.getPurchases);

/**
 *  @openapi
 *  /purchase/{Id}
 *      delete:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Purchase
 *          summary: Delete purchase with selected Id
 *          responses:
 *              204:
 *                  description: Purchase deleted
 *              403:
 *                  description: No permission to resource
 *              404:
 *                  description: No purchase with selected Id
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
purchaseRouter.delete('/:Id', requireAuth, c.deletePurchase);

/**
 *  @openapi
 *  /purchase:
 *      patch:
 *          security:
 *          - Bearer: []
 *          tags:
 *          - Purchase
 *          summary: Add purchased product to existing purchase
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddPurchasedProductDto'
 *          responses:
 *              200:
 *                  description: New purchased product added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Purchase'
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
purchaseRouter.patch('', requireAuth, c.patchPurchase)

export default purchaseRouter;