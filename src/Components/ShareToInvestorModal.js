import React from "react";
import { default as ModalProvider } from "react-modal";
import { IoSearch } from "react-icons/io5";
import { Text } from "./Text";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";


const ShareToInvestorModal = (props) => {
  const investorsData = [
    {logo:"images/img_inv.svg" , name:"Venture Catalysts"},
    {logo:"images/img_inv1.svg" , name:"Startup Funding Club"},
    {logo:"images/img_inv2.svg" , name:"XYZ Combinator"},
    {logo:"images/img_inv3.svg" , name:"Techstars Atlanta"},
    {logo:"images/img_inv4.svg" , name:"Urban-X Accelerator"},
    {logo:"images/img_inv5.svg" , name:"Misk500 Accelerator"},
    {logo:"images/img_inv6.svg" , name:"Brendan Wallace"},
    {logo:"images/img_inv7.svg" , name:"NextLevel Management"},
    {logo:"images/img_inv7.svg" , name:"NextLevel Management"},
  ];

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[30%]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[93vh] sm:w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-3 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[8px] w-full">
            <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-4 mb-2 w-full">
              <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                <Text
                  className="md:text-xl text-[18px] text-gray-900 w-full"
                  size="txtDMSansCardHeader16"
                >
                  Share project to Investors
                </Text>
              </div>
              <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                  size={20}
                />
              </div>
            </div>
          <div className="flex w-full rounded-md p-2 border border-solid">
            <input
              className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
              type="text"
              name="search"
              placeholder="Search Investors"
            />
            <IoSearch size={18} className="text-gray-400 z-20 hover:text-gray-500"/>
          </div>
          <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto">
            {investorsData.map((item, index) => (
              <div key={index} className="flex items-center justify-start space-x-3 border-b border-gray-300 py-3">
                <label htmlFor={`check_inv_${index}`} className="cursor-pointer relative inline-flex items-center">
                  <input id={`check_inv_${index}`}
                         type="checkbox"
                         className="peer appearance-none w-[18px] h-[18px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-300 rounded-[6px] focus:ring-blue-500"/>
                  <IoIosCheckmark size={18} className="absolute left-0 top-0 transition opacity-0 peer-checked:opacity-100"/>
                </label>
                <img src={item.logo} alt="investors" className="h-8 w-8 rounded-full"/>
                <Text className="text-sm leading-6 tracking-normal" size="txtDMSansRegular14">
                  {item.name}
                </Text>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 md:space-x-5 w-auto">
                <button 
                onClick={props.onRequestClose}
                className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 
                md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">
                    Cancel
                </button>
                <button 
                className="ml-auto bg-blue-500 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans 
                text-base font-medium leading-5 tracking-normal rounded-lg">
                    Share to Selected Investors
                </button>
                
              </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default ShareToInvestorModal;