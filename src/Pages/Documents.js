import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate} from "react-router-dom";
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
import { useGetDocumentsForUserQuery , useCreateDocumentMutation , useUpdateDocumentMutation , useDeleteDocumentMutation} from "../Services/Document.Service";
import Loader from "../Components/Loader";
import { FaUserCircle } from "react-icons/fa";

const Documents = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const { data: documents, error, isLoading , refetch} = useGetDocumentsForUserQuery();
  const [createDocument, createResponse] = useCreateDocumentMutation(); 
  const [updateDocument, updateResponse] = useUpdateDocumentMutation();
  const [deleteDocument, deleteResponse] = useDeleteDocumentMutation();  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [dataRow , setDataRow] = useState(null);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 2;
  const itemsToShow = 4;
  const data = documents;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
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
    refetch();
  };
  const openEditModal = (rowData) => {
    setIsEditModalOpen(true);
    setDataRow(rowData);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDataRow(null);
    refetch();
  };

  const openShareModal = (rowData) => {
    setIsShareModalOpen(true);
    setDataRow(rowData);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setDataRow(null);
    refetch();
  };

  const handleDelete = () => {
    console.log(deleteRow?.projectName);
    try {
      deleteDocument(deleteRow?._id).unwrap();
      closeDeleteModal();
      refetch();
    } catch (error) {
      console.log(error)
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short', // 'Jun'
        day: 'numeric', // '6'
        year: 'numeric', // '2023'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit', // '02'
        minute: '2-digit', // '37'
        second: '2-digit', // '22'
        hour12: true, // 12-hour format with AM/PM
    });
    return `${formattedDate} ${formattedTime}`;
};
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Document
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
              <div className="flex flex-row flex-wrap items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 py-[19.5px] px-5">
                <TableTitle
                >
                  My Document
                </TableTitle>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row gap-[8px] h-[37px] items-center ml-auto px-[12px] rounded-md min-w-[206px] cursorpointer-green"
                  onClick={openNewModal}
                  type="button"
              >
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.375 12.125V13.175C17.375 14.6451 17.375 15.3802 17.0889 15.9417C16.8372 16.4357 16.4357 16.8372 15.9417 17.0889C15.3802 17.375 14.6451 17.375 13.175 17.375H5.825C4.35486 17.375 3.61979 17.375 3.05827 17.0889C2.56435 16.8372 2.16278 16.4357 1.91111 15.9417C1.625 15.3802 1.625 14.6451 1.625 13.175V12.125M13.875 6L9.5 1.625M9.5 1.625L5.125 6M9.5 1.625V12.125" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium leading-[18.23px]">Upload New Document</span>
              </button>
              </div>
              <div className="bg-white-A700 border-b border-gray-201 flex flex-col md:gap-5 flex-1 items-start justify-start w-full  min-h-[330px] overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Upload Date</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Document Name</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Upload By</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Share With</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Action</th>
                  </tr>
                  </thead>
                  { (pageData?.length > 0 && !isLoading) ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 `}>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                      {formatDate(item.uploadDate)}
                      </td>
                      <td className="px-[18px] py-4 text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                        <div className="flex items-center" >
                            <IoDocumentTextOutline size={17}  className="text-gray-900_01 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`${item?.title}.${item?.documentName?.split('.').pop()}`}</span>
                        </div>
                      </td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                        <div className="flex items-center" >
                          {item?.owner?.image ? (
                            <img src={item?.owner?.image} className="rounded-full h-8 w-8 mr-2" alt="" />
                          ) : (
                            <FaUserCircle className="h-8 w-8 mr-2 text-gray-500" /> // Placeholder icon
                          )}
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.owner?.displayName}</span>
                        </div>
                        </td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item.shareWith}</td>
                      <td className="px-[18px] py-4 ">
                        <div className="flex flex-row space-x-[18px] items-center">
                          <div className="relative group">
                            <FiEdit3 size={17} className="text-blue_gray-301" onClick={()=> openEditModal(item)}/>
                            <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                              <div className="mb-px mr-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                  <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                </svg>
                              </div>
                              <div className="bg-[#334081] w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">Edit</div>
                              </div>
                            </div>
                          </div>
                          <div className="relative group">
                            <HiOutlineTrash size={17} onClick={() => openDeleteModal(item)}  className="text-blue_gray-301"/>
                            <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                              <div className="mb-px mr-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                  <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                </svg>
                              </div>
                              <div className="bg-[#334081] w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">Delete</div>
                              </div>
                            </div>
                          </div>
                          <div className="relative group">
                            <FiShare2 size={17} className="text-blue_gray-301" onClick={() => openShareModal(item)}/>
                            <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                              <div className="mb-px mr-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                  <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                </svg>
                              </div>
                              <div className="bg-[#334081] w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">Share</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))) }
                  </tbody>
                  : 
                  ""
                }
                </table>
                {isLoading && (
                     <div className="flex items-center justify-center w-full h-full py-32">
                      <Loader />
                     </div>)
                }
                {(!isLoading && !pageData?.length>0) && (
                  <div className="flex flex-col gap-[16px] items-center  w-full py-28">
                    <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 14.5H7M10 20.5H7M19 8.5H7M25 13.75V8.2C25 5.67976 25 4.41965 24.5095 3.45704C24.0781 2.61031 23.3897 1.9219 22.543 1.49047C21.5804 1 20.3202 1 17.8 1H8.2C5.67976 1 4.41965 1 3.45704 1.49047C2.61031 1.9219 1.9219 2.61031 1.49047 3.45704C1 4.41965 1 5.67976 1 8.2V23.8C1 26.3202 1 27.5804 1.49047 28.543C1.9219 29.3897 2.61031 30.0781 3.45704 30.5095C4.41965 31 5.67976 31 8.2 31H12.25M28 31L25.75 28.75M27.25 25C27.25 27.8995 24.8995 30.25 22 30.25C19.1005 30.25 16.75 27.8995 16.75 25C16.75 22.1005 19.1005 19.75 22 19.75C24.8995 19.75 27.25 22.1005 27.25 25Z" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Text
                      className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto"
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
              onRequestClose={closeNewModal} onSubmit={createDocument} response={createResponse}
          />
          <NewDocumentModal isOpen={isEditModalOpen} rowData={dataRow}
              onRequestClose={closeEditModal} onSubmit={updateDocument} response={updateResponse}
          />
          <ShareDocumentToMembersModal isOpen={isShareModalOpen} rowData={dataRow}
              onRequestClose={closeShareModal} 
          />
          <DeleteModal isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal} title="Delete Document" 
            onDelete={handleDelete}
            content={
              <div className="flex flex-col gap-5 items-center justify-start sm:py-5 w-full">
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