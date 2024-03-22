import React from "react";

import { Button, Img, Input, Text } from "components";

const PasswordresetentercodeTwoPage = () => {
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
            <div className="flex flex-col items-center justify-start pb-5 w-auto">
              <div className="md:h-[166px] sm:h-[207px] h-[215px] pl-[3px] pt-[3px] relative w-full">
                <div className="absolute md:h-[166px] sm:h-[207px] h-[210px] inset-[0] justify-center m-auto w-[96%]">
                  <div
                    className="absolute bg-cover bg-no-repeat flex flex-col h-max inset-[0] items-start justify-center m-auto p-[5px] w-full"
                    style={{ backgroundImage: "url('images/img_group53.svg')" }}
                  >
                    <div className="flex flex-col md:gap-10 gap-[120px] items-start justify-start ml-2 md:ml-[0] mt-[17px] w-[18%] md:w-full">
                      <Img
                        className="h-5 w-5"
                        src="images/img_signal.svg"
                        alt="signal"
                      />
                      <Img
                        className="h-10 w-10"
                        src="images/img_signal.svg"
                        alt="signal_One"
                      />
                    </div>
                  </div>
                  <Img
                    className="absolute h-[166px] inset-x-[0] mx-auto object-cover top-[0]"
                    src="images/img_mail.png"
                    alt="mail"
                  />
                </div>
                <Img
                  className="absolute h-10 right-[0] top-[23%] w-10"
                  src="images/img_signal.svg"
                  alt="signal_Two"
                />
                <Img
                  className="absolute bottom-[15%] h-[30px] right-[17%] w-[30px]"
                  src="images/img_signal.svg"
                  alt="signal_Three"
                />
              </div>
            </div>
            <Text
              className="text-[22px] text-black-900 sm:text-lg md:text-xl w-auto"
              size="txtDMSansMedium22Black900"
            >
              Vérifiez votre adresse e-mail
            </Text>
            <div className="flex flex-col gap-9 items-center justify-start w-full">
              <div className="flex flex-col items-center justify-start w-full">
                <Text
                  className="leading-[26.00px] max-w-[456px] md:max-w-full text-base text-blue_gray-500 text-center"
                  size="txtDMSansMedium16Bluegray500"
                >
                  <>
                    Nous vous avons envoyé un e-mail. Suivez les instructions à
                    l&#39;intérieur de l&#39;e-mail pour finaliser la
                    vérification.
                  </>
                </Text>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      Code de vérification
                    </Text>
                    <Input
                      name="zipcode"
                      placeholder="453870"
                      className="!placeholder:text-blue_gray-700_01 !text-blue_gray-700_01 font-medium leading-[normal] md:h-auto p-0 sm:h-auto text-base text-left tracking-[6.56px] w-full"
                      wrapClassName="border border-blue_gray-100 border-solid rounded-[26px] w-full"
                      size="lg"
                    ></Input>
                  </div>
                  <div className="flex sm:flex-col flex-row gap-6 items-start justify-center py-2 w-full">
                    <Input
                      name="button"
                      placeholder="Vérifier l&#39;e-mail"
                      className="font-medium leading-[normal] p-0 placeholder:text-white-A700 text-base text-left w-full"
                      wrapClassName="flex flex-1 md:h-auto rounded-[26px] w-full"
                      type="email"
                      suffix={
                        <Img
                          className="h-6 ml-6 my-auto"
                          src="images/img_ggspinner.svg"
                          alt="gg:spinner"
                        />
                      }
                      color="teal_A700"
                      size="lg"
                    ></Input>
                    <Button
                      className="cursor-pointer flex-1 font-medium h-[52px] leading-[normal] rounded-[26px] text-base text-center w-full"
                      color="blue_50"
                      size="md"
                    >
                      <>Renvoyer l&#39;e-mail</>
                    </Button>
                  </div>
                </div>
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

export default PasswordresetentercodeTwoPage;
