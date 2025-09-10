import { useState, useEffect , useCallback } from "react";
import { TbSend } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { BiMap } from "react-icons/bi";
import { IoFlashOffOutline } from "react-icons/io5";
import { PiCoinsThin } from "react-icons/pi";
import { TbCopy } from "react-icons/tb";
import { FiGlobe } from "react-icons/fi";
import { IoOpenOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { HiOutlineSparkles } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import SendContactModal from "../../../Components/Modals/ContactRequest/SendContactModal";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Components/Loader";
import userdefaultProfile from '../../../Media/User1.png';
import { useGetAllContactReqByInvestorQuery } from "../../../Services/Investor.Service";
import { useTranslation } from "react-i18next";
import CommonModal from "../../../Components/common/CommonModal";
import { useCreateDraftContactRequestMutation } from "../../../Services/Member.Service";
import SubTablePagination from "../../../Components/common/SubTablePagination";
import { useGetUserDetailsQuery } from "../../../Services/Auth";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";
import { PRICING_COST_CONFIG } from "../../../data/data";
import EmailExistModalOrConfirmation from "../../../Components/Modals/EmailExistModalOrConfirmation";
import email_error from '../../../Media/emailError.svg'

const InvestorDetails = () => {
  const { t } = useTranslation();
  const [createDraftContactRequest] = useCreateDraftContactRequestMutation();
  const { refetch: refetchUser } = useGetUserDetailsQuery();
  const [drafting, setDrafting] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { investorId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [openCreditsErrorModal, setOpenCreditsErrorModal] = useState(false);
  const [createDraftErrorMessage, setCreateDraftErrorMessage] = useState('');
  const location = useLocation();
  const [investor, setInvestor] = useState(location.state?.investor || null);
  const [investorRequestStatus, setInvestorRequestStatus] = useState('');
  const [investorDraftStatus, setInvestorDraftStatus] = useState(false);
  const [investorInProgressStatus, setInvestorInProgressStatus] = useState(false);
  const [investorDraftRequest, setInvestorDraftRequest] = useState('');
  const [investments, setInvestments] = useState([]);
  const [cur, setCur] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages, setTotalPages] = useState(0);
  const queryParams = { investorId, page: cur, pageSize: itemsPerPage, status: "Approved" };
  const [contactSendSuccess, setContactSendSuccess] = useState(false);

  const { data: myInvestments, isFetching: investmentLoading, refetch } = useGetAllContactReqByInvestorQuery(queryParams);

  const getInvestorDetailsRequest = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/investors/${investorId}/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestor(response.data?.details);
      setInvestorRequestStatus(response.data?.status);
      setInvestorDraftStatus(response.data?.hasDraftContactRequest);
      setInvestorInProgressStatus(response.data?.hasInProgressRequest);
      setInvestorDraftRequest(response.data?.draftRequestId);
      return response.data;
    } catch (error) {
      console.error("Error fetching investor details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [investorId]);

  useEffect(() => {
    getInvestorDetailsRequest();
  }, [getInvestorDetailsRequest, contactSendSuccess]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setTotalPages(myInvestments?.totalPages);
    setInvestments(myInvestments?.ContactsHistory);
  }, [myInvestments]);

  useEffect(() => {
    if (createDraftErrorMessage && createDraftErrorMessage !== '') {
      setOpenCreditsErrorModal(true);
    }
  }, [createDraftErrorMessage]);

  const pageData = investments;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const openModal = () => {
    setIsContactModalOpen(true);
    setShowPopup(false);
  };

  const closeModal = () => {
    setIsContactModalOpen(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setDrafting(false);
  }

  const contactRequestButtonClick = () => {
    if (investorDraftStatus) {
      openModal();
    }
    else {
      setShowPopup(true);
    }
  }

  const formatDate = (date) => {
    const dateValues = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', };
    return dateValues.toLocaleDateString('en-US', options);
  };

  const handleCreateDraft = async () => {
    try {
      setDrafting(true);
      await createDraftContactRequest({ investorId }).unwrap();
      getInvestorDetailsRequest();
      refetchUser();
      openModal();
      setDrafting(false);
      console.log('Draft created successfully:');
    } catch (error) {
      console.error('Failed to create draft contact request:', error);
      setDrafting(false);
      setShowPopup(false);
      setCreateDraftErrorMessage(error?.data?.message || error?.data?.error || error?.message || t('investors.investorDetails.createDraftError'));
    }
  };

  return (
    <>
      <HelmetWrapper
        title={t('helmet.investorDetails.title', { investorName: investor?.name })}
        description={t('helmet.investorDetails.description', { investorName: investor?.name })}
        keywords={t('helmet.investorDetails.keywords')}
        canonical={`${process.env.REACT_APP_URL}/InvestorDetails/${investorId}`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader
              >
                {t("sidebar.investor.main")}
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'} />
          </div>
        </div>
        {loading ?
          <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-40 rounded-b-[8px]">
            <Loader />
          </div>
          :
          <div className="flex flex-col w-full gap-10 bg-white-A700 px-5">
            <div className="flex flex-col md:flex-wrap md:flex-row justify-center items-start gap-8">
              <div className="relative flex justify-center w-full min-h-[200px] h-auto md:w-[25%] md:min-w-[250px] max-w-[300px] p-2 border-blue_gray-100 border border-solid rounded-[10px]">
                {investor?.image ? (
                  <img src={investorRequestStatus?.toLowerCase() === 'accepted' ? investor.image : userdefaultProfile} className="rounded-full h-full w-auto" alt="Profile" />
                ) : (
                  <img src={userdefaultProfile} className="rounded-full h-full w-auto" alt="Profile" />
                )}
                {investorRequestStatus?.toLowerCase() === 'pending' &&
                  <div className="absolute h-full rounded-[10px] overlay-content-invDetails w-full top-0">
                  </div>}
              </div>
              <div className="flex flex-col md:min-w-[450px] gap-6 flex-1 w-full">
                <div className={`flex flex-row justify-between items-start  ${investorRequestStatus?.toLowerCase() === 'pending' ? '' : ''} w-full`}>
                  <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-6 py-2' : ''} `}>
                    <h1 className="font-dm-sans-bold text-2xl leading-8 text-left text-blue_gray-903">
                      {investor?.CompanyName || investor?.name || 'Digital Morocco Partner'}
                    </h1>
                    {investorRequestStatus?.toLowerCase() === 'pending' &&
                      <div className="absolute ml-[-12px] mr-[-10px] h-full overlay-content-invDetails-title w-full top-0">
                      </div>}
                  </div>
                  {(investorRequestStatus?.toLowerCase() !== 'accepted' && !investorInProgressStatus) &&
                    <button style={{ whiteSpace: 'nowrap' }}
                      className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 text-sm font-dm-sans-regular leading-snug flex flex-row items-center justify-center px-[12px] py-[7px] h-[34px] text-sm font-dm-sans-medium rounded-md w-auto cursorpointer"
                      onClick={() => contactRequestButtonClick()}
                      type="button"
                    >
                      <TbSend size={14} className="mr-2" />
                      {t('investors.investorDetails.sendContactRequest')}
                    </button>}
                  {investorInProgressStatus && (
                    <div className="flex flex-row items-center justify-center gap-2 py-2 px-4 font-dm-sans-regular rounded-full bg-[#dbedff] text-[#156fee] text-sm">
                      {t("investors.investorDetails.requestSend")}
                    </div>
                  )}
                </div>
                <div className="py-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
                    <div className="col-span-1 flex flex-col w-full  gap-7">
                      <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                        {t('investors.investorDetails.investment')}
                      </div>
                      <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                        {investor?.numberOfInvestment?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0') || 179}
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col w-full gap-7">
                      <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                        {t('investors.investorDetails.exits')}
                      </div>
                      <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                        {investor?.numberOfExits?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0') || 44}
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col w-full gap-7">
                      <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                        {t('investors.investorDetails.fund')}
                      </div>
                      <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                        {investor?.fund?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0') || 52}
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col w-full gap-7">
                      <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                        {t('investors.investorDetails.acquisitions')}
                      </div>
                      <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                        {investor?.acquisitions?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0') || 7}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-201" />
            <div className="flex flex-col gap-6">
              <h1 className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                {t('investors.investorDetails.overview')}
              </h1>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <BiMessageAltError size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.about')}
                      </h2>
                    </div>
                    <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-1' : ''} `}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.desc || investor?.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                      </p>
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <IoDocumentTextOutline size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.legalName')}
                      </h2>
                    </div>
                    <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-1' : ''} `}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.legalName || 'Venture Catalysts, Inc'}
                      </p>
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <CiCalendarDate size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.foundedDate')}
                      </h2>
                    </div>
                    <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                      {investor?.foundedDate ? new Date(investor?.foundedDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : '-'}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <TbCopy size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.companyType')}
                      </h2>
                    </div>
                    <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-2' : ''} `}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.type || 'Venture Capital'}
                      </p>
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <BiMap size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.headquarter')}
                      </h2>
                    </div>
                    <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                      {investor?.headquarter || investor?.location || 'Casablanca, Morocco'}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <FiGlobe size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.website')}
                      </h2>
                    </div>
                    <div className={`relative flex flex-row gap-3 items-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-1' : ''}`}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.website || 'http://venture-catalysts.com'}
                      </p>
                      <IoOpenOutline size={22} className="text-blue-700 cursorpointer" onClick={() => window.open(investor?.website || 'http://venture-catalysts.com', '_blank')}
                      />
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <PiCoinsThin size={22} className="text-teal-A700 transform scale-x-[-1]" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.investmentStage')}
                      </h2>
                    </div>
                    <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                      {investor?.investmentStage || 'Early Stage Venture, Late Stage Venture'}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <PiHandCoins size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.lastFundingType')}
                      </h2>
                    </div>
                    <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                      {investor?.lastFundingType || 'Privat Equity'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <HiOutlineSparkles size={22} className="text-teal-A700 " />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.preferredInvestmentIndustry')}
                      </h2>
                    </div>
                    <div className="grid md:flex md:flex-row md:flex-wrap pl-8 gap-[10px]">
                      {investor?.PreferredInvestmentIndustry?.map((industry, index) => (
                        <div key={index} className="bg-blue-101 w-auto flex justify-center items-center rounded-full px-[14px] h-[30px]">
                          <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-blue_gray-904">
                            {t(`${industry}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <LiaCoinsSolid size={22} className="text-teal-A700 transform scale-x-[-1]" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.investmentCapacity')}
                      </h2>
                    </div>
                    <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                      $ {investor?.investmentCapacity?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0') || '20,000,000'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-201" />
            <div className="flex flex-col gap-6">
              <h1 className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                {t('investors.investorDetails.contactInfo')}
              </h1>
              <div className="flex flex-col gap-7">
                <div className="flex flex-row justify-between items-start gap-7 w-full">
                  <div className="flex flex-col justify-center items-start w-[50%] gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <BiPhoneCall size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.phoneNumber')}
                      </h2>
                    </div>
                    <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-2' : ''} `}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.phoneNumber || '+33 1 234 567 89'}
                      </p>
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                    <div className="flex flex-row gap-3 items-center">
                      <HiOutlineMail size={22} className="text-teal-A700" />
                      <h2 className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                        {t('investors.investorDetails.emailAddress')}
                      </h2>
                    </div>
                    <div className={`relative flex item-center ${investorRequestStatus?.toLowerCase() === 'pending' ? 'pr-3 py-2' : ''} `}>
                      <p className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                        {investor?.emailAddress || 'investment@venture-catalysts.com'}
                      </p>
                      {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-201" />
            <div className="flex flex-col gap-6">
              <h1 className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                {t('investors.investorDetails.investments')}
              </h1>
              <div className="flex flex-col">
                <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                  <div className="flex flex-row items-center flex-wrap text-sm text-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 h-[67px]  py-4 px-5">
                    <h2
                      className="text-lg leading-7 font-dm-sans-medium text-[#101828]"
                    >
                      {t('investors.investorDetails.listOfInvestments')}
                    </h2>
                  </div>
                  <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`}
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}>
                    <table className=" w-full">
                      <thead className="">
                        <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[62px]">
                          <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorDetails.announcementDate')}</th>
                          <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorDetails.companyName')}</th>
                          <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorDetails.location')}</th>
                          <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorDetails.fundingRound')}</th>
                          <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorDetails.moneyRaised')}</th>
                        </tr>
                      </thead>
                      {(!investmentLoading && pageData?.length > 0) ?
                        <tbody className="items-center w-full ">
                          {
                            (pageData.map((item, index) => (
                              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full transition-all duration-300 ease-in-out`}>
                                <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                                  <time dateTime={item?.dateCreated} className="text-gray500 font-dm-sans-regular text-sm leading-6">
                                    {formatDate(item?.dateCreated)}
                                  </time>
                                </td>
                                <td className="px-[18px] py-4 text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                                  <div className="flex items-center gap-2" >
                                    {item?.member?.image ?
                                      <img src={item?.member?.image} className="rounded-full h-8 w-8 min-w-8 min-h-8" alt="Member" /> :
                                      <img src={userdefaultProfile} className="rounded-full h-8 w-8 min-w-8 min-h-8" alt="Default Profile" />
                                    }
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.member?.companyName || "-"}</span>
                                  </div>
                                </td>
                                <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.project?.country || '-'}</td>
                                <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.project?.stage || "-"}</td>
                                <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.investor?.MoneyRaised || "-"}</td>
                              </tr>
                            )))}
                        </tbody>
                        :
                        null
                      }
                    </table>
                    {investmentLoading ?
                      <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-40 rounded-b-[8px]">
                        <Loader />
                      </div>
                      :
                      (!pageData?.length > 0) && (
                        <div className="flex flex-col items-center text-gray700 w-full py-40">
                          <IoFlashOffOutline size={40} />
                          <p
                            className="font-dm-sans-regular text-sm leading-6 text-gray-900_01 w-auto py-4"
                          >
                            {t("common.noMatchingData")}
                          </p>
                        </div>
                      )}
                  </div>
                  {(!investmentLoading && pageData?.length > 0) && (
                    <div className='w-full flex items-center p-4'>
                      <SubTablePagination
                        currentPage={cur}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsToShow={itemsToShow}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        }

        <SendContactModal isOpen={isContactModalOpen} onRequestClose={closeModal} investorId={investorId} draftContactId={investorDraftRequest} rowData={investor} setContactFinalize={setContactSendSuccess} />
      </section>
      <CommonModal isOpen={showPopup}
        onRequestClose={closePopup} title={t('Confirmation')}
        content={
          <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
            <div className="self-stretch text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
              {t("This action will result in a charge of")} <span className="text-[#2575f0]">{t('creditsCost', { credits: PRICING_COST_CONFIG.CONTACT_INVESTORS_COST })}</span> <br />
              <span className="pt-2">{t('Are you ready to proceed?')}</span>
            </div>
            <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100"
                onClick={() => setShowPopup(false)}>
                <div className="text-[#475466] text-base font-dm-sans-medium">{t('common.cancel')}</div>
              </button>
              <button className="h-11 min-w-[195px] px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]"
                onClick={() => handleCreateDraft()}>
                <div className="text-white-A700 text-base font-dm-sans-medium">
                  {drafting ?
                    <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div> :
                    t('Confirm')}
                </div>
              </button>
            </div>
          </div>
        } />
      <EmailExistModalOrConfirmation isOpen={openCreditsErrorModal}
        onRequestClose={() => {
          setOpenCreditsErrorModal(false);
          setCreateDraftErrorMessage('');
        }} content={
          <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
            <img
              className="h-[80px] w-[80px]"
              src={email_error}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <h2
                className="text-[#1d2838] w-[460px] text-lg leading-relaxed font-dm-sans-medium text-center "
              >
                {t('Processing Error')}
              </h2>
              <p
                className="leading-relaxed w-[460px] font-dm-sans-regular text-[#1d2838] text-center text-sm"
              >
                <>
                  {t('An error occurred while deducting credits. Please check your subscription and available credits, then try again.')}
                </>
              </p>
            </div>
          </div>
        } />
    </>
  )
}
export default InvestorDetails;