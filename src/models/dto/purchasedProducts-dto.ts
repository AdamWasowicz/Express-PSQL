export type createPurchasedProductDto = {
    productId: number,
    numberOfItems: number,
    productPrice: number
}

export type addPurchasedProductDto = {
    purchaseId: number,
    purchasedProducts: createPurchasedProductDto[]
}