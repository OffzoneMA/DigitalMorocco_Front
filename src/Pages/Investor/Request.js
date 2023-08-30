import React from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUpdateConatctReqMutation } from '../../Services/Investor.Service';

export default function Request({el}) {
    const [update, response] = useUpdateConatctReqMutation()
  return (
      <div className='w-[850px] 2xl:-[950px]  flex flex-col gap-3  ring-1 ring-col1 shadow-md rounded-3xl py-4'>
          <div className='flex items-center justify-around py-2 ' >
              <img src={el?.member?.logo} className='self-center w-52 h-36 object-center object-contain ' alt="" />

              <div className='space-y-2'>
                  <div>
                      <span>Company Name : </span>
                      <span className='italic  '>
                          <span className='italic text-gray-800'>{el?.member?.companyName}</span>
                      </span>
                  </div>
                  <div>
                      <span>Website : </span>
                      <a
                          className='italic underline '
                          target='_blank'
                          href={el?.member?.website}>Visit</a>
                  </div>
                  <div>
                      <span>Contact Email : </span>
                      <a
                          className='italic underline '
                          target='_blank'
                          href={"mailto:" + el?.member?.contactEmail}>{el?.member?.contactEmail}</a>
                  </div>
              </div>
              <div className='space-y-2'>
                  {/* <div>status: <span className={`italic ${el.status == "accepted" && "text-green-400"} ${el.status == "rejected" && "text-red-400"} ${el.status == "pending" && "text-gray-500"}`}>{el.status}</span></div> */}
                  <div>Country : <span className={`italic text-gray-500`}>{el?.member?.country}</span></div>
                  <div>City : <span className={`italic text-gray-500`}>{el?.member?.city}</span></div>

              </div>
          </div>
          <div className=' flex items-center justify-center gap-7'>
              {response.isLoading && "Loading"}
              {response.isSuccess && response.data &&
                  <span className={`text-center px-8 py-3 ${response.data == "rejected" ? 'text-red-900 bg-red-400/20' : 'text-green-900 bg-green-400/20'}   `}>
                      {response.data}
                  </span>
              }

              {
                  !response.isLoading && !response.isSuccess && <> <button
                      onClick={() => update({ requestId: el._id, response: "accepted" })}
                      className='transition-all duration-500 ease-in-out hover:opacity-30 p-2 bg-green-300 text-green-800 rounded-full'><CheckIcon className="h-5 w-5" /></button>
                      <button
                          onClick={() => update({ requestId: el._id, response: "rejected" })}
                          className='transition-all duration-500 ease-in-out hover:opacity-30 p-2 bg-red-300 text-red-800 rounded-full'><XMarkIcon className="h-5 w-5" /></button>
                  </>}</div>
      </div>
  )
}
