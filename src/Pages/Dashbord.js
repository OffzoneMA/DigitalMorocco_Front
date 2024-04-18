import React, { useState , useMemo  } from "react";
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
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoFlashOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



const Dashbord = () => {
const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

    const chartData = [
        { name: 'Jan', value: 150 },
        { name: 'Jan', value: 145 },
        { name: 'Jan', value: 240 },
        { name: 'Feb', value: 140 },
        { name: 'Mar', value: 420 },
        { name: 'Apr', value: 300 },
        { name: 'May', value: 400 },
        { name: 'Jun', value: 410 },
        { name: 'Jul', value: 550 },
        { name: 'Feb', value: 420 },
        { name: 'Mar', value: 580 },
        { name: 'Apr', value: 555 },
        
      ];
    
      const progessdata = [
        { category: 'Artificial Intelligence', percentage: 18.5 , filled:80 },
        { category: 'Finance', percentage: 12.4 ,filled:65},
        { category: 'Cryptocurrency', percentage: 10.2 , filled:60},
        { category: 'Biotechnology', percentage: 8.4 , filled:40},
        { category: 'Big Data', percentage: 5.8 ,filled:30},
      ];
      
    const Requestdata = [
        {
          date: "Jul 22, 2023 10:30 AM",
          investorName: "Venture Catalysts",
          communicationStatus: "Initial email sent",
          status: "In Progress",
          attachment: "Pitch Deck",
          notes: "Meeting Scheduled",
          logo:"images/img_inv.svg",
        },
        {
          date: "Jul 18, 2023 03:32 AM",
          investorName: "Startup Funding Club",
          communicationStatus: "Phone call",
          status: "Approved",
          attachment: "Proposal",
          notes: "Positive Feedback",
          logo:"images/img_inv1.svg"
        },
        {
          date: "Jun 24, 2023 09:06 AM",
          investorName: "XYZ Combinator",
          communicationStatus: "Rejection email",
          status: "Rejected",
          attachment: "Financials",
          notes: "Not Interested",
          logo:"images/img_inv2.svg"
        },
    ];

    const prjectdata = [
        {
          project: 'Lorem Ipsum Project',
          target: 'USD 5,000,000',
          status: 'Active',
          stage: 'Angel Round',
          totalRaised: 'USD 0', 
        },
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

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="flex flex-col md:flex-row gap-5 items-start justify-start pb-2 w-full">
                    <div className="flex flex-1 font-dmsans h-full items-start justify-start w-auto">
                        <Text
                        className="text-3xl font-bold leading-11 text-gray-900 w-full"
                        size="txtDMSansBold32"
                        >
                        Welcome back, {userData?.displayName? userData?.displayName : 'Olivia'}
                        </Text>
                    </div>
                    <div className="flex flex-row w-full md:w-[50%] ml-auto md:justify-end gap-4">
                        <div className="flex w-auto  md:w-[40%] rounded-md p-2 border border-solid">
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
                        <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center p-[7px] cursor-pointer rounded-md w-auto" 
                        onClick={()=> navigate("/CreateProject")}>
                            <FaRegPlusSquare  size={18} className="mr-2"/>
                            <button
                            type="button"
                            className="text-base text-white-A700"
                            >
                            Create Project
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex pb-6">
                     <Text
                        className="text-lg font-inter text-gray-500 leading-6 tracking-normal w-full"
                        >
                        Track, manage and forecast your customers and orders.
                    </Text>
                </div>
                <div className="flex flex-row bg-blue-A400 items-center rounded-[12px] px-5 py-3  w-full flex-1">
                    <div className="flex rounded-md bg-teal-50 p-3">
                       <LiaUnlockAltSolid size={28} className="text-blue-A400 transform scale-x-[-1]"/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-3">
                     <Text
                        className="font-DmSans text-[22px] font-medium leading-8 text-white-A700 tracking-normal w-full"
                        >
                        Upgrade your account and get full access to Digital Morocco
                    </Text>
                    <Text
                        className="text-sm font-normal leading-[26px] tracking-normal font-DmSans text-white-A700 w-full"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </Text>
                    </div>
                    <div className="flex items-center justify-end bg-teal-A700 rounded-md w-auto ml-auto cursor-pointer p-2">
                       <HiOutlineSparkles  size={18} className=" text-blue_gray-901 mr-2"/>
                        <button
                        type="button"
                        className="text-base text-blue_gray-901"
                        >
                        Upgrade Membership
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-8 w-full">
                    <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200 py-7 px-5">
                      <div className="rounded-[6px] p-2 bg-teal-50 ">
                        <GoRocket size={28} fontWeight={400} className="text-emerald-600" />
                      </div>
                      <Text
                        className="font-DmSans text-[18px] font-medium leading-7 tracking-normal text-gray-900_01"
                        >
                        Create Project
                      </Text>
                      <Text
                        className="font-DmSans text-sm font-normal leading-[26px] tracking-normal text-blue_gray-301"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </Text>
                    </div>
                    <div className="flex flex-col gap-4  items-center rounded-[12px] border border-gray-200 py-7 px-5">
                      <div className="rounded-[6px] p-2 bg-blue-51">
                        <TiFlashOutline size={28} className="text-blue-701" />
                      </div>
                      <Text
                        className="font-DmSans text-[18px] font-medium leading-7 tracking-normal text-gray-900_01"
                        >
                        Investors
                      </Text>
                      <Text
                        className="font-DmSans text-sm font-normal leading-[26px] tracking-normal text-blue_gray-301"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </Text>
                    </div>
                    <div className="flex flex-col gap-4  items-center rounded-[12px] border border-gray-200 py-7 px-5">
                      <div className="rounded-[6px] p-2 bg-orange-51">
                        <HiOutlineSpeakerphone size={28} className="text-amber-601"  />
                      </div>
                      <Text
                        className="font-DmSans text-[18px] font-medium leading-7 tracking-normal text-gray-900_01"
                        >
                        Events
                      </Text>
                      <Text
                        className="font-DmSans text-sm font-normal leading-[26px] tracking-normal text-blue_gray-301"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </Text>
                    </div>
                    <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200 py-7 px-5">
                      <div className="rounded-[6px] p-2 bg-violet-100">
                        <BiBuildings size={28} className="text-blue-601" />
                      </div>
                      <Text
                        className="font-DmSans text-[18px] font-medium leading-7 tracking-normal text-gray-900_01"
                        >
                        My Company
                      </Text>
                      <Text
                        className="font-DmSans text-sm font-normal leading-[26px] tracking-normal text-blue_gray-301"
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </Text>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 w-full">
                  <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200  px-6">
                    <div className="flex flex-row items-center w-full">
                     <div className="flex rounded-md bg-violet-100 p-2">
                       <FaArrowTrendUp size={28} className="text-blue-601 "/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-2">
                        <Text
                            className="font-DmSans ext-base font-medium leading-8 text-gray-900_01 tracking-normal w-full"
                            >
                           The Top Markets
                        </Text>
                        <Text
                            className="text-sm font-normal leading-[26px] text-blue_gray-301 tracking-normal font-DmSans w-full"
                            >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                    {progessdata.length > 0 ? (
                        progessdata.map((item, index) => (
                            <ProgressBar key={index} filled={item.filled} filledValue={`${item.percentage}%`} text={item.category} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center text-gray-600 w-full py-28">
                            <AiOutlineFileSearch size={30} />
                            <Text className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto" size="">
                                Data not available
                            </Text>
                        </div>
                    )}
                    </div>
                   </div>
                   <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200 px-6">
                    <div className="flex flex-row items-center w-full">
                     <div className="flex rounded-md bg-violet-100 p-2">
                       <FaArrowTrendUp size={28} className="text-blue-601 "/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-2">
                        <Text
                            className="font-DmSans ext-base font-medium leading-8 text-gray-900_01 tracking-normal w-full"
                            >
                           Investment Volume 
                        </Text>
                        <Text
                            className="text-sm font-normal leading-[26px] text-blue_gray-301 tracking-normal font-DmSans w-full"
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
                            <AiOutlineFileSearch size={30} />
                            <Text
                            className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            Data not available
                            </Text>
                        </div>
                      }
                    </div>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 w-full">
                    <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200 ">
                      <div className="flex flex-row items-center border-b px-6 py-2.5 border-gray-200 w-full">
                        <div className="flex rounded-md bg-violet-100 p-2">
                          <GoRocket size={28} className="text-blue-601 "/>
                        </div>
                        <div className="flex flex-col p-3 items-center ml-2">
                            <Text
                                className="font-DmSans text-base font-medium leading-8 text-gray-900_01 tracking-normal w-full"
                                >
                            Active Projects
                            </Text>
                        </div>
                       </div>
                       {prjectdata.length >0 ? 
                        prjectdata.map((item, index) => (
                            <div className="flex flex-col px-6 w-full">
                            <div className="flex flex-row items-center gap-3 py-2 justify-start w-full">
                                <Text
                                    className="font-DmSans text-base font-medium leading-8 text-gray-900_01 tracking-normal text-left"
                                    >
                                {item.project}
                                </Text>
                                <div className={`flex flex-row space-x-2 bg-emerald-50 text-green-700 items-center py-1 px-2 font-DmSans text-sm font-normal leading-6 rounded-full`}>
                                <GoDotFill size={12} className="mr-2"/>
                                {item.stage}
                                </div>
                            </div>
                            <div className=" flex-row gap-px grid grid-cols-3 py-2 w-full">
                            <div className="flex flex-col items-start justify-start">
                                <div className="flex flex-col items-center justify-start w-auto">
                                    <Text
                                    className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                                    size="txtDMSansBold12"
                                    >
                                    Target{" "}
                                    </Text>
                                </div>
                                <div className="flex flex-col items-start justify-center py-4 w-full">
                                <Text
                                    className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                                    size="txtDMSansMedium22"
                                >
                                    {item.target}
                                </Text>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start w-auto">
                                <div className="flex flex-col items-center justify-start w-auto">
                                    <Text
                                    className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                                    size="txtDMSansBold12"
                                    >
                                    Stage
                                    </Text>
                                </div>
                                <div className="flex flex-col items-start justify-center py-4 w-full">
                                <Text
                                    className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                                    size="txtDMSansMedium22"
                                >
                                    {item.stage}
                                </Text>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="flex flex-col items-center justify-start w-auto">
                                    <Text
                                    className="text-blue_gray-300 text-xs tracking-[1.68px] uppercase w-auto"
                                    size="txtDMSansBold12"
                                    >
                                    Total Raised
                                    </Text>
                                </div>
                                <div className="flex flex-col items-start justify-start py-4 w-full">
                                <Text
                                    className="text-[22px] text-blue_gray-800 sm:text-lg md:text-xl w-auto"
                                    size="txtDMSansMedium22"
                                >
                                    {item.totalRaised}
                                </Text>
                                </div>
                            </div>
                            </div>
                            </div>
                        ))
                        :
                        <div className="flex flex-col items-center text-gray-600  w-full py-28">
                            <IoFlashOffOutline size={30} />
                            <Text
                            className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            No Active Project
                            </Text>
                        </div>
                       }
                    </div>
                    <div className="flex flex-col gap-3 items-center rounded-[12px] border border-gray-200 ">
                      <div className="flex flex-row items-center border-b px-6 py-2.5 border-gray-200 w-full">
                        <div className="flex rounded-md bg-violet-100 p-2">
                          <GoRocket size={28} className="text-blue-601 "/>
                        </div>
                        <div className="flex flex-col p-3 items-center ml-2">
                            <Text
                                className="font-DmSans ext-base font-medium leading-8 text-gray-900_01 tracking-normal w-full"
                                >
                            Lastest Request
                            </Text>
                        </div>
                       </div>
                       <div className="flex flex-col w-full">
                          <table className=" w-full">
                            <thead className="">
                            <tr className="bg-white-A700 text-sm leading-6 ">
                                <th className="p-3 text-left text-blue_gray-800_01 font-medium">Investor Name</th>
                                <th className="p-3 text-left text-blue_gray-800_01 font-medium">Communication Status</th>
                                <th className="p-3 text-left text-blue_gray-800_01 font-medium">Status</th>
                            </tr>
                            </thead>
                            {Requestdata.length >0 ?
                            Requestdata.map((item, index) => (
                            <tbody className="items-center w-full ">
                              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                                <td className="py-4 px-3 w-auto text-gray-600 font-DmSans text-sm font-normal leading-6">
                                    <div className="flex items-center" >
                                        <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.investorName}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{item.communicationStatus}</td>
                                <td className="py-4 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">
                                    <div className={`flex flex-row space-x-2 items-center py-1 px-2 font-DmSans text-sm font-normal leading-6 rounded-full ${
                                    item.status === 'Approved' ? 'bg-emerald-50 text-green-700' :
                                        item.status === 'In Progress' ? 'bg-blue-101 text-blue-600' :
                                        item.status === 'Rejected' ? 'bg-rose-100 text-red-500' : ''
                                    } inline-flex`}>
                                    {item.status}
                                    </div>
                                </td>
                              </tr>
                            </tbody>
                             ))
                            :
                            ""}
                          </table>
                       </div>
                       {!Requestdata?.length>0 && (
                       <div className="flex flex-col items-center text-gray-600 w-full py-28">
                            <IoFlashOffOutline size={30} />
                            <Text
                            className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            No Request Yet
                            </Text>
                        </div>
                       )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashbord;