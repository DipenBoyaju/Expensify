import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/api';


export const budgetApi = createApi({
  reducerPath: 'budgetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({


    createBudget: builder.mutation({
      query: (userData) => ({
        url: '/createbudget',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Budget']
    }),

    getBudget: builder.query({
      query: () => ({
        url: '/getbudget',
        method: 'GET',
      }),
      providesTags: ['Budget']
    }),

    getBudgetById: builder.query({
      query: (id) => ({
        url: `/getbudget/${id}`,
        method: 'GET',
      }),
      providesTags: ['Budget']
    }),

    editBudget: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/editbudget/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Budget']
    }),

    deleteBudget: builder.mutation({
      query: (id) => ({
        url: `/deletebudget/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Budget']
    })
  })
})

export const { useCreateBudgetMutation, useGetBudgetQuery, useGetBudgetByIdQuery, useEditBudgetMutation, useDeleteBudgetMutation } = budgetApi;