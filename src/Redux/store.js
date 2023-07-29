import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../Services/Auth'
import { adminApi } from '../Services/Admin.Service'

import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware,adminApi.middleware]) ,
})
export default store