import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../../../Components/Text";
import TablePagination from "../../../Components/common/TablePagination";
import { useNavigate , useSearchParams} from "react-router-dom";
import { FaRegPlusSquare} from "react-icons/fa";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import DeleteModal from "../../../Components/common/DeleteModal";
import { PiUsersThin } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import Loader from "../../../Components/Loader";
import userdefaultProfile from '../../../Media/User.png';
import { useTranslation } from "react-i18next";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const Employees = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeId, setEmployeId] = useState(null); 
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const pagesToShow = 4;

  const pageData = filteredEmployees;

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetchMembers();
  }, [cur]);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;

  const fetchMembers = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/employee/byuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: cur,
          pageSize : itemsPerPage,
        },

      });
      setMembers(response.data?.employees);
      setTotalPages(response.data.totalPages);
      setFilteredEmployees(response.data?.employees);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  };

  const handleDeleteEmployee = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        await axios.delete(`${process.env.REACT_APP_baseURL}/employee/${employeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await fetchMembers(cur);
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    
  };

  const handleEditEmployee = (employeId) => {
    const selectedEmployee = employees.find(employee => employee._id === employeId);
    navigate(`/EditEmployee/${employeId}`, { state: { employee: selectedEmployee } });
  };

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
    setEmployeId(rowData?._id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteRow(null);
    setEmployeId(null);
  };

  return (
    <>
    <HelmetWrapper
      title={t('helmet.company.employees.title')}
      description={t('helmet.company.employees.description')}
      keywords={t('helmet.company.employees.keywords')}
      canonical={`${process.env.REACT_APP_URL}/Employees`}
    />
    <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px] w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              {t("sidebar.company.main")}
            </PageHeader>
          </div>
          <SearchInput className={'w-[240px]'}/>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full Min-h-screen bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
            <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
              <TableTitle
                  >
                  {t('employee.teamMembers')}
                </TableTitle>
              <button
                className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] focus:bg-[#224a94] text-white-A700 flex flex-row items-center ml-auto px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium cursorpointer rounded-md w-auto"
                onClick={() => navigate("/CreateEmployee")}
                type="button"
              >
                <FaRegPlusSquare size={21} className="mr-2 cursorpointer" />
                <span className="text-sm font-dm-sans-medium leading-[18.23px]">{t('employee.addNewEmployee')}</span>
              </button>
            </div>
            <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>                       
            <table className="w-full mx-auto table-auto">
              <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                  <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('employee.name')}</th>
                  <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('employee.emailAddress')}</th>
                  <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('employee.title')}</th>
                  <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('employee.type')}</th>
                  <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('employee.status')}</th>
                  <th scope="col" className="p-3 w-auto"></th>
                  </tr>
                </thead>
                  {filteredEmployees?.length > 0 ? 
                <tbody className="font-dm-sans-regular text-sm leading-[26px] ">
                  {(
                    filteredEmployees.map((employee, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer`} 
                        onClick={() => handleEditEmployee(employee._id)}>
                        <td className="px-[18px] py-4 text-gray-900_01" >
                          <div className="flex items-center gap-3" style={{}}>
                            {employee?.image ? (
                              <img src={employee?.image} className="rounded-full h-9 w-9 " alt="" />
                            ) : (
                              <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                <img src={userdefaultProfile} alt="" className="" />
                              </div>
                            )}
                            <span className="capitalize" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee?.fullName}</span>
                          </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray500">{employee?.workEmail}</td>
                        <td className="px-[18px] py-4 text-gray500">{employee?.jobTitle ?  t(`${employee.jobTitle}`) : "-"}</td>
                        <td className="px-[18px] py-4 text-gray500">{employee?.level ? t(`${employee.level}`) : "-"}</td>
                        <td className="px-[18px] py-4 text-gray500">
                          {employee?.status?.toLowerCase() === 'member' ? (
                            <div className="h-[22px] pl-1.5 pr-2 py-0.5 bg-[#ebfdf2] rounded-2xl justify-center items-center gap-1.5 inline-flex">
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="3" fill="#12B76A"/>
                              </svg>
                              <div className="text-center text-[#027947] text-xs font-medium font-inter leading-[18px]">{t(`statusMember`)}</div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-1 rounded-full" style={{ width: "4.5rem", backgroundColor: "#eceff3" }}>
                              <span className="rounded-full mr-1" style={{ width:"7px", height:"7px",backgroundColor: "#646e83" }}></span>
                              <span className="text-xs font-semibold" style={{ color: "#333f53" }}>{t(`${employee.status}`)}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-[18px] py-4 ">
                          <div className="flex flex-row space-x-3 px-3 items-center">
                            <div className="relative group">
                              <HiOutlineTrash size={17} onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(employee)}} className="text-blue_gray-301"/>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                                <div className="mb-px mr-[3px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.delete")}</div>
                                </div>
                              </div>
                            </div>
                            <div className="relative group">
                              <FiEdit3 size={17} className="text-blue_gray-301" onClick={(e) => {
                                e.stopPropagation();
                                handleEditEmployee(employee._id)}}/>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                                <div className="mb-px mr-[3px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.edit")}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                :
                null}
              </table>
              {loading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                     <Loader />
                 </div>
                  ) :
              (!filteredEmployees?.length>0 && (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <PiUsersThin size={30} />
                    <Text
                      className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto"
                      size=""
                    >
                      {t('employee.noTeamMembers')} 
                    </Text>
                  </div>
                ))}
            </div>
            {filteredEmployees?.length>0 && (
                <div className='w-full flex items-center p-4'>
                    <TablePagination
                      currentPage={cur}
                      totalPages={totalPages}
                      // onPageChange={handlePageChange}
                      itemsToShow={pagesToShow}
                    />
                </div>
              )}
          </div>
        </div>
      </div>
      <DeleteModal isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal} title={t('employee.deleteEmployeeConfirmation.title')} 
        onDelete={() => handleDeleteEmployee()}
        content={
          <div className="flex flex-col gap-5 items-center justify-start w-auto sm:py-5 w-full">
            <Text
              className="font-dm-sans-regular text-center text-base text-[#1D1C21] leading-6"
              size=""
            >
              {t('employee.deleteEmployeeConfirmation.confirmationMessage')}
            </Text>
          </div>
        }/>
    </section>
    </>
  );
};

export default Employees;
