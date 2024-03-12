import React from "react";
import { default as ModalProvider } from "react-modal";

import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, Text } from "components";
import LoginButton from "components/LoginButton";

const LoginErrorOneModal = (props) => {
  const navigate = useNavigate();

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[37%]"
      overlayClassName="bg-blue_gray-900_01 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start mt-3 md:px-5 px-6 py-8 rounded-[12px] w-[520px] sm:w-full">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
            <div className="flex flex-col gap-3 items-start justify-start w-full">
              <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col h-[42px] md:h-auto items-center justify-center md:px-10 px-20 sm:px-5 py-3 rounded-[21px] w-full">
                <div className="flex flex-row gap-2.5 items-center justify-start w-[175px]">
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
              <div className="flex flex-col font-manrope gap-4 items-center justify-start w-full">
                <Input
                  name="frameFiftyTwo"
                  placeholder="david.cameron@gmail"
                  className="!placeholder:text-red-300 !text-red-300 leading-[normal] md:h-auto p-0 sm:h-auto text-[15px] text-left tracking-[0.15px] w-full"
                  wrapClassName="border border-red-300 border-solid w-full"
                  shape="round"
                ></Input>
                <Input
                  name="frameSixtyOne"
                  placeholder="••••••••••••"
                  className="!placeholder:text-red-300 !text-red-300 leading-[normal] p-0 text-base text-left tracking-[0.16px] w-full"
                  wrapClassName="border border-red-300 border-solid flex md:h-auto w-full"
                  suffix={
                    <Img
                      className="mt-px mb-0.5 h-[18px] ml-[35px]"
                      src="images/img_eye.svg"
                      alt="eye"
                    />
                  }
                  shape="round"
                  size="xs"
                ></Input>
                <div className="flex flex-col items-center justify-start w-full">
                  <Text
                    className="text-red-300 text-sm tracking-[0.14px] w-auto"
                    size="txtManropeMedium14"
                  >
                    Please verify the entered information and try again!
                  </Text>
                </div>
                <div className="flex flex-col font-dmsans items-end justify-start w-full">
                  <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                    <div className="bg-blue-A400 flex flex-col items-start justify-start rounded w-4">
                      <Img
                        className="h-[7px] w-2.5"
                        src="images/img_checkmark.svg"
                        alt="checkmark"
                      />
                    </div>
                    <Text
                      className="flex-1 text-[13px] text-gray-700 tracking-[0.13px] w-auto"
                      size="txtDMSansRegular13Gray700"
                    >
                      Remember Me
                    </Text>
                    <a className="text-[13px] text-deep_purple-A400 tracking-[0.13px] w-auto">
                      <Text
                        className="common-pointer"
                        size="txtDMSansRegular13"
                        onClick={() => navigate("/passwordresetenteremailtwo")}
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
    </ModalProvider>
  );
};

export default LoginErrorOneModal;
