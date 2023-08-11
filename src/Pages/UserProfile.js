import React, { useState } from 'react';

export default function UserProfile() {
  const [name, setName] = useState('Khadija el wazati');
  const [email, setEmail] = useState('khadija@email.com');
  const [dateCreation] = useState('08-08-2023'); 
  const [role] = useState('Member'); 
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {

    setIsEditing(false);
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
          <div className="flex-col items-center mt-10 w-10/12">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p className="mt-2 text-lg text-gray-900">{name}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="mt-2 text-lg text-gray-900">{email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Date de création
              </label>
              <p className="mt-2 text-lg text-gray-900">{dateCreation}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-2 text-lg text-gray-900">{role}</p>
            </div>
            <div className="flex justify-center">
              {isEditing ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
