import React from "react";

import { Img, Input, Text } from "components";

const PasswordresetenteremailNinePage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start mb-[77px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 w-[520px] sm:w-full">
            <div className="flex flex-col items-center justify-start pb-5 w-auto">
            <div className="flex flex-col items-center justify-center w-full">
            <Img
              className="h-[235px] w-[256px]"
              src="images/img_verify.svg"
              alt="logo"
            />
          </div>
            </div>
            <Text
              className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
              size="txtDMSansMedium22"
            >
              Vérifiez votre boîte de réception
            </Text>
            <div className="flex flex-col gap-9 items-center justify-start w-full">
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <Text
                  className="leading-[28.00px] max-w-[456px] md:max-w-full text-center text-gray-900 text-lg"
                  size="txtDMSansMedium18"
                >
                  Nous avons envoyé un lien de réinitialisation du mot de passe
                  à votre adresse e-mail.
                </Text>
                <Text
                  className="leading-[26.00px] max-w-[456px] md:max-w-full text-base text-blue_gray-500 text-center"
                  size="txtDMSansMedium16Bluegray500"
                >
                  <>
                    Si vous ne trouvez pas l&#39;e-mail dans votre boîte de
                    réception ou vos spams, cliquez ci-dessous pour renvoyer
                    l&#39;e-mail.
                  </>
                </Text>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <Input
                  name="button"
                  placeholder="Renvoyer l&#39;e-mail"
                  className="font-medium leading-[normal] md:h-auto p-0 placeholder:text-white-A700 sm:h-auto text-base text-left w-full"
                  wrapClassName="rounded-[26px] w-[38%]"
                  type="email"
                  color="teal_A700"
                  size="lg"
                ></Input>
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

export default PasswordresetenteremailNinePage;
