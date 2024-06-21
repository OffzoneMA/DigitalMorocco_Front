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
      data?.accessToken && sessionStorage.setItem('userToken', data.accessToken)

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
      if (data?.accessToken) {
        sessionStorage.setItem('userToken', data.accessToken);
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        // Utiliser localStorage ou sessionStorage en fonction de rememberMe
        if (user.rememberme) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 3);
          localStorage.setItem('rememberMe', user.rememberme);
          localStorage.setItem('userToken', data.accessToken);
          localStorage.setItem('userData', JSON.stringify(data.user));
          localStorage.setItem('expirationDate', expirationDate.getTime());
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('expirationDate');
        }
        // Stocker les informations utilisateur dans un cookie sécurisé
        document.cookie = `user=${JSON.stringify(data.user)}; path=/; secure; SameSite=None`;
      }
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

