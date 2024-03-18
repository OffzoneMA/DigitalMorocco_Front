import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { IoFlashOffOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../Components/TablePagination";
import DeleteModal from "../Components/DeleteModal";
import { SelectPicker } from "rsuite";

const MyInvestors = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const [filter , setFilter] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 4;
  const itemsToShow = 4;
  const data = [
    {logo:"images/img_inv.svg", InvestorName: "Venture Catalysts", Type: "Venture Capital", NumberOfInvestment: 231, NumberOfExits: 89, Location: "Mumbai, India", PreferredInvestmentIndustry: "SaaS, Artificial Intelligence, Machine Learning" },
    {logo:"images/img_inv1.svg" ,InvestorName: "Startup Funding Club", Type: "Angel", NumberOfInvestment: 104, NumberOfExits: 96, Location: "BB Bogotá, Colombia", PreferredInvestmentIndustry: "Adtech, Agriculture, Biotechnology" },
    {logo:"images/img_inv2.svg" , InvestorName: "Techstars Atlanta", Type: "Venture Capital", NumberOfInvestment: 123, NumberOfExits: 72, Location: "London, United Kingdom", PreferredInvestmentIndustry: "Adtech, Agriculture, Biotechnology" },
    {logo:"images/img_inv3.svg" , InvestorName: "Urban-X Accelerator", Type: "Accelerator", NumberOfInvestment: 254, NumberOfExits: 86, Location: "Cairo, Egypt", PreferredInvestmentIndustry: "Edutech, E-Learning, Corporate Training" },
    {logo:"images/img_inv4.svg" ,  InvestorName: "Misk500 Accelerator", Type: "Accelerator", NumberOfInvestment: 342, NumberOfExits: 111, Location: "Sydney, Australia", PreferredInvestmentIndustry: "Big Data, SaaS, Crowdfunding" },
    {logo:"images/img_inv5.svg", InvestorName: "Brendan Wallace", Type: "Angel", NumberOfInvestment: 213, NumberOfExits: 85, Location: "Abu Dhabi, UAE", PreferredInvestmentIndustry: "Adtech, Agriculture, Biotechnology, " }
  
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

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log(deleteRow?.projectName);
  };
    return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
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
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row flex-wrap text-sm text-center items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <Text
                  className="text-lg leading-7 text-gray-900 pt-1"
                  size="txtDmSansMedium16"
                >
                  My Investors
                </Text>
                  <div className=" md:grid-cols-auto-fit lg:flex lg:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex w-full rounded-md p-1.5 border border-solid min-w-[80px]">
                      <input
                        className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="search"
                        placeholder="Keywords"
                      />
                    </div>
                    <SelectPicker size="md" data={[]}
                                className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                placeholder="Type of Investment"/>
                    <SelectPicker size="md" data={[]}
                                className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                placeholder="Location"/>
                    <SelectPicker size="md" data={[]}
                                className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                    placeholder="Select Industries"/>
                    </>
                )}
                    <div className="bg-blue-A400 text-white-A700 flex flex-row items-center p-[6px] rounded-md ">
                        <BiFilterAlt   size={18} className="mr-2"/>
                        <button
                        onClick={()=>setFilter(true)}
                            type="submit"
                            className="text-base text-white-A700"
                            style={{whiteSpace:'nowrap'}}
                        >
                            {filter? "Apply Filters": "Filters"}
                        </button>
                    </div>
                    </div>
              </div>
              <div className="relative flex flex-col w-full">
              <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-6">
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Investor Name</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Type</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium">Number of Investment</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium">Number of Exits</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Location</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Preferred Investment Industry</th>
                  </tr>
                  </thead>
                  { pageData?.length > 0 ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                    <td className="py-3 px-3 w-auto text-gray-600 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.InvestorName}</span>
                        </div>
                    </td>
                      <td className="py-3 px-3 text-gray-600 font-DmSans inline-flex text-sm font-normal leading-6"
                      style={{ whiteSpace: 'nowrap'}}>{item.Type}</td>
                      <td className="py-3 px-3 text-center text-gray-600 font-DmSans text-sm font-normal leading-6">{item.NumberOfInvestment}</td>
                      <td className="py-3 px-3 text-center text-gray-600 font-DmSans text-sm font-normal leading-6">{item.NumberOfExits}</td>
                      <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6"
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.Location}</td>
                      <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6 max-w-[230px] lg:max-w-[250px]"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.PreferredInvestmentIndustry}
                      </td>

                    </tr>
                  ))) }
                  </tbody>
                  : 
                  ""
                }
                </table>
                {!pageData?.length>0 && (
                  <div className="flex flex-col items-center text-gray-600 w-full py-28">
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
    </div>
    )
}
export default MyInvestors;