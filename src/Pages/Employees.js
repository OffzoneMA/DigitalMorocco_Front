import React, { useState } from "react";
import { Text } from "../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import TablePagination from "../Components/TablePagination";
import { useNavigate } from "react-router-dom";
import { PiUsersThin } from "react-icons/pi";
import DeleteModal from "../Components/DeleteModal";
import { employeesData } from "../data/tablesData";

const Employees = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 7;
  const pagesToShow = 4;

  const data = employeesData;

  const totalTablePages = Math.ceil(data.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

  function handlePageChange(page) {
    if (page >= 1 && page <= totalTablePages) {
      setCur(page);
    }
  }

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteRow(null);
  };

  const handleDelete = () => {
    console.log(deleteRow?.name);
  };

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-dmsans h-full items-start justify-start w-auto">
            <Text
              className="text-3xl font-bold leading-11 text-gray-900 w-full"
              size="txtDMSansBold32"
            >
              Company
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
            
            <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
              <Text
                className="text-lg leading-7 text-gray-900 pt-1"
                size="txtDmSansMedium16"
              >
                Team members
              </Text>
              <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursor-pointer rounded-md w-auto" 
              onClick={()=> navigate("/NewEmployee")}>
                <FaRegPlusSquare  size={18} className="mr-2"/>
                <button
                  type="button"
                  className="text-sm font-medium leading-[18.23px] text-white-A700"
                >
                  Add New Employee
                </button>
              </div>
            </div>

            <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
              <table className="w-full mx-auto table-auto">
                <thead>
                <tr className="text-sm leading-6">
                  <th className="p-3 text-left text-gray700 font-medium">Name</th>
                  <th className="p-3 text-left text-gray700 font-medium">Email address</th>
                  <th className="p-3 text-left text-gray700 font-medium">Title</th>
                  <th className="p-3 text-left text-gray700 font-medium">Type</th>
                  <th className="p-3 text-left text-gray700 font-medium">Status</th>
                  <th className="p-3 w-auto"></th>
                </tr>
                </thead>
                { pageData?.length > 0 ?
                <tbody className="font-DmSans text-sm font-normal leading-[26px] ">
                {pageData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex items-center " style={{}}>
                        <img src={item.userImg} alt="owner" className="hidden md:block h-9 w-9 mr-2 rounded-full"/>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray500">{item.email}</td>
                    <td className="py-3 px-3 text-gray500">{item.title}</td>
                    <td className="py-3 px-3 text-gray500">{item.type}</td>
                    <td className="py-3 px-3">
                      <div className={`flex flex-row items-center w-auto  px-1 font-DmSans text-xs font-medium leading-[18px] rounded-full ${
                        item.status === 'Active' ? 'bg-emerald-50 text-green-700' :
                            item.status === 'Offline' ? 'bg-gray-200 text-blue_gray-700' : ''
                      } inline-flex`}>
                        <GoDotFill size={10} className="mr-1"/>
                        {item.status}
                      </div>
                    </td>
                    <td className="py-3 px-3 ">
                      <div className="flex flex-row space-x-3 px-3 items-center">
                        <HiOutlineTrash size={17} onClick={() => openDeleteModal(item)} className="text-blue_gray-301"/>
                        <FiEdit3 size={17} className="text-blue_gray-301" onClick={()=> navigate("/NewEmployee")}/>
                      </div>
                      
                    </td>
                  </tr>
                ))}
                </tbody>
                :
                ""}
              </table>
              {!pageData?.length>0 && (
                  <div className="flex flex-col items-center w-full text-gray500 py-28">
                    <PiUsersThin size={30} c />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                      size=""
                    >
                      No Team Mmembers 
                    </Text>
                  </div>
                )}
            </div>
            {pageData?.length>0 && (
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
      <DeleteModal isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal} title="Delete Employee" 
                      onDelete={handleDelete}
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