import { createSlice } from '@reduxjs/toolkit'
import { LoginUser, fetchUserInfo, registerUser } from './authAction'

const userToken = sessionStorage.getItem('userToken')
  ? sessionStorage.getItem('userToken')
  : null

const userData = sessionStorage.getItem('userData')
? sessionStorage.getItem('userData')
: null

const userEmail = localStorage.getItem('userEmail')
? localStorage.getItem('userEmail')
: null

const userSocialInfos = sessionStorage.getItem('userSocialInfos')
? sessionStorage.getItem('userSocialInfos')
: null

const initialState = {
  loading: false,
  userInfo: null, 
  userToken, 
  userData,
  error: null,
  success: false,
  userEmail,
  userSocialInfos
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('userToken') 
      sessionStorage.removeItem('userData')
      sessionStorage.removeItem('userSocialInfos')
      localStorage.removeItem('userEmail')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.userData = null
      state.error = null
      state.userEmail = null
      state.userSocialInfos = null
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