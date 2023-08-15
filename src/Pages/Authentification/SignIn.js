import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../Redux/auth/authAction';
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa';

export default function SignIn() {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const [Mount, setMount] = useState(true)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  useEffect(() => {
    if (Mount) { setMount(false) }
    else {
      if (userInfo) {
        toast.success("Logged In")
        setTimeout(() =>{
        
        if (!userInfo?.role) { navigate('/Complete_SignUp') }
        else{
          navigate('/Dashboard_' + userInfo?.role)
        }
        
        
        }, 2000)
      }
      if (error) {
        toast.error(error)
      }
    }

  }, [loading])



  async function onSubmit(values) {
    dispatch(LoginUser(values))
  }


  return (

    <div className='pt-3 md:pt-40'>
      <div className='grid place-items-center py-10'>
        <div className='bg-white md:w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/img/Logo.jpg"
              alt=""
            />
            <h2 className=" mb-0 mr-4 mt-10 text-center text-xl font-bold leading-normal tracking-tight text-gray-900">
              Sign in to your account with
            </h2>


          </div>
          <div className='flex flex-row items-center justify-center lg:justify-center'>

            <a
              href={`${process.env.REACT_APP_baseURL}/users/auth/google`}
              className='border-2 border-gray-300 rounded-full p-3 mx-1 bg-white'>
              <FaGoogle className='text-xl text-blue-600' />
            </a>
            <a
              href={`${process.env.REACT_APP_baseURL}/users/auth/linkedin`}
              className='border-2 border-gray-300 rounded-full p-3 mx-1 bg-white'>
              <FaLinkedinIn className='text-xl text-blue-600 ' />
            </a>
          </div>




          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 font-semibold">Or</p>
              <hr className="w-full" />
            </div>
            <Toaster />

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-900 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "You must enter your email address",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "This needs to be a valid email address",
                      }
                    })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block  p-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-400 text-sm py-2">
                    {errors?.email?.message}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: "You must enter a password",

                    })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block  p-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-400 text-sm py-2">
                    {errors?.password?.message}
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="disabled:bg-gray-400 disabled:cursor-not-allowed flex w-full justify-center rounded-md  bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {loading ? "loading" : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="/SignUp" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>


  )
}