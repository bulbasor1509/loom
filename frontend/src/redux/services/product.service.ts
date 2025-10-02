import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type {ProductType, ProductsAPIResponseType, ProductAPIResponseType} from "../../types/product.types.ts"


export const ProductsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductType[], void>({
            query: () => `products`,
            transformResponse(response: ProductsAPIResponseType){
                if (response.status === 200){
                    return response.data
                } else {
                    return []
                }
            }
        }),
        getProductsByGender: builder.query<ProductType[], string>({
            query: (gender) => `products?gender=${gender}`,
            transformResponse(response: ProductsAPIResponseType){
                if (response.status === 200){
                    return response.data
                } else {
                    return []
                }
            }
        }),
        getProductById: builder.query<ProductType | undefined, string>({
            query: (productId) => `products/${productId}`,
            transformResponse(response: ProductAPIResponseType){
                if (response.status === 200){
                    return response.data
                } else {
                    return undefined
                }
            }
        })
    }),
})

export const { useGetAllProductsQuery, useGetProductsByGenderQuery, useGetProductByIdQuery } = ProductsAPI