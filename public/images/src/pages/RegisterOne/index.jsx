import React from "react";

import { Button, Img, Input, Line, Text } from "components";
import LoginButton from "components/LoginButton";

const RegisterOnePage = () => {
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
              <div className="flex flex-col gap-4 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  <>Création d&#39;un Compte Digital Maroc</>
                </Text>
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Nom Complet
                    </Text>
                    <Input
                      name="frameFiftyTwo"
                      placeholder="Saisir votre nom complet"
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                      wrapClassName="border border-blue_gray-100 border-solid w-full"
                      shape="round"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Adresse E-mail
                    </Text>
                    <Input
                      name="frameFiftyTwo_One"
                      placeholder="Saisir votre adresse e-mail"
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
                        Mot de Passe
                      </Text>
                      <Input
                        name="frameFiftyTwo_Two"
                        placeholder="Saisir votre mot de passe"
                        className="leading-[normal] p-0 placeholder:text-gray-500 text-left text-sm tracking-[0.14px] w-full"
                        wrapClassName="border border-blue_gray-100 border-solid flex md:h-auto w-full"
                        suffix={
                          <Img
                            className="mt-auto mb-0.5 h-[18px] ml-[35px]"
                            src="images/img_eye.svg"
                            alt="eye"
                          />
                        }
                        shape="round"
                      ></Input>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full">
                      <Text
                        className="max-w-[472px] md:max-w-full text-gray-700 text-xs tracking-[0.12px]"
                        size="txtDMSansRegular12"
                      >
                        Le mot de passe doit contenir au moins 8 caractères,
                        incluant des lettres majuscules et minuscules.
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-full">
                    <LoginButton
                      className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[18px] rounded-[26px] w-full"
                      button="Suivant"
                    />
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                <Line className="bg-gray-300 h-px w-[46%]" />
                <Text
                  className="text-[15px] text-gray-700 tracking-[0.15px] w-auto"
                  size="txtDMSansMedium15"
                >
                  OU
                </Text>
                <Line className="bg-gray-300 h-px w-[46%]" />
              </div>
              <div className="flex flex-col gap-3 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  <>S&#39;inscrire avec votre Compte Social</>
                </Text>
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <Button
                    className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-[472px] sm:min-w-full"
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
                      <>S&#39;inscrire avec Google</>
                    </div>
                  </Button>
                  <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col h-[42px] md:h-auto items-center justify-center md:px-10 px-20 sm:px-5 py-3 rounded-[21px] w-full">
                    <div className="flex flex-row gap-2.5 items-center justify-start w-[191px]">
                      <div className="flex flex-col h-6 items-center justify-start w-6">
                        <Img
                          className="h-6 w-6"
                          src="images/img_link.svg"
                          alt="link"
                        />
                      </div>
                      <Text
                        className="text-blue_gray-900_02 text-sm tracking-[0.14px] w-auto"
                        size="txtDMSansMedium14"
                      >
                        <>S&#39;inscrire avec LinkedIn</>
                      </Text>
                    </div>
                  </div>
                  <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col h-[42px] md:h-auto items-center justify-center md:px-10 px-20 sm:px-5 py-3 rounded-[21px] w-full">
                    <div className="flex flex-row gap-2.5 items-center justify-start w-[200px]">
                      <Img
                        className="h-6 w-6"
                        src="images/img_logosfacebook.svg"
                        alt="logosfacebook"
                      />
                      <Text
                        className="text-blue_gray-900_02 text-sm tracking-[0.14px] w-auto"
                        size="txtDMSansMedium14"
                      >
                        <>S&#39;inscrire avec Facebook</>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
            <Text
              className="text-blue_gray-900_02 text-sm w-auto"
              size="txtDMSansMedium14"
            >
              Vous avez déjà un compte ?
            </Text>
            <Text
              className="text-deep_purple-A400 text-sm w-auto"
              size="txtDMSansBold14"
            >
              Se Connecter
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterOnePage;
