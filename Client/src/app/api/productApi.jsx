import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath : 'productApi',
    baseQuery : fetchBaseQuery({ 
        baseUrl : 'http://localhost:7000/api/product' 
    }),
    endpoints : (builder) => ({
        getProducts : builder.query({
            query: () => "/getProducts",
        }),
        getCategory : builder.query({
            query: () => "/getCategories"
        }),
        getProductsByCategory : builder.query({
            query: (categoryID) => `/getProductsByCategory/${categoryID}`
        })
//        /getProductsByCategory/:categoryID
    })
})

export const { useGetProductsQuery , useGetCategoryQuery, useGetProductsByCategoryQuery } = productApi