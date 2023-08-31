import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {FaGoogle } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Redux/auth/authAction';
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [Mount, setMount] = useState(true)

  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  useEffect(() => {
    if (Mount) { setMount(false) }
   else{ if (userInfo) {
      toast.success("Successfuly !")
      setTimeout(() => navigate('/Complete_SignUp'), 2500)
    }
    if (error) {
      toast.error(error)
    }}

  }, [loading])


  const password = getValues("password");
  const onSubmit = (data) => {
    const { confirmPassword, ...formData } = data;
    dispatch(registerUser(formData));
  };

  return (
    <div className='pt-20 md:pt-24'>
      <div className='grid place-items-center py-10'>
        <div className='bg-white md:w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/img/Logo.jpg"
              alt=""
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Toaster />
            <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
           
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">

                <input
                 {...register("email", {
                  required: {
                    value: true,
                    message: "You must enter your email address",
                  },
                  minLength: {
                    value: 8,
                    message: "This is not long enough to be an email",
                  },
                  maxLength: {
                    value: 120,
                    message: "This is too long",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "This needs to be a valid email address",
                  },
                })}
                  id="email"
                  name="email"

                  className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
                  <span id='email-error' className="text-red-400 text-sm py-2">
                {errors?.email?.message}
               </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">

                <input
                 {...register("password", {
                  required: "You must enter a password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                  id="password"
                  name="password"
                  type="password"
               
                  className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
                  <span id='password-error' className="text-red-400 text-sm py-2">
            {errors?.password?.message}
          </span>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">

                <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
                  <span id='confirmPassword-error' className="text-red-400 text-sm py-2">
            {errors?.confirmPassword?.message}
          </span>
              </div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Next
              </button>
            </div>
          </form>
          <p className="my-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/SignIn" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer">
              Sign in
            </a>
          </p>
          <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 font-semibold">Or</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-6">
                        <a
                            href={`${process.env.REACT_APP_baseURL}/users/auth/google`}
                            aria-label="Continue with Google"
                            type="button"
                            className="flex items-center w-full mt-2 justify-center space-x-4 border rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <FaGoogle className='text-lg'/>
                            <p>Continue with Google</p>
                        </a>
                        <a
                           href={`${process.env.REACT_APP_baseURL}/users/auth/linkedin`}
                            aria-label="Continue with LinkedIn"
                            role="button"
                            className="flex items-center w-full mt-2 justify-center space-x-4 border rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                            <FaLinkedin className='text-xl'/>
                            <p>Continue with LinkedIn</p>
                        </a>
           
                    </div>
          </div>
        </div>
      </div>
    </div>

  )
}
