import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import TablePagination from "../Components/TablePagination";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare} from "react-icons/fa";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import DeleteModal from "../Components/DeleteModal";
import { PiUsersThin } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import Loader from "../Components/Loader";

const Employees = () => {
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
  const itemsPerPage = 7;
  const pagesToShow = 4;

  const data = filteredEmployees;
  const totalTablePages = Math.ceil(data.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }
  const pageData = getPageData();

  useEffect(() => {
    fetchMembers();
  } , []);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;

  const fetchMembers = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`http://localhost:5000/members/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(response.data);
      const filteredEmployees = response.data.filter(employee => employee.owner === userId);
      setFilteredEmployees(filteredEmployees);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalTablePages) {
      setCur(page);
    }
  };

  const handleDeleteEmployee = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        await axios.delete(`http://localhost:5000/members/employees/${employeId}`, {
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
    navigate("/NewEmployee", { state: { employee: selectedEmployee } });
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
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px] w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              Company
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'}/>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow  dark:border-gray-300">
            <div className="flex flex-row flex-wrap items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-300 dark:text-gray-400  py-3 px-5">
              <TableTitle
                  >
                  Team members
                </TableTitle>
              <button
                className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursor-pointer rounded-md w-auto"
                onClick={() => navigate("/NewEmployee")}
                type="button"
              >
                <FaRegPlusSquare size={18} className="mr-2" />
                <span className="text-sm font-medium leading-[18.23px]">Add New Employee</span>
              </button>
            </div>
            <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">                       
            <table className="w-full mx-auto table-auto">
              <thead>
                  <tr className="text-sm leading-6 " >
                  <th className="p-3 text-left text-[#344053] font-DmSans font-medium">Name</th>
                  <th className="p-3 text-left text-[#344053] font-DmSans font-medium">Email address</th>
                  <th className="p-3 text-left text-[#344053] font-DmSans font-medium">Title</th>
                  <th className="p-3 text-left text-[#344053] font-DmSans font-medium">Type</th>
                  <th className="p-3 text-left text-[#344053] font-DmSans font-medium">Status</th>
                  <th scope="col" className="p-3 w-auto"></th>
                  </tr>
                </thead>
                  {filteredEmployees?.length > 0 ?
                <tbody className="font-DmSans text-sm font-normal leading-[26px] ">
                  {(
                    filteredEmployees.map((employee, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        
                        <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex items-center " style={{}}>
                        <img src={ employee?.image || `data:image/png;base64,${employee.photo}`} alt="owner" className="hidden md:block h-9 w-9 mr-2 rounded-full"/>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.fullName}</span>
                      </div>
                    </td>
                        <td className="py-3 px-3 text-gray500">{employee.workEmail}</td>
                        <td className="py-3 px-3 text-gray500">{employee.jobTitle}</td>
                        <td className="py-3 px-3 text-gray500">{employee.level}</td>
                        <td className="py-3 px-3 text-gray500">
                          {employee.status === 'Active' ? (
                            <div className="flex items-center px-2 py-0.5 rounded-full h-8 text-center" style={{ width: "4.5rem", backgroundColor: "#ecfdf3" }}>
                              <span className="bg-green-500  rounded-full mr-1" style={{width:"7px", height:"7px"}}></span>
                              <span className="text-green-800 text-xs font-semibold" style={{ color: "#027847" }}>{employee.status}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-1 rounded-full" style={{ width: "4.5rem", backgroundColor: "#eceff3" }}>
                              <span className="rounded-full mr-1" style={{ width:"7px", height:"7px",backgroundColor: "#646e83" }}></span>
                              <span className="text-xs font-semibold" style={{ color: "#333f53" }}>{employee.status}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 ">
                          <div className="flex flex-row space-x-3 px-3 items-center">
                            <HiOutlineTrash size={17} onClick={() => openDeleteModal(employee)} className="text-blue_gray-301"/>
                            <FiEdit3 size={17} className="text-blue_gray-301" onClick={() => handleEditEmployee(employee._id)}/>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                :
                ""}
              </table>
              {loading ? (
                     <div className="flex items-center justify-center w-full h-full py-32">
                     <Loader />
                 </div>
                  ) :
              (!filteredEmployees?.length>0 && (
                  <div className="flex flex-col items-center w-full text-gray500 py-28">
                    <PiUsersThin size={30} />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                      size=""
                    >
                      No Team Mmembers 
                    </Text>
                  </div>
                ))}
              {filteredEmployees?.length>0 && (
                <div className='w-full flex items-center p-4'>
                    <TablePagination
                      currentPage={cur}
                      totalPages={totalTablePages}
                      onPageChange={handlePageChange}
                      itemsToShow={pagesToShow}
                    />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal} title="Delete Employee" 
                      onDelete={() => handleDeleteEmployee()}
                      content={
                        <div className="flex flex-col gap-5 items-center justify-start w-auto sm:py-5 w-full">
                          <Text
                            className="font-DmSans text-center text-base font-normal leading-6"
                            size=""
                          >
                            Are you sure you want to delete this employee?
                          </Text>
                        </div>
                      }/>
    </div>
  );
};

export default Employees;
