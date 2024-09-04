import React, { useEffect, useState } from 'react'
import { LockClosedIcon, ClockIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { useAddNewRequestMutation } from '../../../Services/Auth';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Role({ UserStatus, UserId }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [file, setFile] = useState(null);
  const [addNewRequest, response] = useAddNewRequestMutation()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();


    useEffect(()=>{
     if(response.isSuccess)  {
       navigate(0)
     }
    },[response.isSuccess])


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('role', data.role);
  switch (data.role) {
    case "partner":
      formData.append('num_rc', data.num_rc);
      break;
      case "investor":
      formData.append('linkedin_link', data.linkedin_link);
        break;
      case "member":
        formData.append('rc_ice', file);
        break;
    default:
      break;}
    
    addNewRequest({ formdata: formData, userId: UserId })
    setSelectedOption('')
    setFile(null)
    reset()
  };

 
  return (
    <div
      className={`relative bg-white md:w-3/6 py-16  md:py-7 px-10 rounded-lg border-0 ring-2 ring-gray-300 ring-inset  ${UserStatus === "verified" && ' shadow-blue-500 '} ${UserStatus === "notVerified" && ' shadow-gray-300 '} ${UserStatus === "pending" && 'shadow-blue-600'}  ${UserStatus === "accepted" && 'shadow-green-500'} ${UserStatus === "rejected" && 'shadow-red-400'}
           shadow-2xl`}
    >

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/*   <img className="mx-auto h-10 w-auto" src="/img/offzoneLogo.jpg" alt="" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Step 2
        </h2>
      </div>
      {UserStatus === "verified" &&
        <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/*  form for Step 1 */}
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)} >
            <div className='w-full px-3'>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className='mt-2'>

                <select value={selectedOption} 
                  {...register("role", {
                    required: "You must select a role",
                  })}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }} data-te-select-init className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#98A2B3] focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6' >
                  <option value="">Select a role</option>
                  <option value="member">Member</option>
                  <option value="investor">Investor</option>
                  <option value="partner">Partner</option>
                </select>
                <span className="text-red-400 text-sm py-2">
                  {errors?.role?.message}
                </span>
                {selectedOption === 'member' && (
                  <div className='w-full mt-5'>
                    
                      <div className='mt-2'>
                        <label htmlFor="rcMember" className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                          Choose RC_ICE Document
                          <input
                          onChange={(event)=>setFile(event.target.files[0])}
                            id="rcMember"
                            name="rcMember"
                            type="file" // Utiliser "type=file" pour permettre le téléchargement de fichiers
                            autoComplete="rcMember"
                            required
                            accept=".pdf" // Limiter les types de fichiers acceptés aux fichiers PDF
                            className="hidden" // Masquer l'input de fichier natif
                          />
                       
                        </label><br/>
                      <span className='p-5 text-xs'>{file?.name}</span>
                      </div>
                   
                  </div>
                )}



                {selectedOption === 'investor' && (
                  <div className='w-full mt-2 '>
                    <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                      Linkedin Link
                    </label>
                    <div className='mt-2'>

                      <input
                        {...register("linkedin_link", {
                          required: {
                            value: true,
                            message: "You must enter your LinkedIn link",
                          },
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
                            message: "This needs to be a valid LinkedIn link",
                          }
                        })}
                        id="linkedin"
                        name="linkedin_link"
                        placeholder='Ex : https://www.linkedin.com/in/james-martin'
                        className="placeholder:text-xs block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#98A2B3] focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                      />
                      <span className="text-red-400 text-sm py-2">
                        {errors?.linkedin_link?.message}
                      </span>
                    </div>
                  </div>
                )}

                {selectedOption === 'partner' && (
                  <div className='w-full mt-2 '>
                    <label htmlFor="rcPartner" className="block text-sm font-medium leading-6 text-gray-900">
                      N° RC
                    </label>
                    <div className='mt-2'>

                      <input
                        {...register("num_rc", {
                          required: {
                            value: true,
                            message: "You must enter N° RC",
                          },
                        })}
                        id="rcPartner"
                        name="num_rc"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#98A2B3] focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                      />
                      <span className="text-red-400 text-sm py-2">
                        {errors?.num_rc?.message}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>




            <div className="mt-2 px-3">
              <button
                disabled={selectedOption=='member' && !file}
                type="submit"
                className="w-full mt-2 justify-center rounded-md disabled:cursor-not-allowed disabled:bg-gray-600 bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">

                {response.isLoading ? "Sending ..." : "Submit"} 
              </button>
            </div>
          </form>
        </div> }

      {UserStatus === "notVerified" && <div className='absolute bg-white top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-500 text-xl'>
        <LockClosedIcon className='w-10 h-10 ' />
          Complete Step 1
        </div>}

      {UserStatus === "pending" && <div className='absolute bg-white top-0 left-0 w-full h-full flex flex-col items-center justify-center text-blue-500 text-xl'>
        <ClockIcon className='w-10 h-10 ' />
        Your request is under review!
        <span className='text-xs italic text-slate-400'>We will send you a mail once the admin approves it</span>
      </div>}

      {UserStatus === "accepted" && <div className='absolute bg-white top-0 left-0 w-full h-full flex flex-col items-center justify-center text-green-500 text-2xl'>
        <CheckCircleIcon className='w-10 h-10 ' />
        Congratulations
        <span className='text-xs italic text-slate-400'>Your request has been accepted</span>
      </div>}

      {UserStatus === "rejected" && <div className='absolute bg-white top-0 left-0 w-full h-full flex flex-col items-center justify-center text-red-600-500 text-xl'>
        <XCircleIcon className='w-10 h-10 ' />
        Your request has been rejected 
      </div>}
      

    </div>
  )
}
