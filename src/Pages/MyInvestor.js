import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { IoFlashOffOutline } from "react-icons/io5";
import TablePagination from "../Components/TablePagination";
import {companyType} from "../data/companyType";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import { Country } from "country-state-city";
import { FiDelete } from "react-icons/fi";
import { InvestorsData } from "../data/tablesData";

const MyInvestors = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [investmentType, setInvestmentType] = useState([]);
  const [location, setLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const dataCountries = Country.getAllCountries();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 6;
  const itemsToShow = 4;
  const data = InvestorsData;

  const filteredData = data.filter(item => {
    const keywordMatch = item.InvestorName.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply) {
      const typeMatch = investmentType.length === 0 || investmentType.includes(item.Type);
  
      const locationMatch = !location || item.Location.toLowerCase().includes(location["name"].toLowerCase());
  
      const industryMatch = industries.length === 0 || industries.some(ind => item.PreferredInvestmentIndustry.includes(ind));
  
      return keywordMatch && typeMatch && locationMatch && industryMatch;
    }
      return keywordMatch;
  });

  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setIndustries([]);
    setInvestmentType([]);
    setLocation('');
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
    'Venture Capital',
    'Angel',
    'Accelerator',
    'Angel Club',
    'Family Business'
  ];

  const companySectorData = companyType.map(
    item => ({ label: item, value: item })
  );
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
            <div className="flex flex-col gap-5 md:flex-row text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <Text
                style={{whiteSpace:"nowrap"}}
                  className="text-lg leading-7 text-left text-gray-900 pt-1 w-auto "
                  size="txtDmSansMedium16"
                >
                  My Investors
                </Text>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex rounded-md p-2 border border-solid min-w-[70px]">
                      <input
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="search"
                        placeholder="Keywords"
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                      />
                    </div>
                    <MultipleSelect className="min-w-[170px]" id='investor' options={invTypedata} onSelect={""} searchLabel='Search Type' setSelectedOptionVal={setInvestmentType} 
                    placeholder="Type of Investment"
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
                    <SimpleSelect className="min-w-[100px] max-w-[200px] " id='country' options={dataCountries} onSelect={""} searchLabel='Select Country' setSelectedOptionVal={setLocation} 
                    placeholder="Location" valuekey="name"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.name}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    <MultipleSelect className="min-w-[170px]" id='investor' options={companyType} onSelect={""} searchLabel='Search Industrie' setSelectedOptionVal={setIndustries} 
                    placeholder="Select Industries"
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
                (<div className=" bg-blue-A400 text-white-A700 flex flex-row items-center justify-center cursor-pointer p-[6px] h-[38px] rounded-md " 
                onClick={()=>setFilterApply(true)}>
                <BiFilterAlt   size={18} className="mr-2"/>
                  <button
                      type="button"
                      className="font-DmSans text-sm font-medium  leading-[18.23px] text-white-A700"
                      style={{whiteSpace:'nowrap'}}
                  >
                     Apply Filters
                  </button>
                  </div>):
                (<div className="col-end-3 col-span-1 font-DmSans bg-blue-A400 text-white-A700 flex flex-row items-center justify-center cursor-pointer p-[6px] h-[38px] rounded-md " 
                onClick={()=>setFilter(true)}>
                  <BiFilterAlt   size={18} className="mr-2"/>
                  <button
                        type="button"
                        className="font-DmSans text-sm font-medium  leading-[18.23px] text-white-A700"
                        style={{whiteSpace:'nowrap'}}
                    >
                      Filters
                  </button>
                </div>)
                }
                    {filterApply && (
                      <div className="text-blue_gray-300 flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-blue_gray-300 cursor-pointer" onClick={clearFilter}>
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
              <div className="relative flex flex-col w-full">
              <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-6">
                    <th className="p-3 text-left text-gray700 font-medium">Investor Name</th>
                    <th className="p-3 text-left text-gray700 font-medium">Type</th>
                    <th className="p-3 text-center text-gray700 font-medium">Number of Investment</th>
                    <th className="p-3 text-center text-gray700 font-medium">Number of Exits</th>
                    <th className="p-3 text-left text-gray700 font-medium">Location</th>
                    <th className="p-3 text-left text-gray700 font-medium">Preferred Investment Industry</th>
                  </tr>
                  </thead>
                  { pageData?.length > 0 ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} w-full`}>
                    <td className="py-3 px-3 w-auto text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.InvestorName}</span>
                        </div>
                    </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-center text-sm font-normal leading-6"
                      style={{ whiteSpace: 'nowrap'}}>{item.Type}</td>
                      <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6">{item.NumberOfInvestment}</td>
                      <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6">{item.NumberOfExits}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6"
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.Location}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6 max-w-[230px] lg:max-w-[250px]"
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
                  <div className="flex flex-col items-center text-gray700 w-full py-28">
                    <IoFlashOffOutline  size={40} className="text-gray500" />
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