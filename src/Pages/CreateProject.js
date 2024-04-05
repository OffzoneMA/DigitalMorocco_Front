import React, { useState,useRef } from "react";
import{Text } from "../Components/Text"
import { FiSave } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { MdOutlineDateRange, MdOutlineFileUpload } from "react-icons/md";
import { ImFileText2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {stage} from "../data/stage"
import MultipleSelect from "../Components/MultipleSelect";
import { stages as stagesData } from "../data/stage";

const CreateProject = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [focusedMilestone, setFocusedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([{ id: 1, name: '', dueDate: '' }]);
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [fundingValue , setFundingValue] = useState('');
  const [fileNames, setFileNames] = useState({});
  const [documentDivs, setDocumentDivs] = useState([{ id: 1 }]);
  const [droppedFiles, setDroppedFiles] = useState([]);

  const [selectedTeamsMembers , setSelectedTeamsMember] = useState([]);
  const [selectedStages , setSelectedStages] = useState([]);

  const formatFunding = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = formattedValue.replace(/(\d{3})/g, '$1 ').trim();
    setFundingValue(formattedValue);
  };

  const inputRefs = useRef([React.createRef()]);

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const formButtonRef = useRef();

  const handleFocus = (milestoneId) => {
    setFocusedMilestone(milestoneId);
  };
  const handleBlur = () => {
    setFocusedMilestone(null);
  };

  const addMilestone = () => {
    const newId = milestones.length + 1;
    setMilestones([...milestones, { id: newId, name: '', dueDate: '' }]);
  };

  const handleMilestoneChange = (e, id, field) => {
    const { value } = e.target;
    setMilestones(prevData => prevData.map(milestone => {
      if (milestone.id === id) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    }));
  };

  const addDocumentDiv = () => {
    const newId = documentDivs.length + 1;
    setDocumentDivs([...documentDivs, { id: newId }]);
    inputRefs.current = [...inputRefs.current, React.createRef()];
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];

    if (file) {
      const fileWithIndex = { name: file.name, index };
          setDroppedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[index] = fileWithIndex;
          return updatedFiles;
      });
  }
};


