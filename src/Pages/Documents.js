import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { FiEdit3 } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
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
  const itemsPerPage = 5;
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
              <div className="flex flex-row flex-wrap items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700    py-4 px-5">
                <TableTitle
                >
                  My Document
                </TableTitle>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto cursorpointer-green"
                  onClick={openNewModal}
                  type="button"
              >
                  <FiDownload size={18} className="mr-2" />
                  <span className="text-sm font-medium leading-[18.23px]">Upload New Document</span>
              </button>
              </div>
              <div className="bg-white-A700 border-b border-gray-201 flex flex-col md:gap-5 flex-1 items-start justify-start w-full  min-h-[330px] overflow-x-auto">
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
                  { (pageData?.length > 0 && !isLoading) ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 `}>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.uploadDate}</td>
                      <td className="py-3 px-3 text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <IoDocumentTextOutline size={17}  className="text-gray-900_01 mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.documentName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">
                        <div className="flex items-center" >
                            <img src={item?.owner?.image} className="rounded-full h-8 w-8 bg-gray-300 mr-2" alt={""}/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.owner?.displayName}</span>
                        </div>
                        </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6">{item.shareWith}</td>
                      <td className="py-3 px-3 ">
                        <div className="flex flex-row space-x-3 items-center">
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
                  <div className="flex flex-col items-center  w-full py-28">
                    <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 14.5H7M10 20.5H7M19 8.5H7M25 13.75V8.2C25 5.67976 25 4.41965 24.5095 3.45704C24.0781 2.61031 23.3897 1.9219 22.543 1.49047C21.5804 1 20.3202 1 17.8 1H8.2C5.67976 1 4.41965 1 3.45704 1.49047C2.61031 1.9219 1.9219 2.61031 1.49047 3.45704C1 4.41965 1 5.67976 1 8.2V23.8C1 26.3202 1 27.5804 1.49047 28.543C1.9219 29.3897 2.61031 30.0781 3.45704 30.5095C4.41965 31 5.67976 31 8.2 31H12.25M28 31L25.75 28.75M27.25 25C27.25 27.8995 24.8995 30.25 22 30.25C19.1005 30.25 16.75 27.8995 16.75 25C16.75 22.1005 19.1005 19.75 22 19.75C24.8995 19.75 27.25 22.1005 27.25 25Z" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

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