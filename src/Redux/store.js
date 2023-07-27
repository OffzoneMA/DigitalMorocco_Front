import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../Services/Auth'
import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,


  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware])
      ,

})
export default store