const handleFileInputChange = (event, index) => {
  const file = event.target.files[0];

  if (file) {
    const fileWithIndex = { name: file.name, index };
        setDroppedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = fileWithIndex;
        return updatedFiles;
    });
}
};


  const setFileName = (type, name) => {
    setFileNames(prevFileNames => ({ ...prevFileNames, [type]: name }));
  };

  const handleDrop1 = (event, type) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setDocuments(prevDocuments => [...prevDocuments, { file, type }]);
    setFileName(type, file.name);
  };

  const handleFileUpload1 = (event, type) => {
    const file = event.target.files[0];  
    if (file) {
      setDocuments(prevDocuments => [...prevDocuments, { file, type }]);
      setFileName(type, file.name);
    }
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const formData = new FormData();

  const onSubmit = (data) => {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("stage" , selectedStages)
    formData.append("listMember" ,selectedTeamsMembers);
    formData.append("milestones" , milestones);
    documents.forEach(({ file, type }) => {
      formData.append(`documents[${type}]`, file);
    });
      droppedFiles.forEach(({ name, index }) => {
      formData.append(`droppedFiles[${index}]`, name);
    });
    
    navigate("/Projects");
  };

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const teamMembersdataList = [
    {
      id: 1,
      imageSrc: 'images/img_avatar.png',
      name: 'Annette Black',
      job: 'Back End Developer',
    },
    {
      id: 2,
      imageSrc: 'images/img_avatar_62x62.png',
      name: 'Dianne Russell',
      job: 'Software Developer',
    },
    {
      id: 3,
      imageSrc: 'images/img_avatar_1.png',
      name: 'Floyd Miles',
      job: 'Software Development Manager',
    },
    {
      id: 4,
      imageSrc: 'images/img_avatar_2.png',
      name: 'Kathryn Murphy',
      job: 'Social Media Manager',
    },
    {
      id: 5,
      imageSrc: 'images/img_avatar_3.png',
      name: 'Cameron Williamson',
      job: 'Software Tester',
    },
    {
      id: 6,
      imageSrc: 'images/img_avatar_4.png',
      name: 'Darlene Robertson',
      job: 'Scrum Master',
    },
    {
      id: 7,
      imageSrc: 'images/img_avatar_5.png',
      name: 'Ralph Edwards',
      job: 'UI/UX Designer',
    },
];


  const StageData = stage.map(
    item => ({ label: item, value: item })
  );



  return (
      <div className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-12 pt-8 rounded-tl-[40px] h-full overflow-y-auto w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <Text
                className="text-3xl font-bold leading-11 text-gray-900 w-full"
                size="txtDmSansBold32"
              >
                Projects
              </Text>
            </div>
            <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
              <img
                className="cursor-pointer h-[18px] mr-1.5 my-px"
                src="images/img_search_blue_gray_700_01.svg"
                alt="search"
              />
              <input
                className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                type="text"
                name="search"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full pb-6">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                <Text
                  className="text-lg leading-7 text-gray-900_01 pt-1"
                  size="txtDmSansMedium16"
                >
                  Create New Project
                </Text>
                <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursor-pointer rounded-md w-auto" 
                onClick={()=> onButtonClick(formButtonRef)}>
                  <FiSave  size={18} className="mr-2"/>
                  <button
                  ref={formButtonRef}
                    type="submit"
                    className="text-base text-white-A700"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-6 pt-5 pb-9 bg-white-A700 w-full h-full">
                <div className="flex md:border-r border-indigo-50 pr-8 flex-1 flex-col gap-6 items-start justify-start w-full h-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Name
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <input
                        {...register("name", { required: {value:true , message: "Project Name is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="name"
                        placeholder="Enter Project Name"
                      />
                    </div>
                    {errors.name && <span className="text-sm font-DmSans text-red-500">{errors.name?.message}</span>}
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
                       {...register("details", { required: {value:true , message: "Project Details is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name="details"
                        rows={5}
                        placeholder="Write your project detals here"
                      />
                    </div>
                    {errors.details && <span className="text-sm font-DmSans text-red-500">{errors.details?.message}</span>}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Team Member
                    </Text>
                    <MultipleSelect id='teams' options={teamMembersdataList} onSelect={""} searchLabel='Search Client' setSelectedOptionVal={setSelectedTeamsMember} 
                    itemClassName='py-2 border-b border-indigo-50' placeholder='Assign Team Member to this Project' valuekey="name" optionkey="id"
                    content={
                      ( option) =>{ return (
                        <div className="flex items-center  space-x-3 ">
                          <img src={option.imageSrc} alt="teams" className="h-8 w-8 rounded-full"/>
                          <div className="flex flex-col gap-1.5 items-start justify-center w-full">
                            <Text
                              className="text-gray-900 text-sm w-auto"
                              size="txtDMSansRegular14Gray900"
                              >
                              {option.name}
                            </Text>
                            <Text
                              className="text-blue_gray-300 text-xs w-auto"
                              size="txtDMSansRegular12"
                              >
                              {option.job}
                            </Text>
                          </div>
                        </div>
                        );
                      }
                    }/>
                    {selectedTeamsMembers.length==0 && <span className="text-sm font-DmSans text-red-500">Please select teams members</span>}
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
                        {...register("target", { required: {value:true , message: "Project Funding Target is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name="target"
                        type="text"
                        value={fundingValue}
                        onChange={(e)=> formatFunding(e.target.value)}
                        placeholder="Enter Funding Target"
                      />
                    </div>
                    {errors.target && <span className="text-sm font-DmSans text-red-500">{errors.target?.message}</span>}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Stage
                    </Text>
                    <MultipleSelect id='stage' options={stagesData} onSelect={""} searchLabel='Select a stage' setSelectedOptionVal={setSelectedStages} 
                    placeholder="Select Stage" valuekey="name" optionkey="id"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-1.5 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.name}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    {selectedStages.length==0 && <span className="text-sm font-DmSans text-red-500">Please select stages</span>} 
                    
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Milestone
                    </Text>
                    {milestones.map((milestone, index) => (
                    <div key={milestone.id} className={`flex flex-row gap-2 items-start justify-start w-full`}>
                      <div className="flex md:flex-1 w-[55%] rounded-md p-2 border border-solid">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                          name={`name-${milestone.id}`}
                          placeholder="Enter your project milestone"
                          value={milestone.name}
                          onChange={e => handleMilestoneChange(e, milestone.id, 'name')}
                        />
                      </div>
                      <div className="flex  w-[30%] rounded-md p-2 border border-solid">
                        <input
                          type="text"
                          className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                          name={`due-date-${milestone.id}`}
                          placeholder="Due Date"
                          onFocus={(e) => {
                            handleFocus(milestone.id)
                            e.target.type = 'date';
                          }}
                          onBlur={(e) => {
                            handleBlur()
                            e.target.type = 'text';
                          }}
                          value={milestone.dueDate}
                          onChange={e => handleMilestoneChange(e, milestone.id, 'dueDate')}
                        />
                        <MdOutlineDateRange size={20} className={`${focusedMilestone === milestone.id ? 'hidden' : ''} text-blue_gray-300`}/>
                      </div>
                      {/* {index === milestones.length - 1 && ( */}
                        <div className="bg-light_blue-100 border border-solid border-blue-500 text-blue-500 flex flex-row md:h-auto items-center justify-center ml-auto p-[7px] rounded-md w-[15%]" 
                        onClick={addMilestone}>
                          <IoMdAdd size={18} className="mr-1" />
                          <button type="button"  className="text-base">
                            More
                          </button>
                        </div>
                      {/* )} */}
                    </div>
                    ))}
                  </div>
                </div>
                {/* <div className="bg-indigo-50 md:min-h-[750px] md:h-full h-px w-full md:w-px" /> */}
                {/* <div className="flex flex-col md:divide-x md:min-h-[750px] md:h-full divide-indigo-50 hover:divide-pink-400">
                  {` `}
                </div> */}
                <div className="flex flex-col gap-6 items-start justify-start md:w-[40%] w-full">
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
                       onDrop={(event) => handleDrop1(event, "Pitch Deck")}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Pitch Deck
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed cursor-pointer bg-blue_gray-50" 
                    onClick={()=> onButtonClick(inputRef)}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef}
                        onChange={(e) => handleFileUpload1(e, "Pitch Deck")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Pitch Deck file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500">choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["Pitch Deck"] && (
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["Pitch Deck"]}
                      </Text>
                    </div>
                    )}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={(event) => handleDrop1(event, "Business Plan")}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Business Plan
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 cursor-pointer border border-dashed bg-blue_gray-50" 
                    onClick={()=> onButtonClick(inputRef1)}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef1}
                        onChange={(e) => handleFileUpload1(e, "Business Plan")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Business Plan file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" >choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["Business Plan"] && (
                      <div className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["Business Plan"]}
                      </Text>
                    </div>
                    )}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={(event) => handleDrop1(event, "Financial Projection")}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Financial Projection
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed bg-blue_gray-50" 
                    onClick={()=> onButtonClick(inputRef2)}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef2}
                        onChange={(e) => handleFileUpload1(e, "Financial Projection")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Financial Projection file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" >choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["Financial Projection"] && (
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["Financial Projection"]}
                      </Text>
                    </div>
                    )}
                  </div>
                  {documentDivs.map((div, index) => (
                  <div key={div.id} className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-gray-900_01 w-auto" size="txtDMSansLablel">
                      Upload Other Document
                    </Text>
                    <div
                      className="flex md:flex-1 w-full md:w-full cursor-pointer rounded-md px-2 py-3 border border-dashed bg-blue_gray-50"
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => handleDrop(event, index)}
                      onClick={() => inputRefs.current[index]?.current?.click()}
                    >
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2" />
                      <input
                        ref={inputRefs.current[index]}
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name={`file-${index}`}
                        onChange={(event) => handleFileInputChange(event, index)}
                      />
                      <label className="font-manrope text-sm leading-18 tracking-wide text-left w-auto">
                      {isDragging ? <span className="text-blue_gray-300">Drop file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" >
                          choose file
                        </span>
                        </> 
                        }
                      </label>
                    </div>
                    {droppedFiles.map((file, fileIndex) => {
                      if (file.index === index) {
                        return (
                          <div key={fileIndex} className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                            <GrAttachment size={16} className="mr-2" />
                            <Text
                              className="flex-1 text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto "
                              size=""
                            >
                              {file.name}
                            </Text>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  ))}
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <div
                      className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-solid border-blue-500 bg-light_blue-100 items-center justify-center"
                      onClick={addDocumentDiv}
                    >
                      <ImFileText2 size={20} className="mr-2 text-blue-500" />
                      <button type="button" className="text-base text-blue-500 font-dmsans text-sm font-medium leading-18">
                        Add More Document
                      </button>
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

export default CreateProject;