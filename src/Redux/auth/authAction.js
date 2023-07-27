import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } =  await axios.post(
        `${process.env.REACT_APP_baseURL}/users/`,
        user,
        config
      )
      data?.accessToken && localStorage.setItem('userToken', data.accessToken)

      return data

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const LoginUser = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data }=  await axios.post(
        `${process.env.REACT_APP_baseURL}/users/Login`,
        user,
        config
      )
      data?.accessToken &&localStorage.setItem('userToken', data.accessToken)


      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

