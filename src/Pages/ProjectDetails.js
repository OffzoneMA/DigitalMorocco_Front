import React, { useState } from "react";
import { Text } from "../Components/Text";
import { FiEdit3, FiSave } from "react-icons/fi";
import { HiOutlineShare } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import ProjectTimelineItem from "../Components/ProjectTimelineItem";
import TeamMemberItem from "../Components/TeamMemberItem";
import ProjectDocumentItem from "../Components/ProjectDocumentItem";
import ShareToInvestorModal from "../Components/ShareToInvestorModal";
import NewMilestoneModal from "../Components/NewMilestoneModal";
import DeleteModal from "../Components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { useGetProjectByIdQuery } from "../Services/Project.Service";
import { useParams } from "react-router-dom";
import { formatNumber } from "../data/helper";


const ProjectDetails = () => {
  const { projectId } = useParams();

  const { data, error, isLoading } = useGetProjectByIdQuery(projectId , {pollingInterval: 3000 , refetchOnMountOrArgChange: true , skip: false});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMilestone, setIsModalOpenMilestone] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [project , setProject] = useState(null);

  function formatDate(isoDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoDate);
    const formattedDate = months[date.getMonth()] + ' ' + date.getFullYear();
    return formattedDate;
}

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
      imageSrc: '/images/img_avatar.png',
      name: 'Annette Black',
      job: 'Back End Developer',
    },
    {
      imageSrc: '/images/img_avatar_62x62.png',
      name: 'Dianne Russell',
      job: 'Software Developer',
    },
    {
      imageSrc: '/images/img_avatar_1.png',
      name: 'Floyd Miles',
      job: 'Software Development Manager',
    },
    {
      imageSrc: '/images/img_avatar_2.png',
      name: 'Kathryn Murphy',
      job: 'Social Media Manager',
    },
    {
      imageSrc: '/images/img_avatar_3.png',
      name: 'Cameron Williamson',
      job: 'Software Tester',
    },
    {
      imageSrc: '/images/img_avatar_4.png',
      name: 'Darlene Robertson',
      job: 'Scrum Master',
    },
    {
      imageSrc: '/images/img_avatar_5.png',
      name: 'Ralph Edwards',
      job: 'UI/UX Designer',
    },
  ];

  const filteredTeamMembers = teamMembersdataList.filter(member =>
    member.name.toLowerCase().includes(searchValue.toLowerCase())
  );

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
    <>
    <div className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <Text
              className="md:text-3xl text-[28px] text-gray-900 w-full"
              size="txtDMDashHeader"
            >
              Projects
            </Text>
          </div>
          <div className="flex  md:w-[25%] w-full rounded-md p-2 border border-solid">
            <img
              className="cursor-pointer h-[18px] mr-1.5 my-px"
              src="/images/img_search_blue_gray_700_01.svg"
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
        <div className="flex flex-col items-start justify-start px-5 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 py-4 px-5">
              <Text
                className="md:text-[18px] text-[16px] text-gray-900 pt-1 md:mb-2 mb-2 justify-start w-auto"
                size="txtDMSansCardHeader"
              >
                {data?.name? data?.name : `Lorem Ipsum Project - Angel Round Investment`}
              </Text>
              <div className="flex  flex-row gap-3 items-center justify-end">
                <div className="bg-light_blue-100 text-blue-500 flex flex-row items-center ml-auto p-2 cursor-pointer rounded-md " 
                onClick={openModal}>
                  <HiOutlineShare   size={18} className="mr-2"/>
                  <button
                    type="button"
                    className="font-DmSans md:text-sm text-base font-medium leading-5"
                  >
                    Share to Investor
                  </button>
                </div>
                <div className="bg-light_blue-100 text-blue-500 cursor-pointer flex flex-row md:h-auto items-center ml-auto p-2 rounded-md" 
                  onClick={openDeleteModal}>
                  <RiDeleteBinLine  size={18} className="mr-2"/>
                  <button
                    type="button"
                    className="font-DmSans md:text-sm text-base font-medium leading-5"
                  >
                    Delete Project
                  </button>
                </div>
                <div className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto cursor-pointer items-center ml-auto p-2 rounded-md " 
                onClick={()=> navigate(`/Editproject/${projectId}`)}>
                  <FiEdit3   size={18} className="mr-2"/>
                  <button
                    type="button"
                    className="font-DmSans md:text-sm text-base font-medium leading-5"
                  >
                    Edit Project
                  </button>
                </div>
              </div>
            </div>
              <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start border-b border-gray-200 justify-start py-5 w-full">
                <div
                  className=" flex-row gap-px grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full"
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
                        {`${data?.currency} ${formatNumber(data?.funding)}`}
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
                         {data?.stages[0]? data?.stages[0] :`Angel Round` }  
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
                    <div className={`flex flex-row items-center justify-center text-center h-[22px] pr-2 font-inter text-sm font-medium leading-[20px] rounded-full ${
                          data?.status === 'Active' ? 'bg-emerald-50 text-green-700' :
                          data?.status === 'In Progress' ? 'bg-light_blue-100 text-blue-501' :
                          data?.status === 'Stand by' ? 'bg-gray-200 text-blue_gray-700' : 'bg-emerald-50 text-green-700'
                        }`}  style={{whiteSpace:'nowrap'}}>
                          <BsDot  size={28} className=""/>
                          <label
                            className="font-inter text-sm font-medium leading-[20px] text-center "
                          >
                            {data?.status? data?.status : `Active`}
                          </label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-[50px] items-start justify-start px-[18px] py-5 w-full">
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
                    <div className="flex flex-col justify-start py-4 w-full">
                      <Text
                        className="leading-[26.00px] max-w-[599px] md:max-w-full text-blue_gray-800_01 text-sm"
                        size="txtDMSansRegular14Bluegray80001"
                      >
                        { data?.details? data?.details : `Discover a dynamic and innovative business
                        networking platform designed to connect startups,
                        companies, project holders, and investors. Digital
                        Morocco is your gateway to a vibrant community of
                        professionals, where collaboration and growth
                        opportunities abound.`}
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
                      <div className="bg-white-A700 text-blue-A400 border border-blue-A400 flex flex-row md:h-auto items-center cursor-pointer ml-auto p-[7px] rounded-md w-auto" 
                      onClick={openModalMilestone}>
                        <button
                          type="button"
                          className="cursor-pointer font-medium leading-[normal] text-center text-xs"
                        >
                          Add New Milestone
                        </button>
                      </div>
                    </div>
                    <div className="items-start justify-start w-full">
                      {data?.milestones.length >0 &&  data?.milestones.map((item, index) => (
                        <ProjectTimelineItem
                          key={index}
                          time={formatDate(item.dueDate)}
                          text={item.name}
                          isFirstItem={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="bg-indigo-50 h-px w-full" />
                  <div className="flex flex-col  items-start justify-start w-full">
                    <div className="flex flex-row gap-1 items-center justify-between w-full">
                      <Text
                        className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Team Member
                      </Text>
                      <div className="flex w-[45%] rounded-md p-2 border border-solid">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="text"
                          name="search"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <img
                          className="cursor-pointer mr-1.5 my-px"
                          src="/images/img_search_blue_gray_700_01.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-start py-4 w-full">
                      <div
                        className="flex flex-col gap-6 items-center w-full"
                      >
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 grid-cols-1 gap-5 items-center justify-between my-0 w-full">
                          {filteredTeamMembers.map((item, index) => (
                            <TeamMemberItem key={index} {...item} />
                          ))}
                        </div>
                      </div>
                    </div>
                    </div>
                  {/* Fin Divider */}
                </div>
                {/* Divider */}
                <div className="bg-indigo-50 md:h-[805px] h-px w-full md:w-px" />
                {/*Fin Divider */}
                <div className="flex flex-col items-start justify-start w-full md:w-1/3">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <Text
                      className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                      size="txtDMSansBold12"
                    >
                      Documents
                    </Text>
                  </div>
                  {data?.documents.length> 0 && data?.documents.map((document, index) => (
                    <ProjectDocumentItem
                      key={index}
                      docName={document.name}
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NewMilestoneModal isOpen={isModalOpenMilestone} onRequestClose={closeModalMilestone} rowData={data}/>

    <ShareToInvestorModal isOpen={isModalOpen} onRequestClose={closeModal}/>

    <DeleteModal isOpen={isDeleteModalOpen}
    onRequestClose={closeDeleteModal} title="Delete Project" 
    content={
      <div className="flex flex-col gap-5 items-center justify-start w-auto py-4 w-full">
        <Text
          className="font-DmSans text-center text-base font-normal leading-6"
          size=""
        >
          Are you sure you want to delete this project?
        </Text>
      </div>
    }/>
    </>
  );
};

export default ProjectDetails;