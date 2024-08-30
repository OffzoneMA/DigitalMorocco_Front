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
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [otherDeletedFiles, setOtherDeletedFiles] = useState([]);
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
  const logoFileInputRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    country: false,
    stage: false,
    sector: false,
    publication: false,
  });
  
  console.log(submitting)
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

  const { register, handleSubmit, setValue, trigger, formState: { errors , isSubmitting } } = useForm(project !=null && {
    defaultValues: {
      name: project?.name,
      details: project?.details,
      website: project?.website,
      contactEmail: project?.contactEmail,
      funding : formatNumber(project?.funding),
      totalRaised : formatNumber(project?.totalRaised)
    }
  });

  useEffect(() => {
    // if (Mount) { setMount(false) }
    // else{
      if (hasSubmitted ) {
        const isCountryValid = selectedCountry !== null;
        const isStageValid = selectedStage !== "";
        const isSectorValid = selectedSector !== "";
        const isPublicationValid = selectedPublication !== "";
    
        const isValid = isCountryValid && isStageValid && isSectorValid && isPublicationValid;
    
        setRequiredFields({
          country: !isCountryValid,
          stage: !isStageValid,
          sector: !isSectorValid,
          publication: !isPublicationValid,
        });
    
        setIsFormValid(isValid);
      }
    // }
  }, [hasSubmitted ,selectedCountry, selectedStage, selectedSector, selectedPublication]);
  
console.log(isSubmitting)
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
        inputRefs.current = otherDocuments.map(() => React.createRef());
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
      setselectedSector(project?.sector || '');
      setSelectedPublication(project?.visbility || '');
      if (project?.country) {
        const defaultCountry = dataCountries.find(country => country.name === project.country);
        setSelectedCountry(defaultCountry);
      }
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
    console.log(loadingDel)
    setMilestones([...milestones, { id: milestones.length + 1, _id: null, name: '', dueDate: '' }]);
  };

  const removeMilestone = async (id) => {
    const milestone = milestones.find(milestone => milestone.id === id || milestone._id === id);

    if (!milestone._id) {
        setMilestones((prevMilestones) =>
          prevMilestones.filter((milestone) => milestone.id !== id)
        );
    } else {
        setLoadingDel(id);
        try {
            const response = await deleteMilestone({ projectId, milestoneId: id }).unwrap();
            console.log(response);
            setLoadingDel(null);
            setProject(response);
            setMilestones((prevMilestones) =>
              prevMilestones.filter((milestone) => milestone._id !== id)
            );
        } catch (error) {
            console.error('Erreur lors de la suppression du milestone:', error);
            setLoadingDel(null);
        }
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
  setOtherDeletedFiles((prevDeleted) => prevDeleted.filter(deletedFile => deletedFile.index !== index));
}
};

