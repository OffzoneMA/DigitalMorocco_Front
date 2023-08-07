import React, { useEffect, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useApproveUserMutation, useRejectUserMutation } from '../../../Services/Admin.Service'
import toast from "react-hot-toast";

export default function Request({ el, reqType }) {
    const [Status, setStatus] = useState(null)
    const [approve, responseApprove] = useApproveUserMutation()
    const [reject, responseReject] = useRejectUserMutation()
    useEffect(() => {
        responseApprove?.error && toast.error("Something went wrong")
        if(responseApprove?.isSuccess){ 
             toast.success("User approved!")
            setStatus("Request Approved")
            }
    }, [responseApprove])
    useEffect(() => {
        responseReject?.error && toast.error("Something went wrong")
        if (responseReject?.isSuccess) {
            toast.success("User Rejected!")
            setStatus("Request Rejected")
        }
    }, [responseReject])

    return (

        <tr className="border-b border-gray-200">
       
                        <td className="px-6 py-4 text-gray-700 text-center">{el?.user?.email}</td>
                        <td className="px-6 py-4 text-gray-700 text-center">{reqType}</td>
                        <td className="px-6 py-4 text-gray-700 text-center text-sm">{new Date(el?.dateCreated).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        })}</td>
                        <td className="px-6 py-4 text-gray-700 text-center">
                            {reqType === "member" && <a target="_blank" href={el?.rc_ice} className="underline">Document Link</a>}
                            {reqType === "partner" && <span>{el?.num_rc}</span>}
                            {reqType === "investor" && <a target="_blank" className='underline text-blue-500' href={el?.linkedin_link}>{el?.linkedin_link}</a>}

                        </td>
                        <td className=" text-gray-700 text-center space-x-5 flex items-center justify-center p-3 ">
                            {
                                Status ? 
                            
                                <span className={`text-center px-8 py-3 ${Status == "Request Rejected" ? 'text-red-900 bg-red-400/20' :'text-green-900 bg-green-400/20' }   `}>
                                        {Status}
                                </span>
                                :
                        (responseApprove.isLoading || responseReject.isLoading) ?
                            'Loading ...'
                            :
                            <>
                                <button
                                    onClick={() => {
                                        toast((t) => (
                                            <div >
                                                Confirm Approve ?
                                                <button className='text-white bg-green-500 p-2 rounded-xl text-sm mx-3'
                                                    onClick={() => {
                                                        approve({ userId: el?.user?._id, role: reqType })
                                                        toast.dismiss(t.id)
                                                    }}>
                                                    Confirm
                                                </button>
                                            </div>
                                        ))
                                    }}
                                    className='flex items-center justify-center text-white bg-green-500 p-3 rounded-xl text-sm'>
                                    <CheckIcon className='h-4 w-4' />
                                    <span className='hidden sm:inline'>Approve</span>
                                </button>
                                <button
                                    onClick={() => {
                                        toast((t) => (
                                            <div >
                                                Confirm Reject ?
                                                <button className='text-white bg-red-500 p-2 rounded-xl text-sm mx-3'
                                                    onClick={() => {
                                                        reject({ userId: el?.user?._id, role: reqType })
                                                        toast.dismiss(t.id)
                                                    }}>
                                                    Reject
                                                </button>
                                            </div>
                                        ))
                                    }}
                                    className='flex items-center justify-center text-white bg-red-600 p-3 rounded-xl text-sm'>
                                    <XMarkIcon className='h-4 w-4' />
                                    <span className='hidden sm:inline'>Reject </span>
                                </button>
                            </>
                            }
                            

                        </td>
     
            

        </tr>
    )
}
