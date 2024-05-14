import React, { useState, useEffect } from "react";
import { Text } from "../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import NewCampanyDocumentModal from "../Components/NewCampanyDocumentModal";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useSearchParams ,useNavigate } from "react-router-dom";
import TablePagination from "../Components/TablePagination";
import DeleteModal from "../Components/DeleteModal"; 
import axios from "axios";
import Loading from "../Components/Loading";


const CompanyLegal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [document , setDocument] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 7;
  const pagesToShow = 4;
  const data ='';
  const [legalDocuments, setLegalDocuments] = useState([]);
  const totalTablePages = Math.ceil(data.length / itemsPerPage);
  const [loading, setLoading] = useState(true);
  const [documentId, setDocumentId] = useState(null); 


  useEffect(() => {
    
    fetchLegalDocuments();
}, []);

const fetchLegalDocuments = async () => {
  try {
      const response = await axios.get("http://localhost:5000/members/legal-documents");
      console.log(response.data)
      setLegalDocuments(response.data);
      setLoading(false);
     
  } catch (error) {
      console.error("Error fetching legal documents:", error);
      setLoading(false); 
  }  };

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  function handlePageChange(page) {
    if (page >= 1 && page <= totalTablePages) {
      setCur(page);
    }
  }

  const documentData = legalDocuments;
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (doc) => {
    setIsEditModalOpen(true);
    setDocument(doc);
  
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDocument(null);

  };

    const openDeleteModal = (rowData) => {
      setIsDeleteModalOpen(true);
      setDeleteRow(rowData);
      setDocumentId(rowData?._id);
    };
  
    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setDeleteRow(null);
      setDocumentId(null);
    };

    const handleDelete = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        await axios.delete(`http://localhost:5000/members/legal-documents/${documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        await fetchLegalDocuments();
        closeDeleteModal();
        console.log("succees")
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };

    const handleAddDocument = async (formData) => {
      try {
          const userData = JSON.parse(sessionStorage.getItem("userData"));
          const userId = userData._id;
          
          const response = await axios.post(`http://localhost:5000/members/${userId}/legal-documents`, formData);
          
          if (response.status === 201) {
              console.log("Document ajouté avec succès");
              fetchLegalDocuments();
              closeModal();
          } else {
              console.error("Échec de l'ajout du document");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };

  const handleEditDocument = async (documentId,ownerId, formData) => {
    try {
      console.log(documentId, formData)
      const response = await axios.put(`http://localhost:5000/members/${ownerId}/legal-documents/${documentId}`, formData);
      console.log("Document updated successfully");
      fetchLegalDocuments();
      closeEditModal();
    } catch (error) {
      console.error("Error updating document:", error);
    
    }
  };  
  

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px] w-full">
    <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                <Text className="text-3xl font-bold leading-11 text-gray-900 w-full" size="txtDMSansBold32">
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
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-300">
                <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-300 dark:text-gray-400 py-4 px-5">
                    <Text className="text-lg leading-7 text-gray-900 pt-1" size="txtDmSansMedium16">
                        Legal Document
                    </Text>
                    <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                        <FaRegPlusSquare size={18} className="mr-2" />
                        <button onClick={openModal} type="button" className="text-sm font-medium leading-[18.23px] text-white-A700">
                            Add New Document
                        </button>
                    </div>
                </div>
                <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-DmSans text-sm leading-6">
                                <th className="p-3 text-left text-gray700 font-medium">Document Name</th>
                                <th className="p-3 text-left text-gray700 font-medium">Last Modified</th>
                                <th className="p-3 text-left text-gray700 font-medium">Owner</th>
                                <th className="p-3 w-auto"></th>
                            </tr>
                        </thead>
                        <tbody className="font-DmSans text-sm font-normal leading-6">
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {!loading &&
                                documentData.map((document, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="py-3 px-3" onClick={() => openEditModal(document)}>
                                            <div className="flex flex-row space-x-3 items-center">
                                                <GrAttachment size={15} className="text-black" />
                                                <span className="text-gray500" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {document.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3 text-gray500" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {document.lastModifiedDate}
                                        </td>
                                        <td className="py-3 px-3 text-gray-900_01">
                                            <div className="flex flex-row space-x-3 items-center">
                                                <img src={document.ownerImg} alt="owner" className="h-9 w-9 mr-2 rounded-full" />
                                                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{document.owner}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 ">
                                            <div className="flex flex-row space-x-3 px-3 items-center">
                                                <FiEdit3 size={17} className="text-blue_gray-301" onClick={() => openEditModal(document)} />
                                                <HiOutlineTrash size={17} onClick={() => openDeleteModal(document)} className="text-blue_gray-301" />
                                                <FiDownload size={17} className="text-blue_gray-301" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {!documentData?.length > 0 && (
                        <div className="flex flex-col items-center w-full text-gray500 py-28">
                            <AiOutlineFileSearch size={30} c />
                            <Text className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto" size="">
                                No Document Available
                            </Text>
                        </div>
                    )}
                </div>
                {documentData?.length > 0 && (
                    <div className="w-full flex items-center p-4">
                        <TablePagination currentPage={cur} totalPages={totalTablePages} onPageChange={handlePageChange} itemsToShow={pagesToShow} />
                    </div>
                )}
            </div>
        </div>
    </div>
    <NewCampanyDocumentModal isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleAddDocument} />
    <NewCampanyDocumentModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} documentFile={document} onSubmit={handleEditDocument} />
    <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} title="Delete" onDelete={() => handleDelete()} content={<div className="flex flex-col gap-5 items-center justify-start w-auto sm:py-5 w-full"><Text className="font-DmSans text-center text-base font-normal leading-6" size="">This will <span className="text-red-500">immediately and permanently</span> delete document.<br />Are you sure you want to delete this?</Text></div>} />
</div>
  );
};

export default CompanyLegal;