const handleDeleteFile = (index) => {
  const fileToRemove = droppedFiles[index] || allFiles[index];
  
  if (fileToRemove) {
    setOtherDeletedFiles((prevDeleted) => [...prevDeleted, fileToRemove.name]);
  }

  setDroppedFiles((prevFiles) => {
    const updatedFiles = [...prevFiles];
    updatedFiles.splice(index, 1); 
    return updatedFiles;
  });

  setAllFiles((prevFiles) => {
    const updatedFiles = [...prevFiles];
    updatedFiles.splice(index, 1); 
    return updatedFiles;
  });
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

  const handleFileRemove = (type) => {
    setDocuments(prevDocuments => 
        prevDocuments.filter(document => document.type !== type)
    );
    setFileName(type, null); 
    setDeletedFiles(prevDeletedFiles => [...prevDeletedFiles, type]);
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
    setHasSubmitted(true);
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

    const formattedMilestones = milestones
    .filter(({ name, dueDate }) => name && dueDate)
    .map(({ id, _id, ...rest }) => rest);
  
    const formDataContent = {
      ...updatedData,
      stage: selectedStage,
      listMember: selectedTeamsMembers.map(member => member?._id),
      milestones: formattedMilestones,
      ...(projectId ? {
          deletedFiles, 
          otherDeletedFiles
      } : {})
    };  

    formData.append('infos', JSON.stringify(formDataContent));

    formData.append('logo' ,imgFile);

    documents.forEach(({ file, type }) => {
        formData.append(`${type}`, file);
    });
    
    allFiles.forEach(({ file }) => {
        formData.append(`files`, file);
    });

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    if(isFormValid) {
      if (projectId) {
        mutation({
          projectId,
          payload: formData,
        });
      } else {
        mutation(formData);
      }
    }
    setSubmitting(null);
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

const handleLogoFileUpload = (event) => {
  const file = event.target.files[0];
  setImgFile(file);
  setLogoFile(URL.createObjectURL(file));
};

const handleLogoFileInputClick = () => {
  logoFileInputRef.current.click();
};

  return (
      <div className="bg-white-A700 flex flex-col gap-8 items-start justify-start pb-12 pt-8 rounded-tl-[40px] h-full  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <PageHeader
                >
                  Projects
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full pb-6">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
              <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700    py-4 px-5">
                <Text
                  className="text-lg leading-7 text-gray-900_01 pt-1"
                  size="txtDmSansMedium16"
                >
                  Create New Project
                </Text>
                <button 
                onClick={() => setHasSubmitted(true)}
                  className={`${submitting === 'ok' ? 'bg-teal-A700 !cursor-not-allowed' : 'bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] focus:bg-[#224a94]' } text-sm font-dm-sans-medium text-white-A700 flex flex-row h-[37px] min-w-[85px] items-center ml-auto px-[12px] cursorpointer rounded-md`} 
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
                    <FiSave size={21} className="mr-2" />
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
                       className={`!placeholder:text-blue_gray-300 !text-gray700 h-[139px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.details ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="details"
                        rows={7}
                        placeholder="Write your project detals here"
                        style={{
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none'
                        }}
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
                      {...register("website", { required: {value:false , message:"Project website is required"} })}
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
                        type="email"
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
                    <MultipleSelect id='teams' options={members} onSelect={""} searchLabel='Search member' setSelectedOptionVal={setSelectedTeamsMember} selectedOptionsDfault={selectedProjectTeamsMembers}
                    itemClassName='py-2 border-b border-gray-201' placeholder='Assign Team Member to this Project' valuekey="fullName" optionkey="workEmail" 
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
                    <SimpleSelect id='stage' options={stagesData} onSelect={""} searchLabel='Search stage' setSelectedOptionVal={setSelectedStage} 
                    placeholder="Select Stage" selectedOptionsDfault={project?.stage || ''} required={requiredFields.stage}
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
                    <SimpleSelect id='country' options={dataCountries} onSelect={""} searchLabel='Search Country' setSelectedOptionVal={setSelectedCountry} 
                        placeholder="Select Country" valuekey="name" selectedOptionsDfault={project?.country? dataCountries.find(country => country.name === project.country) : ""} 
                        required={requiredFields.country}
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
                    <SimpleSelect id='sector' options={companyType} onSelect={""} searchLabel='Search Sector' searchable={false} setSelectedOptionVal={setselectedSector} 
                        placeholder="Select Project Sector" selectedOptionsDfault={project?.sector || ''} required={requiredFields.sector}
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
                    required={requiredFields.publication}
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
                          className="bg-light_blue-100 hover:bg-[#E2E2EE] text-sm border border-solid border-blue-500 text-blue-500 flex flex-row gap-1 h-[40px] items-center justify-center ml-auto px-[12px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={addMilestone}
                          type="button"
                        >
                          <span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#2575F0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          </span>
                          <span className="hidden sm:inline">More</span>
                        </button>
                      ) : (
                        <button
                          className="bg-[#E8555521] hover:bg-red-200 text-sm border border-solid border-errorColor text-errorColor flex flex-row h-[40px] items-center justify-center ml-auto px-[12px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={() => removeMilestone(milestone?.id)}
                          type="button"
                        >
                        {(loadingDel !== null && loadingDel === milestone?.id) ? <AiOutlineLoading size={22} className="animate-spin disabled !cursor-not-allowed" /> :
                         <span className="flex items-center gap-1">
                         <svg width="13" height="2" viewBox="0 0 13 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.25 1H11.75" stroke="#EF4352" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Hide
                         </span>}
                        </button>
                      )}
                    </div>
                    ))}
                  </div>
                </div>
                <div ref={dividerRef} className={`bg-gray-201 md:min-h-fit md:h-[${maxDivHeight}] h-px w-full md:w-px`} />
                {/* <div className="flex flex-col md:divide-x md:min-h-[750px] md:h-full divide-gray-201 hover:divide-pink-400">
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
                    <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[150px] flex flex-col items-center justify-center rounded-md w-full py-1 cursorpointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDropLogo} onClick={handleLogoFileInputClick}>
                      {logoFile ? (
                        <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[148px]" />
                      ) : (<>
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
                      <input ref={logoFileInputRef} id="fileInput" type="file" onChange={(e) => handleLogoFileUpload(e)} className="hidden" />
                      </>
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
                    <div className="flex flex-row gap-2 items-center justify-between w-[90%] pt-2 ">
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start w-full">
                        <GrAttachment size={16} className="mr-2" />
                        <Text
                          className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
                          size=""
                        >
                          {fileNames["pitchDeck"] || project?.documents?.filter(document => document.documentType === 'pitchDeck').name}
                        </Text>
                      </div>
                      <div className="flex w-auto" onClick={() => handleFileRemove('pitchDeck')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9959 5.87952 15.1518 3.84705 13.6524 2.34764C12.153 0.848226 10.1205 0.00406613 8 0ZM10.9 10.0231C11.0156 10.1397 11.0804 10.2973 11.0804 10.4615C11.0804 10.6257 11.0156 10.7833 10.9 10.9C10.7824 11.0137 10.6252 11.0773 10.4615 11.0773C10.2979 11.0773 10.1407 11.0137 10.0231 10.9L8 8.86923L5.97692 10.9C5.8593 11.0137 5.70208 11.0773 5.53846 11.0773C5.37484 11.0773 5.21763 11.0137 5.1 10.9C4.98444 10.7833 4.91962 10.6257 4.91962 10.4615C4.91962 10.2973 4.98444 10.1397 5.1 10.0231L7.13077 8L5.1 5.97692C5.00187 5.85735 4.95172 5.70556 4.95931 5.55107C4.9669 5.39657 5.03168 5.25043 5.14106 5.14105C5.25043 5.03168 5.39658 4.96689 5.55107 4.95931C5.70557 4.95172 5.85736 5.00187 5.97692 5.1L8 7.13077L10.0231 5.1C10.1426 5.00187 10.2944 4.95172 10.4489 4.95931C10.6034 4.96689 10.7496 5.03168 10.8589 5.14105C10.9683 5.25043 11.0331 5.39657 11.0407 5.55107C11.0483 5.70556 10.9981 5.85735 10.9 5.97692L8.86923 8L10.9 10.0231Z" fill="#F48888"/>
                        </svg>
                      </div>
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
                    <div className="flex flex-row gap-2 items-center justify-between w-[90%] pt-2 ">
                      <div className="flex flex-row gap-2 items-center justify-start w-full">
                        <GrAttachment size={16} className="mr-2" />
                        <Text
                          className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
                          size=""
                        >
                          {fileNames["businessPlan"]}
                        </Text>
                      </div>
                      <div className="flex w-auto" onClick={() => handleFileRemove('businessPlan')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9959 5.87952 15.1518 3.84705 13.6524 2.34764C12.153 0.848226 10.1205 0.00406613 8 0ZM10.9 10.0231C11.0156 10.1397 11.0804 10.2973 11.0804 10.4615C11.0804 10.6257 11.0156 10.7833 10.9 10.9C10.7824 11.0137 10.6252 11.0773 10.4615 11.0773C10.2979 11.0773 10.1407 11.0137 10.0231 10.9L8 8.86923L5.97692 10.9C5.8593 11.0137 5.70208 11.0773 5.53846 11.0773C5.37484 11.0773 5.21763 11.0137 5.1 10.9C4.98444 10.7833 4.91962 10.6257 4.91962 10.4615C4.91962 10.2973 4.98444 10.1397 5.1 10.0231L7.13077 8L5.1 5.97692C5.00187 5.85735 4.95172 5.70556 4.95931 5.55107C4.9669 5.39657 5.03168 5.25043 5.14106 5.14105C5.25043 5.03168 5.39658 4.96689 5.55107 4.95931C5.70557 4.95172 5.85736 5.00187 5.97692 5.1L8 7.13077L10.0231 5.1C10.1426 5.00187 10.2944 4.95172 10.4489 4.95931C10.6034 4.96689 10.7496 5.03168 10.8589 5.14105C10.9683 5.25043 11.0331 5.39657 11.0407 5.55107C11.0483 5.70556 10.9981 5.85735 10.9 5.97692L8.86923 8L10.9 10.0231Z" fill="#F48888"/>
                        </svg>
                      </div>
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
                    <div className="flex flex-row gap-2 items-center justify-between w-[90%] pt-2">
                      <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="flex flex-row gap-2 items-center justify-start w-full">
                        <GrAttachment size={16} className="mr-2" />
                        <Text
                          className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base  leading-6 tracking-normal w-auto "
                          size=""
                        >
                          {fileNames["financialProjection"]}
                        </Text>
                      </div>
                      <div className="flex w-auto" onClick={() => handleFileRemove('financialProjection')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9959 5.87952 15.1518 3.84705 13.6524 2.34764C12.153 0.848226 10.1205 0.00406613 8 0ZM10.9 10.0231C11.0156 10.1397 11.0804 10.2973 11.0804 10.4615C11.0804 10.6257 11.0156 10.7833 10.9 10.9C10.7824 11.0137 10.6252 11.0773 10.4615 11.0773C10.2979 11.0773 10.1407 11.0137 10.0231 10.9L8 8.86923L5.97692 10.9C5.8593 11.0137 5.70208 11.0773 5.53846 11.0773C5.37484 11.0773 5.21763 11.0137 5.1 10.9C4.98444 10.7833 4.91962 10.6257 4.91962 10.4615C4.91962 10.2973 4.98444 10.1397 5.1 10.0231L7.13077 8L5.1 5.97692C5.00187 5.85735 4.95172 5.70556 4.95931 5.55107C4.9669 5.39657 5.03168 5.25043 5.14106 5.14105C5.25043 5.03168 5.39658 4.96689 5.55107 4.95931C5.70557 4.95172 5.85736 5.00187 5.97692 5.1L8 7.13077L10.0231 5.1C10.1426 5.00187 10.2944 4.95172 10.4489 4.95931C10.6034 4.96689 10.7496 5.03168 10.8589 5.14105C10.9683 5.25043 11.0331 5.39657 11.0407 5.55107C11.0483 5.70556 10.9981 5.85735 10.9 5.97692L8.86923 8L10.9 10.0231Z" fill="#F48888"/>
                        </svg>
                      </div>
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
                          <div key={fileIndex} className="flex flex-row gap-2 items-center justify-between w-[90%] pt-2 ">
                            <div key={fileIndex} className="flex flex-row gap-2 items-center justify-start w-full">
                              <GrAttachment size={16} className="mr-2" />
                              <Text
                                className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto "
                                size=""
                              >
                                {file.name}
                              </Text>
                            </div>
                            <div className="flex w-auto" onClick={() => handleDeleteFile(fileIndex)}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9959 5.87952 15.1518 3.84705 13.6524 2.34764C12.153 0.848226 10.1205 0.00406613 8 0ZM10.9 10.0231C11.0156 10.1397 11.0804 10.2973 11.0804 10.4615C11.0804 10.6257 11.0156 10.7833 10.9 10.9C10.7824 11.0137 10.6252 11.0773 10.4615 11.0773C10.2979 11.0773 10.1407 11.0137 10.0231 10.9L8 8.86923L5.97692 10.9C5.8593 11.0137 5.70208 11.0773 5.53846 11.0773C5.37484 11.0773 5.21763 11.0137 5.1 10.9C4.98444 10.7833 4.91962 10.6257 4.91962 10.4615C4.91962 10.2973 4.98444 10.1397 5.1 10.0231L7.13077 8L5.1 5.97692C5.00187 5.85735 4.95172 5.70556 4.95931 5.55107C4.9669 5.39657 5.03168 5.25043 5.14106 5.14105C5.25043 5.03168 5.39658 4.96689 5.55107 4.95931C5.70557 4.95172 5.85736 5.00187 5.97692 5.1L8 7.13077L10.0231 5.1C10.1426 5.00187 10.2944 4.95172 10.4489 4.95931C10.6034 4.96689 10.7496 5.03168 10.8589 5.14105C10.9683 5.25043 11.0331 5.39657 11.0407 5.55107C11.0483 5.70556 10.9981 5.85735 10.9 5.97692L8.86923 8L10.9 10.0231Z" fill="#F48888"/>
                              </svg>
                            </div>
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