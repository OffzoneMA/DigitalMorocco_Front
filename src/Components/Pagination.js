import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Pagination({ nbrPages, link }) {
    const [current, setCurrent] = useState(1);

    const generatePageLinks = () => {
        const maxVisiblePages = 5; // You can adjust the number of visible page links

        if (nbrPages <= maxVisiblePages) {
            return Array.from({ length: nbrPages }, (_, i) => i + 1);
        }

        const pageLinks = [1];
        const middle = Math.floor(maxVisiblePages / 2);
        const start = current - middle;
        const end = current + middle;

        if (start > 1) {
            pageLinks.push('...'); // Add ellipsis at the beginning
        }

        for (let i = Math.max(2, start); i <= Math.min(nbrPages - 1, end); i++) {
            pageLinks.push(i);
        }

        if (end < nbrPages - 1) {
            pageLinks.push('...'); // Add ellipsis at the end
        }

        pageLinks.push(nbrPages);

        return pageLinks;
    };

    return (
        <div className='w-screen flex justify-center items-center gap-2'>
        
            <NavLink
                onClick={() => setCurrent(current-1)}
                 to={link + '/' + (current - 1)}
                    className={`ring-1 px-2 py-1 rounded-lg ${current <2 && 'invisible'}`}
            >
                Prev
            </NavLink>
            {generatePageLinks().map((el, i) => (
                el === '...' ?
                <div className='px-5'> 
                 ...
                </div>
                :
                <NavLink
                    key={i}
                    onClick={() => setCurrent(el)}
                    to={link + '/' + el}
                        className={` px-2 rounded-full ${current === el ? 'text-col1 bg-bleu1' : 'text-white bg-gray-300'}`}
                >
                    {el === '...' ? '...' : el}
                </NavLink>
            ))}
            <NavLink
                onClick={() => setCurrent(current + 1)}
                to={link + '/' + (current + 1)}
                className={`ring-1 px-2 py-1 rounded-lg ${current ==nbrPages && 'invisible'}`}
            >
                Next
            </NavLink>
        </div>
    );
}