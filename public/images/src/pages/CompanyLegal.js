import React, { useState } from "react";
import { Text } from "../components";
import { FaRegPlusSquare } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import NewCampanyDocumentModal from "../modals/NewCampanyDocumentModal";
import ShareToInvestorModal from "../modals/ShareToInvestorModal";
import { useSearchParams } from "react-router-dom";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

const CompanyLegal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 1;
  const pagesToShow = 4;
  const data = [
    {
      name: "Marketing Plan-Q2 [2023].pdf",
      lastModified: "Jun 6 2023 02:37:22 PM",
      owner: "Annette Black",
      ownerImg:"images/img_avatar.png"
    },
    {
      name: "Non-Disclosure Agreement (NDA).pdf",
      lastModified: "Jun 16 2023 02:37:22 PM",
      owner: "Darlene Robertson",
      ownerImg:"images/img_avatar_4.png"
    },
    {
      name: "Employment Contract_ Annette Black.pdf",
      lastModified: "Jun 4,2023 12:05:58 AM",
      owner: "Annette Black",
      ownerImg:"images/img_avatar.png"
    },
    {
      name: "Investor Pitch Deck Jun 2023.pdf",
      lastModified: "Jun 28,2023 04:01 PM",
      owner: "Annette Black",
      ownerImg:"images/img_avatar.png"
    },
    {
      name: "Mou Digital Morocco.pdf",
      lastModified: "Jun 14 2023 11:20:58 AM",
      owner: "Darlene Robertson",
      ownerImg:"images/img_avatar_4.png"
    },
    {
      name: "Partnership Agreement DM (2023).pdf",
      lastModified: "Jun 30 2023 12:20:56 PM",
      owner: "Cameron Williamson",
      ownerImg:"images/img_avatar_3.png"
    },
    {
      name: "Employee Handbook.pdf",
      lastModified: "Jun 22 2023 12:45:15 PM",
      owner: "Darlene Robertson",
      ownerImg:"images/img_avatar_4.png"
    },
    {
      name: "Quality Assurance (QA) Plan.pdf",
      lastModified: "Jun 1 2023 10:45:08 AM",
      owner: "Cameron Williamson",
      ownerImg:"images/img_avatar_3.png"
    }
  ];

  const totalDocumentsPages = Math.ceil(data.length / itemsPerPage);

  const generatePages = () => {
    const pageArray = [];
    let startPage = cur - Math.floor(pagesToShow / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + pagesToShow - 1, totalDocumentsPages);

    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  };

  const pages = generatePages();

  //const pages = Array.from({ length: totalDocumentsPages }, (_, i) => i + 1);


  const getPageData = () => {
    const startIndex = (num - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const documentData = getPageData();

  function Next() {
    if (num < totalDocumentsPages) {
      setNum(num + 1);
      setCur(num + 1);
    }
  }

  function previous() {
    if (num > 1) {
      setNum(num - 1);
      setCur(num - 1);
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
              size="txtDMSansBold32"
            >
              Company
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
                Legal Document
              </Text>
              <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                <FaRegPlusSquare  size={18} className="mr-2"/>
                <button
                  onClick={openModal}
                  type="submit"
                  className="text-base text-white-A700"
                >
                  Add New Document
                </button>
                <NewCampanyDocumentModal isOpen={isModalOpen} onRequestClose={closeModal}/>
              </div>
            </div>
            <div className="bg-white-A700 border-b border-gray-200 flex flex-row md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                <tr className="">
                  <th className="p-3 text-left text-blue_gray-800_01 font-medium">Document Name</th>
                  <th className="p-3 text-left text-blue_gray-800_01 font-medium">Date Modified</th>
                  <th className="p-3 text-left text-blue_gray-800_01 font-medium">Modified By</th>
                  <th className="p-3 w-auto"></th>
                </tr>
                </thead>
                <tbody>
                {documentData.map((document, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-4 px-3">
                      <div className="flex flex-row space-x-3 items-center">
                        <GrAttachment size={15} className="" />
                        <span className="text-gray-600">{document.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-gray-600">{document.lastModified}</td>
                    <td className="py-4 px-3 text-gray-600">
                      <div className="flex flex-row space-x-3 items-center">
                        <img src={document.ownerImg} alt="owner" className="h-9 w-9 mr-2 rounded-full"/>
                        {document.owner}
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
              <div className='flex items-center justify-between w-full font-inter text-sm font-medium leading-5'>
                <button
                  onClick={previous}
                  className={`flex gap-2 text-gray-700 border-gray-300 items-center justify-start border px-2 py-2 rounded-[8px] ${cur <2 && 'diseable'}`}
                >
                  <PiArrowLeftBold  className='h-4 w-4 ' />
                  Previous
                </button>
                <div className="flex items-center justify-center px-4">
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setNum(page );
                        setCur(page);
                      }}
                      className={` px-3 py-2 rounded-[8px] ${cur === page ? 'text-violet-500 bg-purple-50' : 'text-gray-600 bg-white-A700'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={Next}
                  className={`flex gap-2 text-gray-700 border-gray-300 items-center justify-end border px-2 py-2 rounded-[8px] ${cur === totalDocumentsPages && 'diseable'}`}
                >
                  Next
                  <PiArrowRightBold  className='h-4 w-4 ' />

                </button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLegal;