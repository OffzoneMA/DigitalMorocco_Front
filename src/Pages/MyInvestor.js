import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import TablePagination from "../Components/TablePagination";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { FiDelete } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import MultipleSelect from "../Components/MultipleSelect";
import SimpleSelect from "../Components/SimpleSelect";
import { Country } from "country-state-city";
import {companyType} from "../data/companyType";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../Components/Loader";

const MyInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const [noInvestors, setNoInvestors] = useState(false);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const navigate = useNavigate();
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [investmentType, setInvestmentType] = useState([]);
  const [location, setLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const dataCountries = Country.getAllCountries();


  useEffect(() => {
    fetchInvestors(currentPage);
  }, [currentPage]); // Écouter les changements de la page courante

  const fetchInvestors = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/members/my-investors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      setInvestors(response.data.investors);
      const filteredInvestors = response.data.investors.filter(investor => investor.owner?._id === userId);
      setFilteredInvestors(response.data.investors);
      setLoading(false);
      
      if (filteredInvestors.length === 0) {
        setNoInvestors(true);
      } else {
        setNoInvestors(false);
      }
    } catch (error) {
      console.error("Error fetching investors:", error);
      setLoading(false);
    }
  };

  const data = filteredInvestors;

  const filteredData = data.filter(item => {
    const keywordMatch = item?.name.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply) {
      const typeMatch = investmentType.length === 0 || investmentType.includes(item.Type);
  
      const locationMatch = !location || item?.location.toLowerCase().includes(location["name"].toLowerCase());
  
      const industryMatch = industries.length === 0 || industries.some(ind => item?.PreferredInvestmentIndustry.includes(ind));
  
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
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
            <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle
                  style={{whiteSpace:"nowrap"}}
                  >
                  My Investors
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 items-center md:justify-end md:ml-auto w-auto">
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
                (
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer-green px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                  onClick={() => setFilterApply(true)}
                  type="button"
              >
                  {/* <BiFilterAlt size={18} className="mr-2" /> */}
                  <span className="font-DmSans text-sm font-medium leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                      Apply Filters
                  </span>
              </button>              
                  ):
                (
                <button
                  className="col-end-3 hover:bg-[#235DBD] active:bg-[#224a94] col-span-1 bg-blue-A400 text-white-A700 flex flex-row items-center justify-center cursorpointer-green px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                  onClick={() => setFilter(true)}
                  type="button"
                >
                  <BiFilterAlt size={21} className="mr-2" />
                  <span className="font-DmSans text-sm font-medium leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                      Filters
                  </span>
                </button>
                )
                }
                    {filterApply && (
                    <button
                      className="text-blue_gray-300 flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-blue_gray-300 cursorpointer-green"
                      onClick={clearFilter}
                      type="button"
                  >
                      <FiDelete size={18} className="mr-2" />
                      <span className="text-base font-dm-sans-regular leading-[26px] text-blue_gray-300">Clear</span>
                  </button>
                  
                    )}
                  </div>
              </div>
              <div className="relative flex flex-col w-full">
              <div className="bg-white-A700 border-b border-gray-201 flex flex-col md:gap-5 flex-1 items-start justify-start w-full  min-h-[330px] overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-6">
                    <th className="p-3 text-left text-gray700 font-DmSans font-medium">Investor Name</th>
                    <th className="p-3 text-left text-gray700 font-DmSans font-medium">Type</th>
                    <th className="p-3 text-center text-gray700 font-DmSans font-medium">Funding Round</th>
                    <th className="p-3 text-left text-gray700 font-DmSans font-medium">Location</th>
                    <th className="p-3 text-left text-gray700 font-DmSans font-medium">Preferred Investment Industry</th>
                  </tr>
                  </thead>
                  {(!loading && pageData?.length > 0) ? 
                  <tbody className="items-center w-full ">
                  {
                  pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer-green w-full`}>
                    <td className="w-auto text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                        <div className="relative flex">
                          <div className="py-3 px-3 flex items-center" >
                            {item?.image ? (
                              <img src={item.image} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                            ) : (
                              <FaUserCircle className="h-8 w-8 mr-2 text-gray-500" /> // Placeholder icon
                            )}                              
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.name}</span>
                          </div>
                        </div>
                    </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-center text-sm font-normal leading-6" 
                      style={{ whiteSpace: 'nowrap' }}>{item.type}</td>
                      <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6">{item.fundingRound}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6" 
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.location}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6 max-w-[230px] lg:max-w-[250px]"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.PreferredInvestmentIndustry}
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
                :""}
                </table>
                { loading ? (
                     <div className="flex items-center justify-center w-full h-full py-40 ">
                     <Loader />
                 </div> ) : pageData.length === 0 && (
                  <div className="flex flex-col items-center text-blue_gray-601 w-full py-28">
                    <div >
                      <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray-900_01 w-auto">
                      <span>No matching data identified</span>
                    </div>
                  </div>
                )                 
                }
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
  );
};

export default MyInvestors;
