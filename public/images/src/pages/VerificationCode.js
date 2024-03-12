import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Text , Button  } from 'components';

export default function VerificationCode() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate()
    
    
      async function onSubmit(values) {
        console.log(values);
      }

      return (
        <>
          <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className="flex flex-col gap-[42px] items-center justify-start mb-[39px] w-auto sm:w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[235px] w-[256px]"
                  src="images/img_verify.svg"
                  alt="logo"
                />
              </div>
                <Text
                  className="text-[22px] text-black-900 sm:text-lg md:text-xl w-auto"
                  size="txtDMSansMedium22Black900"
                >
                  Verify your email
                </Text>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9 items-center justify-start w-full">
                  <div className="flex flex-col items-center justify-start w-full">
                    <Text
                      className="leading-[26.00px] max-w-[456px] md:max-w-full text-base text-blue_gray-500 text-center"
                      size="txtDMSansMedium16Bluegray500"
                    >
                      We sent you an email. Follow the instructions within the email
                      to complete verification.
                    </Text>
                  </div>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <div className="flex flex-col gap-4 items-center justify-start w-full">
                      <div className="flex flex-col gap-2 items-start justify-start w-full">
                        <Text
                          className="text-gray-900_01 text-sm w-auto"
                          size="txtDMSansRegular14Gray90001"
                        >
                          Verification Code
                        </Text>
                        <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.fullName ? 'red-400' : ''}  
                    ${errors?.fullName ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("code", {
                        required: {
                          value: true,
                        },
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Enter a 6-digit verification code",
                        },
                        
                      })}
                        id="code"
                      name="code"
                      placeholder="Enter your Verification Code"
                      className={`leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto 
                      text-left text-sm tracking-[0.14px] w-full bg-transparent border-0 `}
                      type="text"
                    ></input>
                    </div>
                    {errors?.code?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.code?.message}
                   </span>
                    }
                    </div>
                    <div className="flex sm:flex-col flex-row gap-6 items-start justify-between py-2 w-full">
                      <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-10 py-[13px] rounded-[26px] ">
                        <button
                            type="submit"
                            className="text-base text-white-A700 w-auto"
                            size="font-dmsans font-medium"
                        >
                            Verify Email
                        </button>
                        <img
                        className="h-6 w-6"
                        src="images/img_arrowright.svg"
                        alt="arrowright"
                        />
                      </div>
                        <div className="bg-blue-50 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-12 py-[13px] rounded-[26px] ">
                            <button
                            className=" text-teal-A700 leading-[normal] rounded-[26px] text-base text-center w-full"
                            size="p-[15px]"
                            >
                            Resend Email
                            </button>
                            </div>
                        </div>
                        </div>
                        </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 text-sm w-auto"
                        size="txtDMSansMedium14"
                      >
                        Having trouble registering?
                      </Text>
                      <Text
                        className="text-deep_purple-A400 text-sm w-auto"
                        size="txtDMSansBold14"
                      >
                        Contact Support
                      </Text>
                    </div>
                  
                </form>
              </div>
            </div>
          </div>
        </>
      );
}