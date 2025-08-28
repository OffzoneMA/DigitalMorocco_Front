import React, { useState } from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import userDefaultProfil from '../../../Media/User1.png';
import { FiSend } from "react-icons/fi";
import { PiCheckBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import ApproveSponsoringRequestModal from "../../../Components/Modals/Sponsoring/ApproveSponsoringRequestModal";
import RejectSponsoringRequestModal from '../../../Components/Modals/Sponsoring/RejectSponsoringRequestModal';
import { useGetSponsorByIdQuery, useApproveSponsorMutation, useRejectSponsorMutation } from "../../../Services/Sponsor.Service";
import { useTranslation } from "react-i18next";
import { formatPrice, formatEventStartEndDate, formatEventTime, formatEventDate } from "../../../data/helper";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const SponsorCurrentRequestDetails = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en';
  const location = useLocation();
  const [approveSponsor] = useApproveSponsorMutation();
  const [rejectSponsor] = useRejectSponsorMutation();
  const { id } = useParams();
  const eventFromState = location.state ? location.state.event : null;
  const { data: eventFromApi, isLoading, refetch } = useGetSponsorByIdQuery(id);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const event = eventFromState || eventFromApi;

  const sponsors = [
    { logo: "/images/spon_logo0.svg" },
    { logo: "/images/spon_logo1.svg" },
    { logo: "/images/spon_logo2.svg" },
    { logo: "/images/spon_logo3.svg" },
    { logo: "/images/spon_logo4.svg" },
    { logo: "/images/spon_logo5.svg" },
    { logo: "/images/spon_logo6.svg" },
    { logo: "/images/spon_logo7.svg" },
    { logo: "/images/spon_logo8.svg" },
    { logo: "/images/spon_logo9.svg" },
  ];

  const openApproveModal = () => {
    setIsApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    // setRowData(null);
  };

  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    // setRowData(null);
  };

  const handleApprove = async (data) => {
    try {
      await approveSponsor({
        sponsorId: event?._id,
        data,
      }).unwrap();
      refetch();
      console.log('Sponsor approved successfully!');
    } catch (error) {
      console.error('Failed to approve Sponsor:', error);
    }
  };

  const handleReject = async (data) => {
    try {
      await rejectSponsor({
        sponsorId: event?._id,
        data,
      }).unwrap();
      refetch();
      console.log('Sponsor rejected successfully!');
    } catch (error) {
      console.error('Failed to reject Sponsor:', error);
    }
  };

  return (
    <>
      <HelmetWrapper
        title={t('helmet.sponsorCurrentRequestDetails.title')}
        description={t('helmet.sponsorCurrentRequestDetails.description')}
        keywords={t('helmet.sponsorCurrentRequestDetails.keywords')}
        canonical={`${process.env.REACT_APP_URL}/SponsorCurrentRequestDetails/${id}`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        {isLoading ?
          <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] h-screen w-full py-28 rounded-b-[8px]">
            <Loader />
          </div>
          :
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col  h-full items-start justify-start w-full">
                <PageHeader
                >
                  {event?.eventId?.status === 'past' ? t("sidebar.sponsoring.currentRequests") : t("sidebar.sponsoring.currentRequests")}
                </PageHeader>
              </div>
              <SearchInput className={'w-[240px]'} />
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 pt-6 pb-9">
                <img
                  src={event?.eventId?.headerImage}
                  alt="vector_three"
                  className="w-full md:h-[180px] md:w-[240px] rounded-[12px]"
                />
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex flex-row justify-between items-start gap-3 w-full">
                    <h1
                      className="line-clamp-1 h-auto text-[24px] font-dm-sans-bold leading-7 text-left text-blue_gray-903 w-full"
                    >
                      {event?.eventId?.title || 'Monthly #FirstFridayFair Business, Data & Technology Virtual Event'}
                    </h1>
                    <div className="flex item-center gap-[18px]">
                      {event?.requestType?.toLowerCase() === 'sent' ?
                        <div className="w-[97px] gap-[4px] h-[38px] px-2.5 py-2 rounded-[50px] border border-[#ff9123] justify-center items-center gap-1 inline-flex">
                          <FiSend size={12} className="text-[#ff9123]" />
                          <div className="text-[#ff9123] text-sm font-dm-sans-regular leading-[18.20px] tracking-tight">{t("common.sent")}</div>
                        </div>
                        :
                        <div className="h-[38px] gap-[4px] px-2.5 py-2 rounded-[50px] border border-[#af66e7] justify-center items-center gap-1 inline-flex">
                          <PiCheckBold size={12} className={`text-[#af66e7]`} />
                          <div className="text-[#af66e7] text-sm font-dm-sans-regular leading-[18.20px] tracking-tight">{t("common.received")}</div>
                        </div>}
                      {event?.status?.toLowerCase() !== 'pending' ?
                        (<>
                          {event?.status?.toLowerCase() === 'approved' && <div className="h-[38px] px-3 py-2 bg-[#00cdae] rounded-[200px] justify-center items-center gap-3 inline-flex">
                            <div className="justify-center items-center gap-2 flex">
                              <div className="text-white-A700 text-sm font-dm-sans-medium ">{t("common.approved")}</div>
                            </div>
                          </div>}
                          {event?.status?.toLowerCase() === 'rejected' && <div className="h-[38px] px-3 py-2 bg-[#ef4352] rounded-[200px] justify-center items-center gap-3 inline-flex">
                            <div className="justify-center items-center gap-2 flex">
                              <div className="text-white-A700 text-sm font-dm-sans-medium">{t("common.rejected")}</div>
                            </div>
                          </div>}
                        </>) :
                        (<>
                          <button
                            className={`h-[38px] px-3 py-2.5 bg-[#00cdae] hover:bg-greenbtnhoverbg active:bg-greenbtnhoverbg rounded-md justify-center items-center gap-2 flex cursorpointer`}
                            onClick={openApproveModal} >
                            <PiCheckBold size={21} className="text-white-A700" />
                            <div className="text-white-A700 text-sm font-dm-sans-medium">{t("common.approve")}</div>
                          </button>
                          <button
                            className={`h-[38px] px-3 py-2.5 bg-[#ef4352] hover:bg-[#F02A3C] active:bg-[#F02A3C] rounded-md justify-center items-center gap-2 flex cursorpointer`}
                            onClick={openRejectModal}>
                            <RiCloseLine size={21} className="text-white-A700" />
                            <div className="text-white-A700 text-sm font-dm-sans-medium">{t("common.reject")}</div>
                          </button>
                        </>)}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 items-center text-left">
                    <MdOutlineDateRange size={18} className="text-teal-A300" />
                    <time
                      dateTime={formatEventDate(event?.eventId?.startDate, event?.eventId?.endDate, t)}
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                    >
                      {formatEventDate(event?.eventId?.startDate, event?.eventId?.endDate, t)}
                    </time>
                  </div>
                  <div className="flex flex-row gap-3 items-center  text-left">
                    <IoMdTime size={18} className="text-teal-A300" />
                    <time
                      dateTime={formatEventTime(event?.eventId?.startDate, event?.eventId?.endDate, event?.eventId?.startTime ? event?.eventId?.startTime : '', event?.eventId?.endTime ? event?.eventId?.endTime : '')}
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                    >
                      {formatEventTime(event?.eventId?.startDate, event?.eventId?.endDate, event?.eventId?.startTime ? event?.eventId?.startTime : '', event?.eventId?.endTime ? event?.eventId?.endTime : '')}
                    </time>
                  </div>
                  <div className="flex flex-row gap-3 items-center text-left">
                    <BiMap size={18} className="text-teal-A300" />
                    <p
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                    >
                      {event?.eventId?.physicalLocation || "Online Only"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center  text-left">
                    <PiTagBold size={18} className="text-teal-A300" />
                    <p
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                    >
                      {formatPrice(event?.eventId?.price, currentLanguage) !== t('Free') ? t('From') : ''} {formatPrice(event?.eventId?.price, currentLanguage)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-201 pb-8">
                <h1 className=" text-[22px] font-dm-sans-medium leading-8 text-left text-blue_gray-903">
                  {t('event.eventDetails.overview')}
                </h1>
                <div className="flex flex-col gap-7 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                    <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <HiOutlineSpeakerphone size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.organizedBy')}
                        </h2>
                      </div>
                      <div className="relative">
                        <pattern className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          {event?.eventId?.organizedBy || 'North Africa Dreamin'}
                        </pattern>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <BiMap size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.location')}
                        </h2>
                      </div>
                      <div className="relative">
                        <p className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          {event?.eventId?.physicalLocation || 'Online Only'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                    <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <MdOutlineDateRange size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.startDate')}
                        </h2>
                      </div>
                      <time
                       dateTime={formatEventStartEndDate(event?.eventId, t)?.startDate}
                       className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                        {formatEventStartEndDate(event?.eventId, t)?.formattedStart}
                      </time>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <MdOutlineDateRange size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.endDate')}
                        </h2>
                      </div>
                      <div className="relative">
                        <time
                         dateTime={formatEventStartEndDate(event?.eventId, t)?.endDate}
                         className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          {formatEventStartEndDate(event?.eventId, t)?.formattedEnd}
                        </time>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                    <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <BiPurchaseTagAlt size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.industry')}
                        </h2>
                      </div>
                      <p className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                        Artificial Intelligence (AI), Finance, FinTech, Salesforce
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <TbCopy size={20} className="text-teal-A700" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.eventType')}
                        </h2>
                      </div>
                      <div className="relative flex flex-row gap-3 items-center">
                        <p className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          {event?.eventId?.category || 'Meetup, Networking, Conference'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                    <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                        <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                        <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                          {t('event.eventDetails.description')}
                        </h2>
                      </div>
                      <div className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                        {event?.eventId?.description.split('\n').map((line, index) =>
                          <p key={index} className="mb-4">{line}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {(event?.eventId?.status === 'past' && event?.eventId?.attendeesUsers?.length > 0) &&
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                      <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                        <div className="flex flex-row gap-3 items-center">
                          <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                          <h2 className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.attendance')}
                          </h2>
                        </div>
                        <div className="flex flex-row gap-3 w-full items-center pl-8">
                          {event?.eventId?.attendeesUsers?.length > 0 && (
                            <>
                              {event?.eventId?.attendeesUsers?.slice(0, 10).map((item, index) => (
                                <img
                                  key={index}
                                  src={item?.eventId?.userId?.image || userDefaultProfil}
                                  alt="vector_three"
                                  className="rounded-full w-12 h-12"
                                />
                              ))}
                              {event?.eventId?.attendeesUsers?.length > 10 && (
                                <span className="text-gray700  text-lg font-bold leading-26 tracking-wide text-left">
                                  + {event?.eventId?.attendeesUsers?.length - 10}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-9 w-full pb-8">
                <h1 className=" text-lg font-semibold leading-8 text-left text-blue_gray-903">
                  {t('event.eventDetails.sponsor')}
                </h1>
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 w-full items-center">
                  {sponsors?.length > 0 && (
                    sponsors.map((item, index) => (
                      <img key={index}
                        src={item?.logo}
                        alt="vector_three"
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </section>
      <ApproveSponsoringRequestModal isOpen={isApproveModalOpen} onRequestClose={closeApproveModal} rowData={event} methode={handleApprove} />
      <RejectSponsoringRequestModal isOpen={isRejectModalOpen} onRequestClose={closeRejectModal} rowData={event} methode={handleReject} />
    </>
  );
}

export default SponsorCurrentRequestDetails;
