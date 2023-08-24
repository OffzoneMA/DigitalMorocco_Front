import React, { useEffect, useState } from 'react';
import {  useSearchParams } from 'react-router-dom';

export default function Pagination({ nbrPages, link,tab }) {
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
        <div className='w-full flex justify-center items-center gap-2 py-5'>
        
            <button
                onClick={() => {
                    setSearchParams({ page: current - 1 })
                    tab && (window.location.hash = tab)
                    setCurrent(current-1)}}
                    className={`ring-1 px-2 py-1 rounded-lg ${current <2 && 'invisible'}`}
            >
                Prev
            </button>
            {generatePageLinks().map((el, i) => (
                el === '...' ?
                <div className='px-5'> 
                 ...
                </div>
                :
                <button
                    key={i}
                        onClick={() => {
                            setSearchParams({ page: el })
                            tab && (window.location.hash = tab)
                            setCurrent(el)
                        }}
                        className={` px-2 rounded-full ${current == el ? 'text-col1 bg-bleu1' : 'text-white bg-gray-300'}`}
                >
                    {el === '...' ? '...' : el}
                </button>
            ))}
            <button
                onClick={() => {
                    setSearchParams({ page: current + 1 })
                    tab && (window.location.hash = tab)
                    setCurrent(current + 1)
                }}
                className={`ring-1 px-2 py-1 rounded-lg ${current ==nbrPages && 'invisible'}`}
            >
                Next
            </button>
        </div>
    );
}