import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { IoFlashOffOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../Components/TablePagination";
import { FiDelete } from "react-icons/fi";
import { SelectPicker , CheckPicker} from "rsuite";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import { InvestorsRequestData } from "../data/tablesData";

const InvestorRequestHistory = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [keywords, setKeywords] = useState('');
  const [investorName, setInvestorName] = useState([]);
  const [status, setStatus] = useState([]);

  const [cur, setCur] = useState(1);
  const itemsPerPage = 7;
  const itemsToShow = 4;

  const data = InvestorsRequestData;

  const filteredData = data.filter(item => {
    const keywordMatch = item.investorName.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply) {
      const investorNameMatch = investorName.length === 0 || investorName.includes(item.investorName);
  
      const statusMatch = status.length === 0 || status.includes(item.status);
  
      return keywordMatch && investorNameMatch && statusMatch;
    }
    return keywordMatch;
  });
  
  const ClearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setStatus([]);
    setInvestorName([]);
  }


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }
  const invTypedata = [
    'Venture Catalysts',
    'XYZ Combinator',
    'Misk500 Accelerator ',
    'Brendan Wallace',
    'Family Business'
  ];
  const statusData = ['In Progress' , 'Approved', 'Rejected' ,'Stand by'];

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
                    <div className="flex flex-row gap-4 flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                        <Text
                        className="text-lg leading-7 text-gray-900 pt-1"
                        size="txtDmSansMedium16"
                        >
                        Request History
                        </Text>
                        <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex rounded-md p-2 border border-solid min-w-[120px] ">
                      <input
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="search"
                        placeholder="Keywords"
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                      />
                    </div>
                    <MultipleSelect className="min-w-[180px] max-w-[300px] " id='investor' options={invTypedata} onSelect={""} searchLabel='Search Investor' setSelectedOptionVal={setInvestorName} 
                    placeholder="Investor Name"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    <MultipleSelect className="min-w-[140px] max-w-[200px] " id='status' options={statusData} onSelect={""} searchLabel='Search Status' setSelectedOptionVal={setStatus} 
                    placeholder="Status"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    </>
                )}
                    {filter ?
                (<div className="bg-blue-A400 text-white-A700 flex flex-row items-center cursor-pointer p-[6px] h-[38px] rounded-md " 
                onClick={()=>setFilterApply(true)}>
                <BiFilterAlt   size={18} className="mr-2"/>
                  <button
                      type="button"
                      className="text-base text-white-A700"
                      style={{whiteSpace:'nowrap'}}
                  >
                     Apply Filters
                  </button>
                  </div>):
                (<div className="bg-blue-A400 text-white-A700 flex flex-row items-center cursor-pointer p-[6px] h-[38px] rounded-md " 
                onClick={()=>setFilter(true)}>
                  <BiFilterAlt   size={18} className="mr-2"/>
                  <button
                        type="button"
                        className="text-base text-white-A700"
                        style={{whiteSpace:'nowrap'}}
                    >
                      Filters
                  </button>
                </div>)
                }
                    {filterApply && (
                      <div className="text-blue_gray-300 flex flex-row items-center p-[2px] h-[38px] border-b border-solid border-blue_gray-300 cursor-pointer" onClick={ClearFilter}>
                      <FiDelete   size={18} className="mr-2"/>
                      <Text
                        className="text-base font-DmSans font-normal  leading-[26px] text-blue_gray-300 "
                      >
                        Clear
                      </Text>
                    </div>
                    )}
                  </div>
                    </div>
                  <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                    <table className=" w-full">
                    <thead>
                    <tr className="bg-white-A700 text-sm leading-6">
                        <th className="p-3 text-left text-gray700 font-medium">Date</th>
                        <th className="p-3 text-left text-gray700 font-medium">Investor Name</th>
                        <th className="p-3 text-left text-gray700 font-medium">Communication Status</th>
                        <th className="p-3 text-left text-gray700 font-medium">Status</th>
                        <th className="p-3 text-left text-gray700 font-medium">Attachment</th>
                        <th className="p-3 text-left text-gray700 font-medium">Notes</th>
                    </tr>
                    </thead>
                    { pageData?.length > 0 ?
                    <tbody className="items-center w-full ">
                    {
                        (pageData.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                        <td className="py-3 px-3 w-auto text-gray500 font-DmSans text-sm font-normal leading-6">
                            {item.date}
                        </td>
                        <td className="py-3 px-3 text-gray-900_01 font-DmSans text-sm font-normal leading-6">{item.investorName}</td>
                        <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.communicationStatus}</td>
                        <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">
                        <div style={{whiteSpace:"nowrap"}} className={`flex flex-row space-x-2 items-center py-0.5 px-2 font-DmSans text-sm font-normal leading-6 rounded-full ${
                          item.status === 'Approved' ? 'bg-emerald-50 text-green-700' :
                            item.status === 'In Progress' ? 'bg-blue-101 text-blue-600' :
                              item.status === 'Rejected' ? 'bg-rose-100 text-red-500' : ''
                        } inline-flex`}>
                          {item.status}
                        </div>
                        </td>
                        <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.attachment}</td>
                        <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">
                            {item.notes}
                        </td>

                        </tr>
                    ))) }
                    </tbody>
                    : 
                    ""
                    }
                    </table>
                    {!pageData?.length>0 && (
                    <div className="flex flex-col items-center text-gray700 w-full py-28">
                        <IoFlashOffOutline  size={40} className="text-gray500"/>
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
    )
}
export default InvestorRequestHistory;