import React from "react";

import { Img, Input, Text } from "components";
import LoginButton from "components/LoginButton";
import PasswordResetEnterEmailTwoButton from "components/PasswordResetEnterEmailTwoButton";

import { CloseSVG } from "../../assets/images";

const PasswordresetenteremailTenPage = () => {
  const [framefiftytwovalue, setFramefiftytwovalue] = React.useState("");

  return (
    <>
      <div className="bg-gray-100 flex flex-col font-manrope gap-4 mx-auto p-[30px] sm:px-5 w-full">
        <div className="flex flex-col items-start md:px-5 w-auto">
          <PasswordResetEnterEmailTwoButton className="self-start flex flex-col gap-[18px] h-11 md:h-auto items-center justify-center py-[18px] rounded-[22px] w-auto" />
        </div>
        <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[368px] md:px-5 w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
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
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtDMSansMedium18"
                >
                  Enter your Email Address to reset your password
                </Text>
                <div className="flex flex-col gap-4 items-end justify-start w-full">
                  <div className="flex flex-col font-dmsans items-start justify-start w-full">
                    <Text
                      className="text-base text-gray-900 w-auto"
                      size="txtDMSansMedium16"
                    >
                      Email Address
                    </Text>
                  </div>
                  <Input
                    name="frameFiftyTwo"
                    placeholder="david.cameron@gmail.com"
                    value={framefiftytwovalue}
                    onChange={(e) => setFramefiftytwovalue(e)}
                    className="!placeholder:text-blue_gray-900_05 !text-blue_gray-900_05 font-manrope leading-[normal] p-0 text-base text-left tracking-[0.16px] w-full"
                    wrapClassName="border border-blue_gray-100 border-solid flex rounded-[23px] w-full"
                    suffix={
                      framefiftytwovalue?.length > 0 ? (
                        <CloseSVG
                          className="mt-auto mb-1 cursor-pointer h-[18px] ml-[35px]"
                          onClick={() => setFramefiftytwovalue("")}
                          fillColor="#1d2838"
                          height={18}
                          width={18}
                          viewBox="0 0 18 18"
                        />
                      ) : (
                        <Img
                          className="mt-auto mb-1 cursor-pointer h-[18px] ml-[35px]"
                          src="images/img_search.svg"
                          alt="search"
                        />
                      )
                    }
                    shape="round"
                  ></Input>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <LoginButton
                  className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full"
                  button="Reset Password"
                />
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

export default PasswordresetenteremailTenPage;
