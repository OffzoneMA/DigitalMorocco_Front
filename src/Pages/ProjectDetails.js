import React, { useState  , useEffect , useRef} from "react";
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
import { useNavigate  , useLocation} from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { useGetProjectByIdQuery } from "../Services/Project.Service";
import { useParams } from "react-router-dom";
import { formatNumber } from "../data/helper";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import TableTitle from "../Components/TableTitle";


const ProjectDetails = () => {
  const dividerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [maxDivHeight, setDivMaxHeight] = useState('720px');
  useEffect(() => {
    const setMaxHeight = () => {
      const div1Height = div1Ref.current.clientHeight;
      const div2Height = div2Ref.current.clientHeight;
      const maxHeight = Math.max(div1Height + 50, div2Height + 50);
      if (window.innerWidth >= 768) { 
        dividerRef.current.style.height = `${maxHeight}px`;
        setDivMaxHeight(`${maxHeight}px`);
      } else {
        dividerRef.current.style.height = '1px';
        setDivMaxHeight('auto');
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

  const location = useLocation();
  const { projectId } = useParams();
  const [project, setProject] = useState(location.state?.project || null);
  const { data, error, isLoading } = useGetProjectByIdQuery(projectId , {pollingInterval: 3000 , refetchOnMountOrArgChange: true , skip: Boolean(project || !projectId)});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMilestone, setIsModalOpenMilestone] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [teamData , setTeamData ] = useState([]);

  function formatDate(isoDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoDate);
    const formattedDate = months[date.getMonth()] + ' ' + date.getFullYear();
    return formattedDate;
}

useEffect(() => {
  if (project && project?.listMember) {
    setTeamData(project?.listMember);
  }
}, [project]);

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

  useEffect(() => {
    if (data && !project) {
      setProject(data);
    }
  }, [data, project]);

  const filteredTeamMembers = teamData?.filter(member =>
    member.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
    <div className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
                Projects
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'}/>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start px-5 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 py-4 px-5">
              <TableTitle
              >
                {project?.name? project?.name : `Lorem Ipsum Project - Angel Round Investment`}
              </TableTitle>
              <div className="flex  flex-row gap-3 items-center justify-end">
                <button
                  className="bg-light_blue-100 md:text-sm text-base font-medium leading-5 text-blue-500 flex flex-row items-center ml-auto p-2 cursor-pointer rounded-md font-DmSans"
                  onClick={openModal}
                  type="button"
                >
                  <HiOutlineShare size={18} className="mr-2" />
                  Share to Investor
                </button>

                <button
                  className="bg-light_blue-100 text-blue-500 cursor-pointer flex flex-row md:h-auto items-center ml-auto p-2 rounded-md"
                  onClick={openDeleteModal}
                  type="button"
                >
                  <RiDeleteBinLine size={18} className="mr-2" />
                  <span className="font-DmSans md:text-sm text-base font-medium leading-5">Delete Project</span>
                </button>
                <button
                  className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto cursor-pointer items-center ml-auto p-2 rounded-md"
                  onClick={() => navigate(`/Editproject/${projectId}` , { state: { project: project }})}
                  type="button"
                >
                  <FiEdit3 size={18} className="mr-2" />
                  <span className="font-DmSans md:text-sm text-base font-medium leading-5">Edit Project</span>
                </button>
              </div>
            </div>
              <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start border-b border-gray-200 justify-start py-5 w-full">
                <div
                  className=" flex-row py-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 w-full"
                 >
                  <div className="flex flex-col items-start justify-start gap-6 py-2 px-[18px] w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start  w-full">
                      <Text className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase" size="txtDMSansBold12">
                        Total Raised
                      </Text>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                      <Text className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl" size="txtDMSansMedium22">
                      {`${project?.currency || 'USD'} ${formatNumber(project?.totalRaised) || 0}`}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-6 px-[18px] py-2 w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start  w-full">
                      <Text className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase" size="txtDMSansBold12">
                        Target
                      </Text>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                      <Text className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl" size="txtDMSansMedium22">
                        {`${project?.currency || 'USD'} ${formatNumber(project?.funding) || 0}`}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                      <Text className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase" size="txtDMSansBold12">
                        Stage
                      </Text>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                      <Text className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto">
                        {project?.stages[0] ? project?.stages[0] : "Angel Round"}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start  w-full">
                      <Text className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase" size="txtDMSansBold12">
                        Status
                      </Text>
                    </div>
                    <div className="flex flex-row items-start justify-start w-full">
                      <div className={`flex items-center justify-center text-center h-[22px] pr-2 font-inter text-sm font-medium leading-[20px] rounded-full ${
                        project?.status === 'Active' ? 'bg-emerald-50 text-green-700' :
                        project?.status === 'In Progress' ? 'bg-light_blue-100 text-blue-501' :
                        project?.status === 'Stand by' ? 'bg-gray-200 text-blue_gray-700' : 'bg-emerald-50 text-green-700'
                      }`} style={{whiteSpace: 'nowrap'}}>
                        <BsDot size={28} className="" />
                        <label className="font-inter text-sm font-medium leading-[20px] text-center">
                          {project?.status ? project?.status : 'Active'}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start  w-full">
                      <Text className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase" size="txtDMSansBold12">
                        publication
                      </Text>
                    </div>
                    <div className="flex flex-row items-start justify-start w-full">
                      <div className={`flex items-center justify-center text-center h-[22px] pr-2 font-inter text-sm font-medium leading-[20px] rounded-full ${
                        project?.visbility?.toLowerCase() === 'public' ? 'bg-emerald-50 text-green-700' :
                        project?.visbility?.toLowerCase() === 'private' ? 'bg-[#FFEEEA] text-[#FF5733] ' : 'bg-emerald-50 text-green-700'
                      }`} style={{whiteSpace: 'nowrap' , textDecoration: 'capitalise'}}>
                        <BsDot size={28} className="" />
                        <label className="font-inter text-sm font-medium leading-[20px] text-center">
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
                      <button
                        className="bg-white-A700 text-blue-A400 border border-blue-A400 flex flex-row md:h-auto items-center cursor-pointer ml-auto p-[7px] rounded-md w-auto"
                        onClick={openModalMilestone}
                        type="button"
                    >
                        <span className="cursor-pointer font-medium leading-[normal] text-center text-xs">Add New Milestone</span>
                    </button>

                    </div>
                    <div className="items-start justify-start w-full">
                      {project?.milestones.length >0 &&  project?.milestones.map((item, index) => (
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
                          {filteredTeamMembers?.map((item, index) => (
                            <TeamMemberItem key={index} 
                            imageSrc={item?.image}
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
                <div ref={dividerRef} className="bg-indigo-50 md:h-[${maxDivHeight}] h-px w-full md:w-px" />
                {/*Fin Divider */}
                <div ref={div2Ref} className="flex flex-col items-start justify-start w-full md:w-1/3">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <Text
                      className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                      size="txtDMSansBold12"
                    >
                      Documents
                    </Text>
                  </div>
                  {project?.documents.length> 0 && project?.documents.map((document, index) => (
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
    <NewMilestoneModal isOpen={isModalOpenMilestone} onRequestClose={closeModalMilestone} rowData={project}/>

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