import React , {useEffect} from "react";
import { Text } from "../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { HiOutlineSparkles } from "react-icons/hi";
import { GoRocket } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { TiFlashOutline } from "react-icons/ti";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowTrendUp } from "react-icons/fa6";
import ProgressBar from "../Components/ProgressBar";
import { AreaChart, Area, ResponsiveContainer , Tooltip} from 'recharts';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import creditsImg from '../Media/credits_img.svg';
import { useGetAllProjectsQuery } from "../Services/Member.Service";
import Loader from "../Components/Loader";
import fileSearchImg from '../Media/file-search.svg';
import { useGetUserDetailsQuery } from "../Services/Auth";
import { useGetAllConatctReqQuery } from "../Services/Member.Service";
import { FaUserCircle } from "react-icons/fa";
import { useGetTopSectorsQuery } from "../Services/Project.Service";
import userdefaultProfile from '../Media/User.png';
import { useGetRecentApprovedContactRequestsQuery , useGetLastRecentContactRequestsQuery } from "../Services/Investor.Service";

const Dashbord_Investor = () => {
const { userInfo } = useSelector((state) => state.auth)
  const status = 'Active'
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const { data: progessdata , error: errorTopSectors, isLoading: loadingTopSectors } = useGetTopSectorsQuery();
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading , refetch : refetchUser} = useGetUserDetailsQuery();
  const { data: projects, error, isLoading , refetch } = useGetRecentApprovedContactRequestsQuery();
  const { data: contactReqs , error: contactReqsError , isLoading: contactReqsLoading , refetch: refetchRequest} = useGetLastRecentContactRequestsQuery({});
  const Requestdata =  contactReqs?.recentRequests?.slice(0, 3)
  const recentProjects = [...(projects?.data || [])]
  .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)) 
  .slice(0, 1); 
  console.log(contactReqs)
  useEffect(() => {
    refetchUser();
    refetch();
    refetchRequest();
  }, [refetchUser , refetch , refetchRequest]);

  const chartData = [
        { name: 'Jan', value: 150 },
        { name: 'Feb', value: 145 },
        { name: 'Mar', value: 240 },
        { name: 'Apr', value: 140 },
        { name: 'May', value: 420 },
        { name: 'Jun', value: 300 },
        { name: 'Jul', value: 400 },
        { name: 'Aug', value: 410 },
        { name: 'Sep', value: 550 },
        { name: 'Oct', value: 420 },
        { name: 'Nov', value: 580 },
        { name: 'Dec', value: 555 },
        
      ];
  
      const gradientOffset = () => {
        const data = chartData;
        if (data.length > 0) {
          const sortedData = data.slice().sort((a, b) => a.value - b.value);
          return sortedData[0].value;
        }
        return 0;
      };
      
      const off = gradientOffset(); 

      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const { name, value } = payload[0].payload;
          return (
            <div className="custom-tooltip flex flex-row bg-transparent text-sm font-dm-sans-regular " >
              <p className="label">{name}: <span className="text-[#45C68A] text-sm">{value}</span></p>
            </div>
          );
        }
    
        return null;
      };

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 pb-8 w-full">
                <div className="flex flex-col lg:flex-row gap-5 items-start lg:justify-between pb-2 w-full">
                    <div className="flex h-full items-start justify-start w-auto">
                        <PageHeader
                        >
                        Welcome back, {userData?.displayName? userData?.displayName : 'Olivia'}
                        </PageHeader>
                    </div>
                    <SearchInput className={'w-[240px] '}/>
                </div>
                <div className="flex pb-6">
                     <Text
                        className="text-sm md:text-base lg:text-lg font-inter text-gray-500 leading-6 tracking-normal w-full"
                        >
                        Track, manage and forecast your customers and orders.
                    </Text>
                </div>
                <div className="flex flex-row flex-wrap bg-blue-A400 justify-between items-center rounded-[12px] px-5 py-3  w-full flex-1">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="flex rounded-md bg-teal-50 p-2 md:p-2.5 lg:p-3">
                        <LiaUnlockAltSolid className="text-[22px] md:text-[26px] lg-text-[28px] text-blue-A400 transform scale-x-[-1]"/>
                      </div>
                      <div className="flex flex-col p-3 gap-1 ml-3">
                      <Text
                          className="text-base md:text-[18px] lg:text-[22px] font-dm-sans-medium leading-8 text-white-A700 tracking-normal w-full"
                          >
                          Upgrade your account and get full access to Digital Morocco
                      </Text>
                      <Text
                        className="text-sm font-dm-sans-regular leading-[26px] tracking-normal  text-white-A700 w-full"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </Text>
                      </div>
                    </div>
                    <button className="flex gap-[8px] items-center text-sm text-blue_gray-901 bg-teal-A700 rounded-md w-[197px] h-[37px] cursorpointer hover:bg-greenbtnhoverbg  px-[12px] py-[8px] " onClick={() => navigate('/Subscription') }>
                      {/* <HiOutlineSparkles size={18} className="text-blue_gray-901 mr-2" /> */}
                      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.9375 19.75V15.375M3.9375 6.625V2.25M1.75 4.4375H6.125M1.75 17.5625H6.125M11.375 3.125L9.85759 7.07025C9.61083 7.71183 9.48745 8.03262 9.29559 8.30245C9.12554 8.5416 8.9166 8.75054 8.67745 8.92059C8.40762 9.11245 8.08683 9.23583 7.44525 9.48259L3.5 11L7.44526 12.5174C8.08683 12.7642 8.40762 12.8875 8.67745 13.0794C8.9166 13.2495 9.12554 13.4584 9.29559 13.6975C9.48745 13.9674 9.61083 14.2882 9.8576 14.9297L11.375 18.875L12.8924 14.9297C13.1392 14.2882 13.2625 13.9674 13.4544 13.6976C13.6245 13.4584 13.8334 13.2495 14.0726 13.0794C14.3424 12.8875 14.6632 12.7642 15.3047 12.5174L19.25 11L15.3047 9.48259C14.6632 9.23583 14.3424 9.11245 14.0726 8.92059C13.8334 8.75054 13.6245 8.5416 13.4544 8.30245C13.2625 8.03262 13.1392 7.71183 12.8924 7.07025L11.375 3.125Z" stroke="#1F2545" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Upgrade Membership
                  </button>
                </div>
                <div className="flex flex-wrap gap-8 2xl:gap-10 pt-8 w-full">
                  <div className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[180px] grow max-w-[400px] xl:max-w-[500px] xl:h-[200px] 2xl:max-w-[700px] 2xl:h-[220px] 3xl:max-w-[700px] 3xl:h-[240px]" 
                  onClick={() => navigate('/Projects')}>
                    <div className="rounded-[6px] p-2 bg-teal-50">
                      <GoRocket size={28} fontWeight={400} className="text-emerald-600" />
                    </div>
                    <Text
                      className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01"
                    >
                      Created Project
                    </Text>
                    {userDetails?.projectCount > 0 ? (
                      <Text
                        className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]"
                      >
                        {userDetails?.projectCount < 10 ? `0${userDetails?.projectCount}` : userDetails?.projectCount}
                      </Text>
                    ) : (
                      <Text
                        className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301"
                      >
                        Make sure that you have already created projects
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[180px] grow max-w-[400px] xl:max-w-[500px] xl:h-[200px] 2xl:max-w-[700px] 2xl:h-[220px] 3xl:max-w-[700px] 3xl:h-[240px]"  
                    onClick={() => navigate('/MyInvestment')}>
                    <div className="rounded-[6px] p-2 bg-blue-51">
                      <TiFlashOutline size={28} className="text-blue-701" />
                    </div>
                    <Text
                      className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01"
                    >
                      Investments
                    </Text>
                    {userDetails?.investmentCount?.count > 0 ? (
                    <Text
                      className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]"
                    >
                      {userDetails?.investmentCount?.count < 10 
                        ? `0${userDetails?.investmentCount?.count}` 
                        : userDetails?.investmentCount?.count}
                    </Text>
                  ) : (
                    <Text
                      className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301"
                    >
                      Start sending requests to investors
                    </Text>
                  )}
                  </div>
                  <div className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[180px] grow max-w-[400px] xl:max-w-[500px] xl:h-[200px] 2xl:max-w-[700px] 2xl:h-[220px] 3xl:max-w-[700px] 3xl:h-[240px]" 
                    onClick={() => navigate('/Participate')}>
                    <div className="rounded-[6px] p-2 bg-orange-51">
                      <HiOutlineSpeakerphone size={28} className="text-amber-601" />
                    </div>
                    <Text
                      className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01"
                    >
                      Events
                    </Text>
                    {userDetails?.eventCount > 0 ? (
                      <Text
                        className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]"
                      >
                        {userDetails?.eventCount < 10 ? `0${userDetails?.eventCount}` : userDetails?.eventCount}
                      </Text>
                    ) : (
                      <Text
                        className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301"
                      >
                        Buy your tickets and join our special events
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[180px] grow max-w-[400px] xl:max-w-[500px] xl:h-[200px] 2xl:max-w-[700px] 2xl:h-[220px] 3xl:max-w-[700px] 3xl:h-[240px]" 
                    onClick={() => navigate('/MyCompany')}>
                    <div className="rounded-[6px] p-2 bg-violet-100">
                      <BiBuildings size={28} className="text-blue-601" />
                    </div>
                    <Text
                      className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01"
                    >
                      My Company
                    </Text>
                    {userDetails?.companyName ? (
                      <Text
                        className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]"
                      >
                        01
                      </Text>
                    ) : (
                      <Text
                        className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301"
                      >
                        Create a profile for your company
                      </Text>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 w-full">
                  <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201  px-6">
                    <div className="flex flex-row items-center w-full">
                     <div className="flex rounded-md bg-violet-100 p-2">
                       <FaArrowTrendUp size={28} className="text-blue-601 "/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-2">
                        <Text
                            className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full"
                            >
                           The Top Markets
                        </Text>
                        <Text
                            className="text-sm font-dm-sans-regular leading-6 text-blue_gray-301 tracking-normal  w-full"
                            >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-3 pb-4">
                    {loadingTopSectors ? (
                      <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                        <Loader />
                      </div>
                      ) : progessdata?.sectors?.length > 0 ? (
                          progessdata?.sectors?.map((item, index) => (
                              <ProgressBar
                                  key={index}
                                  filled={parseFloat(item.percentage).toFixed(2)} 
                                  filledValue={`${parseFloat(item.percentage).toFixed(2)}%`}
                                  text={item.sector}
                              />
                          ))
                      ) : (
                          <div className="flex flex-col gap-[16px] items-center text-gray-600 w-full py-24">
                              <img src={fileSearchImg} alt="" />
                              <Text className="text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto">
                                  Data not available
                              </Text>
                          </div>
                      )}
                    </div>
                   </div>
                   <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201 px-6">
                    <div className="flex flex-row items-center w-full">
                     <div className="flex rounded-md bg-violet-100 p-2">
                       <FaArrowTrendUp size={28} className="text-blue-601 "/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-2">
                        <Text
                            className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full"
                            >
                           Investment Volume 
                        </Text>
                        <Text
                            className="text-sm font-dm-sans-regular leading-6 text-blue_gray-301 tracking-normal  w-full"
                            >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col w-full ">
                      {chartData.length > 0 ? 
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height={260}>
                                <AreaChart data={chartData}>
                                <Tooltip content={<CustomTooltip />} />
                                <defs>
                                    <linearGradient id="colorvalue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={"#A9FCE5"} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={"#A9FCE5"} stopOpacity={0} />
                                    </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#45C68A" strokeWidth={2} fill="url(#colorvalue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <div className="flex flex-col items-center text-gray-600 w-full py-28">
                            <img src={fileSearchImg}  alt={""}/>
                            <Text
                            className=" text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            Data not available
                            </Text>
                        </div>
                      }
                    </div>
                   </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 w-full">
                    <div className="flex flex-col hover:shadow-dashCard cursorpointer gap-4 items-center rounded-[12px] border border-gray-201 ">
                      <div className="flex flex-row items-center border-b px-6 py-2.5 border-gray-201 w-full" 
                      onClick={() => navigate('/MyInvestment')}>
                        <div className="flex rounded-md bg-violet-100 p-2">
                          <GoRocket size={28} className="text-blue-601 "/>
                        </div>
                        <div className="flex flex-col p-3 items-center ml-2">
                            <Text
                                className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full"
                                >
                            Last Project
                            </Text>
                        </div>
                      </div>
                       {isLoading ? (
                        <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                            <Loader />
                        </div>
                         ) : (
                        recentProjects?.length > 0 ? 
                        recentProjects.map((item, index) => (
                          <div key={index} className="flex flex-col gap-[24px] px-6 hover:bg-blue-50 cursorpointer w-full" onClick={()=> navigate(`/InvestmentDetails/${item?._id}` , {state: { contactRequest: item }})}>
                            <div className="flex flex-row items-center gap-[24px] py-[20px] justify-start w-full">
                                <Text
                                    className=" text-lg font-dm-sans-medium leading-8 text-[#101828] tracking-normal capitalize text-left"
                                    >
                                {item?.project?.name}
                                </Text>
                                <div className={`flex flex-row gap-[6px] bg-green-100 text-[#027A48] items-center py-1 px-[12px] h-7 text-sm font-dm-sans-regular leading-6 rounded-full`}>
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="3" fill="#12B76A"/>
                                  </svg>
                                  {item?.project?.stage}
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 py-2 w-full">
                              <div className="flex flex-col flex-1 items-start justify-start">
                                  <div className="flex flex-col items-center justify-start w-auto">
                                      <Text
                                      className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto"
                                      size="txtDMSansBold12"
                                      >
                                      Target{" "}
                                      </Text>
                                  </div>
                                  <div className="flex flex-col items-start justify-center py-4 w-full">
                                  <Text
                                      className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto"
                                      size="txtDMSansMedium22"
                                  >
                                     {item?.project?.currency} {item?.project?.funding?.toLocaleString('en-US') || 0 }
                                  </Text>
                                  </div>
                              </div>
                              <div className="flex flex-col flex-1 items-start justify-start w-auto">
                                  <div className="flex flex-col items-center justify-start w-auto">
                                      <Text
                                      className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto"
                                      size="txtDMSansBold12"
                                      >
                                      Stage
                                      </Text>
                                  </div>
                                  <div className="flex flex-col items-start justify-center py-4 w-full">
                                  <Text
                                      className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto"
                                      size="txtDMSansMedium22"
                                  >
                                      {item?.project?.stage}
                                  </Text>
                                  </div>
                              </div>
                              <div className="flex flex-col flex-1 items-start justify-start">
                                  <div className="flex flex-col items-center justify-start w-auto">
                                      <Text
                                      className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto"
                                      size="txtDMSansBold12"
                                      >
                                      Total Raised
                                      </Text>
                                  </div>
                                  <div className="flex flex-col items-start justify-start py-4 w-full">
                                  <Text
                                      className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto"
                                      size="txtDMSansMedium22"
                                  >
                                      {item?.project?.currency} {item?.project?.totalRaised?.toLocaleString('en-US') || 0}
                                  </Text>
                                  </div>
                              </div>
                          </div>
                        </div>
                        )) : (
                            <div className="flex flex-col gap-[16px] items-center text-gray-600 w-full py-28">
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                              <path d="M12.5 12L6.64018 19.0318C6.11697 19.6596 5.85536 19.9736 5.85137 20.2387C5.84789 20.4692 5.9506 20.6885 6.12988 20.8333C6.33612 21 6.74476 21 7.56205 21H18.5L17 33L24.5 24M23.9751 15H29.438C30.2552 15 30.6639 15 30.8701 15.1667C31.0494 15.3115 31.1521 15.5308 31.1486 15.7613C31.1446 16.0264 30.883 16.3404 30.3598 16.9682L28.3254 19.4096M16.3591 7.36897L19.9999 3L19.1004 10.1966M32 31.5L5 4.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                                <Text
                                    className="text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
                                    size=""
                                >
                                    No Active Project
                                </Text>
                            </div>
                        )
                       )}
                    </div>
                    <div className="flex flex-col gap-3 hover:shadow-dashCard cursorpointer items-center rounded-[12px] border border-gray-201 ">
                      <div className="flex flex-row items-center border-b px-6 py-2.5 border-gray-201 w-full" 
                        onClick={() => navigate('/InvestmentRequestHistory')}>
                        <div className="flex rounded-md bg-violet-100 p-2">
                          <GoRocket size={28} className="text-blue-601 "/>
                        </div>
                        <div className="flex flex-col p-3 items-center ml-2">
                            <Text
                                className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full"
                                >
                            Lastest Request
                            </Text>
                        </div>
                       </div>
                       <div className="flex flex-col w-full overflow-x-auto">
                       <table className="w-full mb-3">
                        <thead>
                          <tr className="bg-white-A700 text-sm leading-6">
                            <th scope="col" className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium">Project Name</th>
                            <th scope="col" className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium">Communication Status</th>
                            <th scope="col" className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="items-center w-full">
                        {(!contactReqsLoading && Requestdata?.length > 0) 
                            ? Requestdata.map((item, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer w-full`} onClick={()=> navigate(`/InvestmentRequestDetails/${item?._id}`)}>
                                  <td className="py-4 px-3 w-auto text-gray-600 text-sm font-dm-sans-regular leading-6">
                                    <div className="flex items-center gap-2">
                                      {item?.project?.image ? (
                                        <img src={item.project?.image} className="rounded-full h-8 w-8" alt="Profile" />
                                      ) : (
                                        <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                          <img src={userdefaultProfile} alt="" className="" />
                                        </div>
                                      )}
                                      <span className="capitalize" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item?.project?.name || 'Unknown Project'}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-3 text-gray-600 text-sm font-dm-sans-regular leading-6">{item?.communicationStatus || "Initial send email"}</td>
                                  <td className="py-4 px-3 text-gray-600 text-sm font-dm-sans-regular leading-6">
                                    <div
                                      className={`flex flex-row whitespace-nowrap space-x-2 items-center py-1 px-2 text-sm font-dm-sans-regular leading-6 rounded-full ${
                                        (item.status === 'Approved' || item.status === 'Accepted')
                                          ? 'bg-green-100 text-green-700'
                                          : item.status === 'In Progress'
                                          ? 'bg-[#dbedff] text-[#156fee]'
                                          : item.status === 'Rejected'
                                          ? 'bg-rose-100 text-red-500'
                                          : ''
                                      } inline-flex`}
                                    >
                                      {item.status}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""
                         }
                        </tbody>
                       </table>
                       </div>
                       {contactReqsLoading ? (
                        <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                            <Loader />
                        </div>
                       ) :
                       (!contactReqsLoading && !Requestdata?.length>0) && (
                       <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                          <path d="M12.5 12L6.64018 19.0318C6.11697 19.6596 5.85536 19.9736 5.85137 20.2387C5.84789 20.4692 5.9506 20.6885 6.12988 20.8333C6.33612 21 6.74476 21 7.56205 21H18.5L17 33L24.5 24M23.9751 15H29.438C30.2552 15 30.6639 15 30.8701 15.1667C31.0494 15.3115 31.1521 15.5308 31.1486 15.7613C31.1446 16.0264 30.883 16.3404 30.3598 16.9682L28.3254 19.4096M16.3591 7.36897L19.9999 3L19.1004 10.1966M32 31.5L5 4.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                            <Text
                            className=" text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            No Request Yet
                            </Text>
                        </div>
                       ) 
                       }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashbord_Investor;