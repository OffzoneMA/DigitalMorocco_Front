import React from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "../components";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

const NewMilestoneModal = (props) => {
  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[45%]"
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
                Add New Milestone
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
                Milestone Name
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="name"
                  placeholder="Milestone Name"
                />
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Due Date
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <input
                  type="text"
                  className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                  name="name"
                  placeholder="Due Date"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <MdOutlineDateRange size={20} className="text-blue_gray-300"/>
              </div>
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-gray-900_01 w-auto"
                size="txtDMSansLablel"
              >
                Description (Optinal)
              </Text>
              <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                <textarea
                  className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                  name="name"
                  rows={3}
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          <div className="flex items-end w-full mx-auto justify-end">
            <div className="flex space-x-5 w-auto">
              <button className="bg-gray-300 text-gray-700 py-3 px-5 font-dmsans text-base font-medium leading-5 tracking-normal rounded-lg">Cancel</button>
              <button className="ml-auto bg-blue-500 text-white-A700 py-3 px-5 font-dmsans text-base font-medium leading-5 tracking-normal rounded-lg">Add Milestone</button>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NewMilestoneModal;