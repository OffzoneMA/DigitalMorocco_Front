import React from 'react';

const Event = ({ event }) => {
  console.log(event)
    return (
      <tr className="border-b-2 bg-gray-50 border-white  ">
        <td className="px-6 py-2 text-sm text-gray-700 text-center">{event.owner?.email}</td>
        <td className="px-6 py-2 text-sm text-gray-700 text-center">{event.owner?.role ? event.owner?.role : "..." }</td>
        <td className="px-6 py-2  text-gray-700 text-center text-sm">
          {new Date(event.dateCreated ).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </td>
        <td className="px-6 py-2 text-sm text-gray-700 text-center">{event.type}</td>
      </tr>
    );
  };
  

export default Event;
