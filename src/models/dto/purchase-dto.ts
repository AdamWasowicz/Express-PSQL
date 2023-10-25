import { CreatePurchasedProductDto } from "./purchasedProducts-dto"

/**
 *  @openapi
 *  components:
 *      schemas:
 *          CreatePurchaseDto:
 *              type: object
 *              properties:
 *                  purchasedProducts:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/CreatePurchasedProduictDto'
 */
export type CreatePurchaseDto = {
    purchasedProducts: CreatePurchasedProductDto[]
}
