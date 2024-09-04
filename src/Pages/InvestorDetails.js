import { useState } from "react";
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


const InvestorDetails = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const { investorId } = useParams();
    const location = useLocation();
    const [investor, setInvestor] = useState(location.state?.investor || null);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 4;
  const itemsToShow = 4;

  const data = [
    {logo:"/images/img_inv.svg", AnnouncementDate: "November 28, 2015", CompanyName: "Volante Technologies", Location: "Sydney, Australia", FundingRound: "Series B", MoneyRaised: "$48M" },
    { logo:"/images/img_inv1.svg" ,AnnouncementDate: "May 29, 2017", CompanyName: "New Era Cap", Location: "Abu Dhabi, UAE", FundingRound: "Venture Round", MoneyRaised: "$240M" },
    {logo:"/images/img_inv2.svg" , AnnouncementDate: "May 12, 2019", CompanyName: "Pay Joy", Location: "Rio de Janeiro, Brazil", FundingRound: "Series B", MoneyRaised: "$30M" },
    {logo:"/images/img_inv3.svg" , AnnouncementDate: "February 11, 2014", CompanyName: "Virtualitios", Location: "Mumbai, India", FundingRound: "Debt Financing", MoneyRaised: "$124M" },
    {logo:"/images/img_inv4.svg" , AnnouncementDate: "August 24, 2013", CompanyName: "Reliance", Location: "Bogotá, Colombia", FundingRound: "Corporate Round", MoneyRaised: "$214M" },
    {logo:"/images/img_inv5.svg", AnnouncementDate: "April 28, 2016", CompanyName: "Fleximize", Location: "London, United Kingdom", FundingRound: "Series C", MoneyRaised: "$16M" },
    {logo:"/images/img_inv6.svg", AnnouncementDate: "May 9, 2014", CompanyName: "DreamFarm WraithWatch", Location: "New York City, USA", FundingRound: "Debt Financing", MoneyRaised: "$8OM" }
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

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
console.log(investor)

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <PageHeader
                  >
                  Investor
                </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
            </div>
            <div className="flex flex-col w-full gap-10 bg-white-A700 px-5">
                <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                      <div className="relative flex justify-center w-full md:w-[23%] p-2 border-blue_gray-100 border border-solid rounded-[10px]">
                        <img
                          src={investor?.image}
                          alt="vector_three"
                          className="h-full w-full "
                        />
                        <div className="absolute h-full rounded-[10px] overlay-content-invDetails w-full top-0">
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 flex-1 w-full">
                        <div className="flex flex-row justify-between items-start  w-full">
                          <div className="relative">
                            <Text className="font-DmSans text-2xl font-bold leading-8 text-left text-blue_gray-903">
                              {investor?.CompanyName || investor?.name || 'Venture Catalysts'}
                            </Text>
                            <div className="absolute h-full overlay-content-invDetails w-full top-0">
                            </div>
                          </div>
                          <button style={{ whiteSpace: 'nowrap'}}
                              className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 text-sm font-dm-sans-regular leading-snug flex flex-row items-center justify-center px-[12px] py-[7px] h-[34px] text-sm font-dm-sans-medium rounded-md w-auto cursorpointer-green"
                              onClick={openModal}
                              type="button"
                          >
                              <TbSend size={14} className="mr-2" />
                              Send Contact Request
                          </button>
                        </div>
                        <div className="py-3">
                          <div className="grid grid-cols-4 gap-px">
                            <div className="col-span-1 flex flex-col w-full  gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                    Investment
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-[#344053]">
                                { investor?.numberOfInvestment || 179}
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                    Exits
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-[#344053]">
                                {investor?.numberOfExits || 44}
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                    Fund
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-[#344053]">
                                {investor?.fund|| 52}
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-dm-sans-bold text-xs leading-4 tracking-wider text-left uppercase text-[#98A2B3]">
                                    Acquisitions
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-[#344053]">
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
                        Overview
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMessageAltError size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                  About
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                    {investor?.desc || investor?.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <IoDocumentTextOutline  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                  LEGAL NAME
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                  {investor?.legalName || 'Venture Catalysts, Inc'}
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <CiCalendarDate  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Founded Date
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                              {investor?.foundedDate ? new Date(investor?.foundedDate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : 'Jun 16, 2012'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <TbCopy   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Company Type
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                {investor?.type || 'Venture Capital'}
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMap   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Headquarter
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                              {investor?.headquarter || 'Casablanca, Morocco'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <FiGlobe   size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Website
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                  {investor?.website || 'http://venture-catalysts.com'}
                                </Text>
                                <IoOpenOutline size={22} className="text-blue-700"/>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                  </div>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                              <PiCoinsThin size={22} className="text-teal-A700 transform scale-x-[-1]" />
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Investment Stage
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                              {investor?.investmentStage || 'Early Stage Venture, Late Stage Venture'}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <PiHandCoins size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Last Funding Type
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                              {investor?.lastFundingType || 'Privat Equity'}
                              </Text>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSparkles size={22} className="text-teal-A700 " />
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Preferred Investment Industry
                                </Text>
                              </div>
                              <div className="grid md:flex md:flex-row md:flex-wrap pl-8 gap-3">
                                {investor?.PreferredInvestmentIndustry.map((industry, index) => (
                                  <div key={index} className="bg-blue-101 w-auto items-center rounded-full">
                                    <Text className="p-2 font-dm-sans-regular text-base leading-6 tracking-wide text-left text-blue_gray-904">
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
                                Investment Capacity
                                </Text>
                              </div>
                              <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                              $ {investor?.investmentCapacity || '20,000,000'}
                              </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-gray-201" />
                <div className="flex flex-col gap-6">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                    Contact Info
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPhoneCall  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Phone Number
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                {investor?.phoneNumber || '+33 1 234 567 89'}
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineMail  size={22} className="text-teal-A700"/>
                                <Text  className="font-dm-sans-bold text-xs leading-4 tracking-wider text-left text-[#98A2B3] uppercase">
                                Email Address
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-dm-sans-regular text-base leading-6 tracking-wide text-left text-[#344053] pl-8">
                                {investor?.emailAddress|| 'investment@venture-catalysts.com'}
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-gray-201" />
                <div className="flex flex-col gap-6">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue_gray-903">
                    Investments
                    </Text>
                    <div className="flex flex-col">
                        <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                            <div className="flex flex-row items-center flex-wrap text-sm text-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 h-[67px]  py-4 px-5">
                                <Text
                                className="text-lg leading-7 text-[#101828]"
                                size="txtDmSansMedium16"
                                >
                                List of Investement
                                </Text>
                            </div>
                            <div className="bg-white-A700 border-b border-gray-201 flex flex-col md:gap-5 flex-1 items-start justify-start w-full  min-h-[330px] overflow-x-auto">
                              <table className=" w-full">
                                <thead className="">
                                <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[62px]">
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Announcement Date</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Company Name</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Location</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Funding Round</th>
                                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Money Raised</th>
                                </tr>
                                </thead>
                                { pageData?.length > 0 ?
                                <tbody className="items-center w-full ">
                                {
                                    (pageData.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                                        {item.AnnouncementDate}
                                    </td>
                                    <td className="px-[18px] py-4 text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                                        <div className="flex items-center" >
                                            <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.CompanyName}</span>
                                        </div>
                                    </td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item.Location}</td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item.FundingRound}</td>
                                    <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item.MoneyRaised}</td>
                                    </tr>
                                ))) }
                                </tbody>
                                : 
                                ""
                                }
                              </table>
                              {!pageData?.length>0 && (
                                <div className="flex flex-col items-center text-gray700 w-full py-28">
                                    <IoFlashOffOutline  size={40} />
                                    <Text
                                    className="font-dm-sans-regular text-sm leading-6 text-gray-900_01 w-auto py-4"
                                    size=""
                                    >
                                    No matching data identified
                                    </Text>
                                </div>
                                )}
                            </div>
                            {pageData?.length>0 && (
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
            <SendContactModal isOpen={isContactModalOpen} onRequestClose={closeModal} investorId={investorId}/>
        </div>
    )
}
export default InvestorDetails;