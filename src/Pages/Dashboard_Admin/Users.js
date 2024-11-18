import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../../Components/Text";
import toast from "react-hot-toast";
import moment from "moment/moment";
import Loading from "../../Components/Loading";
import { AiOutlineFileSearch } from "react-icons/ai";
import PageHeader from "../../Components/common/PageHeader";
import SearchInput from "../../Components/common/SeachInput";
import TableTitle from "../../Components/common/TableTitle";
import { HiBan, HiCheck } from "react-icons/hi";
import Swal from "sweetalert2";
import TablePagination from "../../Components/common/TablePagination";
import { useGetDistinctFieldValuesQuery , useGetAllUsersPageQuery } from "../../Services/User.Service";
import MultipleSelect from "../../Components/common/MultipleSelect";
import { useTranslation } from "react-i18next";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: userRoles } = useGetDistinctFieldValuesQuery("role");
  const { data: userStatus } = useGetDistinctFieldValuesQuery("status");
  const [users, setUsers] = useState([]);
  const date = moment();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [totalPages , setTotalPages] = useState(1);
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const queryParams = { page: cur, limit: itemsPerPage };

  if (filterApply) {
    queryParams.roles = selectedRoles?.length > 0 ? selectedRoles : null;
    queryParams.statuses = selectedStatuses?.length > 0 ? selectedStatuses : null;
  }

  const { data, error, isFetching: loading  , refetch } = useGetAllUsersPageQuery(queryParams);

  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setSelectedRoles([]);
    setSelectedStatuses([]);
  }

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
      setUsers(data?.data);
      setTotalPages(data?.pagination?.totalPages);
      setCur(data?.pagination?.currentPage);
      setSearchParams({page: `${data?.pagination?.currentPage}`});
  }, [data]);

  useEffect(() => {
    if (filterApply && data?.pagination?.currentPage !== cur) {
      refetch();
    }
  }, [cur, filterApply, refetch, data?.pagination?.currentPage]);
  

  const pageData = users?.filter(item => {
    const keywordMatch = item?.displayName?.toLowerCase().includes(keywords.toLowerCase());
    return keywordMatch;
  });

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const token = sessionStorage.getItem("userToken");
  //     const response = await axios.get(`${process.env.REACT_APP_baseURL}/users/AllUsers`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const filteredUsers = response.data.filter(user => user.status === 'pending');
  //     setUsers(filteredUsers);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     setLoading(false);
  //   }
  // };

  const renderTableCell = (value) => {
    if (value instanceof Date || moment(value, moment.ISO_8601, true).isValid()) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
    return value !== undefined ? t(value) : "________";
  };


  const handleApproveUser = async (userId, role) => {
    const confirmation = await Swal.fire({
      title: "Êtes-vous sûr de vouloir approuver cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = sessionStorage.getItem("userToken");
        const response =  await axios.put(
          `${process.env.REACT_APP_baseURL}/users/approveUser/${userId}?role=${role}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        refetch();
        
        
      } catch (error) {

        console.error("Error validating user:", error);
        toast.error("Une erreur s'est produite lors de l'approbation de l'utilisateur.");
      }
    }
  };

  const handleRejectUser = async (userId, role) => {
    const confirmation = await Swal.fire({
      title: "Êtes-vous sûr de vouloir rejeter cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (confirmation.isConfirmed) {

      try {
        const token = sessionStorage.getItem("userToken");
        await axios.put(
          `${process.env.REACT_APP_baseURL}/users/RejectUser/${userId}?role=${role}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        refetch();
        toast.success("Approuver")
      } catch (error) {
        console.error("Error Rejecting user:", error);
      }
    }
  };

  const roleStyles = {
    member: 'text-blue-600 rounded-full border border-blue-600',
    investor: 'text-green-700 rounded-full border border-green-700',
    partner: 'text-yellow-600 rounded-full border border-yellow-600',
    admin: 'text-red-600 rounded-full border border-red-600',
  };


  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }
  

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px] overflow-y-auto w-full">
    <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              {t('sidebar.users')}
            </PageHeader>
          </div>
          <SearchInput className={'w-[240px]'}/>
        </div>
    </div>
    <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
            <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle>
                {t('users.unapprovedUsers')}
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex min-w-[70px]">
                      <input
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                        type="text"
                        name="search"
                        placeholder={t("common.keywords")}
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                      />
                    </div>
                    <MultipleSelect className="min-w-[170px] max-w-[230px]" id='investor' options={userRoles?.values}  searchLabel={t('common.searchRole')} setSelectedOptionVal={setSelectedRoles} 
                    placeholder={t('common.selectRole')}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto capitalize"
                              >
                               {t(`${option}`)}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    <MultipleSelect className="min-w-[170px] max-w-[200px]" id='investor' options={userStatus?.values}  searchLabel={t('common.searchStatus')} setSelectedOptionVal={setSelectedStatuses} 
                    placeholder={t('common.selectStatus')}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto capitalize"
                              >
                               {t(`${option}`)}
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
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                  onClick={() => setFilterApply(true)}
                  type="button"
              >
                  <BiFilterAlt size={21} className="mr-2" />
                  <span className="font-dm-sans-medium text-sm leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                      {t("common.applyFilters")}
                  </span>
              </button>              
                ):
                (
                <button
                  className={`col-end-3 ${pageData?.length === 0 ? 'bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed' : 'hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700'} col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                  onClick={() => setFilter(true)}
                  type="button"
                  disabled={pageData?.length === 0 }
                >
                  <BiFilterAlt size={18} className="mr-2" />
                  <span className="font-dm-sans-medium text-sm leading-[18.23px]" style={{ whiteSpace: 'nowrap' }}>
                      {t('common.filters')}
                  </span>
              </button>
              
                )
                }
                {filterApply && (
                  <button
                      className="text-[#15143966] hover:text-[#1514397e] flex flex-row gap-[4px] items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer"
                      onClick={clearFilter}
                      type="button"
                  >
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 4.75L8.25 9.25M8.25 4.75L12.75 9.25M2.04 7.72L5.28 12.04C5.544 12.392 5.676 12.568 5.84329 12.6949C5.99145 12.8074 6.15924 12.8913 6.33808 12.9423C6.54 13 6.76 13 7.2 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H7.2C6.76 1 6.54 1 6.33808 1.05767C6.15924 1.10874 5.99145 1.19264 5.84329 1.30506C5.676 1.432 5.544 1.608 5.28 1.96L2.04 6.28C1.84635 6.53819 1.74953 6.66729 1.71221 6.80907C1.67926 6.93423 1.67926 7.06577 1.71221 7.19093C1.74953 7.33271 1.84635 7.46181 2.04 7.72Z" stroke="#151439" stroke-opacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-base font-dm-sans-regular leading-[26px]">{t('common.clear')}</span>
                    </button>
                )}
                  </div>
            </div>
            <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
              <table className="w-full border-collapse">
                <thead>
                <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.displayName')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.googleId')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.linkedinId')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.email')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.role')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.dateCreated')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.lastLogin')}</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium ">{t('users.status')}</th>
                  <th className="p-3 w-auto"></th>
                </tr>
                </thead>
                {( pageData?.length > 0 && !loading) ?
                <tbody className="font-dm-sans-regular text-sm leading-6">
                {
                 pageData.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-[18px] py-4 text-left text-gray500 font-dm-sans-regular text-sm leading-6" >
                        {renderTableCell(user.displayName)}
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.googleId)}</span>
                      </div>
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.linkedinId)}</span>
                      </div>
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.email)}</span>
                      </div>
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className={`inline-flex px-3 h-[34px] justify-center items-center capitalize ${roleStyles[user?.role?.toLowerCase()]}`}>
                        {renderTableCell(user.role)}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-gray500" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      
                      {new Date(user.dateCreated).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.lastLogin)}</span>
                      </div>
                    </td>
                    <td className="px-[18px] py-4 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span className="capitalize" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {renderTableCell(user.status)}</span>
                      </div>
                    </td>

                    <td className="px-[18px] py-4 ">
                      {user?.status === "pending" && 
                      <div className="flex flex-row space-x-3 px-3 items-center">
                        <div className="relative group w-[38px] h-8 px-3 py-2 bg-[#aeb6c5] hover:bg-[#00CDAE] rounded-md justify-center items-center gap-3 inline-flex " onClick={() => handleApproveUser(user._id, user.role)} >
                          <div className="justify-center items-center gap-2 flex">
                            <HiCheck size={17}  className="text-white-A700" />
                          </div>
                          <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                            <div className="mb-px mr-[12px]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                              </svg>
                            </div>
                            <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.approve")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="relative group w-[38px] h-8 px-3 py-2 bg-[#aeb6c5] hover:bg-[#EF4352] rounded-md justify-center items-center gap-3 inline-flex " onClick={() => handleRejectUser(user._id, user.role)} >
                          <div className="justify-center items-center gap-2 flex">
                            <HiBan size={17} className="text-white-A700"/>
                          </div>
                          <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                            <div className="mb-px mr-[12px]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                              </svg>
                            </div>
                            <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.reject")}</div>
                            </div>
                          </div>
                        </div>                        
                      </div>}
                      {user?.status !== "pending" && 
                      <div style={{ whiteSpace: "nowrap" }} 
                        className={`flex flex-row space-x-2 items-center py-0.5 h-[28px] px-[10px] font-dm-sans-regular text-sm leading-6 rounded-full capitalize  
                        ${(user?.status === 'accepted' || user?.status === 'approved') ? 'bg-green-100 text-green-700' 
                        : user?.status === 'verified' ? 'bg-blue-101 text-blue-600' 
                        : user?.status === 'rejected' ? 'bg-rose-100 text-red-500' : user?.status === 'notVerified' ? 'text-[#636568] bg-[#ededed]' :''} inline-flex`}>
                        {t(user?.status)}
                      </div>}
                    </td>
                  </tr>
                ))
                }
                </tbody>
                :
                ""
                }
              </table>
              {
                loading ? (
                     <div className="flex items-center justify-center w-full min-h-[300px] h-full">
                     <Loading />
                 </div>
                  ) : !pageData?.length >0 && (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <AiOutlineFileSearch size={30} />
                    <Text
                      className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto"
                      size=""
                    >
                      No Users Available
                    </Text>
                  </div>
                  )
              }
             
            </div>
            {pageData?.length>0 && (
                <div className='w-full flex items-center p-4'>
                <TablePagination
                  initialPage={cur}
                  totalPages={totalPages}
                  // onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              
              </div>
              )}
          </div>
        </div>
    </div>
</div>
  );
};

export default Users;