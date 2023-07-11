import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath : 'productApi',
    baseQuery : fetchBaseQuery({ 
        baseUrl : 'http://localhost:5000/api/product' 
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
        }),
        searchProducts : builder.query({
            query: (search) => `/searchProducts?search=${search}`
        }),
        getProductById : builder.query({
            query: (productId) => `/getProductById/${productId}`
        })
//        /getProductsByCategory/:categoryID
    })
})

export const { useGetProductsQuery , useGetCategoryQuery, useGetProductsByCategoryQuery, useSearchProductsQuery, useGetProductByIdQuery } = productApi