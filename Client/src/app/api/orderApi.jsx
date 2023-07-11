import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const aa =     {products: [{
    id : 28,
    quantity: 1,
    price:57  
},
{
    id : 7,
    quantity: 1,
    price:112  
},
{
    id : 27,
    quantity : 3,
    price: 49
}]
}

export const orderApi = createApi({
    reducerPath : 'orderApi',
    baseQuery : fetchBaseQuery({ 
        baseUrl : 'http://localhost:5000/api/orders' 
    }),
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query : (or) => ({
                url : '/CreateOrder/1',
                method : 'POST',
                body : {
                products : or
                }
            })
        }),
        makePayment : builder.mutation({
            query : (total) => ({
                url : `/MakePayment/1/${total}`,
                method : 'POST',
            })
        }),
        verifyPayment : builder.query({
            query : (refId,OrderId) => `/verify/${refId}/${OrderId}`
        }),
        orderList : builder.query({
            query : () => "/getOrders"
        })

    })
})

export const {  useCreateOrderMutation , useMakePaymentMutation, useOrderListQuery, useVerifyPaymentQuery } = orderApi
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"

// export const orderApi = createApi({
//     reducerPath : 'orderApi',
//     baseQuery : fetchBaseQuery({
//         baseUrl : 'localhost:5000/api/orders'
//     }),
//     endpoints : (builder) => ({
//         createOrder : builder.mutation({
//             query : (order) => ({
//                 url : '/CreateOrder/1',
//                 method : 'POST',
//                 body : {
//                     products : order.products,
//                 }
//             })
//         }),
//     })
// })


// export const { useCreateOrderMutation } = orderApi;
// export const { endpoints: { createOrder } } = orderApi;