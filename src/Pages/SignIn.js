import React from 'react'
import { useForm } from "react-hook-form";

import {FaGoogle } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  
  const password = getValues("password");
  const onSubmit = (data) => {
    // Traiter les données soumises lorsque la validation est réussie
    console.log(data);
  };
  return (

    <div className=''>
      <div className='grid place-items-center py-10'>
        <div className='bg-white md:w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/img/offzoneLogo.jpg"
            alt=""
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <div className='flex justify-center mt-4'>
          <div className='border-2 w-10 border-blue-600 mb-2'></div>
          </div>
    <div className='flex justify-center my-1'>
    
      <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
      <FaGoogle className='text-sm'/>
      </a>
      <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
      <FaLinkedin className='text-sm'/>
      </a>
      </div> {/*social login  */}
      <p className='text-gray-400 my-3 text-center'>or use your email account</p>
        </div>

          <div className="felx flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-900 ">
                  Email address
                </label>
                <div className="mt-2 ">
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
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                   <span className="text-red-400 text-sm py-2">
            {errors?.password?.message}
                   </span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign in
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