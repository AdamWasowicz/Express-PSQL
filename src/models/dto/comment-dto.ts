
/**
 *  @openapi
 *  components:
 *      schemas:
 *          CreateCommentDto:
 *              type: object
 *              properties:
 *                  Content:
 *                      type: string
 *                  ProductId:
 *                      type: number
 */
export type CreateCommentDto = {
    Content: string;
    ProductId: number;
}