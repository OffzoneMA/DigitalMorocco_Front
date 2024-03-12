import React, { useState } from "react";
import { Text } from "../components";
import { FaRegPlusSquare } from "react-icons/fa";
import { CheckPicker, SelectPicker } from "rsuite";
import { IoImageOutline } from "react-icons/io5";
import 'rsuite/SelectPicker/styles/index.css';
import 'rsuite/CheckPicker/styles/index.css';

const MyCompany = () => {
  const [logoFile, setLogoFile] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const imageFile = droppedFiles[0];
      setLogoFile(URL.createObjectURL(imageFile));
    }
  };
  
  const companySectorData = ['Fintech', 'Healthtech', 'ECommerce', 'Edutech', 'CRM', 'Travel', 'HRM'].map(
    item => ({ label: item, value: item })
  );

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
              size="txtDMSansBold32"
            >
              Company
            </Text>
          </div>
          <div className="flex  w-[22%] md:w-full rounded-md p-2 border border-solid">
            <img
              className="cursor-pointer h-[18px] mr-1.5 my-px"
              src="images/img_search_blue_gray_700_01.svg"
              alt="search"
            />
            <input
              className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
            <FaRegPlusSquare  size={18} className="mr-2"/>
            <button
              type="submit"
              className="text-base text-white-A700"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex md:flex-col flex-row gap-8 items-start justify-start sm:px-5 px-8 w-full">
          <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Company Name
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Your Company Name"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Legal Name
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Your Company Legal Name"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Description
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <textarea
                  className={`!placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                  name="name"
                  rows={4}
                  placeholder="Write your company’s short description here"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Website
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Your Company Website"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Contact Email
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Your Company email"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Address
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Your Company address"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Country
              </Text>
              <SelectPicker size="md" data={companySectorData}
                           className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                           placeholder="Select Country"/>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                City/State
              </Text>
              <SelectPicker size="md" data={companySectorData}
                           className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                           placeholder="Select City"/>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Company Sector
              </Text>
              <CheckPicker size="md" data={companySectorData} searchable={false}
                            className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                            placeholder="Select Company Sector"/>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Tax Identifier Number
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="0000 - 0000 - 0000"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Corporate Identifier Number
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="0000 - 0000 - 0000"
                />
              </div>
            </div>
          </div>
          <div className="flex  flex-col items-start justify-start w-[35%] sm:w-full">
            <div className="flex flex-col gap-2 items-start justify-start w-full">
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansRegular16"
              >
                Company Logo
              </Text>
              <div className="bg-white-A700 border border-blue_gray-100_01 border-solid flex flex-col items-center justify-center rounded-md w-full"
                   onDragOver={handleDragOver}
                   onDrop={handleDrop}>
                {logoFile ? (
                  <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-auto py-[50px]" />
                ) : (
                <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 py-[50px] rounded-md w-full">
                  <IoImageOutline />
                  <div className="flex flex-col items-start justify-start w-auto">
                    <Text
                      className="text-[13px] text-base leading-6 tracking-normal w-auto"
                      size="txtDMSansRegular13"
                    >
                      Upload Your Logo
                    </Text>
                  </div>
                </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyCompany;