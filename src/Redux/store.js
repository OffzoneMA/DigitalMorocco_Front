import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../Services/Auth'
import { adminApi } from '../Services/Admin.Service'

import authReducer from './auth/authSlice'
import { memberApi } from '../Services/Member.Service'
import { subsApi } from '../Services/Subscription.Service'
import { userLogApi } from '../Services/UserLog.Service'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [subsApi.reducerPath]: subsApi.reducer,
    [userLogApi.reducerPath]: userLogApi.reducer

  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware, adminApi.middleware, memberApi.middleware, subsApi.middleware, userLogApi.middleware]) ,
})
export default store