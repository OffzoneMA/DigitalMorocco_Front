import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Text , Button   } from 'components';


export default function ForgotPassword(){
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      async function onSubmit(values) {
        console.log(values);
      }

    return (
        <>
          <div className="bg-gray-100 flex flex-col font-manrope gap-4 mx-auto p-[30px] sm:px-5 w-full">
            <div className="flex flex-col items-start md:px-5 w-auto">
            <div className={`self-start flex flex-col gap-[18px] h-11 md:h-auto items-center justify-center py-[18px] rounded-[22px] w-auto`}>
                <div className="flex flex-row gap-3 items-center justify-center w-auto md:w-full">
                <img
                    className="h-[22px] w-[22px]"
                    src="images/img_arrowleft.svg"
                    alt="arrowleft"
                />
                <a className="text-blue_gray-400_01 text-sm tracking-[0.14px] w-auto" href='/SignIn'>
                    <Text
                        size="txtManropeSemiBold14"
                    >
                        Back to Login
                    </Text>
                </a>
                </div>
            </div>
            </div>
            <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[368px] md:px-5 w-auto sm:w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start sm:px-5 px-6 py-8 rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
                <a
                  href="javascript:"
                  className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
                >
                  <Text size="txtDMSansMedium22">Forgot Password?</Text>
                </a>
                <div className="flex flex-col gap-8 items-center justify-start w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="text-gray-900 text-lg w-full"
                      size="txtDMSansMedium18"
                    >
                      Enter your Email Address to reset your password
                    </Text>
                    <div className="flex flex-col gap-4  justify-start w-full">
                      <div className="flex flex-col font-dmsans items-start justify-start w-full">
                        <Text
                          className="text-base text-gray-900 w-auto"
                          size="txtDMSansMedium16"
                        >
                          Email Address
                        </Text>
                      </div>
                      <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.email ? 'red-400' : ''}  
                    ${errors?.email ? 'border-red-500' : 'border-blue_gray-100'}`}>
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
                      placeholder="Enter your email address"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                      type="text"
                    ></input>
                    </div>
                    {errors?.email?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.email?.message}
                   </span>}
                    </div>
                  
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full">
                        <div className="flex flex-col items-center justify-center w-auto">
                        <button
                            type="submit"
                            className="text-base text-white-A700 w-auto"
                            size="font-dmsans font-medium"
                        >
                            Reset Password 
                        </button>
                        </div>
                        <img
                        className="h-6 w-6"
                        src="images/img_arrowright.svg"
                        alt="arrowright"
                        />
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 text-sm w-auto"
                        size="txtDMSansMedium14"
                      >
                        Having trouble signing in?
                      </Text>
                      <Text
                        className="text-deep_purple-A400 text-sm w-auto"
                        size="txtDMSansBold14"
                      >
                        Contact Support
                      </Text>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    
}