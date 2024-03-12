import React from "react";

import { Button, Img, Input, Text } from "components";
import LoginButton from "components/LoginButton";

const RegisterVerifyEmailOnePage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start mb-[39px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
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
            <div className="flex flex-col gap-9 items-center justify-start w-full">
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
                    <Input
                      name="frameFiftyTwo"
                      placeholder="Enter your Verification Code"
                      className="!placeholder:text-blue_gray-100_02 !text-blue_gray-100_02 leading-[normal] md:h-auto p-0 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                      wrapClassName="border border-blue_gray-100 border-solid rounded-[26px] w-full"
                      size="xl"
                    ></Input>
                  </div>
                  <div className="flex sm:flex-col flex-row gap-6 items-start justify-center py-2 w-full">
                    <LoginButton
                      className="bg-teal-A700 flex flex-1 flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full"
                      button="Verify Email"
                    />
                    <Button
                      className="cursor-pointer flex-1 font-medium h-[52px] leading-[normal] rounded-[26px] text-base text-center w-full"
                      color="blue_50"
                      size="md"
                    >
                      Resend Email
                    </Button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVerifyEmailOnePage;
