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

const InvestorDetails = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [cur, setCur] = useState(1);
  const itemsPerPage = 4;
  const itemsToShow = 4;

  const data = [
    {logo:"images/img_inv.svg", AnnouncementDate: "November 28, 2015", CompanyName: "Volante Technologies", Location: "Sydney, Australia", FundingRound: "Series B", MoneyRaised: "$48M" },
    { logo:"images/img_inv1.svg" ,AnnouncementDate: "May 29, 2017", CompanyName: "New Era Cap", Location: "Abu Dhabi, UAE", FundingRound: "Venture Round", MoneyRaised: "$240M" },
    {logo:"images/img_inv2.svg" , AnnouncementDate: "May 12, 2019", CompanyName: "Pay Joy", Location: "Rio de Janeiro, Brazil", FundingRound: "Series B", MoneyRaised: "$30M" },
    {logo:"images/img_inv3.svg" , AnnouncementDate: "February 11, 2014", CompanyName: "Virtualitios", Location: "Mumbai, India", FundingRound: "Debt Financing", MoneyRaised: "$124M" },
    {logo:"images/img_inv4.svg" , AnnouncementDate: "August 24, 2013", CompanyName: "Reliance", Location: "Bogotá, Colombia", FundingRound: "Corporate Round", MoneyRaised: "$214M" },
    {logo:"images/img_inv5.svg", AnnouncementDate: "April 28, 2016", CompanyName: "Fleximize", Location: "London, United Kingdom", FundingRound: "Series C", MoneyRaised: "$16M" },
    {logo:"images/img_inv6.svg", AnnouncementDate: "May 9, 2014", CompanyName: "DreamFarm WraithWatch", Location: "New York City, USA", FundingRound: "Debt Financing", MoneyRaised: "$8OM" }
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
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <Text
                    className="text-3xl font-bold leading-11 text-gray-900 w-full"
                    size="txtDmSansBold32"
                  >
                    Investor
                  </Text>
                </div>
                <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
                  <img
                    className="cursor-pointer h-[18px] mr-1.5 my-px"
                    src="images/img_search_blue_gray_700_01.svg"
                    alt="search"
                  />
                  <input
                    className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-10 bg-white-A700 px-5">
                <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                      <div className="relative flex justify-center w-full md:w-[23%] p-5 border-blue_gray-100 border border-solid rounded-[10px]">
                        <img
                          src="images/img_inv.svg"
                          alt="vector_three"
                          className="h-[140px] w-[150px]"
                        />
                        <div className="absolute h-full overlay-content-invDetails w-full top-0">
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 flex-1 w-full">
                        <div className="flex flex-row justify-between items-start  w-full">
                          <div className="relative">
                            <Text className="font-DmSans text-2xl font-bold leading-8 text-left text-blue_gray-903">
                              Venture Catalysts
                            </Text>
                            <div className="absolute h-full overlay-content-invDetails w-full top-0">
                            </div>
                          </div>
                          <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center p-[7px] rounded-md w-auto">
                            <TbSend  size={18} className="mr-2"/>
                            <button
                                onClick={openModal}
                                type="button"
                                className="text-sm font-DmSans font-normal leading-[22px] text-white-A700"
                            >
                                Send Contact Request
                            </button>
                            </div>
                        </div>
                        <div className="py-3">
                          <div className="grid grid-cols-4 gap-px">
                            <div className="col-span-1 flex flex-col w-full  gap-7">
                                <div className="flex font-DmSans text-xs font-bold leading-4 tracking-wider text-left uppercase text-gray-400">
                                    Investment
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-gray-700">
                                179
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-DmSans text-xs font-bold leading-4 tracking-wider text-left uppercase text-gray-400">
                                    Exits
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-gray-700">
                                44
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-DmSans text-xs font-bold leading-4 tracking-wider text-left uppercase text-gray-400">
                                    Fund
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-gray-700">
                                52
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col w-full gap-7">
                                <div className="flex font-DmSans text-xs font-bold leading-4 tracking-wider text-left uppercase text-gray-400">
                                    Acquisitions
                                </div>
                                <div className="flex font-DmSans text-2xl font-bold leading-10 tracking-tight text-left text-gray-700">
                                7
                                </div>
                            </div>
                            </div>

                        </div>
                      </div>
                </div>
                <div className="h-px bg-indigo-50" />
                <div className="flex flex-col gap-6">
                    <Text className="font-DmSans text-lg font-semibold leading-8 text-left text-blue_gray-903">
                        Overview
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMessageAltError size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                  About
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                    Venture Catalys is a diversified financial services holding company that provides
                                    various financial products and services.
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <IoDocumentTextOutline  size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                  LEGAL NAME
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                  Venture Catalysts, Inc
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
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Founded Date
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Jun 16, 2012
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <TbCopy   size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Company Type
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                Venture Capital
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
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Headquarter
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Casablanca, Morocco
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <FiGlobe   size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Website
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                  http://venture-catalysts.com
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
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Investment Stage
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Early Stage Venture, Late Stage Venture
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <PiHandCoins size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Last Funding Type
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              Privat Equity
                              </Text>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSparkles size={22} className="text-teal-A700 " />
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Preferred Investment Industry
                                </Text>
                              </div>
                              <div className="grid md:flex md:flex-row md:flex-wrap pl-8 gap-3">
                              <div className="bg-blue-101 w-auto items-center rounded-full ">
                                <Text  className=" p-2 font-DmSans text-base font-normal leading-6 tracking-wide text-left text-blue_gray-904 ">
                                SaaS
                                </Text>
                              </div>
                              <div className="bg-blue-101  rounded-full items-center">
                                <Text  className=" p-2 font-DmSans text-base font-normal leading-6 tracking-wide text-left text-blue_gray-904 ">
                                Artificial Intelligence
                                </Text>
                              </div>
                              <div className="bg-blue-101  rounded-full items-center">
                                <Text  className=" p-2 font-DmSans text-base font-normal leading-6 tracking-wide text-left text-blue_gray-904 ">
                                Machine learning
                                </Text>
                              </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <LiaCoinsSolid   size={22} className="text-teal-A700 transform scale-x-[-1]"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Investment Capacity
                                </Text>
                              </div>
                              <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                              $ 20,000,000
                              </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-indigo-50" />
                <div className="flex flex-col gap-6">
                    <Text className="font-DmSans text-lg font-semibold leading-8 text-left text-blue_gray-903">
                    Contact Info
                    </Text>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPhoneCall  size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Phone Number
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                +33 1 234 567 89
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineMail  size={22} className="text-teal-A700"/>
                                <Text  className="font-DmSans text-sm font-bold leading-4 tracking-wider text-left text-gray-400 uppercase">
                                Email Address
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className="font-DmSans text-base font-normal leading-6 tracking-wide text-left text-gray-700 pl-8">
                                investment@venture-catalysts.com
                                </Text>
                                <div className="absolute h-full overlay-content-invDetails w-full top-0">
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-indigo-50" />
                <div className="flex flex-col gap-6">
                    <Text className="font-DmSans text-lg font-semibold leading-8 text-left text-blue_gray-903">
                    Investments
                    </Text>
                    <div className="flex flex-col">
                        <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                                <Text
                                className="text-lg leading-7 text-gray-900 pt-1"
                                size="txtDmSansMedium16"
                                >
                                List of Investement
                                </Text>
                            </div>
                            <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                              <table className=" w-full">
                                <thead>
                                <tr className="bg-white-A700 text-sm leading-6">
                                    <th className="p-3 text-left text-gray700 font-medium">Announcement Date</th>
                                    <th className="p-3 text-left text-gray700 font-medium">Company Name</th>
                                    <th className="p-3 text-left text-gray700 font-medium">Location</th>
                                    <th className="p-3 text-left text-gray700 font-medium">Funding Round</th>
                                    <th className="p-3 text-left text-gray700 font-medium">Money Raised</th>
                                </tr>
                                </thead>
                                { pageData?.length > 0 ?
                                <tbody className="items-center w-full ">
                                {
                                    (pageData.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                                    <td className="py-4 px-3 text-gray700 font-DmSans text-sm font-normal leading-6">
                                        {item.AnnouncementDate}
                                    </td>
                                    <td className="py-4 px-3 text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                                        <div className="flex items-center" >
                                            <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.CompanyName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 text-gray700 font-DmSans text-sm font-normal leading-6">{item.Location}</td>
                                    <td className="py-4 px-3 text-gray700 font-DmSans text-sm font-normal leading-6">{item.FundingRound}</td>
                                    <td className="py-4 px-3 text-gray700 font-DmSans text-sm font-normal leading-6">{item.MoneyRaised}</td>
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
                                    className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto py-4"
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
            <SendContactModal isOpen={isContactModalOpen} onRequestClose={closeModal}/>
        </div>
    )
}
export default InvestorDetails;