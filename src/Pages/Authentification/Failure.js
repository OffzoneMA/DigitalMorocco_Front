import React from 'react';
export default function Failure() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops, something went wrong!</h1>
            <p className="text-lg text-gray-600">
              We apologize for the inconvenience. Please try again later.
            </p>
            <button className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700">
              Go Back
            </button>
          </div>
        </div>
      )
    }
 
  

