export type createProductDto = {
    Name: string,
    Category: string | undefined,
    Price: number
}

export type updateProductDto = {
    Id: number,
    Name: string,
    Category: string | undefined,
    Price: number
}