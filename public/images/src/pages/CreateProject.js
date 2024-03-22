import React, { useState } from "react";
import{Text } from "../components"
import { CiSquarePlus } from "react-icons/ci";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { MdOutlineDateRange, MdOutlineFileUpload } from "react-icons/md";
import { ImFileText2 } from "react-icons/im";
import { IoIosCheckmark, IoMdAdd } from "react-icons/io";
import { CheckPicker } from "rsuite";
import 'rsuite/CheckPicker/styles/index.css';

const CreateProject = () => {
  const [files1, setFiles1] = useState(null);
  const [files2, setFiles2] = useState(null);
  const [files3, setFiles3] = useState(null);
  const [files4, setFiles4] = useState(null);

  const inputRef = React.useRef(null);
  const inputRef1 = React.useRef(null);
  const inputRef2 = React.useRef(null);
  const inputRef3 = React.useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop1 = (event) => {
    event.preventDefault();
    setFiles1(event.dataTransfer.files);
    console.log(files1);
  };

  const handleDrop2 = (event) => {
    event.preventDefault();
    setFiles2(event.dataTransfer.files);
  };

  const handleDrop3 = (event) => {
    event.preventDefault();
    setFiles3(event.dataTransfer.files);
  };

  const handleDrop4 = (event) => {
    event.preventDefault();
    setFiles4(event.dataTransfer.files);
  };

  const handleUpload = (files) => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll());
  };

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const teamMembersdataList = [
    {
      imageSrc: 'images/img_avatar.png',
      name: 'Annette Black',
      job: 'Back End Developer',
    },
    {
      imageSrc: 'images/img_avatar_62x62.png',
      name: 'Dianne Russell',
      job: 'Software Developer',
    },
    {
      imageSrc: 'images/img_avatar_1.png',
      name: 'Floyd Miles',
      job: 'Software Development Manager',
    },
    {
      imageSrc: 'images/img_avatar_2.png',
      name: 'Kathryn Murphy',
      job: 'Social Media Manager',
    },
    {
      imageSrc: 'images/img_avatar_3.png',
      name: 'Cameron Williamson',
      job: 'Software Tester',
    },
    {
      imageSrc: 'images/img_avatar_4.png',
      name: 'Darlene Robertson',
      job: 'Scrum Master',
    },
    {
      imageSrc: 'images/img_avatar_5.png',
      name: 'Ralph Edwards',
      job: 'UI/UX Designer',
    },
  ];


  return (
      <div className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-12 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex sm:flex-col flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-full"
                size="txtDMDashHeader"
              >
                Projects
              </Text>
            </div>
            <div className="flex md:flex-1 w-[22%] md:w-full rounded-md p-2 border border-solid">
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
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <Text
                  className="md:text-3xl sm:text-[18px] text-[18px] text-gray-900 pt-1"
                  size="txtDMSansCardHeader"
                >
                  Create New Project
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
              <div className="bg-white-A700 flex md:flex-col flex-row gap-8 items-start justify-start sm:px-5 px-6 py-5 w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Name
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <input
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="name"
                        placeholder="Enter Project Name"
                      />
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Details
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <textarea
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name="name"
                        rows={5}
                        placeholder="Write your project detals here"
                      />
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Team Member
                    </Text>
                    <CheckPicker size="md" data={teamMembersdataList}
                                 className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                                 placeholder="Assign Team Member to this Project"
                                 menuItemClassName="items-center border-b border-gray-300"
                                 menuClassName="border-b border-gray-300"
                                 valueKey="name"
                                 labelKey="name"
                                 renderMenuItem={(label, item) =>{ return (
                                   <div className="flex items-start justify-start space-x-3">
                                     <img src={item.imageSrc} alt="teams" className="h-8 w-8 rounded-full"/>
                                     <div className="flex flex-col gap-1.5 items-start justify-center w-full">
                                       <Text
                                         className="text-gray-900 text-sm w-auto"
                                         size="txtDMSansRegular14Gray900"
                                         >
                                          {item.name}
                                       </Text>
                                       <Text
                                         className="text-blue_gray-300 text-xs w-auto"
                                         size="txtDMSansRegular12"
                                         >
                                          {item.job}
                                        </Text>
                                      </div>
                                   </div>
                                   );
                                 }
                                }
                    />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Funding Target
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <BiDollar size={18}/>
                      <input
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name="name"
                        placeholder="Enter Funding Target"
                      />
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Stage
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <select
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name="name"
                      >
                        <option value="" disabled selected>
                          Select Stage
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Milestone
                    </Text>
                    <div className={`flex flex-row gap-2 items-start justify-start w-full`}>
                      <div className="flex md:flex-1 w-[55%] rounded-md p-2 border border-solid">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                          name="name"
                          placeholder="Enter your project milestone"
                        />
                      </div>
                      <div className="flex md:flex-1 w-[30%] rounded-md p-2 border border-solid">
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
                      <div className="bg-light_blue-100 text-blue-500 flex flex-row md:h-auto items-center justify-center ml-auto p-[7px] rounded-md w-[15%]">
                        <IoMdAdd   size={18} className="mr-1"/>
                        <button
                          type="submit"
                          className="text-base"
                        >
                          More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 h-[719px] md:h-px md:w-full w-px" />
                <div className="flex flex-col gap-6 items-start justify-start w-[40%] md:w-full sm:w-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansCardHeader16"
                    >
                      Upload Document
                    </Text>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={handleDrop1}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Pitch Deck
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed bg-blue_gray-50">
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef}
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" onClick={()=> onButtonClick(inputRef)}>choose file</span>
                      </label>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={handleDrop2}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Business Plan
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed bg-blue_gray-50">
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef1}
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" onClick={()=> onButtonClick(inputRef1)}>choose file</span>
                      </label>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={handleDrop3}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Financial Projection
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed bg-blue_gray-50">
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef2}
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" onClick={()=> onButtonClick(inputRef2)}>choose file</span>
                      </label>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Other Document
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full cursor-pointer rounded-md px-2 py-3 border border-dashed bg-blue_gray-50"
                         onDragOver={handleDragOver}
                         onDrop={handleDrop4}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef3}
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" onClick={()=> onButtonClick(inputRef3)}>choose file</span>
                      </label>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-solid border-blue-500 bg-light_blue-100 items-center justify-center">
                      <ImFileText2 size={20} className="mr-2 text-blue-500"/>
                      <button
                        type="submit"
                        className="text-base text-blue-500 font-dmsans text-sm font-medium leading-18"
                      >
                        Add More Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateProject;