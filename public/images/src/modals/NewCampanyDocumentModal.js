import React from "react";
import { Text } from "../components";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange, MdOutlineFileUpload } from "react-icons/md";
import { default as ModalProvider } from "react-modal";
import { LuUploadCloud } from "react-icons/lu";

const NewCampanyDocumentModal = (props) => {
  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[40%]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
          <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <Text
                className="md:text-xl sm:text-[18px] text-[18px] text-gray-900 w-full"
                size="txtDMSansCardHeader16"
              >
                New Document
              </Text>
            </div>
            <IoCloseOutline  className='text-blue_gray-500'
                             onClick={props.onRequestClose}
                             size={20}
            />
          </div>
          <div className="flex flex-col gap-5 w-full max-h-[70vh] overflow-y-auto">
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Document Title
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Document Title"
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
                <input
                  type="text"
                  className={`!placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                  name="name"
                  placeholder="Document description"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                City/State
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <select
                  className={`!placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                  name="name"
                >
                  <option value="" disabled selected>
                    Select City
                  </option>
                </select>
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Upload Document
              </Text>
              <div className="flex flex-col items-center text-blue-700 justify-end gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-11 border border-solid">
                <LuUploadCloud  size={24} className=" mr-2"/>
                <Text className="font-dmsans text-base font-normal leading-6 tracking-normal">
                  Drop file or click here to upload your document
                </Text>
              </div>
            </div>

          </div>
          <div className="flex items-end w-full mx-auto justify-end">
            <div className="flex space-x-5 w-auto">
              <button className="bg-gray-300 text-gray-700 py-3 px-5 font-dmsans text-base font-medium leading-5 tracking-normal rounded-lg">Cancel</button>
              <button className="ml-auto bg-blue-500 text-white-A700 py-3 px-5 font-dmsans text-base font-medium leading-5 tracking-normal rounded-lg">Add Document</button>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NewCampanyDocumentModal;