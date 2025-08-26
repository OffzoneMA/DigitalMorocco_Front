import React, { useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import ProgressBar from "../../Components/common/ProgressBar";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import Loader from "../../Components/Loader";
import fileSearchImg from "../../Media/file-search.svg";
import { useGetTopSectorsQuery } from "../../Services/Project.Service";
import { useTranslation } from "react-i18next";
import { useGetUsersCountByMonthQuery } from "../../Services/User.Service";

const DashboardCommon = () => {

  const { t } = useTranslation();

  const {
    data: countUsers,
    isLoading: loadingUsers,
    refetch,
  } = useGetUsersCountByMonthQuery();

  const {
    data: progessdata,
    isLoading: loadingTopSectors,
    refetch: refetchTopSectors,
  } = useGetTopSectorsQuery();

  useEffect(() => {
    refetch();
    refetchTopSectors();
  }, [refetch, refetchTopSectors]);

  const chartData = countUsers?.monthlyCounts;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, count } = payload[0].payload;
      return (
        <div className="custom-tooltip flex flex-row bg-transparent text-sm font-dm-sans-regular ">
          <p className="label">
            {t(month)}: <span className="text-[#45C68A] text-sm">{count}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 w-full">
      <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201 px-6">
        <div className="flex flex-row py-4 items-start w-full">
          <div className="flex rounded-md bg-violet-100 p-2">
            <FaArrowTrendUp size={28} className="text-blue-601 " />
          </div>
          <div className="flex flex-col px-3 items-center gap-1 ml-2">
            <h1
              className=" text-lg font-dm-sans-medium leading-5 text-gray-900_01 tracking-normal w-full"
            >
              {t("dashboard.topMarkets")}
            </h1>
            <h2
              className="text-sm font-dm-sans-regular leading-5 text-blue_gray-301 tracking-normal  w-full"
            >
              {t("dashboard.topMarketsSub")}
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 pb-4">
          {loadingTopSectors ? (
            <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
              <Loader />
            </div>
          ) : progessdata?.sectors?.length > 0 ? (
            progessdata?.sectors
              ?.filter(
                (item) => item?.sector !== null && item?.sector !== undefined
              )
              .map((item, index) => (
                <ProgressBar
                  key={index}
                  filled={parseFloat(item.percentage).toFixed(2)}
                  filledValue={`${parseFloat(item.percentage).toFixed(2)}%`}
                  text={item?.sector}
                />
              ))
          ) : (
            <div className="flex flex-col gap-[16px] items-center text-gray-600 w-full py-24">
              <img src={fileSearchImg} alt="empty data icon" />
              <p
                className="text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
              >
                {t("common.noData")}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-201 px-6">
        <div className="flex flex-row py-4 items-start w-full">
          <div className="flex rounded-md bg-violet-100 p-2">
            <FaArrowTrendUp size={28} className="text-blue-601 " />
          </div>
          <div className="flex flex-col px-3 items-center gap-1 ml-2">
            <h1
              className=" text-lg font-dm-sans-medium leading-5 text-gray-900_01 tracking-normal w-full"
            >
              {t("dashboard.investmentVolume")}
            </h1>
            <h2
              className="text-sm font-dm-sans-regular leading-5 text-blue_gray-301 tracking-normal w-full"
            >
              {t("dashboard.investmentVolumeSub")}
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          {chartData?.length > 0 && !loadingUsers ? (
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData}>
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorvalue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={"#A9FCE5"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={"#A9FCE5"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#45C68A"
                    strokeWidth={2}
                    fill="url(#colorvalue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : loadingUsers ? (
            <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-600 w-full py-28">
              <img src={fileSearchImg} alt="empty data icon" />
              <p
                className=" text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto"
              >
                {t("common.noData")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardCommon;
