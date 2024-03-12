import React from "react";

import { Button, Img, Input, Line, Text } from "components";
import LoginButton from "components/LoginButton";

const RegisterErrorPage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-end mx-auto p-[31px] sm:px-5 w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start mt-[11px] md:px-5 w-auto sm:w-full">
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
                      placeholder="Wade Warren"
                      className="!placeholder:text-blue_gray-800_01 !text-blue_gray-800_01 leading-[normal] md:h-auto p-0 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
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
                      placeholder="wade.warren@gmail"
                      className="!placeholder:text-red-300 !text-red-300 leading-[normal] md:h-auto p-0 sm:h-auto text-left text-sm tracking-[0.14px] w-full"
                      wrapClassName="border border-red-300 border-solid w-full"
                      shape="round"
                    ></Input>
                    <div className="flex flex-col items-center justify-start w-full">
                      <Text
                        className="text-red-300 text-sm tracking-[0.14px] w-auto"
                        size="txtDMSansRegular14"
                      >
                        Veuillez vérifier les informations saisies et
                        réessayer !
                      </Text>
                    </div>
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
                        placeholder="•••••"
                        className="!placeholder:text-red-400 !text-red-400 leading-[normal] p-0 text-left text-sm tracking-[4.48px] w-full"
                        wrapClassName="border border-red-300 border-solid flex md:h-auto w-full"
                        suffix={
                          <Img
                            className="h-[18px] ml-[35px] my-px"
                            src="images/img_eye.svg"
                            alt="eye"
                          />
                        }
                        shape="round"
                      ></Input>
                    </div>
                    <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-start w-full">
                      <div className="flex flex-row gap-1 items-center justify-start w-auto">
                        <Img
                          className="h-3 w-3"
                          src="images/img_checkmark_blue_gray_100_02.svg"
                          alt="checkmark"
                        />
                        <Text
                          className="text-gray-700 text-xs tracking-[0.12px] w-auto"
                          size="txtDMSansRegular12"
                        >
                          8 Caractères minimum
                        </Text>
                      </div>
                      <div className="flex flex-row gap-1 items-center justify-start w-auto">
                        <Img
                          className="h-3 w-3"
                          src="images/img_checkmark_teal_500.svg"
                          alt="checkmark_One"
                        />
                        <Text
                          className="text-gray-700 text-xs tracking-[0.12px] w-auto"
                          size="txtDMSansRegular12"
                        >
                          Lettre minuscule
                        </Text>
                      </div>
                      <div className="flex flex-row gap-1 items-center justify-start w-auto">
                        <Img
                          className="h-3 w-3"
                          src="images/img_checkmark_blue_gray_100_02.svg"
                          alt="checkmark_Two"
                        />
                        <Text
                          className="text-gray-700 text-xs tracking-[0.12px] w-auto"
                          size="txtDMSansRegular12"
                        >
                          Lettre majuscule
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full">
                      <Text
                        className="max-w-[472px] md:max-w-full text-red-300 text-sm tracking-[0.14px]"
                        size="txtDMSansRegular14"
                      >
                        Le mot de passe doit contenir au moins 8 caractères et
                        inclure une lettre majuscule.
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start py-2 w-full">
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

export default RegisterErrorPage;
