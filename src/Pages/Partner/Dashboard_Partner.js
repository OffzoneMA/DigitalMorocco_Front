import React, { useEffect } from "react";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { GoRocket } from "react-icons/go";
import { TiFlashOutline } from "react-icons/ti";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/common/PageHeader";
import SearchInput from "../../Components/common/SeachInput";
import Loader from "../../Components/Loader";
import { useGetUserDetailsQuery } from "../../Services/Auth";
import format from "date-fns/format";
import userdefaultProfile from "../../Media/User.png";
import { useGetRecentSponsorsByPartnerAndStatusQuery } from "../../Services/Sponsor.Service";
import { FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import DashboardCommon from "../common/Dashboard_Common";
import HelmetWrapper from "../../Components/common/HelmetWrapper";

const Dashboard_Partner = () => {
  const { t } = useTranslation();
  const status = "Approved";
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    refetch: refetchUser,
  } = useGetUserDetailsQuery();
  const {
    data: sponsors,
    isLoading,
    refetch,
  } = useGetRecentSponsorsByPartnerAndStatusQuery({ status, requestType: "" });
  const {
    data: sponsorReqs,
    isLoading: contactReqsLoading,
    refetch: refetchRequest,
  } = useGetRecentSponsorsByPartnerAndStatusQuery({
    status: "",
    requestType: "Received",
  });
  const Requestdata = sponsorReqs;
  const recentProjects = [...(sponsors || [])]
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    .slice(0, 1);

  useEffect(() => {
    refetchUser();
    refetch();
    refetchRequest();
  }, [refetchUser, refetch, refetchRequest]);

  return (
    <>
      <HelmetWrapper
        title={t("helmet.dashboardPartner.title")}
        description={t("helmet.dashboardPartner.description")}
        keywords={t("helmet.dashboardPartner.keywords")}
        canonical={`${process.env.REACT_APP_URL}/Dashboard_Partner`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 pb-8 w-full">
          <div className="flex flex-col lg:flex-row gap-5 items-start lg:justify-between pb-2 w-full">
            <div className="flex h-full items-start justify-start w-auto">
              <PageHeader>
                {t("dashboard.welcome")}{" "}
                {userDetails?.displayName
                  ? `, ${userDetails.displayName}`
                  : userData?.displayName
                  ? `, ${userData.displayName}`
                  : userDetailsLoading
                  ? "loading..."
                  : ""}
              </PageHeader>
            </div>
            <div className="flex flex-row w-full lg:w-auto gap-4 justify-between ">
              <SearchInput className={"w-[240px] "} />
              {/* <button 
                        style={{whiteSpace: 'nowrap'}}
                          className=" bg-blue-A400 hover:bg-[#235DBD] text-white-A700 flex flex-row  items-center justify-center min-w-[184px] h-[44px] px-[12px] py-[7px] cursorpointer rounded-md w-auto" 
                          onClick={() => navigate("/CreateProject")}
                      >
                          <FaRegPlusSquare size={18} className="mr-2" />
                          {t('dashboard.createProject')}
                      </button> */}
            </div>
          </div>
          <div className="flex pb-6">
            <p className="text-sm md:text-base lg:text-lg font-inter text-gray-500 leading-6 tracking-normal w-full">
              {t("dashboard.trackManageForecast")}
            </p>
          </div>
          <div className="flex flex-row flex-wrap bg-blue-A400 justify-between items-center rounded-[12px] px-6 py-5 gap-3 w-full flex-1">
            <div className="flex flex-row flex-wrap gap-3 items-center">
              <div className="flex flex-row items-start gap-3 h-full">
                <div className="flex rounded-md bg-teal-50 p-2 md:p-2.5 lg:p-3">
                  <LiaUnlockAltSolid className="text-[22px] md:text-[26px] lg-text-[28px] text-blue-A400 transform scale-x-[-1]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-base md:text-[18px] lg:text-[22px] font-dm-sans-medium leading-7 text-white-A700 tracking-normal w-full">
                    {t("partnerDashboard.upgradeAccount")}
                  </p>
                  <p className="text-sm font-dm-sans-regular leading-[26px] tracking-normal  text-white-A700 w-full">
                    {t("partnerDashboard.upgradeAccountSub")}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="flex gap-[8px] items-center text-sm text-blue_gray-901 bg-teal-A700 rounded-md min-w-[197px] h-[37px] cursorpointer hover:bg-greenbtnhoverbg  px-[12px] py-[8px] "
              onClick={() => navigate("/UpcomingSponsorEvent")}
            >
              {/* <HiOutlineSparkles size={18} className="text-blue_gray-901 mr-2" /> */}
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.9375 19.75V15.375M3.9375 6.625V2.25M1.75 4.4375H6.125M1.75 17.5625H6.125M11.375 3.125L9.85759 7.07025C9.61083 7.71183 9.48745 8.03262 9.29559 8.30245C9.12554 8.5416 8.9166 8.75054 8.67745 8.92059C8.40762 9.11245 8.08683 9.23583 7.44525 9.48259L3.5 11L7.44526 12.5174C8.08683 12.7642 8.40762 12.8875 8.67745 13.0794C8.9166 13.2495 9.12554 13.4584 9.29559 13.6975C9.48745 13.9674 9.61083 14.2882 9.8576 14.9297L11.375 18.875L12.8924 14.9297C13.1392 14.2882 13.2625 13.9674 13.4544 13.6976C13.6245 13.4584 13.8334 13.2495 14.0726 13.0794C14.3424 12.8875 14.6632 12.7642 15.3047 12.5174L19.25 11L15.3047 9.48259C14.6632 9.23583 14.3424 9.11245 14.0726 8.92059C13.8334 8.75054 13.6245 8.5416 13.4544 8.30245C13.2625 8.03262 13.1392 7.71183 12.8924 7.07025L11.375 3.125Z"
                  stroke="#1F2545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("partnerDashboard.upgradeMembership")}
            </button>
          </div>
          <section className="flex flex-wrap gap-8 2xl:gap-10 pt-8 w-full">
            <div
              className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[186px] grow max-w-[400px] xl:max-w-[500px] lg:min-h-[187px] xl:min-h-[200px] 2xl:max-w-[700px] 2xl:min-h-[220px] 3xl:max-w-[700px] 3xl:min-h-[240px] transition-all duration-300 ease-in-out"
              // onClick={() => navigate('/SponsorRequestHistory')}
            >
              <div className="rounded-[6px] p-2 bg-teal-50">
                <GoRocket
                  size={28}
                  fontWeight={400}
                  className="text-emerald-600"
                />
              </div>
              <h2 className="text-[18px] text-center mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                {t("partnerDashboard.totalRequests")}
              </h2>
              {userDetails?.sponsorRequest?.totalRequestsCount > 0 ? (
                <p className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]">
                  {userDetails?.sponsorRequest?.totalRequestsCount < 10
                    ? `0${userDetails?.sponsorRequest?.totalRequestsCount}`
                    : userDetails?.sponsorRequest?.totalRequestsCount}
                </p>
              ) : (
                <p className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                  {t("partnerDashboard.totalRequestsNote")}
                </p>
              )}
            </div>
            <div
              className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[186px] grow max-w-[400px] xl:max-w-[500px] lg:min-h-[187px] xl:min-h-[200px] 2xl:max-w-[700px] 2xl:min-h-[220px] 3xl:max-w-[700px] 3xl:min-h-[240px] transition-all duration-300 ease-in-out"
              // onClick={() => navigate('/SponsorCurrentRequest')}
            >
              <div className="rounded-[6px] p-2 bg-violet-100">
                <BiBuildings size={28} className="text-blue-601" />
              </div>
              <h2 className="text-[18px] text-center mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                {t("partnerDashboard.currentRequests")}
              </h2>
              {userDetails?.sponsorRequest?.currentRequestsCount > 0 ? (
                <p className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]">
                  {userDetails?.sponsorRequest?.currentRequestsCount < 10
                    ? `0${userDetails?.sponsorRequest?.currentRequestsCount}`
                    : userDetails?.sponsorRequest?.currentRequestsCount}
                </p>
              ) : (
                <p className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                  {t("partnerDashboard.currentRequestsNote")}
                </p>
              )}
            </div>
            <div
              className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[186px] grow max-w-[400px] xl:max-w-[500px] lg:min-h-[187px] xl:min-h-[200px] 2xl:max-w-[700px] 2xl:min-h-[220px] 3xl:max-w-[700px] 3xl:min-h-[240px] transition-all duration-300 ease-in-out"
              // onClick={() => navigate('/PastSponsorEvent')}
            >
              <div className="rounded-[6px] p-2 bg-blue-51">
                <TiFlashOutline size={28} className="text-blue-701" />
              </div>
              <h2 className="text-[18px] text-center mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                {t("sidebar.sponsoring.pastEventSponsor")}
              </h2>
              {userDetails?.sponsorCount?.count > 0 ? (
                <p className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]">
                  {userDetails?.sponsorCount?.count < 10
                    ? `0${userDetails?.sponsorCount?.count}`
                    : userDetails?.sponsorCount?.count}
                </p>
              ) : (
                <p className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                  {t("partnerDashboard.sponsorshipsNote")}
                </p>
              )}
            </div>
            <div
              className="flex flex-col gap-3 items-center rounded-[12px] hover:shadow-dashCard cursorpointer border border-gray-201 py-7 px-[10px] basis-[186px] grow max-w-[400px] xl:max-w-[500px] lg:min-h-[187px] xl:min-h-[200px] 2xl:max-w-[700px] 2xl:min-h-[220px] 3xl:max-w-[700px] 3xl:min-h-[240px] transition-all duration-300 ease-in-out"
              // onClick={() => navigate('/Participate')}
            >
              <div className="rounded-[6px] p-2 bg-orange-51">
                <HiOutlineSpeakerphone size={28} className="text-amber-601" />
              </div>
              <h2 className="text-[18px] text-center mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                {t("dashboard.events")}
              </h2>
              {userDetails?.eventCount > 0 ? (
                <p className="text-[22px] text-center font-dm-sans-medium leading-[26px] tracking-normal text-[#98A2B3]">
                  {userDetails?.eventCount < 10
                    ? `0${userDetails?.eventCount}`
                    : userDetails?.eventCount}
                </p>
              ) : (
                <p className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                  {t("dashboard.eventsNote")}
                </p>
              )}
            </div>
          </section>
          <section className="w-full">
            <DashboardCommon />
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 w-full">
            <div className="flex flex-col hover:shadow-dashCard cursorpointer gap-4 items-center rounded-[12px] border border-gray-201 transition-all duration-300 ease-in-out">
              <div
                className="flex flex-row items-center border-b px-6 py-2.5 border-gray-201 w-full"
                // onClick={() => navigate('/PastSponsorEvent')}
              >
                <div className="flex rounded-md bg-violet-100 p-2">
                  <GoRocket size={28} className="text-blue-601 " />
                </div>
                <div className="flex flex-col p-3 items-center ml-2">
                  <h2 className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full">
                    {t("partnerDashboard.lastSponsorEvent")}
                  </h2>
                </div>
              </div>
              {isLoading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                  <Loader />
                </div>
              ) : recentProjects?.length > 0 ? (
                recentProjects.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-[24px] px-6 hover:bg-blue-50 cursorpointer w-full"
                    // onClick={()=> navigate(`/PastSponsorEventDetails/${item._id}` , {state: { eventSponsor: item }})}
                  >
                    <div className="flex flex-row items-center gap-[24px] py-[20px] justify-start w-full">
                      <h2 className=" text-lg font-dm-sans-medium leading-8 text-[#101828] tracking-normal capitalize text-left">
                        {item?.eventId?.title}
                      </h2>
                      {item?.eventId?.status?.toLowerCase() === "approved" && (
                        <div className="h-7 px-2.5 py-0.5 whitespace-nowrap bg-[#ebfdf2] rounded-2xl justify-center items-center inline-flex">
                          <div className="text-center text-[#027947] text-[13px] font-dm-sans-regular leading-normal">
                            Approved
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-2 py-2 w-full">
                      <div className="flex flex-col flex-1 items-start justify-start">
                        <div className="flex flex-col items-center justify-start w-auto">
                          <h2 className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto">
                            {t("partnerDashboard.sponsorEventDetails.date")}
                          </h2>
                        </div>
                        <div className="flex flex-col items-start justify-center py-4 w-full">
                          <p className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto">
                            {item?.eventId?.startDate
                              ? `${format(
                                  new Date(item.eventId?.startDate),
                                  "MMM d, yyyy"
                                )}`
                              : "Coming Soon"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col grow basis-flex-1 max-w-[50%] items-start justify-start w-auto">
                        <div className="flex flex-col items-center justify-start w-auto">
                          <h2 className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto">
                            {t("partnerDashboard.sponsorEventDetails.location")}
                          </h2>
                        </div>
                        <div className="flex flex-col items-start justify-center py-4 w-full">
                          <p className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto">
                            {item?.eventId?.physicalLocation ||
                              "Online [Virtual]"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 items-start justify-start">
                        <div className="flex flex-col items-center justify-start w-auto">
                          <h2 className="text-[#98A2B3] font-dm-sans-bold text-xs tracking-[1.68px] uppercase w-auto">
                            {t("partnerDashboard.sponsorEventDetails.price")}
                          </h2>
                        </div>
                        <div className="flex flex-col items-start justify-start py-4 w-full">
                          <p className="text-[22px] font-dm-sans-medium text-[#344054] sm:text-lg w-auto">
                            {item?.eventId?.currency || "USD"}{" "}
                            {item?.eventId?.price?.toLocaleString("en-US") || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-[16px] items-center text-gray-600 w-full py-28">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="36"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M12.5 12L6.64018 19.0318C6.11697 19.6596 5.85536 19.9736 5.85137 20.2387C5.84789 20.4692 5.9506 20.6885 6.12988 20.8333C6.33612 21 6.74476 21 7.56205 21H18.5L17 33L24.5 24M23.9751 15H29.438C30.2552 15 30.6639 15 30.8701 15.1667C31.0494 15.3115 31.1521 15.5308 31.1486 15.7613C31.1446 16.0264 30.883 16.3404 30.3598 16.9682L28.3254 19.4096M16.3591 7.36897L19.9999 3L19.1004 10.1966M32 31.5L5 4.5"
                      stroke="#667085"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto">
                    {t("dashboard.notAvailable")}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 hover:shadow-dashCard cursorpointer items-center rounded-[12px] border border-gray-201 transition-all duration-300 ease-in-out">
              <div
                className="flex flex-row items-center border-b px-6 py-2.5 border-gray-201 w-full"
                // onClick={() => navigate('/SponsorRequestHistory')}
              >
                <div className="flex rounded-md bg-violet-100 p-2">
                  <GoRocket size={28} className="text-blue-601 " />
                </div>
                <div className="flex flex-col p-3 items-center ml-2">
                  <h2 className=" text-lg font-dm-sans-medium leading-6 text-gray-900_01 tracking-normal w-full">
                    {t("partnerDashboard.latestRequest")}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full overflow-x-auto">
                <table className="w-full mb-3">
                  <thead>
                    <tr className="bg-white-A700 text-sm leading-6">
                      <th
                        scope="col"
                        className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("partnerDashboard.requestTable.eventName")}
                      </th>
                      <th
                        scope="col"
                        className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("partnerDashboard.requestTable.requests")}
                      </th>
                      <th
                        scope="col"
                        className="px-[16px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("partnerDashboard.requestTable.status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="items-center w-full">
                    {!contactReqsLoading && Requestdata?.length > 0
                      ? Requestdata.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : ""
                            } hover:bg-blue-50 cursorpointer w-full`}
                            // onClick={()=> navigate(`/SponsorRequestHistoryDetails/${item?._id}`)}
                          >
                            <td className="py-4 px-3 w-auto text-gray-600 text-sm font-dm-sans-regular leading-6">
                              <div className="flex items-center gap-2">
                                {item?.eventId?.headerImage ? (
                                  <img
                                    src={item.eventId?.headerImage}
                                    className="rounded-full h-8 w-8 min-w-8 min-h-8"
                                    alt="Profile"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                    <img
                                      src={userdefaultProfile}
                                      alt=""
                                      className=""
                                    />
                                  </div>
                                )}
                                <span
                                  className="capitalize"
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item?.eventId?.title || "Unknown Project"}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-3 text-gray-600 text-sm font-dm-sans-regular leading-6">
                              {item?.requestType?.toLowerCase() === "sent" ? (
                                <div className="px-2.5 h-[34px] py-2 rounded-[50px] border border-[#ff9123] min-w-[97px] justify-center items-center gap-1 flex">
                                  <FiSend
                                    size={12}
                                    className="text-[#ff9123]"
                                  />
                                  <div className="text-[#ff9123] text-sm font-normal font-manrope leading-[18.20px] tracking-tight">
                                    {t(item?.requestType)}
                                  </div>
                                </div>
                              ) : (
                                <div className="px-2.5 h-[34px] py-2 rounded-[50px] border border-[#ae65e6] min-w-[97px] justify-center items-center gap-1 flex">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z"
                                      fill="#AF66E7"
                                    />
                                  </svg>
                                  <div className="text-[#af66e7] text-sm font-normal font-manrope leading-[18.20px] tracking-tight">
                                    {t(item?.requestType)}
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-3 text-gray-600 text-sm font-dm-sans-regular leading-6">
                              {item?.status?.toLowerCase() === "approved" && (
                                <div className="h-7 px-2.5 py-0.5 whitespace-nowrap bg-[#ebfdf2] rounded-2xl justify-center items-center inline-flex">
                                  <div className="text-center text-[#027947] text-[13px] font-dm-sans-regular leading-normal">
                                    {t(item?.status)}
                                  </div>
                                </div>
                              )}
                              {item?.status?.toLowerCase() === "rejected" && (
                                <div className="h-7 px-2.5 py-0.5 whitespace-nowrap bg-[#fee7e6] rounded-2xl justify-center items-center inline-flex">
                                  <div className="text-center text-[#f04437] text-[13px] font-dm-sans-regular leading-normal">
                                    {t(item?.status)}
                                  </div>
                                </div>
                              )}
                              {item?.status?.toLowerCase() === "pending" && (
                                <div className="h-7 px-2.5 py-0.5 whitespace-nowrap bg-[#dbedff] text-[#156fee] rounded-2xl justify-center items-center inline-flex">
                                  <div className="text-center text-[#156fee] text-[13px] font-dm-sans-regular leading-normal">
                                    {t("In Progress")}
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
              {contactReqsLoading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                  <Loader />
                </div>
              ) : (
                !contactReqsLoading &&
                !Requestdata?.length > 0 && (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] w-full py-28">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="36"
                      viewBox="0 0 37 36"
                      fill="none"
                    >
                      <path
                        d="M12.5 12L6.64018 19.0318C6.11697 19.6596 5.85536 19.9736 5.85137 20.2387C5.84789 20.4692 5.9506 20.6885 6.12988 20.8333C6.33612 21 6.74476 21 7.56205 21H18.5L17 33L24.5 24M23.9751 15H29.438C30.2552 15 30.6639 15 30.8701 15.1667C31.0494 15.3115 31.1521 15.5308 31.1486 15.7613C31.1446 16.0264 30.883 16.3404 30.3598 16.9682L28.3254 19.4096M16.3591 7.36897L19.9999 3L19.1004 10.1966M32 31.5L5 4.5"
                        stroke="#667085"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className=" text-sm font-dm-sans-medium leading-6 text-gray-900_01 w-auto">
                      {t("dashboard.notAvailable")}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
export default Dashboard_Partner;
