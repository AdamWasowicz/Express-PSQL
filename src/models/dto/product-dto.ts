/**
 *  @openapi
 *  components:
 *      schemas:
 *          CreateProductDto:
 *              type: object
 *              properties:
 *                  Name:
 *                      type: string
 *                  Category:
 *                      type: string
 *                      required: false
 *                  Price:
 *                      type: number
 */
export type CreateProductDto = {
    Name: string,
    Category: string | undefined,
    Price: number
}

/**
 *  @openapi
 *  components:
 *      schemas:
 *          UpdateProductDto:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  Name:
 *                      type: string
 *                  Category:
 *                      type: string
 *                      required: false
 *                  Price:
 *                      type: number
 */
export type UpdateProductDto = {
    Id: number,
    Name: string,
    Category: string | undefined,
    Price: number
}