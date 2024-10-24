import React, {useEffect, useRef, useState} from "react";
import {Text} from "../Components/Text";
import {FiEdit3} from "react-icons/fi";
import {HiOutlineShare} from "react-icons/hi";
import {RiDeleteBinLine} from "react-icons/ri";
import ProjectTimelineItem from "../Components/ProjectTimelineItem";
import TeamMemberItem from "../Components/TeamMemberItem";
import ProjectDocumentItem from "../Components/ProjectDocumentItem";
import ShareToInvestorModal from "../Components/ShareToInvestorModal";
import NewMilestoneModal from "../Components/NewMilestoneModal";
import DeleteModal from "../Components/DeleteModal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {BsDot} from "react-icons/bs";
import {useGetProjectByIdQuery , useAddMilestoneToProjectMutation} from "../Services/Project.Service";
import {formatNumber} from "../data/helper";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import TableTitle from "../Components/TableTitle";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import userdefaultProfile from '../Media/User1.png';
import Loader from "../Components/Loader";

const ProjectDetails = () => {
  const dividerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [maxDivHeight, setDivMaxHeight] = useState('720px');
  const [addMilestoneToProject, {isSuccess, isError }] = useAddMilestoneToProjectMutation();
  const location = useLocation();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  // const [project, setProject] = useState(location.state?.project || null);
  const { data, error, isLoading ,refetch } = useGetProjectByIdQuery(projectId , {refetchOnMountOrArgChange: true , skip: Boolean(!projectId)});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMilestone, setIsModalOpenMilestone] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [teamData , setTeamData ] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const setMaxHeight = () => {
      const div1Height = div1Ref.current?.clientHeight;
      const div2Height = div2Ref.current?.clientHeight;
      const maxHeight = Math.max(div1Height + 50, div2Height + 50);
      if(dividerRef.current) {
        if (window.innerWidth >= 768) { 
          dividerRef.current.style.height = `${maxHeight}px`;
          setDivMaxHeight(`${maxHeight}px`);
        } else {
          dividerRef.current.style.height = '1px';
          setDivMaxHeight('auto');
        }
      }

    };
  
    setMaxHeight();
  
    const intervalId = setInterval(() => {
      setMaxHeight(); 
    }, 10); 
  
    return () => {
      clearInterval(intervalId); 
    };
  }, [div1Ref, div2Ref]);

  function formatDate(isoDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoDate);
    return months[date.getMonth()] + ' ' + date.getFullYear();
}

useEffect(() => {
  if (data) {
    setProject(data);
  }
}, [data, project]);

