import React, { useState } from "react";
import{Text } from "../components"
import { FiEdit3, FiSave } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import Pagination from "../components/Pagination";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 1;
  const itemsToShow = 4;
  const data = [
    {
      projectName: "Lorem Ipsum Project - Angel Round Investment",
      target: "USD 5,000,000",
      stage: "Angel Round",
      milestone: "Development",
      status: "Active",
    },
    {
      projectName: "Lorem Ipsum Product",
      target: "USD 1,000,000",
      stage: "Seed A",
      milestone: "Project Launch",
      status: "Active",
    },
    {
      projectName: "Taxi : Mobile app\n",
      target: "USD 2,500,000",
      stage: "Seed B",
      milestone: "Prototype Completion",
      status: "In Progress",
    },
    {
      projectName: "Project 4",
      target: "USD 4,000,000",
      stage: "Series A",
      milestone: "Product Launch",
      status: "Stand by",
    },
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


  return (
      <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                <Text
                  className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
                  size="txtDMSansBold32"
                >
                  Projects
                </Text>
              </div>
              <div className="flex md:flex-1 w-[22%] md:w-full rounded-md p-2 border border-solid">
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
                  className="md:text-3xl sm:text-[18px] text-[18px] text-gray-900 pt-1"
                  size="txtDMSansRegular16"
                >
                  Project List
                </Text>
                <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                  <FaRegPlusSquare  size={18} className="mr-2"/>
                  <button
                    type="submit"
                    className="text-base text-white-A700"
                  >
                    New Project
                  </button>
                </div>
              </div>
              <div className="bg-white-A700 border-b border-gray-200 flex flex-row md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className="table-auto overflow-auto">
                  <thead>
                  <tr className="bg-white-A700">
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Project Name</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Target</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Stage</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Milestone</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Status</th>
                    <th className="p-3 w-auto"></th>
                  </tr>
                  </thead>
                  <tbody className="items-center">
                  {pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="py-4 px-3 text-gray-600">{item.projectName}</td>
                      <td className="py-4 px-3 text-gray-600">{item.target}</td>
                      <td className="py-4 px-3 text-gray-600">{item.stage}</td>
                      <td className="py-4 px-3 text-gray-600">{item.milestone}</td>
                      <td className="py-4 px-3">
                        <div className={`flex flex-row space-x-2 items-center w-auto py-1 px-2 text-xs font-medium rounded-full ${
                          item.status === 'Active' ? 'bg-emerald-50 text-green-700' :
                            item.status === 'In Progress' ? 'bg-orange-100 text-orange-500' :
                              item.status === 'Stand by' ? 'bg-gray-200 text-blue_gray-700' : ''
                        } inline-flex`}>
                          <GoDotFill size={12} className="mr-2"/>
                          {item.status}
                        </div>
                      </td>
                      <td className="py-4 px-3 ">
                        <div className="flex flex-row space-x-3 p-3 items-center">
                          <HiOutlineTrash  className="text-blue_gray-300"/>
                          <FiEdit3 className="text-blue_gray-300"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className='w-full flex items-center p-4'>
                <Pagination
                  currentPage={cur}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Projects;