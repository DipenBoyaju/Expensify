import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/api';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({


    userRegister: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

    userLogin: builder.mutation({
      query: (userData) => ({
        url: '/signin',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User']
    }),

    checkUser: builder.query({
      query: () => ({
        url: '/verify',
        method: 'GET',
      }),
      providesTags: ['User']
    }),

    googleSign: builder.mutation({
      query: (userData) => ({
        url: '/google',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

  })
})

export const { useUserRegisterMutation, useUserLoginMutation, useCheckUserQuery, useLogoutMutation, useGoogleSignMutation } = authApi;