import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../Services/User.Service'
import toast from "react-hot-toast";
export default function Settings() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [update, responseUpdate] = useUpdateUserMutation()

  useEffect(() => {
    responseUpdate?.error && toast.error("Something went wrong")
    if (responseUpdate?.isSuccess) {
      toast.success("Password Changed Successfuly !")
      setIsEditingPassword(false)
      setPassword('')
      setPassword2('')
    }
  
  }, [responseUpdate.isLoading])


  return (
    <div className='grid place-items-center py-10'>
      <div className='bg-white min-w-[650px] space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
        <div className="sm:mx-auto">
          <img
            className="mx-auto h-10 w-auto"
            src="/img/Logo.jpg"
            alt=""
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Settings
          </h2>
 

          {!isEditingPassword &&<button
            className="px-4 h-fit py-1 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={()=>setIsEditingPassword(true)}
          >
            Change Password
          </button>
        }
          {responseUpdate.isLoading && "Loading"}
          {  isEditingPassword && !responseUpdate.isLoading &&
         <div className='space-y-2 mt-3'>  
              <div className='flex flex-col gap-2 items-start justify-center'>  
          <input
              type="password"
              id="password"
              className=" p-2 border rounded-md"
              placeholder='Enter your new password'
              autocomplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
             <input
              type="password"
              id="password2"
              className=" p-2 border rounded-md "
              placeholder='Repeat password'
              autocomplete="off"
              onChange={(e) => setPassword2(e.target.value)}
            />
              </div>
              {password.length < 6 && password.length > 1 && <p className='text-xs italic text-red-400'>Password must be at least 6 characters</p>}
              {password.length > 16 && <p className='text-xs italic text-red-400'>Password max 16 characters</p>}
              {password.length > 6 && password.length < 16 && password != password2 && <p className='text-xs italic text-red-400'>Password mismatch</p>}
              <button
                className=" disabled:cursor-not-allowed disabled:opacity-25 m-2 px-4 h-fit py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={password != password2 || password.length < 6 || password.length > 16}
                onClick={() => {
                  update({ password })
                }}
              >
                Save
              </button>
              <button
                className="px-4 h-fit py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setIsEditingPassword(false)}
              >
                cancel
              </button>
            </div> 
          }

      </div>
      </div>
    </div>
  )
}
