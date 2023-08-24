import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../Services/User.Service'
import toast from "react-hot-toast";
export default function UserProfile() {
  const { userInfo, loading } = useSelector((state) => state.auth)

  const [name, setName] = useState(userInfo?.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [update, responseUpdate] = useUpdateUserMutation()

    useEffect(()=>{
      setName(userInfo?.displayName)
    },[userInfo])
  useEffect(() => {
    responseUpdate?.error && toast.error("Something went wrong")
    if(responseUpdate?.isSuccess) {
    toast.success("Edited Successfuly !")
      setIsEditing(false)
  }
  }, [responseUpdate.isLoading])


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    update({ displayName: name })
  };

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
            My Profile
          </h2>
          {loading && 'Loading' }
          {!loading && 
                    <div className="flex gap-6 flex-col  mt-10 w-10/12">

           
              
                <div className="">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                 <div className="flex gap-8 items-center">
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    className=" p-2 border rounded-md w-full"
                      value={name ? name : ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                    <p className={`text-lg  w-full ${!name ? 'text-gray-600' : 'text-gray-900'}`}>{name ? name :'Please Enter Your Name'}</p>
                )}

                {isEditing ? (
                  <>
                  <button
                        className="px-4 h-fit py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-opacity-30 disabled:cursor-not-allowed"
                    onClick={handleSaveClick}
                          disabled={name?.length < 5 || !name || name?.length > 25 || responseUpdate.isLoading}
                  >
                 { responseUpdate.isLoading ?  'Loading' : 'Save'}
                 
                  </button>
                       { !responseUpdate.isLoading     &&        <button
                        className="px-4 h-fit py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={()=>{
                      setIsEditing(false)
                      setName(userInfo?.displayName)
                    }}
                  >
                    Cancel
                  </button>}
                    </>
                ) : (
                  <button
                    className="px-4 h-fit py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}



              </div>

            </div>
              








            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-2 text-lg text-gray-900">{userInfo?.email}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Creation Date
              </label>
              <p className="mt-2 text-lg text-gray-900">
                {new Date(userInfo?.dateCreated).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} 
                </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-2 text-lg text-gray-900">{userInfo?.role}</p>
            </div>
          </div>
          
          }

        </div>
      </div>
    </div>
  );
}
