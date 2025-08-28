import React, { useState, useEffect } from "react";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams, useNavigate } from "react-router-dom";
import TablePagination from "../../../Components/common/TablePagination";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import TableTitle from "../../../Components/common/TableTitle";
import Loader from "../../../Components/Loader";
import { FaRProject } from "react-icons/fa6";
import { PiCheckBold } from "react-icons/pi";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";
import ApproveContactRequestModal from "../../../Components/Modals/ContactRequest/ApproveContactRequestModal";
import RejectContactRequestModal from "../../../Components/Modals/ContactRequest/RejectContactRequestModal";
import {
  useGetAllConatctReqQuery,
  useGetDistinctProjectFieldsQuery,
} from "../../../Services/Investor.Service";
import {
  useApproveRequestMutation,
  useRejectRequestMutation,
} from "../../../Services/ContactRequest.Service";
import { useTranslation } from "react-i18next";
import { useCheckSubscriptionStatusQuery } from "../../../Services/Subscription.Service";
import { investmentsData } from "../../../data/tablesData";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const Investment = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  // const currentLanguage = localStorage.getItem("language") || "en";
  const [filter, setFilter] = useState(false);
  const [filterApply, setFilterApply] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  // const [keywords, setKeywords] = useState("");
  const [targetFund, setTargetFund] = useState("");
  const [location, setLocation] = useState("");
  const [industries, setIndustries] = useState([]);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  const queryParams = {
    page: cur,
    pageSize: itemsPerPage,
    status: ["In Progress"],
  };

  if (filterApply) {
    queryParams.projectSectors = industries;
    queryParams.funding = targetFund;
    queryParams.country = location;
  }
  const {
    data: currentData,
    refetch,
    isFetching: isLoading,
  } = useGetAllConatctReqQuery(queryParams);
  const { data: sectorData, isLoading: sectorLoading } =
    useGetDistinctProjectFieldsQuery({ field: "sector" });
  const { data: fundingData, isLoading: fundingLoading } =
    useGetDistinctProjectFieldsQuery({ field: "funding" });
  const { data: locationData, isLoading: locationLoading } =
    useGetDistinctProjectFieldsQuery({ field: "country" });
  const {
    data: subscriptionData,
    isFetching: subscriptionLoading,
  } = useCheckSubscriptionStatusQuery();

  const [approveRequest] = useApproveRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  useEffect(() => {
    if (subscriptionData !== undefined) {
      setIsSubscribe(subscriptionData !== null);
    }
  }, [subscriptionData]);

  // function handlePageChange(page) {
  //   if (page >= 1 && page <= totalPages) {
  //     setCur(page);
  //   }
  // }

  const clearFilter = () => {
    setFilter(false);
    setFilterApply(false);
    setIndustries([]);
    setLocation("");
    setTargetFund("");
  };

  const sectorValues = sectorData?.distinctValues || [];
  const fundingValues = fundingData?.distinctValues || [];
  const locationValues = locationData?.distinctValues || [];

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (filterApply && currentData?.currentPage !== cur) {
      refetch();
    }
  }, [cur, filterApply, refetch, currentData?.currentPage]);

  useEffect(() => {
    setTotalPages(currentData?.totalPages);
    setCur(currentData?.currentPage);
    setSearchParams({ page: `${currentData?.currentPage}` });
  }, [currentData , setSearchParams]);

  const pageData =
    isSubscribe && !isLoading && !subscriptionLoading
      ? currentData?.ContactsHistory
      : investmentsData;

  // const filteredData = pageData?.filter(item => {
  //   const keywordMatch = item?.project?.name.toLowerCase().includes(keywords.toLowerCase());
  //   return keywordMatch;
  // });

  const filteredData = pageData;

  const openApproveModal = (data) => {
    setIsApproveModalOpen(true);
    setRowData(data);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    // setRowData(null);
  };

  const openRejectModal = (data) => {
    setIsRejectModalOpen(true);
    setRowData(data);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    // setRowData(null);
  };

  const handleApprove = async (data) => {
    try {
      await approveRequest({
        id: rowData?._id,
        approvalData: data,
      }).unwrap();
      refetch();
      console.log("Request approved successfully!");
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleReject = async (data) => {
    try {
      await rejectRequest({
        id: rowData?._id,
        rejectionData: data,
      }).unwrap();
      refetch();
      console.log("Request rejected successfully!");
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  return (
    <>
      <HelmetWrapper
        title={t("helmet.investment.currentRequests.title")}
        description={t("helmet.investment.currentRequests.description")}
        keywords={t("helmet.investment.currentRequests.keywords")}
        canonical={`${process.env.REACT_APP_URL}/Investment`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader>{t("sidebar.investment.main")}</PageHeader>
            </div>
            <SearchInput className={"w-[240px]"} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
              <div className="flex flex-row flex-wrap gap-3 items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle style={{ whiteSpace: "nowrap" }}>
                  {t("investment.currentRequests")}
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && (
                    <>
                      {/* <div className="flex min-w-[70px]">
                        <input
                          className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                          type="text"
                          name="search"
                          placeholder={t("common.keywords")}
                          value={keywords}
                          onChange={e => setKeywords(e.target.value)}
                        />
                      </div> */}
                      <SimpleSelect
                        className="min-w-[170px]"
                        id="targetFund"
                        options={fundingValues}
                        searchLabel={t("common.searchTargetFund")}
                        setSelectedOptionVal={setTargetFund}
                        placeholder={t("common.targetFund")}
                        loading={fundingLoading}
                        content={(option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                                {t(`${option}`)}
                              </span>
                            </div>
                          );
                        }}
                      />
                      <SimpleSelect
                        className="min-w-[100px] max-w-[200px] "
                        id="country"
                        options={locationValues}
                        searchLabel={t("common.searchLocation")}
                        setSelectedOptionVal={setLocation}
                        placeholder={t("common.location")}
                        loading={locationLoading}
                        content={(option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                                {t(`${option}`)}
                              </span>
                            </div>
                          );
                        }}
                      />
                      <MultipleSelect
                        className="min-w-[170px] max-w-[200px]"
                        id="investor"
                        options={sectorValues}
                        searchLabel={t("common.searchIndustry")}
                        setSelectedOptionVal={setIndustries}
                        placeholder={t("common.selectIndustries")}
                        loading={sectorLoading}
                        content={(option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                                {t(`${option}`)}
                              </span>
                            </div>
                          );
                        }}
                      />
                    </>
                  )}
                  {filter ? (
                    <button
                      className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                      onClick={() => setFilterApply(true)}
                      type="button"
                    >
                      <BiFilterAlt size={21} className="mr-2" />
                      <span
                        className="font-dm-sans-medium text-sm leading-[18.23px] text-white-A700"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {t("common.applyFilters")}
                      </span>
                    </button>
                  ) : (
                    <button
                      className={`col-end-3 ${
                        filteredData?.length === 0 || !isSubscribe
                          ? "bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed"
                          : "hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700"
                      } col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                      onClick={() => setFilter(true)}
                      type="button"
                      disabled={filteredData?.length === 0 || !isSubscribe}
                    >
                      <BiFilterAlt size={18} className="mr-2" />
                      <span
                        className="font-dm-sans-medium text-sm leading-[18.23px]"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {t("common.filters")}
                      </span>
                    </button>
                  )}
                  {filterApply && (
                    <button
                      className="text-[#15143966] hover:text-[#1514397e] flex flex-row gap-[4px] items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer"
                      onClick={clearFilter}
                      type="button"
                    >
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 4.75L8.25 9.25M8.25 4.75L12.75 9.25M2.04 7.72L5.28 12.04C5.544 12.392 5.676 12.568 5.84329 12.6949C5.99145 12.8074 6.15924 12.8913 6.33808 12.9423C6.54 13 6.76 13 7.2 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H7.2C6.76 1 6.54 1 6.33808 1.05767C6.15924 1.10874 5.99145 1.19264 5.84329 1.30506C5.676 1.432 5.544 1.608 5.28 1.96L2.04 6.28C1.84635 6.53819 1.74953 6.66729 1.71221 6.80907C1.67926 6.93423 1.67926 7.06577 1.71221 7.19093C1.74953 7.33271 1.84635 7.46181 2.04 7.72Z"
                          stroke="#151439"
                          strokeOpacity="0.4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-base font-dm-sans-regular leading-[26px]">
                        {t("common.clear")}
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="relative flex flex-col w-full">
                <div
                  className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${
                    filteredData?.length > 0 &&
                    !isLoading &&
                    !subscriptionLoading
                      ? "border-b border-gray-201"
                      : "rounded-b-[8px]"
                  } w-full pb-4 min-h-[330px] overflow-x-auto`}
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <table className=" w-full">
                    <thead>
                      <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.projectName")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.targetFund")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.raised")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.location")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.industrySector")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("investment.decision")}
                        </th>
                      </tr>
                    </thead>
                    {!isLoading &&
                    !subscriptionLoading &&
                    filteredData?.length > 0 ? (
                      <tbody className="items-center w-full ">
                        {filteredData.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : ""
                            } hover:bg-blue-50 w-full cursorpointer transition-all duration-300 ease-in-out`}
                            onClick={() =>
                              navigate(
                                `/InvestmentRequestDetails/${item?._id}`,
                                { state: { contactRequest: item } }
                              )
                            }
                          >
                            <td className="w-auto text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                              <div className="relative flex">
                                <div className="px-[18px] py-4 flex items-center gap-3">
                                  {item?.logo ? (
                                    <img
                                      src={item.logo}
                                      className="rounded-full h-8 w-8"
                                      alt="Profile"
                                    />
                                  ) : (
                                    <FaRProject className="h-8 w-8 text-light_blue-200" />
                                  )}
                                  <span
                                    className="capitalize"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item?.project?.name || "-"}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${
                              item?.project?.currency || "USD"
                            } ${
                              item?.project?.funding
                                ?.toLocaleString("fr-FR")
                                .replace(/\s/g, "\u00A0") || 0
                            }`}</td>
                            <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${
                              item?.project?.currency || "USD"
                            } ${
                              item?.project?.totalRaised
                                ?.toLocaleString("fr-FR")
                                .replace(/\s/g, "\u00A0") || 0
                            }`}</td>
                            <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                              {item?.project?.country || "Sydney, Australia"}
                            </td>
                            <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                              {t(item?.project?.sector || "-")}
                            </td>
                            <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                              {item?.status?.toLowerCase() === "in progress" ? (
                                <div className="flex flex-row space-x-4 items-center">
                                  <div className="relative group">
                                    <div
                                      className={`w-[38px] h-8 px-1 py-1 ${
                                        item?.status?.toLowerCase() ===
                                        "approved"
                                          ? "bg-[#00CDAE]"
                                          : "bg-[#aeb6c5]"
                                      } hover:bg-[#00CDAE] rounded-md justify-center items-center gap-2 flex`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openApproveModal(item);
                                      }}
                                    >
                                      <PiCheckBold
                                        size={21}
                                        className="text-white-A700"
                                      />
                                    </div>
                                    <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                      <div className="mb-px mr-[12px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13"
                                          height="7"
                                          viewBox="0 0 13 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                            fill="#2C3563"
                                          />
                                        </svg>
                                      </div>
                                      <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                        <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                          {t("common.approve")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="relative group">
                                    <div
                                      className={`w-[38px] h-8 px-1 py-1 ${
                                        item?.status?.toLowerCase() ===
                                        "rejected"
                                          ? "bg-[#EF4352]"
                                          : "bg-[#aeb6c5]"
                                      } hover:bg-[#EF4352] rounded-md justify-center items-center gap-2 flex`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openRejectModal(item);
                                      }}
                                    >
                                      <RiCloseLine
                                        size={21}
                                        className="text-white-A700"
                                      />
                                    </div>
                                    <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                      <div className="mb-px mr-[12px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13"
                                          height="7"
                                          viewBox="0 0 13 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                            fill="#2C3563"
                                          />
                                        </svg>
                                      </div>
                                      <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                        <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                          {t("common.reject")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className="">Oups !!!</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : null}
                  </table>
                  {isLoading || subscriptionLoading ? (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                      <Loader />
                    </div>
                  ) : (
                    filteredData?.length === 0 && (
                      <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                        <div>
                          <svg
                            width="30"
                            height="32"
                            viewBox="0 0 30 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5"
                              stroke="#667085"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                          <span>{t("common.noMatchingData")}</span>
                        </div>
                      </div>
                    )
                  )}
                  {!isSubscribe && !isLoading && !subscriptionLoading ? (
                    <div className="overlay-content-inv w-full flex flex-col top-12 px-8 ">
                      <BsEyeSlash size={35} className="text-gray500 " />
                      <p
                        className="font-dm-sans-medium text-[22px] leading-8 text-gray-900_01 w-auto pt-4"
                      >
                        {t("investment.viewAllInvestments")}
                      </p>
                      <p
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray-900_01 w-auto pt-3 pb-4"
                      >
                        {t("investment.upgradeMessage")}{" "}
                        <a
                          className="text-blue-500"
                          href="/src/Pages/common/Subscription/ChoosePlan"
                        >
                          {t("investment.digitalMoroccoPro")}
                        </a>{" "}
                        {t("investment.upgradeMessage2")}
                      </p>
                      <p
                        className="text-gray-900_01 text-sm font-dm-sans-medium leading-relaxed pb-8"
                        size=""
                      >
                        {t("investment.notice")}
                      </p>
                      <button
                        className="flex items-center justify-center gap-[12px] bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center px-[12px] py-[8px] h-[37px] rounded-md cursorpointer"
                        onClick={() => navigate("/ChoosePlan")}
                        type="button"
                      >
                        <TiFlashOutline size={25} className="" />
                        <span className="text-sm font-dm-sans-medium leading-[18.23px] text-white-A700">
                          {t("dashboard.upgradeMembership")}
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
                {filteredData?.length > 0 &&
                  !isLoading &&
                  !subscriptionLoading && (
                    <div className="w-full flex items-center p-4">
                      <TablePagination
                        currentPage={cur}
                        totalPages={totalPages}
                        // onPageChange={handlePageChange}
                        itemsToShow={itemsToShow}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <ApproveContactRequestModal
          isOpen={isApproveModalOpen}
          onRequestClose={closeApproveModal}
          rowData={rowData}
          methode={handleApprove}
        />
        <RejectContactRequestModal
          isOpen={isRejectModalOpen}
          onRequestClose={closeRejectModal}
          rowData={rowData}
          methode={handleReject}
        />
      </section>
    </>
  );
};

export default Investment;
