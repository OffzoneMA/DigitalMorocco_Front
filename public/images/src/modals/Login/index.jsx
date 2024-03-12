import React from "react";
import { default as ModalProvider } from "react-modal";

import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import { Button, CheckBox, Img, Input, Line, Text } from "components";
import LoginButton from "components/LoginButton";

const LoginModal = () => {
  const navigate = useNavigate();
  const googleSignIn = useGoogleLogin({
    onSuccess: (res) => {
      console.log("res", res);
      alert("Login successfull. 😍");
    },
  });

  return (
    <div className="bg-blue_gray-900_01 bg-[url(/public/images/Bg.png)] bg-no-repeat bg-center  md:bg-right md:bg-right-top xl:bg-[size:cover,_auto]  2xl:bg-[size:cover,_contain] 2xl:bg-right-top flex flex-col font-dmsans items-center justify-start mx-auto p-[42px] md:px-10 sm:px-5 w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo2.svg"
              alt="logo"
            />
          </div>
        <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start mb-[27px] md:px-5 px-6 py-8 rounded-[12px] w-[520px] sm:w-full">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
            <div className="flex flex-col gap-3 items-start justify-start w-full">
              <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col h-[42px] md:h-auto items-center justify-center md:px-10 px-20 sm:px-5 py-3 rounded-[21px] w-full">
                <div
                  className="common-pointer flex flex-row gap-2.5 items-center justify-start w-[175px]"
                  onClick={() => googleSignIn()}
                >
                  <Img
                    className="h-6 w-6"
                    src="images/img_flatcoloriconsgoogle.svg"
                    alt="flatcoloriconsg"
                  />
                  <Text
                    className="text-blue_gray-900_02 text-sm tracking-[0.14px] w-auto"
                    size="txtDMSansMedium14"
                  >
                    Sign in with Google
                  </Text>
                </div>
              </div>
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
                  Sign in with LinkedIn
                </div>
              </Button>
              <Button
                className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-[472px] sm:min-w-full"
                leftIcon={
                  <Img
                    className="h-6 mr-2.5"
                    src="images/img_logosfacebook.svg"
                    alt="logos:facebook"
                  />
                }
                shape="round"
              >
                <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                  Sign in with Facebook
                </div>
              </Button>
            </div>
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
            <div className="flex flex-col gap-4 items-center justify-start w-full">
              <Text
                className="text-base text-gray-900 tracking-[0.16px] w-auto"
                size="txtDMSansMedium16"
              >
                Sign in with your Email{" "}
              </Text>
              <div className="flex flex-col gap-4 items-center justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <Input
                    name="frameFiftyTwo"
                    placeholder="Enter your email address"
                    className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                    wrapClassName="border border-blue_gray-100 border-solid w-full"
                    type="email"
                    shape="round"
                  ></Input>
                </div>
                <div className="flex flex-col gap-3 items-end justify-start w-full">
                  <div className="flex flex-col items-start justify-start w-full">
                    <Input
                      name="frameFiftyTwo_One"
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
                  <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                    <CheckBox
                      className="leading-[normal] text-[13px] text-left tracking-[0.13px]"
                      inputClassName="border border-blue_gray-100_01 border-solid h-4 mr-[5px] w-4"
                      name="rememberme"
                      id="rememberme"
                      label="Remember Me"
                    ></CheckBox>
                    <a className="text-[13px] text-deep_purple-A400 tracking-[0.13px] w-auto">
                      <Text
                        className="common-pointer"
                        size="txtDMSansRegular13"
                        onClick={() => navigate("/passwordresetenteremail")}
                      >
                        Forgot Password?
                      </Text>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center justify-start w-full">
            <LoginButton className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full" />
            <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
              <Text
                className="text-blue_gray-900_02 text-sm w-auto"
                size="txtDMSansMedium14"
              >
                New to Digital Morocco?
              </Text>
              <a
                href="javascript:"
                className="text-deep_purple-A400 text-sm w-auto"
              >
                <Text size="txtDMSansBold14">Create an Account</Text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
