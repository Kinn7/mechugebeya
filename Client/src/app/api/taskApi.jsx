import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const taskApi = createApi({
    reducerPath : "taskApi",
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:5000/api'
    }),
    endpoints : (builder) => ({
        createTask : builder.mutation({
            query : ({assistantId,orderIdParam}) => ({
              //  url : `/task/createTask/c95137bb-7086-491e-964e-f3be3e3e1597/6a9c5ad5-b2d0-4437-b811-ded561a56da1`,
                url : `/task/createTask/${assistantId}/${orderIdParam}`,
                method : 'POST'
            })
        }),
        getAllTasks : builder.query({
            query : () => '/task/getAllTasks'
        }),
        getAssistants : builder.query({
            query : () => '/assistant/assistants'
        }),
        getNumberOfCustomers : builder.query({
            query : () => '/product/countCustomer'
        }),
        getNumberOfOrders : builder.query({
            query : () => '/product/countOrder'
        }),
        getNumberOfProducts : builder.query({
            query : () => 'product/countProduct'
        })
    })
})

export const { useCreateTaskMutation , useGetAllTasksQuery, useGetAssistantsQuery, useGetNumberOfCustomersQuery, useGetNumberOfOrdersQuery, useGetNumberOfProductsQuery } = taskApi