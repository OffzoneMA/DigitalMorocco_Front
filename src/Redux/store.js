import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../Services/Auth'
import { adminApi } from '../Services/Admin.Service'

import authReducer from './auth/authSlice'
import { memberApi } from '../Services/Member.Service'
import { subsApi } from '../Services/Subscription.Service'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [subsApi.reducerPath]: subsApi.reducer,

  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware,adminApi.middleware,memberApi.middleware,subsApi.middleware]) ,
})
export default store