import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/api';


export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({


    createExpense: builder.mutation({
      query: (userData) => ({
        url: '/createexpenses',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Expenses']
    }),

    getAllExpenses: builder.query({
      query: () => ({
        url: '/getallexpenses',
        method: 'GET',
      }),
      providesTags: ['Expenses']
    }),

    getExpense: builder.query({
      query: (id) => ({
        url: `/getexpensesbybudget/${id}`,
        method: 'GET',
      }),
      providesTags: ['Expenses']
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/deleteexpenses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Expenses']
    }),

    updateExpense: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/expenses/update/${id}`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Expenses']
    }),

    getExpenseById: builder.query({
      query: (expenseId) => ({
        url: `/expenses/expense/${expenseId}`,
        method: 'GET',
      }),
      providesTags: ['Expenses']
    }),

  })
})

export const { useCreateExpenseMutation, useGetExpenseQuery, useDeleteExpenseMutation, useUpdateExpenseMutation, useGetExpenseByIdQuery, useGetAllExpensesQuery } = expenseApi;