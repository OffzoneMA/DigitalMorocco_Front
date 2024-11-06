// TablePagination.js
import React , {useState , useEffect} from 'react';
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

function TablePagination({ totalPages, onPageChange = () => {}, itemsToShow }) {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (Number(searchParams.get("page")) !== currentPage) {
      setSearchParams({ page: currentPage }, { replace: true });
    }
  }, [currentPage, searchParams, setSearchParams]);

  // Function to handle page change and call onPageChange prop
  const goToPage = (page) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const generatePages = () => {
    const pageArray = [];
    let startPage = currentPage - Math.floor(itemsToShow / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + itemsToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  };

  const pages = generatePages();

  return (
    <div className='flex items-center justify-between w-full font-inter text-sm font-medium leading-5'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        className={`flex h-[36px] min-w-[114px] hover:text-[#7F56D9] hover:bg-[#F9F5FF] cursorpointer gap-2 text-gray700 border-gray-201 items-center justify-center border px-[14px] py-2 rounded-[8px] ${currentPage < 2 && 'opacity-50 diseable'}`}
        disabled={currentPage === 1}
      >
        <PiArrowLeftBold  className='h-4 w-4 ' />
        {t('pagination.previous')}
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center justify-center px-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={` w-[40px] hover:text-[#7F56D9] hover:bg-[#F9F5FF] h-[40px] flex items-center justify-center cursorpointer  rounded-[8px] ${currentPage === page ? 'text-[#7F56D9] bg-[#F9F5FF]' : 'text-gray500 bg-white-A700'}`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => goToPage(currentPage + 1)}
        className={`flex h-[36px] min-w-[88px] hover:text-[#7F56D9] hover:bg-[#F9F5FF] cursorpointer gap-2 text-gray700 border-gray-201 items-center justify-center border px-[14px] py-2 rounded-[8px] ${currentPage === totalPages && 'opacity-50 diseable'}`}
        disabled={currentPage === totalPages}
      >
        {t('pagination.next')}
        <PiArrowRightBold  className='h-4 w-4 ' />
      </button>
    </div>
  );
}

export default TablePagination;