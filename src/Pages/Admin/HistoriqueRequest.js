import React from 'react';

const HistoriqueRequest = ({ request }) => {
    return (
      <tr className="border-b border-gray-200">
        <td className="px-6 py-4 text-gray-700 text-center">khadija@mail.com</td>
        <td className="px-6 py-4 text-gray-700 text-center">member</td>
        <td className="px-6 py-4 text-gray-700 text-center text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </td>
        <td className="px-6 py-4 text-gray-700 text-center">account creating</td>
      </tr>
    );
  };
  

export default HistoriqueRequest;