const fetchMembers = async () => {
  try {
    const token = sessionStorage.getItem("userToken");
    const response = await axios.get(`${process.env.REACT_APP_baseURL}/employee/byuserWithoutPage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMembers(response.data);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

useEffect(() => {
    fetchMembers();
}, []);

useEffect(() => {
  let listEmployee;

  if (members.length > 0) {
    listEmployee = members.map(employee => {
      const { _id, ...rest } = employee;
      return rest;
    });
  } 
  if (project != null && members?.length > 0) {
    const selectedProjectMembers = members?.filter(emp => {
      return project.listMember?.some(member => member === emp._id);
    });

    setTeamData(selectedProjectMembers);
  }
}, [project, members]);

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

  const filteredTeamMembers = teamData?.filter(member =>
    member?.fullName?.toLowerCase().includes(searchValue?.toLowerCase())
  );

  const addMilestoneToProjectFonction = async (data) => {
    const response = await addMilestoneToProject({ projectId: projectId , milestoneData: data  });
    refetch();
    closeModalMilestone();
     setProject(response);
  }

  return (
    <>
    {isLoading ? 
    <div className="bg-white-A700 flex items-center justify-center h-screen">
      <Loader />
    </div>
    :
    <div className="bg-white-A700 flex flex-col gap-8 items-start justify-start pb-12 pt-8 rounded-tl-[40px] h-full min-h-screen overflow-auto w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-dm-sans-regular h-full items-start justify-start w-full">
            <PageHeader
              >
                Projects
            </PageHeader>
          </div>
          <SearchInput className={'w-[240px]'}/>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start px-5 w-full">
          <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
            <div className="flex flex-row flex-wrap gap-3 justify-between text-gray-900_01 border-b border-gray-201 rounded-t-lg bg-white-A700 py-4 px-5">
              <div className="flex items-center capitalize">
                <TableTitle>{project?.name ? project?.name : `Lorem Ipsum Project - Angel Round Investment`}</TableTitle>
              </div>
              <div className="flex flex-wrap gap-3 items-center ">
                <button
                  className="bg-light_blue-100 hover:bg-[#E2E2EE] text-sm font-dm-sans-medium leading-5 text-blue-501 flex items-center px-[12px] px-[10px] h-[41px] cursorpointer rounded-md"
                  onClick={openModal}
                  type="button"
                  style={{whiteSpace: 'nowrap'}}
                >
                  <HiOutlineShare size={21} className="md:mr-2" />
                  <span className="hidden md:inline-block">Share to Investor</span>
                </button>
                <button
                  className="bg-light_blue-100 hover:bg-[#E2E2EE] text-sm font-dm-sans-medium leading-5 text-blue-501 cursorpointer flex items-center px-[12px] px-[10px] h-[41px] rounded-md"
                  onClick={openDeleteModal}
                  type="button"
                  style={{whiteSpace: 'nowrap'}}
                >
                  <RiDeleteBinLine size={21} className="md:mr-2" />
                  <span className="hidden md:inline-block">Delete Project</span>
                </button>
                <button
                  className="bg-light_blue-100 hover:bg-[#E2E2EE] text-sm font-dm-sans-medium leading-5 text-blue-501 flex items-center cursorpointer px-[12px] px-[10px] h-[41px] rounded-md"
                  onClick={() => navigate(`/Editproject/${projectId}`, { state: { project: project } })}
                  type="button"
                  style={{whiteSpace: 'nowrap'}}
                >
                  <FiEdit3 size={21} className="md:mr-2" />
                  <span className="hidden md:inline-block">Edit Project</span>
                </button>
              </div>
            </div>
            <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start border-b border-gray-201 justify-start py-5 w-full">
              <div className="flex flex-wrap py-2 w-full">
                <div className="flex flex-col items-start justify-start gap-6 py-2 px-[18px] max-w-full min-w-[150px] basis-[150px]	shrink grow">
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                      Total Raised
                    </Text>
                  </div>
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="md:text-[22px] text-gray700 text-base font-dm-sans-medium" size="txtDMSansMedium22">
                      {`${project?.currency || 'USD'} ${project?.totalRaised?.toLocaleString('en-US') || 0}`}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-6 px-[18px] py-2 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                      Target
                    </Text>
                  </div>
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="md:text-[22px] text-gray700 text-base font-dm-sans-medium" size="txtDMSansMedium22">
                      {`${project?.currency || 'USD'} ${project?.funding?.toLocaleString('en-US') || 0}`}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                      Stage
                    </Text>
                  </div>
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="md:text-[22px] text-gray700 text-base font-dm-sans-medium w-auto">
                      {project?.stages?.[0] ? project?.stages?.[0] : project?.stage}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                      Status
                    </Text>
                  </div>
                  <div className="flex flex-row items-start justify-start w-full">
                    <div className={`flex items-center justify-center text-center w-auto px-[10px] py-[4px] h-[28px] gap-[6px] font-inter text-sm font-medium leading-[20px] rounded-full ${
                      project?.status === 'Active' ? 'bg-green-100 text-green-700' :
                      project?.status === 'In Progress' ? 'bg-light_blue-100 text-blue-501' :
                      project?.status === 'Stand by' ? 'bg-gray-201 text-blue_gray-700' : 'bg-green-100 text-green-700'
                    }`} style={{whiteSpace: 'nowrap'}}>
                      <GoDotFill  size={12} className={`${project?.status === 'Active' ? "text-[#12B76A]" : project?.status === 'In Progress' ? "text-blue-501" : "text-blue_gray-700" }`}/>
                      <label className="font-inter text-sm font-medium leading-[20px] text-center">
                        {project?.status ? project?.status : 'Active'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                  <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                    <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                      Publication
                    </Text>
                  </div>
                  <div className="flex flex-row items-start justify-start w-full">
                    <div className={`flex items-center justify-center text-center w-auto px-[10px] py-[4px] h-[28px] gap-[6px] font-inter text-sm font-medium leading-[20px] rounded-full ${
                      project?.visbility?.toLowerCase() === 'public' ? 'bg-green-100 text-green-700' :
                      project?.visbility?.toLowerCase() === 'private' ? 'bg-[#FFEEEA] text-[#FF5733]' : 'bg-green-100 text-green-700'
                    }`} style={{whiteSpace: 'nowrap', textDecoration: 'capitalize'}}>
                      <GoDotFill  size={12} className={`${project?.visbility?.toLowerCase() === 'public' ? 'text-[#12B76A]': project?.visbility?.toLowerCase() === 'private' ? 'text-[#FF5733]' : ''}`} />
                      <label className="font-inter text-sm font-medium leading-[20px] text-center capitalize">
                        {project?.visbility ? project?.visbility : 'Public'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-[50px] items-start justify-start px-[18px] py-5 w-full">
                <div ref={div1Ref} className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Project Description
                      </Text>
                    </div>
                    <div className="flex flex-col justify-start py-4 w-full">
                      <Text
                        className="leading-[26.00px] max-w-[599px] md:max-w-full text-gray700 text-sm"
                        size="txtDMSansRegular14Bluegray80001"
                      >
                        { project?.details? project?.details : `Discover a dynamic and innovative business
                        networking platform designed to connect startups,
                        companies, project holders, and investors. Digital
                        Morocco is your gateway to a vibrant community of
                        professionals, where collaboration and growth
                        opportunities abound.`}
                      </Text>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="bg-gray-201 h-px w-full" />
                  {/* Fin Divider */}
                  <div className="flex flex-col items-start justify-start pb-4 w-full">
                    <div className="flex flex-row gap-1 items-center justify-between w-full">
                      <Text
                        className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Project Milestone
                      </Text>
                      <button
                        className="bg-white-A700 hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] text-blue-A400 border border-blue-A400 flex flex-row h-[30px] items-center cursorpointer ml-auto px-[8px] py-[7px] rounded-md w-auto"
                        onClick={openModalMilestone}
                        type="button"
                    >
                        <span className="cursorpointer font-medium leading-[normal] text-center text-xs">Add New Milestone</span>
                    </button>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                    {project?.milestones?.length > 0 &&  
                      project?.milestones?.slice()?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                        .map((item, index) => (
                          <ProjectTimelineItem
                            key={index}
                            time={formatDate(item.dueDate)}
                            text={item.name}
                            isFirstItem={index === 0}
                          />
                        ))
                    }
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="bg-gray-201 h-px w-full" />
                  <div className="flex flex-col  items-start justify-start w-full">
                    <div className="flex flex-row gap-1 items-center justify-between w-full">
                      <Text
                        className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                        size="txtDMSansBold12"
                      >
                        Team Member
                      </Text>
                      <div className="relative w-[50%] min-w-[120px] max-w-[350px]">
                        <input
                          className={`!placeholder:text-[#98A2B3] !text-gray700 font-manrope p-2 h-[36px] pr-[30px] text-left text-sm tracking-[0.14px] w-full bg-transparent border border-solid border-gray-201 focus:border-focusColor focus:shadow-inputBs rounded-md`}
                          type="text"
                          name="search"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <img
                          className="absolute right-3 top-2.5 w-4 h-4"
                          src="/images/img_search_blue_gray_700_01.svg"
                          alt="Search Icon"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-start py-4 w-full">
                      <div
                        className="flex flex-col gap-6 items-center w-full"
                      >
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 grid-cols-1 gap-5 items-center justify-between my-0 w-full">
                          {filteredTeamMembers?.map((item, index) => (
                            <TeamMemberItem key={index} 
                            imageSrc={item?.image || userdefaultProfile}
                            name={item?.fullName}
                            job={item?.jobTitle} />
                          ))}
                        </div>
                      </div>
                    </div>
                    </div>
                  {/* Fin Divider */}
                </div>
                {/* Divider */}
                <div ref={dividerRef} className="bg-gray-201 md:h-[${maxDivHeight}] h-px w-full md:w-px" />
                {/*Fin Divider */}
                <div ref={div2Ref} className="flex flex-col items-start justify-start w-full md:w-1/3">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <Text
                      className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                      size="txtDMSansBold12"
                    >
                      Documents
                    </Text>
                  </div>
                  {project?.documents?.length> 0 && project?.documents.map((document, index) => (
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
    </div>}
    
    <NewMilestoneModal isOpen={isModalOpenMilestone} onRequestClose={closeModalMilestone} rowData={project} method={addMilestoneToProjectFonction}/>

    <ShareToInvestorModal isOpen={isModalOpen} projectId={projectId} project={project} onRequestClose={closeModal}/>

    <DeleteModal isOpen={isDeleteModalOpen}
    onRequestClose={closeDeleteModal} title="Delete Project" 
    content={
      <div className="flex flex-col gap-5 items-center justify-start py-4 w-full">
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