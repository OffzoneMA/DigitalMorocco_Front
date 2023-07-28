import React from 'react';
export default function Success() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
            <p className="text-lg text-gray-600">
              Your action was successful. Thank you for using our service.
            </p>
            <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
              Continue
            </button>
          </div>
        </div>
      )
  
    }
 
  