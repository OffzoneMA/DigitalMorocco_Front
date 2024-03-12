import React from "react";

import { Button, Img, Line, Text } from "components";

const PasswordresetentercodeThreePage = () => {
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-dmsans sm:gap-10 md:gap-10 gap-[84px] items-center justify-start mx-auto pb-[220px] w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row md:gap-10 items-center justify-between max-w-[1440px] md:px-10 sm:px-5 px-[118px] py-5 w-full">
          <Img
            className="h-[47px] w-[180px]"
            src="images/img_logo.svg"
            alt="logo"
          />
          <div className="flex flex-row gap-[21px] items-start justify-start w-auto">
            <div className="flex flex-col items-start justify-start p-3 w-12">
              <Img
                className="h-6 w-6"
                src="images/img_bell01.svg"
                alt="bellOne"
              />
            </div>
            <Button
              className="flex h-10 items-center justify-center w-10"
              shape="circle"
              color="blue_gray_900_04"
              variant="outline"
            >
              <Img
                className="h-6"
                src="images/img_user03.svg"
                alt="userThree"
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[42px] items-center justify-start max-w-[1232px] mx-auto md:px-5 w-full">
          <Text
            className="text-[22px] text-black-900 sm:text-lg md:text-xl w-auto"
            size="txtDMSansMedium22Black900"
          >
            Bienvenue sur Digital Morocco
          </Text>
          <div className="flex flex-col gap-[42px] items-center justify-start w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <Text
                className="text-base text-blue_gray-500 text-center w-full"
                size="txtDMSansMedium16Bluegray500"
              >
                Choisissez votre chemin pour commencer.
              </Text>
            </div>
            <div className="gap-[42px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 items-start justify-center w-auto md:w-full">
              <div className="border-2 border-indigo-50 border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full">
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    Startup
                  </Text>
                  <div className="flex flex-col h-40 items-center justify-end p-3 w-40">
                    <div className="flex flex-col items-center justify-start w-[94%] md:w-full">
                      <div className="md:h-[127px] h-[129px] relative w-full">
                        <div className="absolute h-[127px] inset-[0] justify-center m-auto w-[78%]">
                          <div className="h-[127px] m-auto w-full">
                            <div className="h-[127px] m-auto w-full">
                              <div className="absolute h-[127px] inset-[0] justify-center m-auto w-full">
                                <div className="flex flex-col h-full items-center justify-start m-auto w-full">
                                  <div className="flex flex-row items-start justify-between w-full">
                                    <div className="bg-blue-300 flex flex-col h-[5px] items-center justify-start mb-[17px] mt-[105px] rounded-sm w-[5px]">
                                      <Img
                                        className="h-[5px] rounded-tl-sm rounded-tr-sm w-[5px]"
                                        src="images/img_vector_blue_a400_02.svg"
                                        alt="vector"
                                      />
                                    </div>
                                    <div className="flex flex-col md:gap-10 gap-[117px] items-end justify-start">
                                      <div className="bg-blue-300 flex flex-col h-[5px] items-center justify-start rounded-sm w-[5px]">
                                        <Img
                                          className="h-[5px] rounded-tl-sm rounded-tr-sm w-[5px]"
                                          src="images/img_vector_blue_a400_02.svg"
                                          alt="vector_One"
                                        />
                                      </div>
                                      <div className="bg-blue-100_01 h-[5px] w-full"></div>
                                    </div>
                                    <div className="bg-blue-300 h-[5px] mb-[47px] mt-[74px] rounded-sm w-[5px]"></div>
                                  </div>
                                </div>
                                <Img
                                  className="absolute bottom-[4%] h-[25px] inset-x-[0] mx-auto"
                                  src="images/img_television.svg"
                                  alt="television"
                                />
                              </div>
                              <div
                                className="absolute bg-cover bg-no-repeat flex flex-col h-[82px] inset-x-[0] items-end justify-start mx-auto pl-[19px] pt-[19px] top-[11%] w-[73%]"
                                style={{
                                  backgroundImage:
                                    "url('images/img_group12.svg')",
                                }}
                              >
                                <Img
                                  className="h-[59px] mt-[3px]"
                                  src="images/img_user.svg"
                                  alt="user"
                                />
                              </div>
                              <div
                                className="absolute bg-cover bg-no-repeat flex flex-col h-[83px] inset-x-[0] items-start justify-start mx-auto p-[5px] top-[11%] w-[73%]"
                                style={{
                                  backgroundImage:
                                    "url('images/img_group11.svg')",
                                }}
                              >
                                <Img
                                  className="h-[42px] mb-[31px] w-[43px]"
                                  src="images/img_contrast.svg"
                                  alt="contrast"
                                />
                              </div>
                              <Img
                                className="absolute bottom-[0] h-[5px] inset-x-[0] mx-auto"
                                src="images/img_vector_blue_a400_02_5x27.svg"
                                alt="vector_Four"
                              />
                              <Img
                                className="absolute bottom-[16%] h-[5px] inset-x-[0] mx-auto"
                                src="images/img_vector_blue_100_01.svg"
                                alt="vector_Five"
                              />
                            </div>
                            <Img
                              className="absolute bottom-[4%] h-[25px] inset-x-[0] mx-auto"
                              src="images/img_television_blue_a400_02.svg"
                              alt="television_One"
                            />
                          </div>
                          <div className="absolute flex flex-col gap-2.5 h-max inset-[0] items-center justify-center m-auto w-[97%]">
                            <Img
                              className="h-[82px]"
                              src="images/img_favorite.svg"
                              alt="favorite"
                            />
                            <div className="flex flex-col items-center justify-start w-[49%] md:w-full">
                              <Img
                                className="h-[5px]"
                                src="images/img_vector_blue_a400_02_5x47.svg"
                                alt="vector_Six"
                              />
                              <div
                                className="bg-cover bg-no-repeat flex flex-col h-[5px] items-center justify-start mt-[5px] w-full"
                                style={{
                                  backgroundImage:
                                    "url('images/img_vector_blue_100_01.svg')",
                                }}
                              >
                                <Img
                                  className="h-[5px]"
                                  src="images/img_vector_blue_a400_02_5x47.svg"
                                  alt="vector_Seven"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Img
                          className="absolute h-[25px] right-[9%] top-[36%]"
                          src="images/img_favorite_blue_a400_02.svg"
                          alt="favorite_One"
                        />
                        <Img
                          className="absolute bottom-[36%] h-[5px] right-[9%] w-[5px]"
                          src="images/img_vector_blue_a400_02.svg"
                          alt="vector_Eight"
                        />
                        <div
                          className="absolute bg-cover bg-no-repeat flex flex-col h-[110px] inset-x-[0] items-start justify-start mx-auto p-1.5 top-[0] w-full"
                          style={{
                            backgroundImage: "url('images/img_group10.svg')",
                          }}
                        >
                          <div
                            className="bg-cover bg-no-repeat flex flex-col h-[95px] items-center justify-start ml-1 md:ml-[0] w-[95px]"
                            style={{
                              backgroundImage: "url('images/img_group14.svg')",
                            }}
                          >
                            <Img
                              className="h-[95px] w-[95px]"
                              src="images/img_group14.svg"
                              alt="checkmark"
                            />
                          </div>
                        </div>
                      </div>
                      <Img
                        className="h-0.5"
                        src="images/img_vector_blue_a400_02_2x12.svg"
                        alt="vector_Nine"
                      />
                    </div>
                  </div>
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
                  >
                    <>
                      Connectez-vous, participez à des événements exclusifs et
                      propulsez votre start-up vers le succès, grâce au
                      networking et à l&#39;accès à des ressources exclusives.
                    </>
                  </Text>
                </div>
              </div>
              <div className="border-2 border-indigo-50 border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full">
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    Investisseur
                  </Text>
                  <Img
                    className="h-40 w-40"
                    src="images/img_startup.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
                  >
                    Découvrez de nouvelles fonctionnalités, participez à des
                    événements exclusifs et accédez à des ressources
                    privilégiées pour enrichir vos investissements.
                  </Text>
                </div>
              </div>
              <div className="border-2 border-indigo-50 border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full">
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    COmpany
                  </Text>
                  <div className="flex flex-col h-40 items-center justify-start p-1.5 w-40">
                    <div className="h-[127px] md:h-[129px] my-2.5 relative w-full">
                      <div className="absolute md:h-[109px] h-[127px] inset-[0] justify-center m-auto w-full">
                        <div className="md:h-[109px] h-[127px] m-auto w-full">
                          <div className="md:h-[109px] h-[127px] m-auto w-full">
                            <div className="flex m-auto w-full">
                              <div className="md:h-[109px] h-[127px] my-auto w-[96%]">
                                <div className="absolute md:h-[109px] h-[127px] inset-[0] justify-center m-auto w-full">
                                  <div
                                    className="absolute bg-cover bg-no-repeat flex flex-col h-28 items-center justify-start left-[0] pt-1.5 top-[0] w-[52%]"
                                    style={{
                                      backgroundImage:
                                        "url('images/img_group15.svg')",
                                    }}
                                  >
                                    <div
                                      className="bg-cover bg-no-repeat flex flex-col h-[106px] items-start justify-start p-[7px] w-full"
                                      style={{
                                        backgroundImage:
                                          "url('images/img_group23.svg')",
                                      }}
                                    >
                                      <div className="flex flex-col gap-3 items-center justify-start my-1.5 w-[18%] md:w-full">
                                        <Img
                                          className="h-[55px]"
                                          src="images/img_share.svg"
                                          alt="share"
                                        />
                                        <div className="bg-blue-50_01 h-2.5 w-2.5"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute bg-cover bg-no-repeat bottom-[0] flex flex-col h-[67px] items-end justify-start pb-2.5 px-2.5 right-[0] w-[61%]"
                                    style={{
                                      backgroundImage:
                                        "url('images/img_group17.svg')",
                                    }}
                                  >
                                    <Img
                                      className="h-[5px] mb-[52px]"
                                      src="images/img_vector_blue_a400_02_5x10.svg"
                                      alt="vector_Eleven"
                                    />
                                  </div>
                                </div>
                                <div className="absolute flex flex-col gap-[7px] items-start justify-start right-[4%] top-[29%] w-[41%]">
                                  <div className="flex flex-row items-center justify-evenly w-full">
                                    <Img
                                      className="h-2.5"
                                      src="images/img_contrast_blue_300.svg"
                                      alt="contrast_One"
                                    />
                                    <div className="bg-blue-100_01 h-2.5 w-[9%]"></div>
                                    <div className="bg-blue-50_01 h-2.5 w-[78%]"></div>
                                  </div>
                                  <div
                                    className="bg-cover bg-no-repeat flex flex-col h-2.5 items-center justify-start md:ml-[0] ml-[5px] w-[53%] md:w-full"
                                    style={{
                                      backgroundImage:
                                        "url('images/img_group20.svg')",
                                    }}
                                  >
                                    <Img
                                      className="h-2.5"
                                      src="images/img_settings.svg"
                                      alt="settings"
                                    />
                                  </div>
                                </div>
                                <div
                                  className="absolute bg-cover bg-no-repeat bottom-[0] flex flex-col h-[37px] items-end justify-start pt-[3px] px-[3px] right-[0] w-2/5"
                                  style={{
                                    backgroundImage:
                                      "url('images/img_group18.svg')",
                                  }}
                                >
                                  <Line className="bg-gray-100_02 h-[33px] mr-[9px] w-[5px]" />
                                </div>
                              </div>
                              <div
                                className="bg-cover bg-no-repeat flex flex-col h-2.5 items-center justify-start ml-[-5.01px] mt-[37px] w-[9%] z-[1]"
                                style={{
                                  backgroundImage:
                                    "url('images/img_group21.svg')",
                                }}
                              >
                                <Img
                                  className="h-2.5"
                                  src="images/img_save.svg"
                                  alt="save"
                                />
                              </div>
                              <div
                                className="bg-cover bg-no-repeat flex flex-col h-2.5 items-end justify-end ml-[undefinedpx] mr-3 mt-[37px] pl-[3px] py-[3px] w-[39%] z-[1]"
                                style={{
                                  backgroundImage:
                                    "url('images/img_group22.svg')",
                                }}
                              >
                                <div className="bg-blue-A400_02 h-0.5 mt-0.5 w-[84%]"></div>
                              </div>
                              <div
                                className="bg-cover bg-no-repeat md:h-10 h-28 ml-[undefinedpx] pb-[7px] pl-[7px] w-[49%] z-[1]"
                                style={{
                                  backgroundImage:
                                    "url('images/img_group16.svg')",
                                }}
                              >
                                <div className="absolute md:h-10 h-[76px] right-[0] top-[0] w-[91%]">
                                  <div className="absolute flex flex-col inset-[0] justify-center m-auto w-full">
                                    <div className="md:h-[29px] h-[30px] mx-auto w-full">
                                      <Img
                                        className="h-3 ml-auto w-3"
                                        src="images/img_contrast_blue_100_01.svg"
                                        alt="contrast_Two"
                                      />
                                      <div
                                        className="absolute bg-cover bg-no-repeat flex flex-col h-full inset-[0] items-start justify-center m-auto p-[7px] w-full"
                                        style={{
                                          backgroundImage:
                                            "url('images/img_group25.svg')",
                                        }}
                                      >
                                        <div className="bg-blue-300 h-[5px] mb-2.5 md:ml-[0] ml-[7px] w-[53%]"></div>
                                      </div>
                                    </div>
                                    <div
                                      className="bg-cover bg-no-repeat flex flex-col h-[67px] items-end justify-end mt-[-22.5px] w-[65%] z-[1]"
                                      style={{
                                        backgroundImage:
                                          "url('images/img_group24.svg')",
                                      }}
                                    >
                                      <div className="flex flex-col items-start justify-start mb-[3px] mt-[11px] w-3/5 md:w-full">
                                        <div className="bg-blue-100_01 flex flex-col items-center justify-start w-3/5 md:w-full">
                                          <Img
                                            className="h-[5px]"
                                            src="images/img_vector_blue_a400_02_5x27.svg"
                                            alt="vector_Seventeen"
                                          />
                                        </div>
                                        <div className="bg-blue-100_01 flex flex-col items-center justify-start mt-[17px] w-[68%] md:w-full">
                                          <Img
                                            className="h-[5px]"
                                            src="images/img_vector_blue_a400_02_5x27.svg"
                                            alt="vector_Eighteen"
                                          />
                                        </div>
                                        <Img
                                          className="h-0.5 mt-2"
                                          src="images/img_vector_blue_a400_02_2x25.svg"
                                          alt="vector_Nineteen"
                                        />
                                        <div className="bg-blue-100_01 md:h-[11px] h-[5px] mt-1.5 relative w-3/5">
                                          <Img
                                            className="h-[5px] my-auto w-1"
                                            src="images/img_vector_blue_50_01.svg"
                                            alt="vector_Twenty"
                                          />
                                          <Img
                                            className="absolute h-[5px] inset-[0] justify-center m-auto"
                                            src="images/img_vector_blue_a400_02_5x27.svg"
                                            alt="vector_TwentyOne"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute bottom-[29%] flex flex-col items-start justify-start right-[9%] w-[65%]">
                                    <Img
                                      className="h-0.5"
                                      src="images/img_vector_blue_a400_02_2x25.svg"
                                      alt="vector_TwentyTwo"
                                    />
                                    <Img
                                      className="h-0.5 mt-0.5"
                                      src="images/img_vector_blue_a400_02_2x25.svg"
                                      alt="vector_TwentyThree"
                                    />
                                    <Img
                                      className="h-0.5 mt-[15px]"
                                      src="images/img_vector_blue_a400_02_2x25.svg"
                                      alt="vector_TwentyFour"
                                    />
                                  </div>
                                  <Img
                                    className="absolute bottom-[0] h-0.5 inset-x-[0] mx-auto"
                                    src="images/img_vector_blue_a400_02_2x25.svg"
                                    alt="vector_TwentyFive"
                                  />
                                </div>
                                <div className="absolute bottom-[13%] h-2.5 left-[6%] w-2.5">
                                  <Img
                                    className="h-2.5 ml-auto my-auto"
                                    src="images/img_user_blue_100_01.svg"
                                    alt="user_One"
                                  />
                                  <Img
                                    className="absolute h-2.5 inset-[0] justify-center m-auto w-2.5"
                                    src="images/img_contrast_blue_a400_02.svg"
                                    alt="contrast_Three"
                                  />
                                </div>
                                <div className="absolute bottom-[6%] flex flex-col items-start justify-start right-[22%] w-[45%]">
                                  <Img
                                    className="h-0.5"
                                    src="images/img_vector_blue_a400_02_2x25.svg"
                                    alt="vector_TwentySix"
                                  />
                                  <div className="bg-blue-100_01 flex flex-col items-center justify-start mt-1.5 w-[54%] md:w-full">
                                    <Img
                                      className="h-[5px]"
                                      src="images/img_vector_blue_a400_02_5x27.svg"
                                      alt="vector_TwentySeven"
                                    />
                                  </div>
                                  <Img
                                    className="h-0.5 mt-[3px]"
                                    src="images/img_vector_blue_a400_02_2x32.svg"
                                    alt="vector_TwentyEight"
                                  />
                                  <Img
                                    className="h-0.5 mt-0.5"
                                    src="images/img_vector_blue_a400_02_2x25.svg"
                                    alt="vector_TwentyNine"
                                  />
                                </div>
                              </div>
                            </div>
                            <Img
                              className="absolute h-[5px] inset-y-[0] left-[44%] my-auto"
                              src="images/img_vector_blue_a400_02_5x10.svg"
                              alt="vector_Thirty"
                            />
                            <div
                              className="absolute bg-cover bg-no-repeat bottom-[0] flex flex-col h-[37px] items-center justify-start pt-[3px] px-[3px] right-[5%] w-[58%]"
                              style={{
                                backgroundImage:
                                  "url('images/img_group19.svg')",
                              }}
                            >
                              <div className="flex flex-row items-center justify-between w-[76%] md:w-full">
                                <div className="h-[33px] relative w-[9%]">
                                  <Line className="bg-gray-100_02 h-[33px] m-auto w-[5px]" />
                                  <Line className="absolute bg-blue-A400_02 h-[33px] inset-[0] justify-center m-auto w-[5px]" />
                                </div>
                                <Line className="bg-blue-50_01 h-[33px] outline outline-[2.5px] outline-blue-A400_02 w-[5px]" />
                              </div>
                            </div>
                          </div>
                          <Img
                            className="absolute bottom-[21%] h-[35px] right-[3%]"
                            src="images/img_bookmark.svg"
                            alt="bookmark"
                          />
                        </div>
                        <Img
                          className="absolute bottom-[21%] h-[34px] right-[3%]"
                          src="images/img_television_blue_100_01.svg"
                          alt="television_Two"
                        />
                      </div>
                      <div className="absolute bg-gray-100_02 bottom-[33%] flex flex-col items-center justify-start right-[27%] w-[14%]">
                        <Img
                          className="h-2.5"
                          src="images/img_contrast_blue_a400_02.svg"
                          alt="contrast_Four"
                        />
                      </div>
                      <Img
                        className="absolute bottom-[21%] h-[35px] right-[3%]"
                        src="images/img_vector.svg"
                        alt="vector_ThirtyFour"
                      />
                    </div>
                  </div>
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
                  >
                    Explorez des fonctionnalités innovantes, participez
                    activement à des événements exclusifs et bénéficiez
                    pleinement de notre partenariat privilégié.
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

export default PasswordresetentercodeThreePage;
