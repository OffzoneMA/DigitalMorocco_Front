import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from "js-cookie";


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
        if (user?.rememberme) {
          Cookies.set("rememberedEmail", user.email, { expires: 7, secure: true });
          Cookies.set("rememberMe", true, { expires: 7, secure: true });
          Cookies.set("authToken", data?.accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
        } else {
          Cookies.remove("rememberedEmail");
          Cookies.remove("rememberMe");
          Cookies.set("authToken", data?.accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
        }
        // else {
        //   localStorage.removeItem('rememberMe');
        //   localStorage.removeItem('userToken');
        //   localStorage.removeItem('userData');
        //   localStorage.removeItem('expirationDate');
        // }
        // Stocker les informations utilisateur dans un cookie sécurisé
        document.cookie = `user=${JSON.stringify(data.user)}; path=/; secure; SameSite=None`;
      }
      return data
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

