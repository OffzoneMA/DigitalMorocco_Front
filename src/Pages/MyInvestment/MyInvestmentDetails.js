import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../Components/Text";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineShare } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import ProjectTimelineItem from "../../Components/ProjectTimelineItem";
import TeamMemberItem from "../../Components/TeamMemberItem";
import ProjectDocumentItem from "../../Components/ProjectDocumentItem";
import ShareToInvestorModal from "../../Components/ShareToInvestorModal";
import NewMilestoneModal from "../../Components/NewMilestoneModal";
import DeleteModal from "../../Components/DeleteModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { formatNumber } from "../../data/helper";
import PageHeader from "../../Components/PageHeader";
import SearchInput from "../../Components/SeachInput";
import TableTitle from "../../Components/TableTitle";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { TbDownload } from "react-icons/tb";
import { useGetContactRequestByIdQuery } from "../../Services/ContactRequest.Service";
import { useApproveRequestMutation , useRejectRequestMutation } from "../../Services/ContactRequest.Service";
import ApproveContactRequestModal from "../../Components/ApproveContactRequestModal";
import RejectContactRequestModal from "../../Components/RejectContactRequestModal";
import { PiCheckBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { IoOpenOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const MyInvestmentDetails = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
    const dividerRef = useRef(null);
    const div1Ref = useRef(null);
    const div2Ref = useRef(null);
    const [maxDivHeight, setDivMaxHeight] = useState('720px');
    useEffect(() => {
        const setMaxHeight = () => {
            const div1Height = div1Ref.current?.clientHeight;
            const div2Height = div2Ref.current?.clientHeight;
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
    const { id } = useParams();
    const [project, setProject] = useState(location.state?.project || null);
    const { data, error, isLoading, refetch } = useGetContactRequestByIdQuery(id, { pollingInterval: 3000, refetchOnMountOrArgChange: true, skip: Boolean(!id) });
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [members, setMembers] = useState([]);
    const [approveRequest] = useApproveRequestMutation();
    const [rejectRequest] = useRejectRequestMutation();

    function formatDate(isoDate, locale = currentLanguage) {
      const date = new Date(isoDate);
      const options = { month: 'short', year: 'numeric' };
      let formattedDate = new Intl.DateTimeFormat(locale, options).format(date);
  
      // Remove the period in French month abbreviations
      if (locale === 'fr') {
          formattedDate = formattedDate.replace('.', '');
      }
  
      return formattedDate;
    }

    useEffect(() => {
      if (data) {
          setProject(data?.project);
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
        if (project != null) {
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

    const filteredTeamMembers = teamData?.filter(member =>
        member?.fullName?.toLowerCase().includes(searchValue?.toLowerCase())
    );

    const openApproveModal = () => {
      setIsApproveModalOpen(true);
    };
    
    const closeApproveModal = () => {
        setIsApproveModalOpen(false);
    };

    const openRejectModal = () => {
        setIsRejectModalOpen(true);
    };
    
    const closeRejectModal = () => {
        setIsRejectModalOpen(false);
    };

    const handleApprove = async (data) => {
      try {
          await approveRequest({
              id: id,
              approvalData: data,
          }).unwrap();
          refetch();
          console.log('Request approved successfully!');
      } catch (error) {
          console.error('Failed to approve request:', error);
      }
    };

  const handleReject = async (data) => {
      try {
          await rejectRequest({
              id: id,
              rejectionData: data,
          }).unwrap();
          refetch();
          console.log('Request rejected successfully!');
      } catch (error) {
          console.error('Failed to reject request:', error);
      }
  };

    return (
        <>
        <div className="bg-white-A700 flex flex-col gap-8 items-start justify-start pb-12 pt-8 rounded-tl-[40px] h-full min-h-screen overflow-auto w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col font-dm-sans-regular h-full items-start justify-start w-full">
                <PageHeader
                  >
                    {t("sidebar.investment.main")}
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
                  {data?.status?.toLowerCase() === "approved" && <div className="flex flex-wrap gap-3 items-center ">
                    <button
                      className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-[#EDF7FF] text-sm font-dm-sans-medium leading-5 flex items-center gap-[12px] px-[12px] px-[10px] h-[41px] cursorpointer rounded-md"
                      // onClick={''}
                      type="button"
                      style={{whiteSpace: 'nowrap'}}
                    >
                      <HiOutlineShare size={21} className="text-[#EDF7FF]" />
                      <span className="hidden md:inline-block">{t("common.share")}</span>
                    </button>
                    <button
                      className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-[#EDF7FF] text-sm font-dm-sans-medium leading-5 flex items-center gap-[12px] cursorpointer px-[12px] px-[10px] h-[41px] rounded-md"
                      // onClick={() => navigate(``)}
                      type="button"
                      style={{whiteSpace: 'nowrap'}}
                    >
                      <TbDownload size={21} className="" />
                      <span className="hidden md:inline-block">{t("common.download")}</span>
                    </button>
                  </div>}
                  {data?.status?.toLowerCase() == "in progress" && <div className="flex flex-wrap gap-3 items-center ">
                    <button
                      className="bg-[#00CDAE] hover:bg-greenbtnhoverbg active:bg-greenbtnhoverbg text-white-A700 text-sm font-dm-sans-medium leading-5 flex items-center gap-[12px] px-[12px] px-[10px] h-[41px] cursorpointer rounded-md"
                      onClick={openApproveModal}
                      type="button"
                      style={{whiteSpace: 'nowrap'}}
                    >
                      <PiCheckBold size={21} className="text-white-A700" />
                      <span className="hidden md:inline-block">{t("common.approve")}</span>
                    </button>
                    <button
                      className="bg-[#EF4352] hover:bg-[#F02A3C] active:bg-[#F02A3C] text-white-A700 text-sm font-dm-sans-medium leading-5 flex items-center gap-[12px] cursorpointer px-[12px] px-[10px] h-[41px] rounded-md"
                      onClick={openRejectModal}
                      type="button"
                      style={{whiteSpace: 'nowrap'}}
                    >
                      <RiCloseLine size={21} className="" />
                      <span className="hidden md:inline-block">{t("common.reject")}</span>
                    </button>
                  </div>}
                </div>
                <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start border-b border-gray-201 justify-start py-5 w-full">
                  <div className="flex flex-wrap py-2 w-full">
                    <div className="flex flex-col items-start justify-start gap-6 py-2 px-[18px] max-w-full min-w-[150px] basis-[150px]	shrink grow">
                      <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                        <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                        {t('investment.project.totalRaised')}
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
                        {t('investment.project.target')}
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
                        {t('investment.project.stage')}
                        </Text>
                      </div>
                      <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                        <Text className="md:text-[22px] text-gray700 text-base font-dm-sans-medium w-auto">
                          {t(project?.stages?.[0] ? project?.stages?.[0] : project?.stage)}
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                      <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                        <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                        {t('investment.project.sector')}
                        </Text>
                      </div>
                      {project?.sector ? <div className="h-[26px] px-[13px] py-2 rounded-[50px] border border-[#c653dd] justify-center items-center gap-1 inline-flex">
                        <div className="text-[#c552dd] text-xs font-dm-sans-regular leading-none tracking-tight">{t(`${project?.sector}`)}</div>
                      </div> : '-'}
                    </div>
                    <div className="flex flex-col items-start justify-start px-[18px] py-2 gap-6 max-w-full min-w-[150px] basis-[150px]	shrink grow">
                      <div className="bg-white-A700 flex flex-col items-start justify-start w-full">
                        <Text className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase font-dm-sans-bold" size="txtDMSansBold12">
                        {t('investment.project.status')}
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
                            {t(project?.status ? project?.status : 'Active')}
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
                            {t('investment.project.description')}
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
                            {t('investment.project.milestone')}
                          </Text>
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
                            {t('investment.project.teamMember')}
                          </Text>
                          <div className="relative w-[50%] min-w-[120px] max-w-[350px]">
                            <input
                              className={`!placeholder:text-[#98A2B3] !text-gray700 font-manrope p-2 h-[36px] pr-[30px] text-left text-sm tracking-[0.14px] w-full bg-transparent border border-solid border-gray-201 focus:border-focusColor focus:shadow-inputBs rounded-md`}
                              type="text"
                              name="search"
                              placeholder={t('projects.createNewProject.searchMember')}
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
                                imageSrc={item?.image || `data:image/png;base64,${item?.photo}` || `/images/img_avatar_2.png`}
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
                    <div ref={div2Ref} className="flex flex-col items-start gap-[24px] justify-start w-full md:w-1/3">
                        {project?.logo && <div className="flex flex-col gap-[10px] pb-[41px] items-start justify-start w-full">
                            <Text
                                className="text-[#1d1c21] text-base leading-relaxed font-dm-sans-medium w-auto"
                                size="txtDMSansBold12"
                                >
                                {t('investment.project.projectLogo')}
                            </Text>
                            <div className="h-[150px] w-full rounded-[6px] px-3 py-[50px] justify-center border border-[#D0D5DD] items-center gap-1.5 flex">
                                <img src={project?.logo} alt="Logo" className="rounded-[6px] h-[150px] w-auto" />
                            </div>
                        </div>}
                      <div className="flex flex-row gap-[10px] w-full">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6V3.9C12 3.05992 12 2.63988 11.8365 2.31901C11.6927 2.03677 11.4632 1.8073 11.181 1.66349C10.8601 1.5 10.4401 1.5 9.6 1.5H3.9C3.05992 1.5 2.63988 1.5 2.31901 1.66349C2.03677 1.8073 1.8073 2.03677 1.66349 2.31901C1.5 2.63988 1.5 3.05992 1.5 3.9V9.6C1.5 10.4401 1.5 10.8601 1.66349 11.181C1.8073 11.4632 2.03677 11.6927 2.31901 11.8365C2.63988 12 3.05992 12 3.9 12H6M8.4 16.5H14.1C14.9401 16.5 15.3601 16.5 15.681 16.3365C15.9632 16.1927 16.1927 15.9632 16.3365 15.681C16.5 15.3601 16.5 14.9401 16.5 14.1V8.4C16.5 7.55992 16.5 7.13988 16.3365 6.81901C16.1927 6.53677 15.9632 6.3073 15.681 6.16349C15.3601 6 14.9401 6 14.1 6H8.4C7.55992 6 7.13988 6 6.81901 6.16349C6.53677 6.3073 6.3073 6.53677 6.16349 6.81901C6 7.13988 6 7.55992 6 8.4V14.1C6 14.9401 6 15.3601 6.16349 15.681C6.3073 15.9632 6.53677 16.1927 6.81901 16.3365C7.13988 16.5 7.55992 16.5 8.4 16.5Z" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex flex-col gap-[10px] items-start justify-start w-auto">
                            <Text
                                className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                                size="txtDMSansBold12"
                                >
                                {t('investment.project.projectName')}
                            </Text>
                            <div className="text-[#344053] text-base font-dm-sans-regular leading-relaxed">Startup 8</div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[10px] w-full">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 9.75C8.24264 9.75 9.25 8.74264 9.25 7.5C9.25 6.25736 8.24264 5.25 7 5.25C5.75736 5.25 4.75 6.25736 4.75 7.5C4.75 8.74264 5.75736 9.75 7 9.75Z" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 16.5C10 13.5 13 10.8137 13 7.5C13 4.18629 10.3137 1.5 7 1.5C3.68629 1.5 1 4.18629 1 7.5C1 10.8137 4 13.5 7 16.5Z" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex flex-col gap-[10px] items-start justify-start w-auto">
                            <Text
                                className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                                size="txtDMSansBold12"
                                >
                                {t('investment.project.country')}
                            </Text>
                            <div className="text-[#344053] text-base font-dm-sans-regular leading-relaxed">Morocco</div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[10px] w-full">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 9H16.5M1.5 9C1.5 13.1421 4.85786 16.5 9 16.5M1.5 9C1.5 4.85786 4.85786 1.5 9 1.5M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5M16.5 9C16.5 4.85786 13.1421 1.5 9 1.5M9 1.5C10.876 3.55376 11.9421 6.21903 12 9C11.9421 11.781 10.876 14.4462 9 16.5M9 1.5C7.12404 3.55376 6.05794 6.21903 6 9C6.05794 11.781 7.12404 14.4462 9 16.5" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex flex-col gap-[10px] items-start justify-start w-auto">
                            <Text
                                className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                                size="txtDMSansBold12"
                                >
                               {t('investment.project.website')}
                            </Text>
                            <div className="text-[#344053] flex gap-[10px] text-base font-dm-sans-regular leading-relaxed">
                            {project?.website || '-'}
                            {project?.website && <IoOpenOutline size={22} className="text-blue-700 cursorpointer" onClick={() => window.open(project?.website, '_blank')}/>}
                            </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[10px] w-full">
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 3.25L7.62369 7.53658C8.11957 7.8837 8.36751 8.05726 8.6372 8.12448C8.87542 8.18386 9.12458 8.18386 9.3628 8.12448C9.63249 8.05726 9.88043 7.8837 10.3763 7.53658L16.5 3.25M5.1 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H5.1C3.83988 1 3.20982 1 2.72852 1.24524C2.30516 1.46095 1.96095 1.80516 1.74524 2.22852C1.5 2.70982 1.5 3.33988 1.5 4.6V9.4C1.5 10.6601 1.5 11.2902 1.74524 11.7715C1.96095 12.1948 2.30516 12.539 2.72852 12.7548C3.20982 13 3.83988 13 5.1 13Z" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex flex-col gap-[10px] items-start justify-start w-auto">
                            <Text
                                className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                                size="txtDMSansBold12"
                                >
                                {t('investment.project.email')}
                            </Text>
                            <div className="text-[#344053] text-base font-dm-sans-regular leading-relaxed">investment@venture-catalysts.com</div>
                        </div>
                      </div>
                      {project?.documents?.length> 0 && <div className="flex flex-col pt-[41px] justify-start w-auto">
                        <Text
                          className="text-[#98A2B3] text-xs tracking-[1.68px] uppercase w-auto"
                          size="txtDMSansBold12"
                        >
                          {t('investment.project.documents')}
                        </Text>
                        <div className="flex flex-col w-full">
                          {project?.documents?.length> 0 && project?.documents.map((document, index) => (
                            <ProjectDocumentItem
                              key={index}
                              docName={document.name}
                            />
                          ))}
                        </div>
                      </div>}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ApproveContactRequestModal isOpen={isApproveModalOpen} onRequestClose={closeApproveModal} rowData={data} methode={handleApprove}/>
        <RejectContactRequestModal isOpen={isRejectModalOpen} onRequestClose={closeRejectModal} rowData={data} methode={handleReject} />
        </>
    );
}

export default MyInvestmentDetails;
