import React from "react";

import { Img, Text } from "components";
import LoginButton from "components/LoginButton";

const PasswordresetenteremailThreePage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start mb-[213px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
            <Img
              className="h-[235px] w-64"
              src="images/img_frame12.svg"
              alt="frameTwelve"
            />
            <div className="flex flex-col gap-9 items-center justify-start w-full">
              <Text
                className="leading-[32.00px] text-[22px] text-center text-gray-900_01 sm:text-lg md:text-xl w-full"
                size="txtDMSansMedium22Gray90001"
              >
                <>
                  Your password reset has been <br />
                  successfully completed
                </>
              </Text>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <LoginButton className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full" />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordresetenteremailThreePage;
