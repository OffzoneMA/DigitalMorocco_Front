import React from "react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";

import { Button, Img, Input, Line, Text } from "components";
import LoginButton from "components/LoginButton";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const RegisterPage = () => {
  const googleSignIn = useGoogleLogin({
    onSuccess: (res) => {
      console.log("res", res);
      alert("Login successfull. 😍");
    },
  });

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
    .required('Fullname is required')
    .min(3, "This is not long enough to be a full Name"),
  
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'This needs to be a valid email address'
      ),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
      });


  
  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

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
                    <Input
                      {...register("fullName")}
                      name="fullName"
                      placeholder="Enter your full name"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                      wrapClassName="border border-blue_gray-100 border-solid w-full"
                      type="text"
                      shape="round"
                    ></Input>
                    {errors.fullName && (
                      <div className="flex flex-col justify-start w-full">
                      <Text
                        className="max-w-[472px] md:max-w-full text-gray-700 text-xs tracking-[0.12px]"
                        size="txtDMSansRegular12"
                      >
                        <span className="text-red-400 text-sm py-2">
                        Full Name Error
                        </span>
                      </Text>
                    </div>
                    )}
                    
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Email Address
                    </Text>
                    <Input
                      {...register("email")}
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                      wrapClassName="border border-blue_gray-100 border-solid w-full"
                      type="email"
                      shape="round"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-3 items-end justify-start w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-gray-900_01 text-sm w-auto"
                        size="txtDMSansRegular14Gray90001"
                      >
                        Password
                      </Text>
                      <Input
                        {...register("password")}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="leading-[normal] p-0 placeholder:text-gray-500 text-left text-sm tracking-[0.14px] w-full"
                        wrapClassName="border border-blue_gray-100 border-solid flex md:h-auto w-full"
                        type="password"
                        suffix={
                          <Img
                            className="mt-auto mb-0.5 h-[18px] ml-3"
                            src="images/img_eye.svg"
                            alt="eye"
                          />
                        }
                        shape="round"
                      ></Input>
                    </div>
                    
                  </div>
                  <div className="flex flex-col items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <button
                        type="submit"
                        className="text-base text-white-A700 w-auto"
                        size="font-dmsans font-medium"
                      >
                        Next
                      </button>
                    </div>
                    <Img
                      className="h-6 w-6"
                      src="images/img_arrowright.svg"
                      alt="arrowright"
                    />
                  </div>
                  </div>
                </div>
              </form>
              <div className="flex sm:flex-col flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                <Line className="bg-gray-300 h-px w-[46%]" />
                <Text
                  className="text-[15px] text-gray-700 tracking-[0.15px] w-auto"
                  size="txtDMSansMedium15"
                >
                  OR
                </Text>
                <Line className="bg-gray-300 h-px w-[46%]" />
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
                      <Img
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
                      <Img
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
                      <Img
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
  );
};

export default RegisterPage;
