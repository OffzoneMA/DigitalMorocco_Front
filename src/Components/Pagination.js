import React, { useState } from 'react';
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
            <div className='flex font-dm-sans-medium text-[16px]'>
            <button
            disabled={current <2 }
                onClick={() => {
                    setSearchParams({ page: (current - 1 )})
                    setCurrent(current-1)}}
                    className={`flex gap-[10px] text-[#15143966] hover:text-white-A700 hover:bg-gray700 border-[#EBEAED] text-base  items-center justify-center border border-r-0 px-[16px] py-[14px] rounded-l-full ${current <2 && 'disabled'}`}
            >
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1663 6H0.833008M0.833008 6L5.83301 11M0.833008 6L5.83301 1" stroke="#667085" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
                        className={` px-4 w-[51px] hover:text-white-A700 hover:bg-gray700 border border-[#EBEAED] ${current === el ? 'text-white-A700 bg-gray700' : 'text-gray700 bg-white'}`}
                >
                     {el}
                </button>
            ))}
            <button
            disabled={current === nbrPages}
                onClick={() => {
                        setSearchParams({ page: (parseInt(current)  + 1) })
                    setCurrent(current + 1)
                }}
                    className={`flex gap-[10px] text-[#15143966] hover:text-white-A700 hover:bg-gray700 border-[#EBEAED] text-sm items-center justify-center border border-l-0 px-[16px] py-[14px] rounded-r-full ${current === nbrPages ? 'disabled' : ''}`}
            >
                Next
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.83301 10H17.1663M17.1663 10L12.1663 5M17.1663 10L12.1663 15" stroke="#667085" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button></div>
        </div>
    );
}