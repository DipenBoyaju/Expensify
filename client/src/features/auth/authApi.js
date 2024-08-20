import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/api';
import { store } from '../../app/store';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
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