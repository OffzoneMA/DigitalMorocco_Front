import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import TablePagination from "../Components/TablePagination";
import Loading from "../Components/Loading";
import NewEmployee from "./NewEmployee";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare, FaTrashAlt, FaPencilAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import { FiEdit3, FiSave } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";



const Employees = () => {
  const [employees, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;

  const fetchMembers = async (page) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`http://localhost:5000/members/employees?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMembers(response.data);
      const filteredEmployees = response.data.filter(employee => employee.owner === userId);
      setFilteredEmployees(filteredEmployees);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4353',
      cancelButtonColor: '#e4e7ec',
      confirmButtonText: 'Delete Now'
    });

    if (confirmation.isConfirmed) {
      try {
        const token = sessionStorage.getItem("userToken");
        await axios.delete(`http://localhost:5000/members/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Mettre à jour la liste des employés après suppression
        await fetchMembers(currentPage);
        // Afficher une alerte de succès
        Swal.fire("Success!", "Employee deleted successfully.", "success");
      } catch (error) {
        console.error("Error deleting employee:", error);
        // Afficher une alerte d'erreur
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleEditEmployee = (employeeId) => {
    // Trouver l'employé sélectionné dans la liste des employés
    const selectedEmployee = employees.find(employee => employee._id === employeeId);

    // Rediriger vers NewEmployee avec les données de l'employé sélectionné
    navigate("/NewEmployee", { state: { employee: selectedEmployee } });
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
            <div className="bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
              <table className="w-full text-sm text-left text-zinc-500">
                <thead className="text-xs text-gray700 ">
                  <tr className="text-sm leading-6 " >
                    <th scope="col" className="py-3 px-3 text-left">Name</th>
                    <th scope="col" className="py-3 px-3 text-left">Email Address</th>
                    <th scope="col" className="py-3 px-3 text-left">Title</th>
                    <th scope="col" className="py-3 px-3 text-left">Type</th>
                    <th scope="col" className="py-3 px-3 text-left">Status</th>
                    <th scope="col" className="py-3 px-3 text-left"></th>
                  </tr>
                </thead>
                <tbody >
                  {loading ? (
                     <div className="flex items-center justify-center w-full h-full">
                     <Loading />
                 </div>
                  ) : filteredEmployees.length === 0 ? (

                    <div style={{
                      height: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "-800px",
                    }}>
                      <div >
                        <FaUsers size={18} className="mr-2 w-4 h-4" style={{ color: "#98a2b3" }} />
                      </div>
                      <div>
                        <span>No team members</span>
                      </div>
                    </div>

                  ) : (
                    filteredEmployees.map((employee, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} bg-white `}>
                        <td className="py-3 px-3 text-left text-blue_gray-601" style={{ display: 'flex', gap:'12px', flexWrap: 'nowrap', alignContent: 'start',  alignItems: 'center' }}>
                          <img src={`${employee.image}`} alt="Employee Photo" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                           {employee.fullName}
                        </td>
                        <td className="py-3 px-3 text-left text-blue_gray-601">{employee.workEmail}</td>
                        <td className="py-3 px-3 text-left text-blue_gray-601">{employee.jobTitle}</td>
                        <td className="py-3 px-3 text-left text-blue_gray-601">{employee.level}</td>
                        <td className="py-3 px-3 text-blue_gray-601 capitalize">
                          {employee.status === 'active' ? (
                            <div className="flex items-center px-2 py-0.5 rounded-full h-8 text-left" style={{ width: "4.5rem", backgroundColor: "#ecfdf3" }}>
                              <span className="bg-green-500 h-2 w-2 rounded-full mr-1.5"></span>
                              <span className="text-green-800 text-xs font-semibold" style={{ color: "#027847" }}>{employee.status}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-1 rounded-full" style={{ width: "4.5rem", backgroundColor: "#eceff3" }}>
                              <span className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: "#646e83" }}></span>
                              <span className="text-xs font-semibold" style={{ color: "#333f53" }}>{employee.status}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 ">
                          <div style={{ display: 'flex', flexWrap: 'nowrap', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                            <HiOutlineTrash size={17} className="mr-1" style={{ color: "#98a2b3" }} onClick={() => handleDeleteEmployee(employee._id)} />
                            <FiEdit3 size={17} className="mr-2 " style={{ color: "#98a2b3" }} onClick={() => handleEditEmployee(employee._id)} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className='w-full flex items-center p-4'>
                <TablePagination currentPage={1} totalPages={1} itemsToShow={5} onPageChange={handlePageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
