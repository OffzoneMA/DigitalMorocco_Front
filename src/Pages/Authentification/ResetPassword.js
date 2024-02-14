import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
      } = useForm();
    
      const navigate = useNavigate()
    
      // Custom validation function for confirm password
  const validateConfirmPassword = (value) => {
    const password = watch("password"); // Get the value of the password field
    return value === password || "Passwords do not match";
  };
    
      async function onSubmit(values) {
        console.log(values);
      }

    return (
        <>
          <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-end mx-auto p-[33px] sm:px-5 w-full">
            <div className="flex flex-col gap-[42px] items-center justify-start mt-[27px] md:px-5 w-auto w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 max-w-[520px] w-full">
                <div className="flex flex-col items-center justify-start pb-5 w-auto">
                  <img
                    className="h-[215px] w-64"
                    src="images/img_mailsent.svg"
                    alt="mailsent"
                  />
                </div>
                <Text
                  className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
                  size="txtDMSansMedium22"
                >
                  Reset Your Password
                </Text>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9 items-center justify-start w-full">
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="text-gray-900 text-lg w-full"
                      size="txtDMSansMedium18"
                    >
                      Enter your New Password to reset your password
                    </Text>
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-base text-gray-900 w-auto"
                        size="txtDMSansMedium16"
                      >
                        New Password
                      </Text>
                      <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.password ? 'red-400' : ''}  
                    ${errors?.password ? 'border-red-500' : 'border-blue_gray-100'}`}>
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
                      placeholder="Enter your password"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                    ></input>
                    </div>
                    {errors?.password?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.password?.message}
                   </span>
                    }
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-base text-gray-900 w-auto"
                        size="txtDMSansMedium16"
                      >
                        Re-enter Password
                      </Text>
                      <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.confirmPassword ? 'red-400' : ''}  
                    ${errors?.confirmPassword ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: validateConfirmPassword,
                      })}
            
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                      placeholder="Re-Enter your password"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                    ></input>
                    </div>
                    {errors?.confirmPassword?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.confirmPassword?.message}
                   </span>
                    }
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <button
                        type="submit"
                        className="text-base text-white-A700 w-auto"
                        size="font-dmsans font-medium"
                      >
                        Reset Paswword
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
        </>
      );
}