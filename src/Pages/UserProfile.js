import React from 'react';

export default function UserProfile() {
  const userInfo = {
    name: 'Votre Nom',
    email: 'votre@email.com',
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
          <div className="flex-col items-center  mt-10 w-10/12 ">
            <form>
              <div className='grid grid-cols-2 mb-4 space-y-6'>
                <div className="">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="text-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Update
                </button>
              </div>
              </div>
              <div className='grid grid-cols-2 mb-4 space-y-6'>
                <div className="">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="text-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Update
                </button>
              </div>
              </div>

              <div className="mb-4 w-10/12">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
                <div>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mb-4 w-10/12">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                  Date Creation
                </label>
                <div>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
