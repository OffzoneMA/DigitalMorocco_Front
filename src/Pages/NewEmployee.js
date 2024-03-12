import React, {useState} from "react";
import { Text } from "../Components/Text";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { CheckPicker, SelectPicker } from "rsuite";
import { IoImageOutline } from "react-icons/io5";
import { PiUserSquare } from "react-icons/pi";

const NewEmployee = () => {
  const [photoEmp, setPhotoEmp] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const imageFile = droppedFiles[0];
      setPhotoEmp(URL.createObjectURL(imageFile));
    }
  };

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-dmsans h-full items-start justify-start w-auto">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
              size="txtDMSansBold32"
            >
              Company
            </Text>
          </div>
          <div className="flex  w-[22%] rounded-md p-2 border border-solid">
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
          
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <form className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
              <Text
                className="md:text-2xl sm:text-[16px] text-[16px] text-gray-900 pt-1"
                size="txtDMSansCardHeader"
              >
                Add Employee
              </Text>
              <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                <FiSave  size={18} className="mr-2"/>
                <button
                  type="submit"
                  className="text-base text-white-A700"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-5 md:px-5 w-full">
              <div className="flex flex-1 flex-col gap-6 py-5 items-start justify-start w-full">
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Full Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent !border-0`}
                      type="text"
                      name="name"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Work Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="name"
                      placeholder="Enter Work Email"
                    />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Personal Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="name"
                      placeholder="Enter Personal Email"
                    />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Phone Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="name"
                      placeholder="+212 - "
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
                      placeholder="Enter Address of Employee"
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
                  <SelectPicker size="md" data={[]}
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
                  <SelectPicker size="md" data={[]}
                                className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                placeholder="Select City"/>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Personal Tax Identifier Number
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
              <div className="flex py-5 flex-col items-start justify-start w-full md:w-[35%] lg:w-[35%] xl:w-[35%] 2xl:w-[35%] 3xl:w-[35%]">
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-blue_gray-100_01 border-solid flex flex-col items-center justify-center rounded-md w-full"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                  {photoEmp ? (
                    <img src={photoEmp} alt="Uploaded Logo" className="rounded-md w-full py-[5px]" />
                  ) : (
                    <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 py-[100px] rounded-md w-full">
                      <PiUserSquare  size={24} radius={8} className=""/>
                        <div className="flex flex-col items-start justify-start w-auto">
                          <Text
                            className="text-[13px] text-base leading-6 tracking-normal w-auto"
                            size="txtDMSansRegular13"
                          >
                            Upload Photo Here
                          </Text>
                        </div>
                    </div>
                    )}
                </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Job Title
                    </Text>
                    <SelectPicker size="md" data={[]}
                                  className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                  placeholder="Select position / title"/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Level
                    </Text>
                    <SelectPicker size="md" data={[]}
                                  className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                  placeholder="Select employee level"/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Department
                    </Text>
                    <SelectPicker size="md" data={[]}
                                  className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                  placeholder="Select Department"/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Start Date
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;