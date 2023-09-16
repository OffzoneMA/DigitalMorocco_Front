import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ProjectDetails({project,onClose}){
    return(
    <div className="relative px-8 py-20 md:px-10 lg:px-20 xl:px-60 xl:py-40 2xl:px-40 3xl:px-80">
        <div className=" absolute px-8 my-6 mx-6 py-20 md:px-10 lg:px-20 xl:px-60 xl:py-40 -top-4 -right-4 2xl:px-40 3xl:px-80 2xl:-top-8 2xl:-right-8">
        <XMarkIcon className="h-6 w-6 2xl:h-10 2xl:w-10 text-[#F2F4F7] cursor-pointer hover:h-5 hover:w-5 hover:text-black 2xl:hover:h-11 2xl:hover:w-11 "  onClick={onClose} />
        </div>
         

              <div key={project.id} className='my-6 mx-6 bg-white ring-2 ring-gray-300 shadow-xl rounded-3xl space-y-2'>
              <div className="space-y-2 px-6 py-4">
                    <img src={project?.owner?.logo} className="float-left w-52 h-36 object-center object-contain mr-10 mb-6" alt="" />
                
                    <div> 
                      <span className="font-semibold">Company Name : </span>
                      <span className='  '>
                        <span className=' text-gray-800'>{project?.owner?.companyName}</span>
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Website : </span>
                      <span>
                      <a
                        className=' text-gray-800 underline cursor-pointer '
                        target='_blank'
                        href={project?.owner?.website}>
                        {project?.owner?.website}
                        </a></span>
                    </div>
                    <div>
                      <span className="font-semibold">Contact Email : </span>
                      <span>
                      <a
                        className=' text-gray-800 underline cursor-pointer '
                        target='_blank'
                        href={project?.owner?.contactEmail}>{project?.owner?.contactEmail}</a></span>
                    </div>
                    <div><span className="font-semibold">Country : </span><span className={` text-gray-500`}>{project?.owner?.country}</span></div>
                    <div><span className="font-semibold">City : </span><span className={` text-gray-500`}>{project?.owner?.city}</span></div>
                    <div><span className="font-semibold">Company Type : </span><span className={` text-gray-500`}>{project?.owner?.companyType}</span></div>
                  <div>
                      <span className="font-semibold">Project Name : </span>
                      <span className='  '>
                        <span className=' text-gray-800'>{project?.name}</span>
                      </span>
                    </div>
                
                    <div>
                    <span className="font-semibold">Project funding: </span>
                      <span className='  '>
                      <span className=' text-gray-800'>{ project?.funding} { project.currency}</span>
                      </span>
                    </div>
                    <div>
                    <span className="font-semibold">Details : </span>
                      <span className='  '>
                      <span className=' text-gray-800'>{ project?.details}</span>
                      </span>
                    </div>
                    <div>
                    <span className="font-semibold">Mile Stone Progress : </span>
                      <span className='  '>
                      <span className=' text-gray-800'>{ project?.milestoneProgress}</span>
                      </span>
                    </div>
                    </div>
                    </div>
                    </div>
                
                
            
          )
}