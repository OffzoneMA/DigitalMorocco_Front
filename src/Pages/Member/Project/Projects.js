import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import{Text } from "../../../Components/Text";
import { FiEdit3 } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { useSearchParams , useNavigate} from "react-router-dom";
import TablePagination from "../../../Components/common/TablePagination";
import DeleteModal from "../../../Components/common/DeleteModal";
import { useGetAllProjectsQuery } from "../../../Services/Member.Service";
import { useDeleteProjectMutation } from "../../../Services/Project.Service";
import Loader from "../../../Components/Loader";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import fileSearchImg from '../../../Media/file-search.svg';
import { useTranslation } from "react-i18next";
import StatusBadge from "../../../Components/common/StatusBadge";
import EmailExistModalOrConfirmation from '../../../Components/Modals/EmailExistModalOrConfirmation';
import checkVerified from '../../../Media/check-verified-02.svg';

const Projects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const [deleteProject, response] = useDeleteProjectMutation();
  const [deleteSuccesModal, setDeleteSuccesModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages , setTotalPages] = useState(0);
  const { data, error, isLoading , refetch } = useGetAllProjectsQuery({page :cur , pageSize: itemsPerPage});
  // const data = projectsData;

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);
  
  useEffect(() => {
    refetch();
  }, [cur, refetch]);


  useEffect(() => {
    setTotalPages(data?.totalPages)
  }, [data]);


  const pageData = data?.projects;

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

  const clodeDeleteSuccessModal = () => {
    setDeleteSuccesModal(false);
  }

  const handleDelete = async () => {
    try {
      await deleteProject(deleteRow?._id);
      closeDeleteModal();
      setDeleteSuccesModal(true);
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  return (
      <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex items-start justify-start sm:px-5 px-8 w-full">
            <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
                <PageHeader
                >
                  {t('sidebar.projects')}
                </PageHeader>
              </div>
              <SearchInput className={'w-[240px]'}/>
            </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
              <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle
                  >
                  {t('projects.projectList')}
                </TableTitle>
                <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] focus:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center gap-2 ml-auto px-[12px] py-[7px] h-[37px] cursorpointer rounded-md min-w-[133px] text-sm font-medium leading-[18.23px]" 
                onClick={() => navigate('/CreateProject')}>
                  <FaRegPlusSquare size={18} className="" />
                  <span style={{ whiteSpace: 'nowrap' }}>{t('projects.newProject')}</span>
                </button>
              </div>
              <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                <table className=" w-full" >
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.projectName')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.target')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.raised')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.stage')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.milestone')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('projects.status')}</th>
                    <th scope="col" className="px-[18px] py-3 "></th>
                  </tr>
                  </thead>
                  { pageData?.length > 0 ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer`} onClick={()=> navigate(`/Projectdetails/${item._id}` , {state: { project: item }})}>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize" >{item?.name}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item.currency} ${(item?.funding)?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}`}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item.currency} ${(item?.totalRaised || 0)?.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}`}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize">{t(item?.stage) || '-'}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize">{item.milestones[0]?.name}</td>
                      <td className="px-[18px] py-4 items-center">
                      <StatusBadge status={item?.status} />
                      </td>
                      <td className="py-4 px-4 ">
                      <div className="flex flex-row space-x-4 items-center">
                        <div className="relative group">
                          <HiOutlineTrash size={17} 
                            onClick={(e) => {e.stopPropagation(); 
                              openDeleteModal(item);
                            }}  
                            className="text-blue_gray-301"
                          />
                          <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                            <div className="mb-px mr-[3px]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                              </svg>
                            </div>
                            <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t('common.delete')}</div>
                            </div>
                          </div>
                        </div>
                        <div className="relative group">
                          <FiEdit3 
                            size={17} 
                            className="text-blue_gray-301 cursorpointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/EditProject/${item._id}`, { state: { project: item } });
                            }} 
                          />
                          <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                            <div className="mb-px mr-[3px]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                              </svg>
                            </div>
                            <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t('common.edit')}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </td>
                    </tr>
                  ))) }
                  </tbody>
                  : 
                  null
                }
                </table>
                {isLoading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                  <Loader />
                  </div>
                ) : (
                  !pageData?.length > 0 && (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <img src={fileSearchImg}  alt={""}/>
                      <Text
                        className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto"
                        size=""
                      >
                        {t('projects.noProject')}
                      </Text>
                    </div>
                  )
                )}
              </div>
              {pageData?.length>0 && (
                <div className='w-full flex items-center p-4'>
                <TablePagination
                  currentPage={cur}
                  totalPages={totalPages}
                  // onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              
              </div>
              )}
              
            </div>
          </div>
        </div>
        <DeleteModal isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal} title={t('projects.deleteProjectConfirmation.title')}
          onDelete={handleDelete}
          content={
            <Text
              className="font-dm-sans-regular text-[#1D1C21] text-center text-base leading-6"
            >
              {t('projects.deleteProjectConfirmation.confirmationMessage')}
            </Text>
          }/>
          <EmailExistModalOrConfirmation
            isOpen={deleteSuccesModal}
            onRequestClose={clodeDeleteSuccessModal}
            content={
              <div className="flex flex-col gap-[38px] items-center justify-start w-full">
                <img
                    className="h-[100px] w-[100px]"
                    src={checkVerified}
                    alt="successtick"
                />
                <div className="flex flex-col gap-5 items-center justify-start w-full">
                    <Text
                    className="leading-[26.00px] font-dm-sans-medium text-[18px] text-[#1d2838] text-center "
                    >
                        {t('projects.deleteProjectConfirmation.successMessage')}
                    </Text>
                </div>
              </div>
            }
        />
      </div>
  );
};

export default Projects;