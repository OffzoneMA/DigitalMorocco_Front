import React from "react";

import { Img, Input, Text } from "components";
import LoginButton from "components/LoginButton";
import PasswordResetEnterEmailTwoButton from "components/PasswordResetEnterEmailTwoButton";

const PasswordresetenteremailSevenPage = () => {
  return (
    <>
    <div className="bg-gray-100 flex flex-col font-manrope gap-4 mx-auto p-[30px] sm:px-5 w-full">
      <div className="flex flex-col items-start md:px-5 w-auto">
        <PasswordResetEnterEmailTwoButton
          className="flex flex-col gap-[18px] h-11 md:h-auto items-center justify-center py-[18px] rounded-[22px] w-auto"
          loginbuttontext="Retour à la connexion"
        />  
      </div>
        <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[348px] md:px-5 w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start sm:px-5 px-6 py-8 rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
            <Text
              className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
              size="txtDMSansMedium22"
            >
              <>Mot de passe oublié ?</>
            </Text>
            <div className="flex flex-col gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <Text
                  className="leading-[28.00px] max-w-[472px] md:max-w-full text-gray-900 text-lg"
                  size="txtDMSansMedium18"
                >
                  Saisir votre adresse e-mail pour réinitialiser votre mot de
                  passe.
                </Text>
                <div className="flex flex-col items-end justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-base text-gray-900 w-auto"
                      size="txtDMSansMedium16"
                    >
                      Adresse e-mail
                    </Text>
                    <Input
                      name="frameFiftyThree"
                      placeholder="Saisir votre adresse e-mail"
                      className="md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-base text-left w-full"
                      wrapClassName="border border-blue_gray-100 border-solid rounded-[23px] w-full"
                      type="email"
                      shape="round"
                    ></Input>
                  </div>
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

export default PasswordresetenteremailSevenPage;
