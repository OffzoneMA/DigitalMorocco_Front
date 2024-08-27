import React, {useEffect, useRef, useState} from "react";
import {Text} from "../Components/Text"
import {FiSave} from "react-icons/fi";
import {MdOutlineFileUpload} from "react-icons/md";
import {ImFileText2} from "react-icons/im";
import {IoMdAdd} from "react-icons/io";
import {useForm} from "react-hook-form";
import {GrAttachment} from "react-icons/gr";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {stage, stage as stagesData} from "../data/stage";
import {Country} from 'country-state-city';
import MultipleSelect from "../Components/MultipleSelect";
import CustomCalendar from "../Components/CustomCalendar";
import {useCreateProjectMutation, useUpdateProjectMutation} from "../Services/Member.Service";
import {useGetProjectByIdQuery , useDeleteMilestoneMutation} from "../Services/Project.Service";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import SimpleSelect from "../Components/SimpleSelect";
import fundImg from '../Media/funding.svg';
import axios from "axios";
import {companyType} from "../data/companyType";
import { IoImageOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

const CreateProject = () => {
  const dividerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [maxDivHeight, setDivMaxHeight] = useState('720px');
  useEffect(() => {
    const setMaxHeight = () => {
      const div1Height = div1Ref.current.clientHeight;
      const div2Height = div2Ref.current.clientHeight;
      const maxHeight = Math.max(div1Height, div2Height);
      if (window.innerWidth >= 768) { 
        dividerRef.current.style.height = `${maxHeight}px`;
        setDivMaxHeight(`${maxHeight}px`);
      } else {
        dividerRef.current.style.height = '1px';
        setDivMaxHeight('auto');
      }
    };
  
    setMaxHeight();
  
    const intervalId = setInterval(() => {
      setMaxHeight(); 
    }, 10); 
  
    return () => {
      clearInterval(intervalId); 
    };
  }, [div1Ref, div2Ref]);
  const [deleteMilestone] = useDeleteMilestoneMutation();
  const [loadingDel, setLoadingDel] = useState(null);
  const { loading, userInfo } = useSelector((state) => state.auth)
  const location = useLocation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(location.state?.project || null);
  const { data: fetchedProject, error, isLoading , refetch } = useGetProjectByIdQuery(projectId, {
    skip: Boolean(project || !projectId || loadingDel === null),
  });
  const [submitting, setSubmitting] = useState(null);
  const [Mount, setMount] = useState(true)
  const [focusedMilestone, setFocusedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [fundingValue, setFundingValue] = useState(null);
  const [raisedValue, setRaisedValue] = useState('');
  const [logoFile, setLogoFile] = useState(project?.logo || null);
  const [imgFile , setImgFile] = useState(null);
  const [fileNames, setFileNames] = useState({});
  const [documentDivs, setDocumentDivs] = useState([{ id: 1 }]);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState('');
  const [selectedTeamsMembers, setSelectedTeamsMember] = useState([]);
  const [selectedProjectTeamsMembers, setSelectedProjectTeamsMember] = useState([]);
  const [selectedSector, setselectedSector] = useState("");
  const dataCountries = Country.getAllCountries();
  const [selectedCountry , setSelectedCountry] = useState(null);
  const [selectedStage, setSelectedStage] = useState("");
  const [addProjet, addResponse] = useCreateProjectMutation();
  const [updateProject, updateResponse] = useUpdateProjectMutation();
  const mutation = projectId ? updateProject : addProjet;
  const response = projectId ? updateResponse : addResponse;
  const [members, setMembers] = useState([]);


   /**
   * Utility function to format numbers with spaces as thousand separators.
   * 
   * @param {number|string} number - The number to be formatted.
   * @returns {string} The formatted number as a string.
   */
   function formatNumber(number) {
    if (number !== null && number !== undefined) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return '';
  }

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm(project !=null && {
    defaultValues: {
      name: project?.name,
      details: project?.details,
      website: project?.website,
      contactEmail: project?.contactEmail,
      funding : formatNumber(project?.funding),
      totalRaised : formatNumber(project?.totalRaised)
    }
  });

  // useEffect(() => {
  //   if (userInfo && userInfo.member) {
  //     setTeamData(userInfo.member.listEmployee?.map(employee => {
  //       const { _id, ...rest } = employee;
  //       return rest;
  //     }));
  //   } else {
  //     const userData = JSON.parse(sessionStorage.getItem('userData'));
  //     if (userData && userData.member) {
  //       setTeamData(userData.member.listEmployee?.map(employee => {
  //         const { _id, ...rest } = employee;
  //         return rest;
  //       }));
  //     }
  //   }
  // }, [userInfo]);
  
  useEffect(() => {
    if ((fetchedProject && !project) || (loadingDel !== null && fetchedProject) ) {
      setProject(fetchedProject);
    }
  }, [fetchedProject, project]);

  const fetchMembers = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/employee/byuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
      fetchMembers();
  }, []);

  useEffect(() => {
    let listEmployee;

    if (members.length > 0) {
      listEmployee = members.map(employee => {
        const { _id, ...rest } = employee;
        return rest;
      });
    } 
    if (project != null) {
      const selectedProjectMembers = members?.filter(emp => {
        return project.listMember?.some(member => member === emp._id);
      });

      setSelectedTeamsMember(selectedProjectMembers);
      setSelectedProjectTeamsMember(selectedProjectMembers);
    }
  }, [project, members]);
  

  useEffect(() => {
    if (project) {
      setFundingValue(formatNumber(project.funding));
      setRaisedValue(formatNumber(project.totalRaised));

      const initialFormattedMilestones = project.milestones
      ?.filter(milestone => milestone?._id)  
      .map((milestone, index) => ({
        id: index + 1,
        _id: milestone._id,
        name: milestone.name,
        dueDate: new Date(milestone.dueDate),
      }));
      setMilestones(initialFormattedMilestones);

      const otherDocuments = project.documents?.filter(document => document.documentType === "other") || [{ id: 1 }];
      if(otherDocuments?.length > 0) {
        setDocumentDivs(otherDocuments.map((_, index) => ({ id: index + 1 })));
        setDroppedFiles(otherDocuments.map((document, index) => ({
          name: document.name,
          index: index
        })));
      }

      const initialFileNames = {};
      project.documents?.forEach(document => {
        if (!initialFileNames[document.documentType]) {
          initialFileNames[document.documentType] = '';
        }
        initialFileNames[document.documentType] = document.name;
      });
      setFileNames(initialFileNames);

      setSelectedStage(project?.stage || '');

      // if (project?.country) {
      //   const defaultCountry = dataCountries.find(country => country.name === project.country);
      //   setSelectedCountry(defaultCountry);
      // }
    }
    else{
      setMilestones([{ id: 1 , _id: null, name: '', dueDate: '' }]);
    }
  }, [project]);

  const formatFunding = (value ) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setRaisedValue(formattedValue);
    setValue("totalRaised", formattedValue, { shouldValidate: true }); // Update form value and trigger validation
    trigger("totalRaised"); // Manually trigger validation
  };

  const formatFundingValue = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setFundingValue(formattedValue);
    setValue("funding", formattedValue, { shouldValidate: true }); // Update form value and trigger validation
    trigger("funding"); // Manually trigger validation
  };

  const inputRefs = useRef([React.createRef()]);

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const formButtonRef = useRef();

  const handleMilestoneChange = (e, id, field) => {
    const updatedMilestones = milestones.map(milestone => 
      milestone.id === id ? { ...milestone, [field]: e.target.value } : milestone
    );
    setMilestones(updatedMilestones);
  };

  const handleMilestoneDateChange = (id, field, value) => {
    const updatedMilestones = milestones.map(milestone => 
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    setMilestones(updatedMilestones);
  };

  const addMilestone = () => {
    setLoadingDel(null);
    setMilestones([...milestones, { id: milestones.length + 1, _id: null, name: '', dueDate: '' }]);
  };

  const removeMilestone = async (id) => {
    setLoadingDel(id);
    try {
        const response  = await deleteMilestone({ projectId, milestoneId:id }).unwrap();
        console.log(response)
        setLoadingDel(null);  
        setProject(response);
        setMilestones((prevMilestones) =>
          prevMilestones.filter((milestone) => milestone?._id !== id)
        );
    } catch (error) {
        console.error('Erreur lors de la suppression du milestone:', error);
        setLoadingDel(null);  
    }
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
      const fileWithIndex1 = { file: file, index };
          setDroppedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[index] = fileWithIndex;
          return updatedFiles;
      });
      setAllFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[index] = fileWithIndex1;
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
    const fileWithIndex1 = { file: file, index };
    setAllFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = fileWithIndex1;
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
  
  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };


  const formData = new FormData();
  const onSubmit = (data) => {
    setSubmitting('sending');
    const fundingValue = parseFloat(data.funding.replace(/\s/g, ''));

    const totalRaisedValue = parseFloat(data.totalRaised.replace(/\s/g, ''));

    const countryNameSelec = selectedCountry? selectedCountry["name"] : "";

    const updatedData = {
        ...data,
        funding: fundingValue,
        totalRaised : totalRaisedValue,
        visbility: selectedPublication,
        sector: selectedSector,
        country: countryNameSelec,
    };

    const formattedMilestones = milestones.map(({ id, _id, ...rest }) => rest);
    const formDataContent = {
        ...updatedData,
        stage: selectedStage,
        listMember: selectedTeamsMembers.map(member => member?._id),

        
        milestones: formattedMilestones
    };

    formData.append('infos', JSON.stringify(formDataContent));

    formData.append('logo' ,imgFile);

    documents.forEach(({ file, type }) => {
        formData.append(`${type}`, file);
    });
    
    allFiles.forEach(({ file }) => {
        formData.append(`files`, file);
    });
  
    if (projectId) {
      mutation({
        projectId,
        payload: formData,
      });
    } else {
      mutation(formData);
    }
  };

