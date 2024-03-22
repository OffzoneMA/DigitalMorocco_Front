import React, { useState } from "react";
import { Text } from "../components";
import { FiEdit3, FiSave } from "react-icons/fi";
import { HiOutlineShare } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import ProjectTimelineItem from "../components/ProjectTimelineItem";
import TeamMemberItem from "../components/TeamMemberItem";
import ProjectDocumentItem from "../components/ProjectDocumentItem";
import ShareToInvestorModal from "../modals/ShareToInvestorModal";
import NewMilestoneModal from "../modals/NewMilestoneModal";


const ProjectDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMilestone, setIsModalOpenMilestone] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalMilestone = () => {
    setIsModalOpenMilestone(true);
  };

  const closeModalMilestone = () => {
    setIsModalOpenMilestone(false);
  };

  const timelineDta = [
    {time:'June 2023', text: 'Entering Market' },
    { time:'Feb 2023',text: 'Developing' },
    { time:'Jan 2023',text: 'Ideation And Initial Launch' },
  ];

  const teamMembersdataList = [
    {
      imageSrc: 'images/img_avatar.png',
      name: 'Annette Black',
      job: 'Back End Developer',
    },
    {
      imageSrc: 'images/img_avatar_62x62.png',
      name: 'Dianne Russell',
      job: 'Software Developer',
    },
    {
      imageSrc: 'images/img_avatar_1.png',
      name: 'Floyd Miles',
      job: 'Software Development Manager',
    },
    {
      imageSrc: 'images/img_avatar_2.png',
      name: 'Kathryn Murphy',
      job: 'Social Media Manager',
    },
    {
      imageSrc: 'images/img_avatar_3.png',
      name: 'Cameron Williamson',
      job: 'Software Tester',
    },
    {
      imageSrc: 'images/img_avatar_4.png',
      name: 'Darlene Robertson',
      job: 'Scrum Master',
    },
    {
      imageSrc: 'images/img_avatar_5.png',
      name: 'Ralph Edwards',
      job: 'UI/UX Designer',
    },
  ];

  const documents = [
    {
      documentName: 'Digital Morocco_PitchDeck [2023].pdf',
    },
    {
      documentName: 'Digital Morocco_Business Plan.pdf',
    },
    {
      documentName: 'Digital Morocco_Financial Report.pdf',
    },
  ];

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
              size="txtDMDashHeader"
            >
              Projects
            </Text>
          </div>
          <div className="flex md:flex-1 w-[22%] md:w-full rounded-md p-2 border border-solid">
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
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row flex-wrap text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 py-4 px-5 justify-between">
              <Text
                className="md:text-[18px] sm:text-[18px] text-gray-900 pt-1 md:mb-2 sm:mb-2"
                size="txtDMSansCardHeader"
              >
                Lorem Ipsum Project - Angel Round Investment
              </Text>
              <div className="flex flex-wrap flex-row gap-3 items-center justify-start w-auto">
                <div className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md ">
                  <HiOutlineShare   size={18} className="mr-2"/>
                  <button
                    type="submit"
                    onClick={openModal}
                    className="font-dmsans text-base font-medium leading-18"
                  >
                    Share to Investor
                  </button>
                  <ShareToInvestorModal isOpen={isModalOpen} onRequestClose={closeModal}/>
                </div>
                <div className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md">
                  <RiDeleteBinLine  size={18} className="mr-2"/>
                  <button
                    type="submit"
                    className="font-dmsans text-base font-medium leading-18"
                  >
                    Share to Investor
                  </button>
                </div>
                <div className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md ">
                  <FiEdit3   size={18} className="mr-2"/>
                  <button
                    type="submit"
                    className="font-dmsans text-base font-medium leading-18"
                  >
                    Edit Project
                  </button>
                </div>
              </div>
            </div>
              <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start border-b border-gray-200 justify-start py-5 w-full">
                <div
                  className=" flex-row gap-px grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 w-full"
                >
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start px-[18px] py-2 w-full">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Text
                          className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                          size="txtDMSansBold12"
                        >
                          Total Raised
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col h-16 md:h-auto items-start justify-start px-[18px] py-4 w-full">
                      <Text
                        className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                        size="txtDMSansMedium22"
                      >
                        USD 0
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start px-[18px] py-2 w-full">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Text
                          className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                          size="txtDMSansBold12"
                        >
                          Target{" "}
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col h-16 md:h-auto items-start justify-center px-[18px] py-4 w-full">
                      <Text
                        className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                        size="txtDMSansMedium22"
                      >
                        USD 5,000,000
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start px-[18px] py-2 w-full">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Text
                          className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                          size="txtDMSansBold12"
                        >
                          Stage
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col h-16 md:h-auto items-start justify-center px-[18px] py-4 w-full">
                      <Text
                        className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                        size="txtDMSansMedium22"
                      >
                        Angel Round
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start px-[18px] py-2 w-full">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Text
                          className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                          size="txtDMSansBold12"
                        >
                          Status
                        </Text>
                      </div>
                    </div>
                    <div className=" flex flex-row h-16 items-start justify-start px-[18px] py-4 w-full ">
                      <div className="bg-green-50 flex flex-row h-auto items-center justify-center px-4 text-green-700 py-2 rounded-full w-auto ">
                        <GoDotFill size={12} className="mr-2"/>
                        <label
                          className="font-inter text-base font-medium leading-20 text-center "
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col flex-row gap-[50px] items-start justify-start px-[18px] py-5 w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Project Description
                      </Text>
                    </div>
                    <div className="flex flex-col items-end justify-start py-4 w-full">
                      <Text
                        className="leading-[26.00px] max-w-[599px] md:max-w-full text-blue_gray-800_01 text-sm"
                        size="txtDMSansRegular14Bluegray80001"
                      >
                        Discover a dynamic and innovative business
                        networking platform designed to connect startups,
                        companies, project holders, and investors. Digital
                        Morocco is your gateway to a vibrant community of
                        professionals, where collaboration and growth
                        opportunities abound.
                      </Text>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="bg-indigo-50 h-px w-full" />
                  {/* Fin Divider */}
                  <div className="flex flex-col items-start justify-start pb-4 w-full">
                    <div className="flex flex-row gap-1 items-center justify-between w-full">
                      <Text
                        className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Project Milestone
                      </Text>
                      <div className="bg-white-A700 text-blue-A400 border border-blue-A400 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                        <button
                          onClick={openModalMilestone}
                          type="submit"
                          className="cursor-pointer font-medium leading-[normal] text-center text-xs"
                        >
                          Add New Milestone
                        </button>
                        <NewMilestoneModal isOpen={isModalOpenMilestone} onRequestClose={closeModalMilestone}/>
                      </div>
                    </div>
                    <div className="items-start justify-start w-full">
                      {timelineDta.map((item, index) => (
                        <ProjectTimelineItem
                          key={index}
                          time={item.time}
                          text={item.text}
                          isFirstItem={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="bg-indigo-50 h-px w-full" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-row gap-1 items-center justify-between w-full">
                      <Text
                        className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Team Member
                      </Text>
                      <div className="flex w-[45%] rounded-md p-2 border border-solid">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="text"
                          name="search"
                          placeholder="Search..."
                        />
                        <img
                          className="cursor-pointer mr-1.5 my-px"
                          src="images/img_search_blue_gray_700_01.svg"
                          alt="search"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-start py-4 w-full">
                      <div
                        className="flex flex-col gap-6 items-center w-full"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-between my-0 w-full">
                          {teamMembersdataList.map((item, index) => (
                            <TeamMemberItem key={index} {...item} />
                          ))}
                        </div>
                      </div>
                    </div>
                    </div>
                  {/* Fin Divider */}
                </div>
                {/* Divider */}
                <div className="bg-indigo-50 h-[805px] md:h-px md:w-full w-px" />
                {/*Fin Divider */}
                <div className="flex flex-col items-start justify-start w-1/3">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <Text
                      className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                      size="txtDMSansBold12"
                    >
                      Documents
                    </Text>
                  </div>
                  {documents.map((document, index) => (
                    <ProjectDocumentItem
                      key={index}
                      docName={document.documentName}
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;