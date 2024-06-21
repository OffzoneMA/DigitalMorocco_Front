import React, { useState } from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { FiEdit3, FiSave } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import TablePagination from "../Components/TablePagination";
import DeleteModal from "../Components/DeleteModal";
import { projectsData } from "../data/tablesData";
import { useGetAllProjectsQuery } from "../Services/Member.Service";
import { formatNumber } from "../data/helper";
import { useDeleteProjectMutation } from "../Services/Project.Service";
import Loader from "../Components/Loader";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import fileSearchImg from '../Media/file-search.svg';



const Projects = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const { data, error, isLoading , refetch } = useGetAllProjectsQuery();
  const [deleteProject, response] = useDeleteProjectMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 6;
  const itemsToShow = 4;
  // const data = projectsData;

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

  const handleDelete = async () => {
    try {
      await deleteProject(deleteRow?._id);
      closeDeleteModal();
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  return (
      <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex items-start justify-start sm:px-5 px-8 w-full">
            <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
                <PageHeader
                >
                  Projects
                </PageHeader>
              </div>
              <SearchInput className={'min-w-[25%]'}/>
            </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row flex-wrap  items-center border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <TableTitle
                  >
                  Project List
                </TableTitle>
                <button className="bg-blue-A400 hover:bg-[#235DBD] text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursorpointer-green rounded-md w-auto text-sm font-medium leading-[18.23px]" 
                onClick={() => navigate('/CreateProject')}>
                  <FaRegPlusSquare size={18} className="mr-2" />
                  <span style={{ whiteSpace: 'nowrap' }}>New Project</span>
                </button>
              </div>
              <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] ">
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Project Name</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Target</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Raised</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Stage</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Milestone</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-gray700 font-medium">Status</th>
                    <th scope="col" className="px-[18px] py-3 "></th>
                  </tr>
                  </thead>
                  { pageData?.length > 0 ?
                  <tbody className="items-center w-full ">
                   {
                      (pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 `} >
                      <td className="px-[18px] py-4 text-blue_gray-601 font-DmSans text-sm font-normal leading-6 cursorpointer" onClick={()=> navigate(`/Projectdetails/${item._id}` , {state: { project: item }})}>{item.name}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-DmSans text-sm font-normal leading-6">{`${item.currency} ${formatNumber(item.funding)}`}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-DmSans text-sm font-normal leading-6">{`${item.currency} ${formatNumber(item.totalRaised || 0)}`}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-DmSans text-sm font-normal leading-6">{item.stages[0]}</td>
                      <td className="px-[18px] py-4 text-blue_gray-601 font-DmSans text-sm font-normal leading-6">{item.milestones[0]?.name}</td>
                      <td className="px-[18px] py-4 items-center">
                        <div className={`items-center text-center h-[22px] pr-2 font-inter text-xs font-medium leading-[18px] rounded-full ${
                          item.status === 'Active' ? 'bg-emerald-50 text-green-700' :
                            item.status === 'In Progress' ? 'bg-light_blue-100 text-blue-501' :
                              item.status === 'Stand by' ? 'bg-gray-200 text-blue_gray-700' : ''
                        } inline-flex`}  style={{whiteSpace:'nowrap'}}>
                          <BsDot  size={28} className=""/>
                          {item.status}
                        </div>
                      </td>
                      <td className="py-4 px-4 ">
                        <div className="flex flex-row space-x-4 items-center">
                          <HiOutlineTrash size={17} onClick={() => openDeleteModal(item)}  className="text-blue_gray-301"/>
                          <FiEdit3 size={17} className="text-blue_gray-301" onClick={()=> navigate(`/EditProject/${item._id}` , {state: { project: item }})} />
                        </div>
                      </td>
                    </tr>
                  ))) }
                  </tbody>
                  : 
                  ""
                }
                </table>
                {isLoading ? (
                <div className="flex flex-col items-center text-blue_gray-601 w-full py-28">
                  <Loader />
                  </div>
                ) : (
                  !pageData?.length > 0 && (
                    <div className="flex flex-col items-center text-blue_gray-601 w-full py-28">
                    <img src={fileSearchImg} />
                      <Text
                        className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                        size=""
                      >
                        No Project Created
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
                  onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              
              </div>
              )}
              
            </div>
          </div>
        </div>

         <DeleteModal isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal} title="Delete Project" 
            onDelete={handleDelete}
            content={
              <div className="flex flex-col gap-5 items-center justify-start w-auto sm:py-5 w-full">
                <Text
                  className="font-DmSans text-center text-base font-normal leading-6"
                  size=""
                >
                  Are you sure you want to delete this project?
                </Text>
              </div>
            }/>
      </div>
  );
};

export default Projects;