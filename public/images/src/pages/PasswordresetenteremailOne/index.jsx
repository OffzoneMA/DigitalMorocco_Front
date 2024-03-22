import React from "react";

import { Img, Input, Text } from "components";
import LoginButton from "components/LoginButton";

const PasswordresetenteremailOnePage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
            <div className="flex flex-col items-center justify-start pb-5 w-auto">
              <Img
                className="h-[215px] w-64"
                src="images/img_mailsent.svg"
                alt="mailsent"
              />
            </div>
            <Text
              className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
              size="txtDMSansMedium22"
            >
              Réinitialiser votre mot de passe
            </Text>
            <div className="flex flex-col gap-9 items-center justify-start w-full">
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtDMSansMedium18"
                >
                  Créez un nouveau mot de passe pour votre compte.
                </Text>
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtDMSansMedium16"
                  >
                    Nouveau mot de passe
                  </Text>
                  <Input
                    name="frameFiftyTwo"
                    placeholder="••••••••••••"
                    className="!placeholder:text-blue_gray-900_05 !text-blue_gray-900_05 font-manrope leading-[normal] p-0 text-base text-left tracking-[0.16px] w-full"
                    wrapClassName="border border-blue_gray-100 border-solid flex md:h-auto rounded-[23px] w-full"
                    suffix={
                      <Img
                        className="mt-px mb-0.5 h-[18px] ml-[35px]"
                        src="images/img_eye.svg"
                        alt="eye"
                      />
                    }
                    shape="round"
                  ></Input>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtDMSansMedium16"
                  >
                    Confirmez le mot de passe
                  </Text>
                  <Input
                    name="frameFiftyTwo_One"
                    placeholder="••••••••••••"
                    className="!placeholder:text-blue_gray-900_05 !text-blue_gray-900_05 font-manrope leading-[normal] p-0 text-base text-left tracking-[0.16px] w-full"
                    wrapClassName="border border-blue_gray-100 border-solid flex md:h-auto rounded-[23px] w-full"
                    suffix={
                      <Img
                        className="mt-px mb-0.5 h-[18px] ml-[35px]"
                        src="images/img_eye.svg"
                        alt="eye"
                      />
                    }
                    shape="round"
                  ></Input>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <LoginButton
                  className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full"
                  button="Réinitialiser le mot de passe"
                />
                <div className="flex sm:flex-col flex-row gap-2.5 items-center justify-start w-auto sm:w-full">
                  <Text
                    className="text-blue_gray-900_02 text-sm w-auto"
                    size="txtDMSansMedium14"
                  >
                    Des difficultés pour vous connecter ?
                  </Text>
                  <Text
                    className="text-deep_purple-A400 text-sm w-auto"
                    size="txtDMSansBold14"
                  >
                    Contactez le support
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

export default PasswordresetenteremailOnePage;
