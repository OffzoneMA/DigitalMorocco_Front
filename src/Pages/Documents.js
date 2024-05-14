import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { FiEdit3, FiSave } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import TablePagination from "../Components/TablePagination";
import DeleteModal from "../Components/DeleteModal";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import NewDocumentModal from "../Components/NewDocumentModal";
import ShareDocumentToMembersModal from "../Components/ShareDocumentToMembersModal";
import { documentsData } from "../data/tablesData";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";


const Documents = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [dataRow , setDataRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 5;
  const itemsToShow = 4;
  const data = documentsData;

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

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openNewModal = () => {
    setIsNewModalOpen(true);
  };

  const closeNewModal = () => {
    setIsNewModalOpen(false);
  };
  const openEditModal = (rowData) => {
    setIsEditModalOpen(true);
    setDataRow(rowData);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDataRow(null);
  };

  const openShareModal = (rowData) => {
    setIsShareModalOpen(true);
    setDataRow(rowData);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setDataRow(null);
  };

  const handleDelete = () => {
    console.log(deleteRow?.projectName);
  };
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Document
                  </PageHeader>
                </div>
                <SearchInput className={'min-w-[25%]'}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row flex-wrap items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <TableTitle
                >
                  My Document
                </TableTitle>
                <button
                  className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto cursor-pointer"
                  onClick={openNewModal}
                  type="button"
              >
                  <FiDownload size={18} className="mr-2" />
                  <span className="text-sm font-medium leading-[18.23px]">Upload New Document</span>
              </button>
              </div>
              <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-6">
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Upload Date</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Document Name</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Upload By</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Share With</th>
                    <th className="p-3 text-left text-blue_gray-800_01 font-medium">Action</th>
                  </tr>
                  </thead>
                  { pageData?.length > 0 ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.uploadDate}</td>
                      <td className="py-3 px-3 text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <IoDocumentTextOutline size={17}  className="text-gray-900_01 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.documentName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <img src={item.uploadByImage} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.uploadBy}</span>
                        </div>
                        </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.shareWith}</td>
                      <td className="py-3 px-3 ">
                        <div className="flex flex-row space-x-3 items-center">
                          <FiEdit3 size={17} className="text-blue_gray-301" onClick={()=> openEditModal(item)}/>
                          <HiOutlineTrash size={17} onClick={() => openDeleteModal(item)}  className="text-blue_gray-301"/>
                          <FiShare2 size={17} className="text-blue_gray-301" onClick={() => openShareModal(item)}/>
                        </div>
                      </td>
                    </tr>
                  ))) }
                  </tbody>
                  : 
                  ""
                }
                </table>
                {!pageData?.length>0 && (
                  <div className="flex flex-col items-center  w-full py-28">
                    <AiOutlineFileSearch size={30} className="text-gray500"/>
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray700 w-auto"
                      size=""
                    >
                      No Document Found
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
          <NewDocumentModal isOpen={isNewModalOpen}
              onRequestClose={closeNewModal} 
          />
          <NewDocumentModal isOpen={isEditModalOpen} rowData={dataRow}
              onRequestClose={closeEditModal} 
          />
          <ShareDocumentToMembersModal isOpen={isShareModalOpen} rowData={dataRow}
              onRequestClose={closeShareModal} 
          />
          <DeleteModal isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal} title="Delete Document" 
            onDelete={handleDelete}
            content={
              <div className="flex flex-col gap-5 items-center justify-start w-auto sm:py-5 w-full">
                <Text
                  className="font-DmSans text-center text-base font-normal leading-6"
                  size=""
                >
                  Are you sure you want to delete this document?
                </Text>
              </div>
            }/>
        </div>
    )
}

export default Documents;