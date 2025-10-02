import type {APIResponseType} from "./response.type.ts"

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



export type ProductsAPIResponseType = {
    data: ProductType[]
} & APIResponseType


export type ProductAPIResponseType = {
    data: ProductType
} & APIResponseType