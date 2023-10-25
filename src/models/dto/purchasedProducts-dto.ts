/**
 *  @openapi
 *  components:
 *      schemas:
 *          CreatePurchasedProductDto:
 *              type: object
 *              properties:
 *                  productId:
 *                      type: number
 *                  numberOfItems:
 *                      type: number
 *                  productPrice:
 *                      type: number
 */
export type CreatePurchasedProductDto = {
    productId: number,
    numberOfItems: number,
    productPrice: number
}

/**
 *  @openapi
 *  components:
 *      schemas:
 *          AddPurchasedProductDto:
 *              type: object
 *              properties:
 *                  purchaseId:
 *                      type: number
 *                  purchasedProducts:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/CreatePurchasedProductDto'
 */
export type AddPurchasedProductDto = {
    purchaseId: number,
    purchasedProducts: CreatePurchasedProductDto[]
}