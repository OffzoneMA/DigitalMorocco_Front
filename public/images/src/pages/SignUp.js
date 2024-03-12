import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Img , Text , Line, Button  } from 'components';
import { useGoogleLogin } from "@react-oauth/google";
import { FaCheck, FaTimes } from "react-icons/fa"; 

export default function SignUp() {
  const [Mount, setMount] = useState(true)

  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data);
  };
  const googleSignIn = useGoogleLogin({
    onSuccess: (res) => {
      console.log("res", res);
      alert("Login successfull. 😍");
    },
  });

  return (
    <>
    <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[42px] md:px-10 sm:px-5 w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col items-center justify-start sm:px-5 px-6 py-8 rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  Creating a Digital Morocco Account
                </Text>
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Full Name
                    </Text>
                    <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.fullName ? 'red-400' : ''}  
                    ${errors?.fullName ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("fullName", {
                        required: {
                          value: true,
                          message: "You must enter your fullName",
                        },
                        minLength: {
                          value: 3,
                          message: "This is not long enough to be a fullName",
                        },
                        maxLength: {
                          value: 50,
                          message: "This is too long",
                        },
                        
                      })}
                        id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      className={`leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto 
                      text-left text-sm tracking-[0.14px] w-full bg-transparent border-0 `}
                      type="text"
                    ></input>
                    </div>
                    {errors?.fullName?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.fullName?.message}
                   </span>
                    }
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Email Address
                    </Text>
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
                   </span>
                    }
                  </div>
                  <div className="flex flex-col gap-3 items-end justify-start w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-gray-900_01 text-sm w-auto"
                        size="txtDMSansRegular14Gray90001"
                      >
                        Password
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
                        validate: {
                          hasUpperCase: v => /[A-Z]/.test(v) || 'At least one uppercase letter',
                          hasLowerCase: v => /[a-z]/.test(v) || 'At least one lowercase letter',
                          // Ajoutez d'autres validations personnalisées si nécessaire
                        }
                      })}
                        id="password"
                        name="password"
                        type="password"
                      placeholder="Enter your password"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                    ></input>
                    </div>
                    {errors?.password?.message &&
                    <>
                        <span className=''>
                        <ul style={{ listStyle: "none", display: 'flex', paddingLeft: 0 }} className='items-center justify-between space-x-4' >
                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === 'minLength' ? 'error' : 'valid'}`}>
                            <div className={`rounded-full p-1  ${errors.password?.type === "minLength" ? "bg-gray-200" : "bg-green-500"}`}>
                              {errors.password?.type === "minLength" ? (
                                <FaCheck size={9} style={{ color: "white" ,}} className='text-sm' />
                              ) : (
                                <FaCheck size={9} style={{ color: "white" }} />
                              )}
                            </div>
                            <span className='ml-1'>
                              8 characters minimum
                            </span>
                          </li>

                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === "hasLowerCase" ? "error" : "valid"}`}>
                            <div className={`rounded-full p-1 ${errors.password?.type === "hasLowerCase" ? "bg-gray-200" : "bg-green-500"}`}>
                              {errors.password?.type === "hasLowerCase" ? (
                                <FaCheck size={9} style={{ color: "white" }} />
                              ) : (
                                <FaCheck size={9} style={{ color: "white" }} />
                              )}
                            </div>
                            <span className='ml-1'>
                              Lowercase Letter
                            </span>
                          </li>

                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === "hasUpperCase" ? "error" : "valid"}`}>
                            <div className={`rounded-full p-1 ${errors.password?.type === "hasUpperCase" ? "bg-gray-200" : "bg-green-500"}`}>
                              {errors.password?.type === "hasUpperCase" ? (
                                <FaCheck size={9} style={{ color: "white" }} />
                              ) : (
                                <FaCheck size={9} style={{ color: "white" }} />
                              )}
                            </div>
                            <span className='ml-1'>
                              Uppercase Letter
                            </span>
                          </li>
                        </ul>
                        </span>
                        <span className="text-red-400 text-sm mt-1">
                          {errors?.password?.message}
                      </span>
                        </>
                    }
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <button
                        type="submit"
                        className="text-base text-white-A700 w-auto"
                        size="font-dmsans font-medium"
                      >
                        Next
                      </button>
                    </div>
                    <img
                      className="h-6 w-6"
                      src="images/img_arrowright.svg"
                      alt="arrowright"
                    />
                  </div>
                  </div>
                </div>
              </form>
              <div className="flex sm:flex-col flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                <div className="bg-gray-300 h-px w-[46%]" />
                <Text
                  className="text-[15px] text-gray-700 tracking-[0.15px] w-auto"
                  size="txtDMSansMedium15"
                >
                  OR
                </Text>
                <div className="bg-gray-300 h-px w-[46%]" />
              </div>
              <div className="flex flex-col gap-3 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  Register using your Social Authentication
                </Text>
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <Button
                    className="common-pointer border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-[472px] sm:min-w-full"
                    onClick={() => googleSignIn()}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src="images/img_flatcoloriconsgoogle.svg"
                        alt="flat-color-icons:google"
                      />
                    }
                    shape="round"
                  >
                    <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      Sign up with Google
                    </div>
                  </Button>
                  <Button
                    className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-[472px] sm:min-w-full"
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src="images/img_link.svg"
                        alt="link"
                      />
                    }
                    shape="round"
                  >
                    <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      Sign up with LinkedIn
                    </div>
                  </Button>
                  <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col h-[42px] md:h-auto items-center justify-center md:px-10 px-20 sm:px-5 py-3 rounded-[21px] w-full">
                    <div className="flex flex-row gap-2.5 items-center justify-start w-[186px]">
                      <img
                        className="h-6 w-6"
                        src="images/img_logosfacebook.svg"
                        alt="logosfacebook"
                      />
                      <Text
                        className="text-blue_gray-900_02 text-sm tracking-[0.14px] w-auto"
                        size="txtDMSansMedium14"
                      >
                        Sign up with Facebook
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
            <a
              href="javascript:"
              className="text-blue_gray-900_02 text-sm w-auto"
            >
              <Text size="txtDMSansMedium14">Have an account?</Text>
            </a>
            <a
              href="/login"
              className="text-deep_purple-A400 text-sm w-auto"
            >
              <Text size="txtDMSansBold14">Sign In</Text>
            </a>
          </div>
      </div>
    </div>
    </>
  )
}
