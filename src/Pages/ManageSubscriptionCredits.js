import React, { useState } from "react";
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
import SimpleSelect from "../Components/SimpleSelect";

const ManageSubscriptionCredits = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [selectedCredits , setSelectedCredits] = useState(null);
    const [acceptTerms , setAcceptTerms] = useState(false);
    const [sending , setSending] = useState(false);
    const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading} = useGetUserDetailsQuery();


    const creditOptions = [
        {id: 1, credits: 2000, price: 60, formatted: `${(2000).toLocaleString()} Credits: 60$ USD` },
        {id: 2, credits: 4000, price: 100, formatted: `${(4000).toLocaleString()} Credits: 100$ USD` },
        {id: 3, credits: 6000, price: 120, formatted: `${(6000).toLocaleString()} Credits: 120$ USD` },
        {id: 4, credits: 8000, price: 160, formatted: `${(8000).toLocaleString()} Credits: 160$ USD` },
        {id: 5, credits: 10000, price: 200, formatted: `${(10000).toLocaleString()} Credits: 200$ USD` },
        {id: 6, credits: 12000, price: 210, formatted: `${(12000).toLocaleString()} Credits: 210$ USD` },
        {id: 7, credits: 14000, price: 250, formatted: `${(14000).toLocaleString()} Credits: 250$ USD` }
      ];
      
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col sm:px-5 px-8 gap-8 w-full h-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col lg:flex-row gap-5 items-start lg:justify-between pb-2 w-full">
                        <div className="flex h-full items-start justify-start w-auto">
                            <PageHeader
                            >
                            Welcome back, {userDetails?.displayName? userDetails?.displayName : 'Olivia'}
                            </PageHeader>
                        </div>
                        <div className="flex flex-row w-full lg:w-auto gap-4 justify-between ">
                            <SearchInput className={'w-[240px] '}/>
                            <button 
                            style={{whiteSpace: 'nowrap'}}
                            className=" bg-blue-A400 hover:bg-[#235DBD] text-white-A700 flex flex-row  items-center justify-center min-w-[184px] h-[44px] px-[12px] py-[7px] cursorpointer-green rounded-md w-auto" 
                            onClick={() => navigate("/CreateProject")}
                        >
                            <FaRegPlusSquare size={18} className="mr-2" />
                            Create Project
                        </button>
                        </div>
                    </div>
                    <div className="flex">
                        <Text
                            className="text-sm md:text-base lg:text-lg font-inter text-gray-500 leading-6 tracking-normal w-full"
                            >
                            Track, manage and forecast your customers and orders.
                        </Text>
                    </div>
                </div>
                <div className="h-[220px] px-2.5 py-[30px] bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-center items-center gap-6 flex">
                    <div className="p-2 bg-[#f9edfd] rounded-md justify-center items-center gap-2.5 inline-flex">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25" stroke="#D026DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="self-stretch h-24 flex-col justify-center items-center gap-2 flex">
                        <div className="text-[#101828] text-lg font-dm-sans-medium leading-7">Total Credits</div>
                        {userDetails?.subscription?.totalCredits > 0 ? (
                        <div className="w-auto text-center text-[#00cdae] text-[28px] font-dm-sans-medium leading-relaxed">
                            {userDetails?.subscription?.totalCredits}
                        </div>
                        ) : (
                        <div className="self-stretch text-center text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">
                            Upgrade your account or buy credits
                        </div>
                        )}
                    </div>
                </div>
                <div className="h-full w-full items-start gap-[42px] flex flex-row flex-wrap pb-[80px]">
                    <div className="h-full max-h-[481px] p-6 bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-start items-start gap-[18px] flex flex-1">
                        <div className="self-stretch justify-start items-start gap-4 pb-[18px] flex border-b border-[#e4e6eb]">
                            <div className="p-2 bg-[#f9edfd] rounded-md justify-center items-center gap-2.5 flex">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25" stroke="#D026DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="self-stretch flex-col justify-start items-start flex">
                                <div className="text-[#101828] text-lg font-dm-sans-medium leading-7">How many Credits would you like to buy?</div>
                                <div className="self-stretch text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">Out of Credits for a reward or an upgrade? You can buy the additional Credits you need.</div>
                            </div>
                        </div>
                        <div className="h-auto bg-white-A700 flex-col justify-start items-start w-full gap-2 flex">
                            <div className="w-auto h-[21px] text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">Your Order</div>
                            <div className="w-full h-auto text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">Please choose the amount of Credits you want from the dropdown menu below.</div>
                            <div className="self-stretch h-auto flex-col justify-start items-start gap-2 w-full flex">
                                <SimpleSelect id='credits'
                                options={creditOptions} onSelect={""} selectedOptionsDfault={selectedCredits}
                                setSelectedOptionVal={setSelectedCredits} searchable={true}
                                placeholder={"Select Credits"} valuekey="formatted"
                                content={
                                (option) => {
                                    return (
                                    <div className="flex  py-2 items-center  w-full">
                                    <span
                                        className="text-gray-801 w-full text-left text-base font-dm-sans-regular leading-5 w-auto"
                                        >
                                        {option?.formatted}
                                    </span>
                                    </div>
                                    );
                                }
                                } />               
                            </div>
                        </div>
                    </div>
                    <div className="w-[339px] h-[481px] p-6 bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-start items-start gap-6 flex">
                        <div className="text-center text-[#1d2838] text-base font-dm-sans-bold capitalize">Order Summary</div>
                        <div className="self-stretch justify-between items-start flex">
                            <div className="text-[#98a1b2] text-base font-dm-sans-medium">Number of Credits:</div>
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">{selectedCredits?.credits?.toLocaleString() || '-'}</div>
                        </div>
                        <div className="self-stretch justify-between items-start flex">
                            <div className="text-[#98a1b2] text-base font-dm-sans-medium">Cost of Credits:</div>
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">$ {selectedCredits?.price?.toFixed(2) || '00.00'}</div>
                        </div>
                        <div className="self-stretch h-[0px] border-2 border-[#eaeaed]"></div>
                        <div className="self-stretch justify-between items-end flex">
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">Total</div>
                            <div className="text-[#1e0d62] text-[22px] font-dm-sans-bold leading-7">$ {selectedCredits?.price?.toFixed(2) || '00.00'}</div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-[9px] flex">
                            <label htmlFor={`acceptTerms`} className="cursorpointer relative inline-flex items-center peer-checked:border-0 rounded-[3px] mr-2">
                                <input
                                    id={`acceptTerms`}
                                    type="checkbox"
                                    name="acceptTerms"
                                    className={`peer appearance-none w-[16px] h-[16px] bg-white_A700 checked:bg-blue-600 checked:border-blue-600 checked:shadow-none border-[0.5px]  ${(!acceptTerms && sending)? 'border-errorColor shadow-checkErrorbs': 'shadow-none border-[#303030]' } rounded-[4px]  relative`}
                                />
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                                    <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                                </svg>
                            </label>
                            <label
                            htmlFor='acceptTerms'
                            className="text-[13px] leading-[16.93px] text-[#555458] w-auto font-dm-sans-regular"
                            >
                            I accept the <a href={``} target='_blank' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>Terms of Service.</span></a>                     
                            </label>
                        </div>
                        <button 
                            className="w-full cursorpointer-green h-[50px] text-center text-white-A700 text-lg font-dm-sans-medium leading-relaxed bg-[#482be7] hover:bg-[#3016C0] active:bg-[#251192] rounded-[100px]">
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSubscriptionCredits;
