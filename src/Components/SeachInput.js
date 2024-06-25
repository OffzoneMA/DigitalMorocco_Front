import React, { useState } from "react";
import { HiSearch } from "react-icons/hi"; // Importez l'icône de recherche

const SearchInput = ({ setValue, className }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
        className="py-2.5 pl-8 min-w-[100px] w-full font-manrope text-[14px] placeholder-[#98A2B3] text-gray-700 font-normal leading-[18.2px] tracking-[0.01em] border border-[#D0D5DD] rounded-md px-4 focus:border-focusColor focus:shadow-inputBs"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
       width="16"
       height="16"
       viewBox="0 0 16 16"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       className="min-w-[16px] "
       >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M2 7.25C2 4.3505 4.3505 2 7.25 2C10.1495 2 12.5 4.3505 12.5 7.25C12.5 8.66446 11.9406 9.94827 11.031 10.8923C11.0054 10.912 10.9807 10.9337 10.9572 10.9572C10.9337 10.9807 10.912 11.0054 10.8923 11.031C9.94827 11.9406 8.66446 12.5 7.25 12.5C4.3505 12.5 2 10.1495 2 7.25ZM11.4633 12.5239L10.9572 12.0178C10.6878 11.7485 10.6662 11.3251 10.8923 11.031C10.9394 10.9857 10.9857 10.9394 11.031 10.8923C11.3251 10.6662 11.7485 10.6878 12.0178 10.9572L12.5239 11.4633C12.2107 11.8548 11.8548 12.2107 11.4633 12.5239ZM11.4633 12.5239L14.2197 15.2803C14.5126 15.5732 14.9874 15.5732 15.2803 15.2803C15.5732 14.9874 15.5732 14.5126 15.2803 14.2197L12.5239 11.4633C13.4476 10.3085 14 8.84376 14 7.25C14 3.52208 10.9779 0.5 7.25 0.5C3.52208 0.5 0.5 3.52208 0.5 7.25C0.5 10.9779 3.52208 14 7.25 14C8.84376 14 10.3085 13.4476 11.4633 12.5239Z"
         fill="#475467"
       />
      <path
         d="M10.9572 12.0178L11.4633 12.5239C11.8548 12.2107 12.2107 11.8548 12.5239 11.4633L12.0178 10.9572C11.7485 10.6878 11.3251 10.6662 11.031 10.8923C10.9857 10.9394 10.9394 10.9857 10.8923 11.031C10.6662 11.3251 10.6878 11.7485 10.9572 12.0178Z"
         fill="#475467"
       />
      </svg>
      </div>
    </div>
  );
};

export default SearchInput;
