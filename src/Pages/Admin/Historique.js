import React from 'react';

import HistoriqueRequest from './HistoriqueRequest';

const Historique = () => {
 

  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                Email
              </th>
              <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                Role
              </th>
              <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                Date Event
              </th>
              <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
                <HistoriqueRequest  />
            
          </tbody>
        </table>
     
      </div>
    </div>
  );
};

export default Historique;
