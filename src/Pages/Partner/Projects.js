import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useGetAllProjectsQuery} from "../../Services/Partner.Service"
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Pagination from '../../Components/Pagination';
import ProjectDetails from '../../Components/ProjectDetails';


export default function Projects() {
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const handleCloseProjectDetails = () => {
    setSelectedProject(null);
    setIsProjectDetailsOpen(false);
  };
  const handleOpenProjectDetails = (project) => {
    setSelectedProject(project);
    setIsProjectDetailsOpen(true);
  };
  const {data,isFetching,} = useGetAllProjectsQuery()
  const projectsPerPage = 2; // Adjust as needed
  const totalProjects = data ? data.length : 0;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const startIndex = (currentPage - 1) * projectsPerPage;
const endIndex = startIndex + projectsPerPage;
const projectsToDisplay = data?.slice(startIndex, endIndex);


  return (
      <div className='pt-10'>

          <div className='px-10'>
            
              <h1 className='text-center text-5xl'>List of Projects</h1>  
              
        {isFetching && "Loading Data"}
        {data?.length == 0 && "Nothing Found !"}

        {
          !isFetching && data?.length > 0 &&
          <div className='space-y-4 flex flex-col items-center gap-6 py-8'>
            {projectsToDisplay?.map((el, i) => (
              <div key={i} className='w-[850px] 2xl:-[950px]  flex flex-col gap-3  ring-2 ring-gray-300 shadow-xl rounded-3xl py-4'>
                <div className='flex items-center justify-around py-2 ' >
                <img src={el?.owner?.logo} className='self-center w-52 h-36 object-center object-contain ' alt="" />
                  <div className='space-y-2'>
                  <div>
                      <span>Project Name : </span>
                      <span className='italic  '>
                        <span className='italic text-gray-800'>{el?.name}</span>
                      </span>
                    </div>
                
                    <div>
                    <span>Project funding: </span>
                      <span className='italic  '>
                      <span className='italic text-gray-800'>{ el?.funding} { el?.currency}</span>
                      </span>
                    </div>
                    </div>
                    <div className='space-y-2'>
                    <div>
                      <span>Company Name : </span>
                      <span className='italic  '>
                        <span className='italic text-gray-800'>{el?.owner?.companyName}</span>
                      </span>
                    </div>
                    <div>
                      <span>Website : </span>
                      <a
                        className='italic underline text-blue-500 cursor-pointer '
                        target='_blank'
                        href={el?.owner?.website}>
                        Visit
                        </a>
                    </div>
                    </div>
                </div>
                <div className='space-x-2 self-center'>
                  <button
                  onClick={()=>{
                    toast.error("Feature is Coming Soon !")
                  }}
                  className='self-center transition-all duration-500 ease-in-out w-fit hover:opacity-30 p-2 bg-blue-500 text-white rounded-full'>
                        Contact Now
                        </button>
                        <button
                           onClick={() => handleOpenProjectDetails(el)}
                            className="self-center transition-all duration-500 ease-in-out w-fit hover:opacity-30 p-2 bg-green-500 text-white rounded-full"
                          >
                            More Details
                          </button>
                   </div>
              </div>
              
            ))

            }
            <Pagination nbrPages={totalPages} currentPage={currentPage} />


          </div>


        }

              </div>
              {isProjectDetailsOpen && selectedProject && (
          <div className='fixed top-0 left-0 right-0 bottom w-full h-full bg-[#1D2939C2] bg-opacity-75 flex justify-center items-center'>
            <ProjectDetails project={selectedProject} onClose={handleCloseProjectDetails}  />
          </div>
        )}
      </div>
  )
}