useEffect(() => {
  if (Mount) { setMount(false) }
  else {
    if (response.isSuccess) {
      setSubmitting('ok');
      const redirectTimer = setTimeout(() => {
        navigate("/Projects");
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }else {
      setSubmitting(null);
      response.isError && console.log(response.error)
    }
  }
}, [response]);

const onButtonClick = (inputref) => {
  inputref.current.click();
};

const handleDropLogo = (event) => {
  event.preventDefault();
  setIsDragging(false);
  const droppedFiles = event.dataTransfer.files;


  if (droppedFiles.length > 0) {
    const imageFile = droppedFiles[0];
    setImgFile(imageFile);
    setLogoFile(URL.createObjectURL(imageFile));
  }
};

  return (
      <div className="bg-white-A700 flex flex-col gap-8 items-start justify-start pb-12 pt-8 rounded-tl-[40px] h-full  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <PageHeader
                >
                  Projects
              </PageHeader>
            </div>
            <SearchInput className={'min-w-[25%]'}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full pb-6">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-white-A700 border border-gray-200 rounded-lg shadow ">
              <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400  py-4 px-5">
                <Text
                  className="text-lg leading-7 text-gray-900_01 pt-1"
                  size="txtDmSansMedium16"
                >
                  Create New Project
                </Text>
                <button 
                  className={`${submitting === 'ok' ? 'bg-teal-A700 !cursor-not-allowed' : 'bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] focus:bg-[#224a94]' } text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursorpointer rounded-md w-auto`} 
                  ref={formButtonRef}
                  type="submit"
              >
                  {submitting === 'sending' ? (
                  <AiOutlineLoading size={22}  className="animate-spin" /> 
                ) : submitting === 'ok' ? (
                  <>
                  <BsCheck2Circle size={18} className="mr-2" />
                  Saved
                  </>
                ) : (
                  <>
                    <FiSave size={18} className="mr-2" />
                    Save
                  </>
                )}
              </button>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-6 pt-5 pb-9 bg-white-A700 w-full h-full">
                <div ref={div1Ref} className="flex  flex-1 flex-col gap-6 items-start justify-start w-full h-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Name
                    </Text>
                      <input
                        {...register("name", { required: {value:true , message: "Project Name is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.name ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="name"
                        placeholder="Enter Project Name"
                      />
                    {/* {errors.name && <span className="text-sm font-dm-sans-regular text-red-500">{errors.name?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Details
                    </Text>
                      <textarea
                       {...register("details", { required: {value:true , message: "Project Details is required"} })}
                       className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.details ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="details"
                        rows={5}
                        placeholder="Write your project detals here"
                      />
                    {/* {errors.details && <span className="text-sm font-dm-sans-regular text-red-500">{errors.details?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Website
                    </Text>
                      <input
                      {...register("website", { required: {value:true , message:"Project website is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="website"
                        placeholder="Project Website"
                      />
                    {/* {errors.website && <span className="text-sm font-DmSans text-red-500">{errors.website?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Contact Email
                    </Text>
                      <input
                        {...register("contactEmail", { required: {value:true , message:"Project Contact Email is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.contactEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="contactEmail"
                        placeholder="Enter Project email"
                      />
                    {/* {errors.contactEmail && <span className="text-sm font-DmSans text-red-500">{errors.contactEmail?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Team Member
                    </Text>
                    <MultipleSelect id='teams' options={members} onSelect={""} searchLabel='Search Client' setSelectedOptionVal={setSelectedTeamsMember} selectedOptionsDfault={selectedProjectTeamsMembers}
                    itemClassName='py-2 border-b border-indigo-50' placeholder='Assign Team Member to this Project' valuekey="fullName" optionkey="workEmail" 
                    content={
                      ( option) =>{ return (
                        <div className="flex items-center  space-x-3 ">
                          <img src={ option?.image || `data:image/png;base64,${option.photo}` || `/images/img_avatar_2.png`} alt="teams" className="h-8 w-8 rounded-full"/>
                          <div className="flex flex-col gap-1.5 items-start justify-center w-full">
                            <Text
                              className="text-gray-900 text-sm w-auto"
                              size="txtDMSansRegular14Gray900"
                              >
                              {option.fullName}
                            </Text>
                            <Text
                              className="text-blue_gray-300 text-xs w-auto"
                              size="txtDMSansRegular12"
                              >
                              {option.jobTitle}
                            </Text>
                          </div>
                        </div>
                        );
                      }
                    }/>
                    {/* {selectedTeamsMembers.length==0 && <span className="text-sm font-dm-sans-regular text-red-500">Please select teams members</span>} */}
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Funding Target
                    </Text>
                    <div className="relative flex items-center w-full">
                      <img src={fundImg} className="absolute left-2 top-1/2 transform -translate-y-1/2" alt={""}/>
                      <input
                        {...register("funding", { required: { value: true, message: "Project Funding Target is required" } })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[28px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="funding"
                        type="text"
                        value={fundingValue}
                        onChange={(e) => formatFundingValue(e.target.value)}
                        placeholder="Enter Funding Target"
                      />
                    </div>
                    {/* {errors.funding && <span className="text-sm font-dm-sans-regular text-red-500">{errors.funding.message}</span>} */}
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Total Raised
                    </Text>
                    <div className="relative flex items-center w-full">
                      <img src={fundImg} className="absolute left-2 top-1/2 transform -translate-y-1/2" alt={""}/>
                      <input
                        {...register("totalRaised", { required: { value: true, message: "Project Funding Target is required" } })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[28px] py-[10px] h-[40px] border ${errors?.totalRaised ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="totalRaised"
                        type="text"
                        value={raisedValue}
                        onChange={(e) => formatFunding(e.target.value)}
                        placeholder="Enter Total Raised"
                      />
                    </div>
                    {/* {errors.totalRaised && <span className="text-sm font-dm-sans-regular text-red-500">{errors.totalRaised.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Stage
                    </Text>
                    <SimpleSelect id='stage' options={stagesData} onSelect={""} searchLabel='Select a stage' setSelectedOptionVal={setSelectedStage} 
                    placeholder="Select Stage" selectedOptionsDfault={project?.stage || ''}
                    content={
                      ( option) =>{ return (
                          <div className="flex text-gray-801 text-left text-base font-dm-sans-regular leading-5 py-2 items-center  w-full">
                               {option}
                           </div>
                        );
                      }
                    }/>
                    {/* {selectedStages.length==0 && <span className="text-sm font-dm-sans-regular text-red-500">Please select stages</span>}  */}
                    
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Country
                    </Text>
                    <SimpleSelect id='country' options={dataCountries} onSelect={""} searchLabel='Select Country' setSelectedOptionVal={setSelectedCountry} 
                        placeholder="Select Country" valuekey="name" selectedOptionsDfault={project?.country? dataCountries.find(country => country.name === project.country) : ""}
                        content={
                          ( option) =>{ return (
                            <div className="flex  py-2 items-center  w-full">
                                <Text
                                  className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                                  >
                                  {option.name}
                                </Text>
                              </div>
                            );
                          }
                    }/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project Sector
                    </Text>
                    <SimpleSelect id='sector' options={companyType} onSelect={""} searchLabel='Select Sector' searchable={false} setSelectedOptionVal={setselectedSector} 
                        placeholder="Select Project Sector" selectedOptionsDfault={project?.sector || ''}
                        content={
                          ( option) =>{ return (
                            <div className="flex  py-2 items-center  w-full">
                                <Text
                                  className="text-gray-801 text-left text-base font-DmSans font-medium leading-5 w-auto"
                                  >
                                  {option}
                                </Text>
                              </div>
                            );
                          }
                        }/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Project publication
                    </Text>
                    <SimpleSelect id='publication'
                    options={["public" , "private"]} onSelect={""} selectedOptionsDfault={project?.visbility}
                    setSelectedOptionVal={setSelectedPublication} searchable={false}
                    placeholder={"Select Type of Publication"}
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                            >
                              {option}
                            </Text>
                          </div>
                        );
                      }
                    } />               
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
                      <div className="flex md:flex-1 w-[55%]">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs`}
                          name={`name-${milestone.id}`}
                          placeholder="Enter your project milestone"
                          value={milestone.name}
                          onChange={e => handleMilestoneChange(e, milestone.id, 'name')}
                        />
                      </div>
                      <CustomCalendar
                        className={' w-[30%]'} 
                        defaultValue={milestone.dueDate}
                        onChangeDate={(date) => handleMilestoneDateChange(milestone.id, 'dueDate', parseDateString(date))}
                      />
                      {index === milestones.length - 1 ? (
                        <button
                          className="bg-light_blue-100 hover:bg-[#E2E2EE] text-base border border-solid border-blue-500 text-blue-500 flex flex-row md:h-auto items-center justify-center ml-auto px-[7px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={addMilestone}
                          type="button"
                        >
                          <IoMdAdd size={18} className="mr-1" />
                          <span className="hidden sm:inline">More</span>
                        </button>
                      ) : (
                        <button
                          className="bg-red-100 hover:bg-red-200 text-base border border-solid border-red-500 text-red-500 flex flex-row md:h-auto items-center justify-center ml-auto px-[7px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={() => removeMilestone(milestone?._id)}
                          type="button"
                        >
                        {loadingDel === milestone?._id ? <AiOutlineLoading size={22} className="animate-spin disabled !cursor-not-allowed" /> : <IoMdRemoveCircleOutline size={22} className="" />}
                        </button>
                      )}
                    </div>
                    ))}
                  </div>
                </div>
                <div ref={dividerRef} className={`bg-indigo-50 md:min-h-fit md:h-[${maxDivHeight}] h-px w-full md:w-px`} />
                {/* <div className="flex flex-col md:divide-x md:min-h-[750px] md:h-full divide-indigo-50 hover:divide-pink-400">
                  {` `}
                </div> */}
                <div ref={div2Ref} className="flex flex-col gap-6 items-start justify-start md:w-[40%] w-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansCardHeader16"
                    >
                      Project Logo
                    </Text>
                    <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[150px] flex flex-col items-center justify-center rounded-md w-full py-1"
                        onDragOver={handleDragOver}
                        onDrop={handleDropLogo}>
                      {logoFile ? (
                        <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[148px]" />
                      ) : (
                      <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 rounded-md w-full">
                        <IoImageOutline />
                        <div className="flex flex-col items-start justify-start w-auto">
                          <Text
                            className="text-[13px] text-base leading-6 tracking-normal w-auto"
                            size="txtDMSansRegular13"
                          >
                          {isDragging? "Drop Your logo here" : "Upload Your Logo"}  
                          </Text>
                        </div>
                      </div>
                        )}
                    </div>
                  </div>
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
                       onDrop={(event) => handleDrop1(event, "pitchDeck")}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Pitch Deck
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 border border-dashed cursorpointer bg-blue_gray-50" 
                    onClick={()=> onButtonClick(inputRef)}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef}
                        onChange={(e) => handleFileUpload1(e, "pitchDeck")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope font-normal text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Pitch Deck file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500">choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["pitchDeck"] && (
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["pitchDeck"] || project?.documents?.filter(document => document.documentType === 'pitchDeck').name}
                      </Text>
                    </div>
                    )}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={(event) => handleDrop1(event, "businessPlan")}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Upload Business Plan
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md px-2 py-3 cursorpointer border border-dashed bg-blue_gray-50" 
                    onClick={()=> onButtonClick(inputRef1)}>
                      <MdOutlineFileUpload size={22} className="text-blue-700 mr-2"/>
                      <input
                        ref={inputRef1}
                        onChange={(e) => handleFileUpload1(e, "businessPlan")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope font-normal text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Business Plan file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" >choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["businessPlan"] && (
                      <div className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["businessPlan"]}
                      </Text>
                    </div>
                    )}
                  </div>
                  <div className={`flex flex-col gap-2 items-start cursorpointer justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={(event) => handleDrop1(event, "financialProjection")}>
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
                        onChange={(e) => handleFileUpload1(e, "financialProjection")} 
                        style={{ display: 'none' }}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="file"
                        name="name"
                      />
                      <label
                        className="font-manrope font-normal text-sm leading-18 tracking-wide text-left w-auto"
                      >
                        {isDragging ? <span className="text-blue_gray-300">Drop Financial Projection file here</span> :
                        <>
                          <span className="text-blue_gray-300"> Drag and drop a file here or </span>
                        <span className="text-blue-500" >choose file</span>
                        </> 
                        }
                      </label>
                    </div>
                    {fileNames["financialProjection"] && (
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start pt-2 w-full">
                      <GrAttachment size={16} className="mr-2" />
                      <Text
                        className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base  leading-6 tracking-normal w-auto "
                        size=""
                      >
                        {fileNames["financialProjection"]}
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
                      className="flex md:flex-1 w-full md:w-full cursorpointer rounded-md px-2 py-3 border border-dashed bg-blue_gray-50"
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
                      <label className="font-manrope font-normal text-sm leading-18 tracking-wide text-left w-auto">
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
                              className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
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
                  <button
                    className="flex w-full text-base text-blue-500 font-dmsans font-medium leading-[18px] cursorpointer rounded-md px-2 py-3 border border-solid border-blue-500 bg-light_blue-100 hover:bg-[#E2E2EE] items-center justify-center"
                    onClick={addDocumentDiv}
                    type="button"
                  >
                    <ImFileText2 size={20} className="mr-2 text-blue-500" />
                    Add More Document
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateProject;