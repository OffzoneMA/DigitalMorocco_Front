import React, { useState, useRef, useEffect } from "react";
import { Text } from "../../../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineQrcode } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import TablePagination from "../../../Components/common/TablePagination";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import ViewTicketModal from "../../../Components/ViewTicketModal";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import Loader from "../../../Components/Loader";
import {
  useGetEventsForUserQuery,
  useGetDistinctValuesByUserQuery,
} from "../../../Services/Event.Service";
import ticketEmptyImg from "../../../Media/ticket_empty.svg";
import format from "date-fns/format";
import DownloadTicket1 from "../../../Components/DownloadTicket1";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import userDefaultProfil from "../../../Media/User1.png";
import { useTranslation } from "react-i18next";
import { fr, enUS } from "date-fns/locale";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const Events = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const field = "physicalLocation";
  const { data: distinctValues, isLoading: distinctsValueLoading } =
    useGetDistinctValuesByUserQuery({ field });
  const { data: distinctValuesNames, isLoading: distinctsValueNamesLoading } =
    useGetDistinctValuesByUserQuery({ field: "title" });
  const [filter, setFilter] = useState(false);
  const [filterApply, setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [localKeywords, setLocalKeywords] = useState("");
  const [eventName, seteventName] = useState([]);
  const [localLocation, setLocalLocation] = useState("");
  const [localEventName, setLocalEventName] = useState([]);
  const [location, setLocation] = useState("");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [profilVerified, setProfilVerified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const [rowData, setRowData] = useState(null);
  const [downloadFile, setDownloadFile] = useState(false);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: eventsParticipate,
    error,
    isLoading,
    refetch,
  } = useGetEventsForUserQuery({
    page: cur,
    pageSize: itemsPerPage,
    ...(filterApply && {
      physicalLocation: location || undefined,
      eventNames: eventName.length > 0 ? eventName : undefined,
    }),
  });
  const [activeDropdown, setActiveDropdown] = useState(-1);
  const dropdownRef = useRef(null);
  const [openDropdownIndexes, setOpenDropdownIndexes] = useState([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketDataRow, setTicketDataRow] = useState(null);

  const currentLanguage = localStorage.getItem("language") || "en";
  const locale = currentLanguage === "fr" ? fr : enUS;

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    // if(filterApply && eventsParticipate?.currentPage !== cur) {
    refetch();
    // }
  }, [cur, eventsParticipate?.currentPage, filterApply, refetch]);

  useEffect(() => {
    setTotalPages(eventsParticipate?.totalPages);
    setCur(eventsParticipate?.currentPage);
    setSearchParams({ page: `${eventsParticipate?.currentPage}` });
  }, [eventsParticipate]);

  const handleResetFilters = () => {
    // Réinitialiser les filtres locaux
    setLocalLocation("");
    setLocalEventName([]);
    setLocalKeywords("");

    // Réinitialiser les filtres globaux
    setLocation("");
    seteventName([]);
    setKeywords("");
    setFilterApply(false);

    // Optionnel : forcer un refetch des données
    refetch();
  };

  useEffect(() => {
    if (filterApply) {
      const isAllFiltersEmpty =
        !localLocation?.trim() && localEventName?.length === 0;

      if (isAllFiltersEmpty) {
        handleResetFilters();
      }
    }
  }, [localLocation, localEventName, filterApply]);

  const toggleDropdownClick = (index, event) => {
    event.stopPropagation();
    if (openDropdownIndexes.includes(index)) {
      setOpenDropdownIndexes(openDropdownIndexes.filter((i) => i !== index));
    } else {
      setOpenDropdownIndexes([...openDropdownIndexes, index]);
    }
  };

  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    setOpenDropdownIndexes([...openDropdownIndexes, index]);
  };

  const toggleDropdownClose = (index, event) => {
    event.stopPropagation();
    if (openDropdownIndexes.includes(index)) {
      setOpenDropdownIndexes(openDropdownIndexes.filter((i) => i !== index));
    }
  };

  const isDropdownOpen = (index) => {
    return openDropdownIndexes.includes(index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setDownloadFile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openTicketModal = (rowData) => {
    setIsTicketModalOpen(true);
    setTicketDataRow(rowData);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setDownloadFile(false);
  };

  const events = eventsParticipate?.events;

  const filteredData = events?.filter((item) => {
    const keywordMatch = item.title
      .toLowerCase()
      .includes(keywords.toLowerCase());
    return keywordMatch;
  });

  // Fonction pour appliquer les filtres
  const handleApplyFilters = () => {
    seteventName(localEventName);
    setLocation(localLocation);
    setKeywords(localKeywords);
    setFilterApply(true);
  };

  const clearFilter = () => {
    setFilter(false);
    setFilterApply(false);
    seteventName([]);
    setLocation("");
  };

  const pageData = filteredData;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const eventNameData = [
    "Data & Tech",
    "Women Who Network",
    "Workshop",
    "Big Investment",
    "North Africa Dreamin",
  ];

  const convertTo24HourFormat = (time12h) => {
    // Convert "11:00 AM" or "1:00 PM" to "11:00" or "13:00"
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const formatEventDate = (startDate, startTime, currentLanguage) => {
    const locale = currentLanguage === "fr" ? fr : enUS;

    if (!startDate) {
      return t("event.comingSoonEvent");
    }

    const dateObj = new Date(startDate);

    if (currentLanguage === "fr") {
      // Format the date in French
      let dateFormatted = format(dateObj, "d MMM yyyy", { locale });

      // Remove the period after the month (e.g., "Déc." => "Déc")
      dateFormatted = dateFormatted.replace(/\./g, "");

      // Capitalize the first letter of the month in French
      const dateParts = dateFormatted.split(" ");
      dateParts[1] =
        dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1);
      const finalDateFormatted = dateParts.join(" ");

      // Convert startTime to 24-hour format
      let timeFormatted = "";
      if (startTime) {
        const time24h = convertTo24HourFormat(startTime); // Convert from "11:00 AM" to "11:00"
        const [hours, minutes] = time24h.split(":");
        timeFormatted = `${hours}H${minutes}`;
      }

      return `${finalDateFormatted}${
        timeFormatted ? ` à ${timeFormatted}` : ""
      }`.trim();
    } else {
      // Format the date in English
      const dateFormatted = format(dateObj, "MMM d, yyyy", { locale });

      // Convert startTime to a proper 12-hour format with padded hours
      let timeFormatted = "";
      if (startTime) {
        const [timePart, modifier] = startTime.split(" ");
        let [hours, minutes] = timePart.split(":");
        hours = hours.padStart(2, "0"); // Pad the hours to always have 2 digits
        timeFormatted = `at ${hours}:${minutes.padStart(2, "0")} ${modifier}`;
      }

      // Replace "Sep" with "Sept" if necessary
      const dateParts = dateFormatted.split(" ");
      if (dateParts[0] === "Sep") {
        dateParts[0] = "Sept";
      }
      const finalDateFormatted = dateParts.join(" ");

      return `${finalDateFormatted}${
        timeFormatted ? `, ${timeFormatted}` : ""
      }`.trim();
    }
  };
  const renderDropdown = (index, item) => {
    const triggerElement = document.getElementById(`dropdown-trigger-${index}`);
    const triggerRect = triggerElement.getBoundingClientRect();

    return ReactDOM.createPortal(
      <div
        className="absolute top-[calc(100%)] right-0 z-50"
        style={{ top: `${triggerRect.bottom}px`, right: `${30}px` }}
      >
        <div className="mt-4 px-3 py-6 shadow-sm md:shadow-lg bg-white-A700 min-w-40  fex flex-col rounded-md">
          <div
            className="flex flex-row gap-3 items-center cursorpointer-green hover:text-[#35D8BF]"
            onClick={(e) => {
              e.stopPropagation();
              openTicketModal(item);
            }}
          >
            <HiOutlineQrcode
              size={18}
              className="text-blue-A400 transform scale-x-[-1]"
            />
            <Text className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF] ">
              {t("event.eventParticipate.viewTicket")}
            </Text>
          </div>
          <PDFDownloadLink
            document={
              <DownloadTicket1
                title={item?.title}
                date={
                  item?.startDate
                    ? `${format(new Date(item.startDate), "E, MMM d, yyyy")}${
                        item.startTime ? `  ${item?.startTime || ""}` : ""
                      }`
                    : "Coming Soon"
                }
                TicketCode="OpenMic"
                name="Ichane Roukéya"
                ticketNumber={2}
              />
            }
            fileName="ticket.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green hover:text-[#35D8BF]">
                  <FiDownload size={18} className="text-blue-A400 " />
                  <Text className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]">
                    {t("event.eventParticipate.download")}
                  </Text>
                </div>
              ) : (
                <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green hover:text-[#35D8BF]">
                  <FiDownload size={18} className="text-blue-A400 " />
                  <Text className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]">
                    {t("event.eventParticipate.download")}
                  </Text>
                </div>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>,
      document.getElementById("root")
    );
  };

  return (
    <>
      <HelmetWrapper
        title={t("helmet.events.participate.title")}
        description={t("helmet.events.participate.description")}
        keywords={t("helmet.events.participate.keywords")}
        canonical={`${import.meta.env.VITE_URL}/Participate`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader>{t("event.eventParticipate.title")}</PageHeader>
            </div>
            <SearchInput className={"w-[240px]"} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            {pageData?.length > 0 ? (
              <div className="relative w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                <div className="flex flex-row gap-4 items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 py-[19.5px] px-5">
                  <TableTitle style={{ whiteSpace: "nowrap" }}>
                    {t("event.eventParticipate.event")}
                  </TableTitle>
                  <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto">
                    {filter && (
                      <>
                        {/* <div className="flex min-w-[160px] w-[25%] ">
                          <input
                            className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                            type="text"
                            name="search"
                            placeholder={t("common.keywords")}
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                          />
                        </div> */}
                        <MultipleSelect
                          className="min-w-[180px] max-w-[350px] "
                          id="investor"
                          options={distinctValuesNames}
                          searchLabel={t("common.searchEvent")}
                          setSelectedOptionVal={setLocalEventName}
                          placeholder={t("common.eventName")}
                          content={(option) => {
                            return (
                              <div className="flex  py-2 items-center  w-full">
                                <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                                  {option}
                                </Text>
                              </div>
                            );
                          }}
                        />
                        <SimpleSelect
                          className="min-w-[120px] max-w-[300px] "
                          id="country"
                          options={distinctValues}
                          searchLabel={t("common.searchLocation")}
                          setSelectedOptionVal={setLocalLocation}
                          placeholder={t("common.location")}
                          content={(option) => {
                            return (
                              <div className="flex  py-2 items-center  w-full">
                                <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                                  {option}
                                </Text>
                              </div>
                            );
                          }}
                        />
                      </>
                    )}
                    {filter ? (
                      <button
                        className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer p-[6px] h-[37px] rounded-md"
                        onClick={() => handleApplyFilters()}
                        type="button"
                      >
                        <BiFilterAlt size={18} className="mr-2" />
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
                          !pageData?.length > 0
                            ? "bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed"
                            : "hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700"
                        } col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                        onClick={() => {
                          setFilter(true);
                          handleResetFilters();
                        }}
                        type="button"
                        disabled={!pageData?.length > 0}
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
                <div
                  className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${
                    pageData?.length > 0
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
                      <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("event.eventParticipate.eventName")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("event.eventParticipate.organizedBy")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("event.eventParticipate.date")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        ></th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        >
                          {t("event.eventParticipate.location")}
                        </th>
                        <th
                          scope="col"
                          className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                        ></th>
                      </tr>
                    </thead>

                    <tbody className="items-center w-full ">
                      {pageData.map((item, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          } hover:bg-blue-50 w-full cursorpointer`}
                          onClick={() => navigate(`/EventDetails/${item?._id}`)}
                        >
                          <td className="w-auto px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-tight">
                            <div className=" flex items-center gap-4">
                              <img
                                src={item.headerImage}
                                className="rounded-md h-[60px] w-[70px] bg-gray-300"
                              />
                              <span
                                className="line-clamp-3"
                                style={{
                                  maxWidth: "260px",
                                  overflow: "hidden",
                                }}
                              >
                                {item.title}
                              </span>
                            </div>
                          </td>
                          <td
                            className="px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-relaxed"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <div className="flex items-center gap-3">
                              {item?.organizerLogo ? (
                                <img
                                  src={item.organizerLogo}
                                  className="rounded-full h-8 w-8"
                                />
                              ) : (
                                <img
                                  src={userDefaultProfil}
                                  className="rounded-full h-8 w-8"
                                />
                              )}
                              <span
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item?.organizername || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-none">
                            {/* {item.startDate ? `${format(new Date(item.startDate), 'MMM d, yyyy', { locale })} ${item?.startTime?.toLowerCase()}` : 'Coming Soon'}   */}
                            {formatEventDate(
                              item.startDate,
                              item?.startTime,
                              currentLanguage
                            )}
                          </td>
                          <td
                            className="px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-relaxed"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                textDecoration: "capitalize",
                              }}
                              className={`flex flex-row space-x-2 items-center px-2 capitalize font-dm-sans-regular text-sm leading-6 text-white-A700 rounded-full ${
                                item.status?.toLowerCase() === "past"
                                  ? "bg-[#F4A118]"
                                  : item.status?.toLowerCase() === "upcoming"
                                  ? "bg-[#6172F3]"
                                  : item.status?.toLowerCase() === "ongoing"
                                  ? "bg-[#12B76A] "
                                  : ""
                              } inline-flex`}
                            >
                              {t(`${item?.status} event`)}
                            </div>
                          </td>
                          <td
                            className="px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-relaxed"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item?.physicalLocation || "Virtual"}
                          </td>
                          <td className="px-[18px] py-[14px] text-gray-801 font-dm-sans-regular text-sm leading-relaxed">
                            <div
                              ref={dropdownRef}
                              className="relative"
                              onMouseEnter={(e) => toggleDropdown(index, e)}
                              onMouseLeave={(e) =>
                                toggleDropdownClose(index, e)
                              }
                            >
                              <div className="dropdown relative">
                                <BsThreeDots
                                  className="mr-4 relative"
                                  id={`dropdown-trigger-${index}`}
                                  size={18}
                                  onClick={(e) => toggleDropdownClick(index, e)}
                                />
                                {/* {isDropdownOpen(index) && (
                                  
                                  ReactDOM.createPortal(
                                  <div className="absolute top-[100%] right-0 z-50">
                                    <div className="mt-4 px-3 px-4 py-6 shadow-sm md:shadow-lg bg-white-A700 w-40  fex flex-col rounded-md">
                                      <div className="flex flex-row gap-3 items-center cursorpointer-green" onClick={() => openTicketModal(item)}>
                                        <HiOutlineQrcode size={18} className="text-blue-A400 transform scale-x-[-1]"/>
                                        <Text
                                          className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                        >
                                          View Ticket
                                        </Text>
                                      </div>
                                      <PDFDownloadLink document={<DownloadTicket1 title={item?.title} date={item?.startDate ? `${format(new Date(item.startDate), 'E, MMM d, yyyy')}${item.startTime ? `  ${item?.startTime || ''}` : ''}` : 'Coming Soon'} TicketCode='OpenMic' name='Ichane Roukéya' ticketNumber={2}/>} fileName="ticket.pdf">
                                          {({ blob, url, loading, error }) => ( 
                                          loading ? 
                                          <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green">
                                            <FiDownload size={18} className="text-blue-A400 "/>
                                              <Text
                                                className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                              >
                                                Download
                                              </Text>
                                          </div>
                                          :
                                          <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green" >
                                            <FiDownload size={18} className="text-blue-A400 "/>
                                              <Text
                                                className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                              >
                                                Download
                                              </Text>
                                          </div>
                                          )}
                                      </PDFDownloadLink>
                                    </div>
                                  </div>,
                                  document.getElementById('root')
                                )
                                )} */}
                                {isDropdownOpen(index) &&
                                  renderDropdown(index, item)}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex items-center p-4">
                  <TablePagination
                    currentPage={cur}
                    totalPages={totalPages}
                    // onPageChange={handlePageChange}
                    itemsToShow={itemsToShow}
                  />
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col items-center h-screen w-full py-28 gap-[16px] ">
                <img src={ticketEmptyImg} />
                <Text
                  className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto pb-4"
                  size=""
                >
                  {t("event.eventParticipate.noParticipationMessage")}
                </Text>
                <div className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center px-3 py-2 rounded-md ">
                  <button
                    type="button"
                    onClick={() => navigate("/UpcomingEvent")}
                    className=" font-dm-sans-medium text-sm leading-[18.23px] text-white-A700 cursorpointer"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("event.eventParticipate.browseUpcomingEvents")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ViewTicketModal
          isOpen={isTicketModalOpen}
          onRequestClose={closeTicketModal}
          rowData={ticketDataRow}
        />
      </section>
    </>
  );
};

export default Events;
