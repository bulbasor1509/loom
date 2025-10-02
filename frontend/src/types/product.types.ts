export interface ProductType {
    _id: string
    name : string
    image: string
    description: string
    price: number
    quantity: number
    gender: string
    category: string
}

export interface APIResponseType {
    status: number
    message: string
}

export type ProductsAPIResponseType = {
    data: ProductType[]
} & APIResponseType


export type ProductAPIResponseType = {
    data: ProductType
} & APIResponseType