import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import{Text } from "../Components/Text";
import { IoMdTime } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const UpcomingEventDetails = () => {

  const location = useLocation();
  const past = location.state ? location.state.past : false;

    function formatText(text) {
        const paragraphs = text.split('.').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph.trim()}</p>
        ));
      
        return (
          <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray700 pl-8">
            {paragraphs}
          </Text>
        );
      }

    const descp = `Dreamin, a Salesforce conference led by the community for the community!Join us in Casablanca to boost your knowledge with international experts and meet the main Salesforce players in Morocco, Africa, and Europe, and North America.
    Dreamin, a taste of Dreamforce in the heart of Africa.
    Not able to attend Dreamforce? No problem!Thanks to North Africa Dreamin, we bring a little of the Ohana spirit to Casablanca for a whole day, This will be an opportunity for Salesforce professionals to gather and share their knowledge,You will be able to follow different sessions to train you and to stock up on knowledge: whether you are rather click or rather code, you will certainly find the theme that suits your goal.
    The North Africa Dreamin team is made up of volunteers from the Moroccan Trailblazers community whose common vision could be summed up in one word: sharing.
    Our goal is to make available to the community all the resources needed to optimally improve the skills on Salesforce technology, by mobilizing international names, Our mission is also to contribute to the expansion of this community by developing relationships between the different actors in the Salesforce ecosystem.
    And more broadly, we want to improve the awareness and adoption of Salesforce in Morocco and Africa because we are convinced of its advantages in terms of CRM, marketing tools and other innovative technologies`; 

    const sponsors = [
      {logo:"images/spon_logo0.svg"}, 
      {logo:"images/spon_logo1.svg"}, 
      {logo:"images/spon_logo2.svg"}, 
      {logo:"images/spon_logo3.svg"}, 
      {logo:"images/spon_logo4.svg"}, 
      {logo:"images/spon_logo5.svg"}, 
      {logo:"images/spon_logo6.svg"}, 
      {logo:"images/spon_logo7.svg"}, 
      {logo:"images/spon_logo8.svg"}, 
      {logo:"images/spon_logo9.svg"}, 
    ];
    const attendance = [
      {image:"images/img_avatar_1.png"}, 
      {image:"images/img_avatar_2.png"}, 
      {image:"images/img_avatar_3.png"}, 
      {image:"images/img_avatar_4.png"}, 
      {image:"images/img_avatar_5.png"}, 
      {image:"images/img_avatar_12.png"},
      {image:"images/img_avatar_7.png"}, 
      {image:"images/img_avatar_8.png"}, 
      {image:"images/img_avatar_9.png"}, 
      {image:"images/img_avatar_10.png"}, 
      {image:"images/img_avatar_11.png"}, 
      {image:"images/img_avatar_12.png"}, 
    ];

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                  <Text
                    className="text-3xl font-bold leading-11 text-gray-900 w-full"
                    size="txtDmSansBold32"
                  >
                    Upcoming Event
                  </Text>
                </div>
                <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
                  <img
                    className="cursor-pointer h-[18px] mr-1.5 my-px"
                    src="images/img_search_blue_gray_700_01.svg"
                    alt="search"
                  />
                  <input
                    className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 pt-6 pb-9">
                    <img
                      src={`images/event0.jpeg`}
                      alt="vector_three"
                      className="w-full md:h-[180px] md:w-[240px] rounded-[12px]"
                    />
                    <div className="flex flex-col gap-3 flex-1">
                        <div className="flex flex-row justify-between items-start  w-full">
                            <Text
                                className="font-DmSans text-lg font-medium leading-7 text-left text-blue_gray-903 w-full"
                                >
                                Monthly #FirstFridayFair Business, Data & Technology Virtual Event
                            </Text>
                            {!past &&
                            <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center px-4 py-2 rounded-md w-auto cursor-pointer">
                              <button
                              style={{whiteSpace:'nowrap'}}
                                  type="button"
                                  className="text-sm font-DmSans font-medium leading-[18.23px] text-white-A700"
                              >
                                  Buy Ticket
                              </button>
                            </div> }
                        </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801 font-DmSans text-base font-normal leading-6"
                          >
                          {/* {rowData?.dateTime} */}
                          Friday, Sept 1, 2023 
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center  text-left">
                          <IoMdTime  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801 font-DmSans text-base font-normal leading-6"
                          >
                          {/* {rowData?.dateTime} */}
                          8am - 9pm +01 
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801 font-DmSans text-base font-normal leading-6"
                          >
                          Digital October, Moscow
                          </Text>
                      </div>
                      {past? (
                        <div className="bg-blue-503 text-white-A700 flex flex-row justify-start w-28 items-center px-4 py-1 cursor-pointer rounded-full">
                        <button
                          style={{whiteSpace:'nowrap'}}
                            type="button"
                            className="text-base text-light_blue-51"
                        >
                          Participate
                          </button>
                      </div>
                      ) : 
                      ( 
                        <div className="flex flex-row gap-3 items-center  text-left">
                          <PiTagBold    size={18} className="text-teal-A300"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                          >
                          $29.00
                          </Text>
                      </div>
                      )}
                      
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-200 pb-8">
                    <Text className="font-DmSans text-lg font-semibold leading-8 text-left text-blue_gray-903">
                        Overview
                    </Text>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSpeakerphone size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Organized by
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                North Africa Dreamin
                                </Text>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMap  size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Location
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                Farah Hotel, Casablanca
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange  size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Start Date
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Fri, Sep 1, 2023  07:00AM
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange   size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                End Date
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                Fri, Sep 1, 2023  18:30AM
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPurchaseTagAlt    size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Industry
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Artificial Intelligence (AI), Finance, FinTech, Salesforce
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <TbCopy   size={20} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Event Type
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                Meetup, Networking, Conference
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                              <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                                Description
                                </Text>
                              </div>
                              {formatText(descp)}
                            </div>
                        </div>
                        {past &&
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                          <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                            <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-blue_gray-301 uppercase">
                            Attendance
                            </Text>
                          </div>
                          <div className="flex flex-row gap-3 w-full items-center pl-8">
                          {attendance?.length > 0 && (
                            <>
                              {attendance.slice(0, 10).map((item, index) => (
                                <img 
                                  key={index}
                                  src={item.image}
                                  alt="vector_three"
                                  className="rounded-full w-12 h-12"
                                />
                              ))}
                              {attendance.length > 10 && (
                                <Text className="text-gray700 font-DmSans text-lg font-bold leading-26 tracking-wide text-left">
                                  + {attendance.length - 10}
                                </Text>
                              )}
                            </>
                          )}
                          </div>
                        </div>
                    </div>
                        }
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full pb-8">
                    <Text className="font-DmSans text-lg font-semibold leading-8 text-left text-blue_gray-903">
                    Sponsor
                    </Text>
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 w-full items-center">
                      {sponsors?.length > 0 && (
                        sponsors.map((item, index) => (
                          <img key={index}
                        src={item.logo}
                        alt="vector_three"
                          />
                        ))
                      )}
                    </div>
                  </div>  
              </div>
            </div>
        </div>
    )
}
export default UpcomingEventDetails;