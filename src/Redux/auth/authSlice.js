import { createSlice } from '@reduxjs/toolkit'
import { LoginUser, fetchUserInfo, registerUser } from './authAction'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

  const userEmail = localStorage.getItem('userEmail')
  ? localStorage.getItem('userEmail')
  : null

const initialState = {
  loading: false,
  userInfo: null, 
  userToken, 
  error: null,
  success: false,
  userEmail
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') 
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
  extraReducers: {
        // Login user
        [LoginUser.pending]: (state) => {
          state.loading = true
          state.error = null
          state.success=false
        },
        [LoginUser.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.userToken = payload.accessToken
          state.userInfo = payload.user
          state.success=true

        },
        [LoginUser.rejected]: (state, { payload }) => {
          state.loading = false
          state.error = payload
          state.false=true
        },

        // register user
        [registerUser.pending]: (state) => {
          state.loading = true
          state.error = null
          state.success=false
        },
        [registerUser.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.userToken = payload.accessToken
          state.userInfo = payload.user
          state.userEmail = payload.user.email
          state.success = true 
        },
        [registerUser.rejected]: (state, { payload }) => {
          state.loading = false
          state.error = payload
          state.success=false
        },
    
  },

})
export const { logout, setCredentials,resetState ,setUserEmail  } = authSlice.actions
export default authSlice.reducer