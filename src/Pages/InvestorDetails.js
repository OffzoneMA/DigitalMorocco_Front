import { useState  , useEffect} from "react";
import { Text } from "../Components/Text";
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
import TablePagination from "../Components/TablePagination";
import SendContactModal from "../Components/SendContactModal";
import ConfirmedModal from "../Components/ConfirmedModal";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import { useGetInvestorByIdQuery } from "../Services/Investor.Service";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Loader from "../Components/Loader";
import investorFakeImage from "../Media/investorFakeImage.jpg"
import  userdefaultProfile from '../Media/User1.png';
import { useGetAllContactReqByInvestorQuery } from "../Services/Investor.Service";
import { useTranslation } from "react-i18next";

const InvestorDetails = () => {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { investorId } = useParams();
  const location = useLocation();
  const [investor, setInvestor] = useState(location.state?.investor || null);
  const [investorRequestStatus , setInvestorRequestStatus] = useState('');
  const [investments , setInvestments] = useState([]);
  const [cur, setCur] = useState(1);
  const [loading , setLoading] = useState(true);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages , setTotalPages] = useState(0);
  const queryParams = {investorId , page: cur, pageSize: itemsPerPage , status: "Approved" };

  const { data: myInvestments, error, isFetching: investmentLoading , refetch} = useGetAllContactReqByInvestorQuery(queryParams);

  const data = [
    {logo:"/images/img_inv.svg", AnnouncementDate: "November 28, 2015", CompanyName: "Volante Technologies", Location: "Sydney, Australia", FundingRound: "Series B", MoneyRaised: "$48M" },
    { logo:"/images/img_inv1.svg" ,AnnouncementDate: "May 29, 2017", CompanyName: "New Era Cap", Location: "Abu Dhabi, UAE", FundingRound: "Venture Round", MoneyRaised: "$240M" },
    {logo:"/images/img_inv2.svg" , AnnouncementDate: "May 12, 2019", CompanyName: "Pay Joy", Location: "Rio de Janeiro, Brazil", FundingRound: "Series B", MoneyRaised: "$30M" },
    {logo:"/images/img_inv3.svg" , AnnouncementDate: "February 11, 2014", CompanyName: "Virtualitios", Location: "Mumbai, India", FundingRound: "Debt Financing", MoneyRaised: "$124M" },
    {logo:"/images/img_inv4.svg" , AnnouncementDate: "August 24, 2013", CompanyName: "Reliance", Location: "Bogotá, Colombia", FundingRound: "Corporate Round", MoneyRaised: "$214M" },
    {logo:"/images/img_inv5.svg", AnnouncementDate: "April 28, 2016", CompanyName: "Fleximize", Location: "London, United Kingdom", FundingRound: "Series C", MoneyRaised: "$16M" },
    {logo:"/images/img_inv6.svg", AnnouncementDate: "May 9, 2014", CompanyName: "DreamFarm WraithWatch", Location: "New York City, USA", FundingRound: "Debt Financing", MoneyRaised: "$8OM" }
  ];

  console.log(myInvestments)

  useEffect(() => {
    setLoading(true);
    const getInvestorDetailsRequest = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("userToken");
        const response = await axios.get(`${process.env.REACT_APP_baseURL}/investors/${investorId}/details` , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvestor(response.data?.details)
        setInvestorRequestStatus(response.data?.status)
        setLoading(false);
        return response.data;
      } catch (error) {
        setLoading(false);
          console.error('Error fetching investor details:', error);
          throw error;
      }
  };

  getInvestorDetailsRequest();
  }, [investorId]);

  useEffect(() => {
    setTotalPages(myInvestments?.totalPages);
    setInvestments(myInvestments?.ContactsHistory);
  }, [myInvestments]);

  const pageData = investments;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const openModal = () => {
    setIsContactModalOpen(true);
  };

  const closeModal = () => {
    setIsContactModalOpen(false);
  };

  const formatDate = (date) => {
    const dateValues = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' ,timeZone: 'UTC', };
    return dateValues.toLocaleDateString('en-US', options);
};

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <PageHeader
                  >
                  {t("sidebar.investor.main")}
                </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
            </div>
            {loading?
              <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-40 rounded-b-[8px]">
                <Loader />
              </div> 
              :
              <div className="flex flex-col w-full gap-10 bg-white-A700 px-5">
                <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                      <div className="relative flex justify-center w-full h-[200px] md:w-[25%] max-w-[250px] p-2 border-blue_gray-100 border border-solid rounded-[10px]">
                        {investor?.image ? (
                          <img src={investorRequestStatus?.toLowerCase() === 'accepted' ? investor.image : userdefaultProfile} className="rounded-full h-full w-auto" alt="Profile" />
                        ) : (
                          <img src={userdefaultProfile} className="rounded-full h-full w-auto" alt="Profile" />
                        )}
                        {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full rounded-[10px] overlay-content-invDetails w-full top-0">
                        </div>}
                      </div>
                      <div className="flex flex-col gap-6 flex-1 w-full">
                        <div className="flex flex-row justify-between items-start  w-full">
                          <div className="relative">
                            <Text className="font-dm-sans-bold text-2xl leading-8 text-left text-blue_gray-903">
                              {investor?.CompanyName || investor?.name || 'Venture Catalysts'}
                            </Text>
                            {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                            </div>}
                          </div>
                          <button style={{ whiteSpace: 'nowrap'}}
                              className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 text-sm font-dm-sans-regular leading-snug flex flex-row items-center justify-center px-[12px] py-[7px] h-[34px] text-sm font-dm-sans-medium rounded-md w-auto cursorpointer"
                              onClick={openModal}
                              type="button"
                          >
                              <TbSend size={14} className="mr-2" />
                              {t('investor.investorDetails.sendContactRequest')}
                          </button>
                        </div>
                        <div className="py-3">
                          <div className="grid grid-cols-4 gap-px">
                            <div className="col-span-1 flex flex-col w-full  gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                {t('investor.investorDetails.investment')}
                                </div>
                                <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                                { investor?.numberOfInvestment || 179}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                {t('investor.investorDetails.exits')}
                                </div>
                                <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                                {investor?.numberOfExits || 44}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                {t('investor.investorDetails.fund')}
                                </div>
                                <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                                {investor?.fund|| 52}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                {t('investor.investorDetails.acquisitions')}
                                </div>
                                <div className="flex font-dm-sans-bold text-2xl leading-10 tracking-tight text-left text-[#344054]">
                                {investor?.acquisitions || 7}
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <div className="h-px bg-gray-201" />
                <div className="flex flex-col gap-6">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                    {t('investor.investorDetails.overview')}
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMessageAltError size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.about')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                    {investor?.desc || investor?.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                                </Text>
                                {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <IoDocumentTextOutline  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.legalName')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                  {investor?.legalName || 'Venture Catalysts, Inc'}
                                </Text>
                                {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>}
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <CiCalendarDate  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.foundedDate')}
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                              {investor?.foundedDate ? new Date(investor?.foundedDate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : '-'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <TbCopy   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.companyType')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                {investor?.type || 'Venture Capital'}
                                </Text>
                                {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>}
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMap   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.headquarter')}
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                              {investor?.headquarter || 'Casablanca, Morocco'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <FiGlobe   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.website')}
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                  {investor?.website || 'http://venture-catalysts.com'}
                                </Text>
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
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.investmentStage')}
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                              {investor?.investmentStage || 'Early Stage Venture, Late Stage Venture'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <PiHandCoins size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.lastFundingType')}
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                              {investor?.lastFundingType || 'Privat Equity'}
                              </Text>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSparkles size={22} className="text-teal-A700 " />
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.preferredInvestmentIndustry')}
                                </Text>
                              </div>
                              <div className="grid md:flex md:flex-row md:flex-wrap pl-8 gap-[10px]">
                              {investor?.PreferredInvestmentIndustry?.map((industry, index) => (
                                <div key={index} className="bg-blue-101 w-auto flex justify-center items-center rounded-full px-[14px] h-[30px]">
                                  <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-blue_gray-904">
                                    {industry}
                                  </Text>
                                </div>
                              ))}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <LiaCoinsSolid   size={22} className="text-teal-A700 transform scale-x-[-1]"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.investmentCapacity')}
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                              $ {investor?.investmentCapacity || '20,000,000'}
                              </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-gray-201" />
                <div className="flex flex-col gap-6">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                    {t('investor.investorDetails.contactInfo')}
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPhoneCall  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.phoneNumber')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                {investor?.phoneNumber || '+33 1 234 567 89'}
                                </Text>
                                {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineMail  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                {t('investor.investorDetails.emailAddress')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344054] pl-8">
                                {investor?.emailAddress|| 'investment@venture-catalysts.com'}
                                </Text>
                                {investorRequestStatus?.toLowerCase() === 'pending' && <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>}
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-gray-201" />
                <div className="flex flex-col gap-6">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                    {t('investor.investorDetails.investments')}
                    </Text>
                    <div className="flex flex-col">
                        <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                            <div className="flex flex-row items-center flex-wrap text-sm text-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 h-[67px]  py-4 px-5">
                                <Text
                                className="text-lg leading-7 text-[#101828]"
                                size="txtDmSansMedium16"
                                >
                                {t('investor.investorDetails.listOfInvestments')}
                                </Text>
                            </div>
                            <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
                            style={{
                                scrollbarWidth: 'none', 
                                msOverflowStyle: 'none',
                              }}>
                              <table className=" w-full">
                                <thead className="">
                                <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[62px]">
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorDetails.announcementDate')}</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorDetails.companyName')}</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorDetails.location')}</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorDetails.fundingRound')}</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorDetails.moneyRaised')}</th>
                                </tr>
                                </thead>
                                { (!investmentLoading && pageData?.length > 0 )?
                                <tbody className="items-center w-full ">
                                {
                                    (pageData.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                                        {formatDate(item?.dateCreated)}
                                    </td>
                                    <td className="px-[18px] py-4 text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                                        <div className="flex items-center gap-2" >
                                        {item?.member?.image ?
                                          <img src={item?.member?.image} className="rounded-full h-8 w-8"/> :
                                          <img src={userdefaultProfile} className="rounded-full h-8 w-8"/>
                                        }
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.member?.companyName || "-"}</span>
                                        </div>
                                    </td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.project?.country}</td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.project?.stage || "-"}</td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.investor?.MoneyRaised || "-"}</td>
                                    </tr>
                                ))) }
                                </tbody>
                                : 
                                ""
                                }
                              </table>
                              {investmentLoading ? 
                                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-40 rounded-b-[8px]">
                                  <Loader />
                                </div>
                                :
                                (!pageData?.length>0) && (
                                <div className="flex flex-col items-center text-gray700 w-full py-40">
                                    <IoFlashOffOutline  size={40} />
                                    <Text
                                    className="font-dm-sans-regular text-sm leading-6 text-gray-900_01 w-auto py-4"
                                    size=""
                                    >
                                    {t("common.noMatchingData")}
                                    </Text>
                                </div>
                                )}
                            </div>
                            {(!investmentLoading && pageData?.length>0) && (
                            <div className='w-full flex items-center p-4'>
                                <TablePagination
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
            
            <SendContactModal isOpen={isContactModalOpen} onRequestClose={closeModal} investorId={investorId} rowData={investor}/>
        </div>
    )
}
export default InvestorDetails;