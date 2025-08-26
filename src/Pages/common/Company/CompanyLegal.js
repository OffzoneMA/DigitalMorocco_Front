import React, { useState, useEffect } from "react";
import { Text } from "../../../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import NewCampanyDocumentModal from "../../../Components/Modals/FormModals/NewCampanyDocumentModal";
import { useSearchParams } from "react-router-dom";
import TablePagination from "../../../Components/common/TablePagination";
import DeleteModal from "../../../Components/common/DeleteModal";
import axios from "axios";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import Loader from "../../../Components/Loader";
import { formatDate } from "../../../data/helper";
import userdefaultProfile from "../../../Media/User.png";
import { useTranslation } from "react-i18next";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const CompanyLegal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentRow, setDocumentRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const pagesToShow = 4;
  const [legalDocuments, setLegalDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetchLegalDocuments();
  }, [cur]);

  const fetchLegalDocuments = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(
        `${process.env.REACT_APP_baseURL}/legal-documents/byuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: cur,
            pageSize: itemsPerPage,
          },
        }
      );
      setLegalDocuments(response.data?.documents);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching legal documents:", error);
      setLoading(false);
    }
  };

  // function handlePageChange(page) {
  //   if (page >= 1 && page <= totalPages) {
  //     setCur(page);
  //   }
  // }

  const documentData = legalDocuments;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (doc) => {
    setIsEditModalOpen(true);
    setDocumentRow(doc);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDocumentRow(null);
  };

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDocumentId(rowData?._id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDocumentId(null);
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      await axios.delete(
        `${process.env.REACT_APP_baseURL}/legal-documents/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchLegalDocuments();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddDocument = async (formData) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.post(
        `${process.env.REACT_APP_baseURL}/legal-documents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        fetchLegalDocuments();
        closeModal();
      } else {
        console.error("Échec de l'ajout du document");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditDocument = async (formData) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const documentId = formData.get("_id");
      const response = await axios.put(
        `${process.env.REACT_APP_baseURL}/legal-documents/${documentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchLegalDocuments();
        closeEditModal();
      } else {
        console.error("Échec de l'edit du document");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // const handleDownload = (documentData) => {
  //   if (typeof window === 'undefined') {
  //     console.error('This code must be executed in the browser.');
  //     return;
  //   }

  //   if (!documentData?.data) {
  //     console.error('Invalid document data');
  //     return;
  //   }

  //   // Extraire les données base64 après la virgule
  //   const base64Data = documentData.data.split(',')[1];
  //   if (!base64Data) {
  //     console.error('Invalid base64 data');
  //     return;
  //   }

  //   // Convertir les données base64 en octets
  //   const byteCharacters = atob(base64Data);
  //   const byteArray = new Uint8Array(byteCharacters.length);

  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteArray[i] = byteCharacters.charCodeAt(i);
  //   }

  //   // Créer un Blob à partir du tableau d'octets
  //   const blob = new Blob([byteArray], { type: documentData.type });

  //   // Créer une URL pour le Blob
  //   const url = URL.createObjectURL(blob);

  //   // Créer un lien pour initier le téléchargement
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = documentData.name || 'downloaded_file';

  //   // Assurez-vous que le lien est ajouté au DOM avant de cliquer dessus
  //   document.body.appendChild(link);
  //   link.click();

  //   // Nettoyer le DOM et libérer l'URL
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handleDownload = async (documentFile) => {
    try {
      // Vérifiez si le lien du document est valide
      if (!documentFile?.link) {
        console.error("Document link or name is missing");
        return;
      }

      // Téléchargez le fichier depuis l'URL
      const response = await fetch(documentFile.link);
      if (!response.ok) {
        throw new Error("Failed to fetch the document");
      }

      // Créez un blob à partir des données du fichier
      const blob = await response.blob();

      // Créez un lien de téléchargement temporaire
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = documentFile?.name || "document-file"; // Nom du fichier à télécharger
      document.body.appendChild(a);
      a.click();

      // Nettoyez le lien temporaire après le téléchargement
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error downloading the document:", error);
    }
  };

  return (
    <>
      <HelmetWrapper
        title={t("helmet.company.legal.title")}
        description={t("helmet.company.legal.description")}
        keywords={t("helmet.company.legal.keywords")}
        canonical={`${process.env.REACT_APP_URL}/CompanyLegal`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader>{t("sidebar.company.main")}</PageHeader>
            </div>
            <SearchInput className={"w-[240px]"} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
              <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle>{t("legal.title")}</TableTitle>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94]  text-white-A700 flex flex-row items-center ml-auto px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md w-auto cursorpointer"
                  onClick={openModal}
                  type="button"
                >
                  <FaRegPlusSquare size={21} className="mr-2" />
                  <span className="text-sm font-medium leading-[18.23px]">
                    {t("legal.addNewDocument")}
                  </span>
                </button>
              </div>
              <div
                className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${
                  documentData?.length > 0
                    ? "border-b border-gray-201"
                    : "rounded-b-[8px]"
                } w-full pb-4 min-h-[330px] overflow-x-auto`}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("legal.documentName")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("legal.lastModified")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("legal.owner")}
                      </th>
                      <th className="p-3 w-auto">{``}</th>
                    </tr>
                  </thead>
                  {documentData?.length > 0 ? (
                    <tbody className="font-dm-sans-regular text-sm leading-6">
                      {documentData.map((document, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          } hover:bg-blue-50 cursorpointer`}
                          onClick={() => openEditModal(document)}
                        >
                          <td className="px-[18px] py-4">
                            <div className="flex flex-row space-x-3 items-center">
                              <GrAttachment size={15} className="text-black" />
                              <span
                                className="text-gray500 capitalize"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >{`${document?.title}.${document?.name
                                ?.split(".")
                                ?.pop()}`}</span>
                            </div>
                          </td>
                          <td
                            className="py-4 px-[18px] text-gray500"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <time
                              dateTime={
                                document?.lastModifiedDate ||
                                document?.dateCreated
                              }
                              className="text-gray500"
                            >
                              {formatDate(
                                document?.lastModifiedDate ||
                                  document?.dateCreated
                              )}
                            </time>
                          </td>
                          <td className="px-[18px] py-4 text-gray-900_01">
                            <div className="flex flex-row space-x-3 items-center">
                              {document?.createdBy?.image ? (
                                <img
                                  src={document?.createdBy?.image}
                                  className="rounded-full h-9 w-9 "
                                  alt=""
                                />
                              ) : (
                                <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                  <img
                                    src={userdefaultProfile}
                                    alt=""
                                    className=""
                                  />
                                </div>
                              )}
                              <span
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {document?.createdBy?.displayName}
                              </span>
                            </div>
                          </td>
                          <td className="px-[18px] py-4 ">
                            <div className="flex flex-row space-x-3 px-3 items-center">
                              <div className="relative group">
                                <FiEdit3
                                  size={17}
                                  className="text-blue_gray-301"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditModal(document);
                                  }}
                                />
                                <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                                  <div className="mb-px mr-[3px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13"
                                      height="7"
                                      viewBox="0 0 13 7"
                                      fill="none"
                                    >
                                      <path
                                        d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                        fill="#2C3563"
                                      />
                                    </svg>
                                  </div>
                                  <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                    <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                      {t("common.edit")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative group">
                                <HiOutlineTrash
                                  size={17}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteModal(document);
                                  }}
                                  className="text-blue_gray-301"
                                />
                                <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                                  <div className="mb-px mr-[3px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13"
                                      height="7"
                                      viewBox="0 0 13 7"
                                      fill="none"
                                    >
                                      <path
                                        d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                        fill="#2C3563"
                                      />
                                    </svg>
                                  </div>
                                  <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                    <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                      {t("common.delete")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative group">
                                <FiDownload
                                  size={17}
                                  className="text-blue_gray-301"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(document);
                                  }}
                                />
                                <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end">
                                  <div className="mb-px mr-[3px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13"
                                      height="7"
                                      viewBox="0 0 13 7"
                                      fill="none"
                                    >
                                      <path
                                        d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                        fill="#2C3563"
                                      />
                                    </svg>
                                  </div>
                                  <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                    <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                      {t("common.download")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : null}
                </table>
                {loading ? (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                ) : (
                  !documentData?.length > 0 && (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                      <svg
                        width="29"
                        height="32"
                        viewBox="0 0 29 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 14.5H7M10 20.5H7M19 8.5H7M25 13.75V8.2C25 5.67976 25 4.41965 24.5095 3.45704C24.0781 2.61031 23.3897 1.9219 22.543 1.49047C21.5804 1 20.3202 1 17.8 1H8.2C5.67976 1 4.41965 1 3.45704 1.49047C2.61031 1.9219 1.9219 2.61031 1.49047 3.45704C1 4.41965 1 5.67976 1 8.2V23.8C1 26.3202 1 27.5804 1.49047 28.543C1.9219 29.3897 2.61031 30.0781 3.45704 30.5095C4.41965 31 5.67976 31 8.2 31H12.25M28 31L25.75 28.75M27.25 25C27.25 27.8995 24.8995 30.25 22 30.25C19.1005 30.25 16.75 27.8995 16.75 25C16.75 22.1005 19.1005 19.75 22 19.75C24.8995 19.75 27.25 22.1005 27.25 25Z"
                          stroke="#667085"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p
                        className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto"
                      >
                        {t("No Document Available")}
                      </p>
                    </div>
                  )
                )}
              </div>
              {documentData?.length > 0 && (
                <div className="w-full flex items-center p-4">
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
        <NewCampanyDocumentModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onSubmit={handleAddDocument}
        />
        <NewCampanyDocumentModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          documentFile={documentRow}
          onSubmit={handleEditDocument}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          title={t("legal.deleteDocumentConfirmation.title")}
          onDelete={() => handleDelete()}
          content={
            <div className="flex flex-col gap-5 items-center justify-start sm:py-5 w-full ">
              <p
                className="font-dm-sans-regular text-center text-base text-[#1D1C21] max-w-[420px] leading-6"
              >
                {t("legal.deleteDocumentConfirmation.confirmationMessage.text")}{" "}
                <span className="text-[#E02D3C]">
                  {t(
                    "legal.deleteDocumentConfirmation.confirmationMessage.highlightedText"
                  )}{" "}
                </span>
                {t(
                  "legal.deleteDocumentConfirmation.confirmationMessage.textAfter"
                )}
              </p>
            </div>
          }
        />
      </section>
    </>
  );
};

export default CompanyLegal;
