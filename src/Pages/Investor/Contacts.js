import React, { useEffect } from 'react'
import { useGetAllConatctsQuery } from "../../Services/Investor.Service";
import { toast } from 'react-hot-toast';

export default function Contacts() {
  const {data,isFetching,} = useGetAllConatctsQuery()


  return (
      <div className='pt-10'>

          <div className='px-10'>
            
              <h1 className='text-center text-5xl'>Your Contacts</h1>  
              
        {isFetching && "Loading Data"}
        {data?.length == 0 && "Nothing Found !"}

        {
          !isFetching && data?.length > 0 &&
          <div className='space-y-4 flex flex-col items-center gap-6 py-8'>
            {data?.map((el, i) => (
              <div key={i} className='w-[850px] 2xl:-[950px]  flex flex-col gap-3  ring-2 ring-gray-300 shadow-xl rounded-3xl py-4'>
                <div className='flex items-center justify-around py-2 ' >
                  <img src={el?.logo} className='self-center w-52 h-36 object-center object-contain ' alt="" />

                  <div className='space-y-2'>
                    <div>
                      <span>Company Name : </span>
                      <span className='italic  '>
                        <span className='italic text-gray-800'>{el?.companyName}</span>
                      </span>
                    </div>
                    <div>
                      <span>Website : </span>
                      <a
                        className='italic underline text-blue-500 cursor-pointer'
                        target='_blank'
                        href={el?.website}>Visit</a>
                    </div>
                    <div>
                      <span>Contact Email : </span>
                      <a
                        className='italic underline '
                        target='_blank'
                        href={"mailto:" + el?.contactEmail}>{el?.contactEmail}</a>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div>Country : <span className={`italic text-gray-500`}>{el?.country}</span></div>
                    <div>City : <span className={`italic text-gray-500`}>{el?.city}</span></div>
                    <div>Company Type : <span className={`italic text-gray-500`}>{el?.companyType}</span></div>

                  </div>
                </div>
      
                  <button
                  onClick={()=>{
                    toast.error("Feature is Coming Soon !")
                  }}
                  className='self-center transition-all duration-500 ease-in-out w-fit hover:opacity-30 p-2 bg-blue-500 text-white rounded-full'>
                        Contact Now
                        </button>
                   
              </div>
              
            ))

            }

          </div>


        }



              </div>
      </div>
  )
}
