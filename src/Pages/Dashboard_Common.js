import React , {useEffect} from "react";
import { Text } from "../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { GoRocket } from "react-icons/go";
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
import { useGetTopSectorsQuery } from "../Services/Project.Service";
import { useTranslation } from "react-i18next";
import {useGetUsersCountByMonthQuery} from "../Services/User.Service";

const DashboardCommon = () => {
const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const { data: countUsers, error: countUsersError, isLoading: loadingUsers , refetch } = useGetUsersCountByMonthQuery();
  const { data: progessdata , error: errorTopSectors, isLoading: loadingTopSectors , refetch: refetchTopSectors } = useGetTopSectorsQuery();
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading , refetch : refetchUser} = useGetUserDetailsQuery();

  useEffect(() => {
    refetchUser();
    refetch();
    refetchTopSectors();
  }, [refetchUser , refetch  , refetchTopSectors]);

    const chartData = countUsers?.monthlyCounts;
  
      const gradientOffset = () => {
        const data = chartData;
        if (data?.length > 0) {
          const sortedData = data.slice().sort((a, b) => a.value - b.value);
          return sortedData[0].value;
        }
        return 0;
      };
      
      const off = gradientOffset(); 

      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const { month, count } = payload[0].payload;
          return (
            <div className="custom-tooltip flex flex-row bg-transparent text-sm font-dm-sans-regular " >
              <p className="label">{t(month)}: <span className="text-[#45C68A] text-sm">{count}</span></p>
            </div>
          );
        }
    
        return null;
      };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 w-full">
            <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201 px-6">
            <div className="flex flex-row py-4 items-start w-full">
                <div className="flex rounded-md bg-violet-100 p-2">
                <FaArrowTrendUp size={28} className="text-blue-601 "/>
                </div>
                <div className="flex flex-col px-3 items-center gap-1 ml-2">
                <Text
                    className=" text-lg font-dm-sans-medium leading-5 text-gray-900_01 tracking-normal w-full"
                    >
                    {t('dashboard.topMarkets')}
                </Text>
                <Text
                    className="text-sm font-dm-sans-regular leading-5 text-blue_gray-301 tracking-normal  w-full"
                    >
                    {t('dashboard.topMarketsSub')}
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
                            {t("common.noData")}
                        </Text>
                    </div>
                )}
            </div>
            </div>
            <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201 px-6">
            <div className="flex flex-row py-4 items-start w-full">
                <div className="flex rounded-md bg-violet-100 p-2">
                <FaArrowTrendUp size={28} className="text-blue-601 "/>
                </div>
                <div className="flex flex-col px-3 items-center gap-1 ml-2">
                <Text
                    className=" text-lg font-dm-sans-medium leading-5 text-gray-900_01 tracking-normal w-full"
                    >
                    {t('dashboard.investmentVolume')}
                </Text>
                <Text
                    className="text-sm font-dm-sans-regular leading-5 text-blue_gray-301 tracking-normal  w-full"
                    >
                    {t('dashboard.investmentVolumeSub')}
                </Text>
                </div>
            </div>
            <div className="flex flex-col w-full ">
                {(chartData?.length > 0 && !loadingUsers)? 
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
                            <Area type="monotone" dataKey="count" stroke="#45C68A" strokeWidth={2} fill="url(#colorvalue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                :
                loadingUsers ?
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                </div>
                :
                <div className="flex flex-col items-center text-gray-600 w-full py-28">
                    <img src={fileSearchImg}  alt={""}/>
                    <Text
                    className=" text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
                    size=""
                    >
                    {t("common.noData")}
                    </Text>
                </div>
                }
            </div>
            </div>
        </div>
    );
}

export default DashboardCommon;
