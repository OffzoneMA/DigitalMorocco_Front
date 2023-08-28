import React, { useEffect, useState } from 'react';
import {  useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Pagination({ nbrPages }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(searchParams.get("page") || 1);

    const generatePageLinks = () => {
        const maxVisiblePages = 5; 

        if (nbrPages <= maxVisiblePages) {
            return Array.from({ length: nbrPages }, (_, i) => i + 1);
        }

        const pageLinks = [1];
        const middle = Math.floor(maxVisiblePages / 2);
        const start = current - middle;
        const end = current + middle;

        if (start > 1) {
            pageLinks.push('...'); 
        }

        for (let i = Math.max(2, start); i <= Math.min(nbrPages - 1, end); i++) {
            pageLinks.push(i);
        }

        if (end < nbrPages - 1) {
            pageLinks.push('...'); 
        }

        pageLinks.push(nbrPages);

        return pageLinks;
    };

    return (
        <div className='w-full flex items-center justify-center py-5'>
            <div className='flex '>
            <button
                onClick={() => {
                    setSearchParams({ page: (current - 1 )})
                    setCurrent(current-1)}}
                    className={`flex gap-2 text-gray500 border-gray-300 text-sm  items-center justify-center border border-r-0 px-2 py-2 rounded-l-full ${current <2 && 'invisible'}`}
            >
                <ArrowLeftIcon className='h-4 w-4 ' />
                Prev
            </button>
            {generatePageLinks().map((el, i) => (
                el === '...' ?
                <div className='px-3' key={i}> 
                 ...
                </div>
                :
                <button
                    key={i}
                        onClick={() => {
                            setSearchParams({ page: el })
                            setCurrent(el)
                        }}
                        className={` px-4  border border-gray-300 ${current == el ? 'text-white bg-gray700' : 'text-gray700 bg-white'}`}
                >
                     {el}
                </button>
            ))}
            <button
                onClick={() => {
                        setSearchParams({ page: (parseInt(current)  + 1) })
                    setCurrent(current + 1)
                }}
                    className={`flex gap-2 text-gray500 border-gray-300 text-sm items-center justify-center border border-l-0 px-2 py-2 rounded-r-full ${current ==nbrPages && 'invisible'}`}
            >
                Next
                    <ArrowRightIcon className='h-4 w-4 ' />

                </button></div>
        </div>
    );
}