import React, {useEffect, useRef, useState} from "react";
import {Text} from "../../../Components/Text"
import {FiSave} from "react-icons/fi";
import {MdOutlineFileUpload} from "react-icons/md";
import {ImFileText2} from "react-icons/im";
import {IoMdAdd} from "react-icons/io";
import {useForm} from "react-hook-form";
import {GrAttachment} from "react-icons/gr";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {stage, stage as stagesData} from "../../../data/stage";
import {Country} from 'country-state-city';
import MultipleSelect from "../../../Components/common/MultipleSelect";
import CustomCalendar from "../../../Components/common/CustomCalendar";
import {useCreateProjectMutation, useUpdateProjectMutation} from "../../../Services/Member.Service";
import {useGetProjectByIdQuery , useDeleteMilestoneMutation , useDeleteDocumentMutation} from "../../../Services/Project.Service";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import fundImg from '../../../Media/funding.svg';
import axios from "axios";
import {companyType} from "../../../data/companyType";
import { IoImageOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Popup from "reactjs-popup";
import userdefaultProfile from '../../../Media/User1.png'
import { useTranslation } from "react-i18next";
import { countries } from "../../../data/tablesData";
import { PiUsersThin } from "react-icons/pi";

const CreateProject = () => {
  const { t } = useTranslation();
  const dividerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [maxDivHeight, setDivMaxHeight] = useState('720px');
  const [deleteDocument] = useDeleteDocumentMutation();
  const [deleteMilestone] = useDeleteMilestoneMutation();
  const [loadingDel, setLoadingDel] = useState(null);
  const { loading, userInfo } = useSelector((state) => state.auth)
  const location = useLocation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(location.state?.project || null);
  // const { data: fetchedProject, error, isLoading , refetch } = useGetProjectByIdQuery(projectId, {
  //   skip: Boolean(project || !projectId || loadingDel === null),
  // });
  const { data: fetchedProject, error, isLoading, refetch } = useGetProjectByIdQuery(projectId, {
    skip: !projectId, 
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
  const [showLogoDropdown , setShowLogoDropdown] = useState(false);
  const [fileNames, setFileNames] = useState({});
  const [documentDivs, setDocumentDivs] = useState([{ id: 1 }]);
  const [allFiles, setAllFiles] = useState(new Map());
  const [droppedFiles, setDroppedFiles] = useState(new Map());
  const [selectedPublication, setSelectedPublication] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('In Progress');
  const [selectedTeamsMembers, setSelectedTeamsMember] = useState([]);
  const [selectedProjectTeamsMembers, setSelectedProjectTeamsMember] = useState([]);
  const [selectedSector, setselectedSector] = useState("");
  const dataCountries = Country.getAllCountries();
  const [selectedCountry , setSelectedCountry] = useState(null);
  const [selectedStage, setSelectedStage] = useState("");
  const [addProjet, addResponse] = useCreateProjectMutation();
  const [updateProject, updateResponse] = useUpdateProjectMutation();
  const mutation = projectId ? updateProject : addProjet;
  const [statusChanging , setStatusChanging] = useState(false);
  const response = projectId ? updateResponse : addResponse;
  const [members, setMembers] = useState([]);
  const logoFileInputRef = useRef(null);
  const logoFileInputRefChange = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isAllFormValid , setIsAllFormValid] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sendingOk , setSendingOk] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    country: false,
    stage: false,
    sector: false,
    publication: false,
    status: false
  });

  // État initial
  const [filesList, setFilesList] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    const setMaxHeight = () => {
      const div1Height = div1Ref.current?.clientHeight || 0;
      const div2Height = div2Ref.current?.clientHeight || 0;
      const maxHeight = Math.max(div1Height, div2Height);
      if(dividerRef.current) {
        if (window.innerWidth >= 1024) { 
          dividerRef.current.style.height = `${maxHeight}px`;
          setDivMaxHeight(`${maxHeight}px`);
        } else {
          dividerRef.current.style.height = '1px';
          setDivMaxHeight('auto');
        }
      }
    };
  
    setMaxHeight(); // Initial call to set the height
    
    const handleResize = () => {
      setMaxHeight(); // Set height on window resize
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, [div1Ref, div2Ref , milestones , droppedFiles , documentDivs]);
  
// Fonction utilitaire améliorée pour le formatage
const formatNumber = (number) => {
  if (number !== null && number !== undefined) {
    // Enlever les espaces existants avant de formater
    const cleanNumber = number.toString().replace(/\s/g, '');
    return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return '';
};

  // Fonction pour nettoyer la valeur (enlever les espaces) pour la validation
  const cleanNumber = (value) => value?.replace(/\s/g, '') || '';


  const { register, handleSubmit, setValue, trigger, formState: { errors, isSubmitting, isValid: validForm } } = useForm({
    defaultValues: project ? {
      name: project?.name || '',
      details: project?.details || '',
      website: project?.website || '',
      contactEmail: project?.contactEmail || '',
      totalRaised: project?.totalRaised ? formatNumber(project.totalRaised) : '',
      funding: project?.funding ? formatNumber(project.funding) : ''
    } : {}
  });
  

  useEffect(() => {
    const isCountryValid = selectedCountry !== null;
    const isStageValid = selectedStage !== "";
    const isSectorValid = selectedSector !== "";
    const isPublicationValid = selectedPublication !== "";
    const isStatusValid = selectedStatus !== "";
    const isValid = isCountryValid && isStageValid && isSectorValid && isPublicationValid;
    setIsAllFormValid(isValid);
    if (hasSubmitted ) {
      setRequiredFields({
        country: !isCountryValid,
        stage: !isStageValid,
        sector: !isSectorValid,
        publication: !isPublicationValid,
        status: !isStatusValid
      });
  
      setIsFormValid(isValid);
    }
  }, [hasSubmitted ,selectedCountry, selectedStage, selectedSector, selectedPublication, selectedStatus]);

  console.log(isAllFormValid , isFormValid , validForm , errors);
  
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
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/employee/byuserWithoutPage`, {
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

      setValue('totalRaised', formatNumber(project.totalRaised), {
        shouldValidate: true,
        shouldDirty: false
      });
      
      setValue('funding', formatNumber(project.funding), {
        shouldValidate: true,
        shouldDirty: false
      });
      setSelectedStatus(project?.status)
      const initialFormattedMilestones = project?.milestones?.length > 0 
        ? project.milestones
            .filter(milestone => milestone?._id)  
            .map((milestone) => ({
                id: uuidv4(),
                _id: milestone._id,
                name: milestone.name,
                dueDate: new Date(milestone.dueDate),
            }))
        : [{ id: uuidv4(), _id: null, name: '', dueDate: '' }];
      setMilestones(initialFormattedMilestones);

      const otherDocuments = project.documents?.filter(document => document.documentType === "other") || [{ id: 1 }];
      if (otherDocuments?.length > 0) {
        // Création des divs pour les documents
        setDocumentDivs(
            otherDocuments.map((_, index) => ({ 
                id: index + 1 
            }))
        );

        // Création des Maps pour les fichiers
        const newDroppedFiles = new Map();
        const newAllFiles = new Map();

        otherDocuments.forEach((document, index) => {
            newDroppedFiles.set(index, {
                name: document.name || document.documentName, // Ajout de fallback pour documentName
                index: index,
                documentId: document._id
            });

            newAllFiles.set(index, {
                name: document.name || document.documentName,
                index: index,
                documentId: document._id,
                // Si vous avez besoin de garder une référence au fichier lui-même
                file: null // Ou convertissez document en File si nécessaire
            });
        });

        // Mise à jour des états
        setDroppedFiles(newDroppedFiles);
        setAllFiles(newAllFiles);

        // Mise à jour des refs pour les inputs
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
      setSelectedStatus(project?.status || '')
      if (project?.country) {
        const defaultCountry = dataCountries.find(country => country.name === project.country);
        setSelectedCountry(defaultCountry);
      }

        // Forcer la validation initiale
        const isInitiallyValid = 
        project.country && 
        project.stage && 
        project.sector && 
        project.visbility && 
        project.status;

      if (isInitiallyValid) {
        setIsAllFormValid(true);
        setIsFormValid(true);
        trigger(); // Déclenche la validation de react-hook-form
      }
    }
    else{
      setMilestones([{ id: uuidv4() , _id: null, name: '', dueDate: '' }]);
    }
  }, [project, setValue, trigger]);

  const formatFunding = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = formatNumber(numericValue);
    
    setRaisedValue(formattedValue);
    
    setValue('totalRaised', formattedValue, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const formatFundingValue = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setFundingValue(formattedValue);
    setValue("funding", formattedValue, { shouldValidate: true , shouldDirty: true }); // Update form value and trigger validation
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
    setMilestones([{ id: uuidv4(), _id: null, name: '', dueDate: '' }, ...milestones]);
  };

  const removeMilestone = async (id) => {
    const milestone = milestones.find(milestone => milestone.id === id || milestone._id === id);
    if (milestone._id === null) {
        setMilestones((prevMilestones) =>
          prevMilestones.filter((milestone) => milestone.id !== id)
        );
    } else {
        setLoadingDel(id);
        try {
            const response = await deleteMilestone({ projectId, milestoneId: milestone._id }).unwrap();
            setLoadingDel(null);
            setProject(response);
            setMilestones((prevMilestones) =>
              prevMilestones.filter((milestone) => milestone.id !== id)
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

  // Structure de données pour gérer les fichiers
const FileManager = {
    files: new Map(),
    
    addFile(index, file) {
        this.files.set(index, {
            file,
            name: file.name,
            documentId: null,
            index
        });
    },
    
    removeFile(index) {
        this.files.delete(index);
    },
    
    getFiles() {
        return Array.from(this.files.values());
    }
};

  const handleDrop = (event, index) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      
      if (file) {
          // Mise à jour utilisant Map
          setAllFiles(prev => {
              const newMap = new Map(prev);
              newMap.set(index, {
                  file,
                  name: file.name,
                  index,
                  documentId: null
              });
              return newMap;
          });

          // Mise à jour de l'affichage
          setDroppedFiles(prev => {
              const newMap = new Map(prev);
              newMap.set(index, {
                  name: file.name,
                  index,
                  documentId: null
              });
              return newMap;
          });
      }
  };

  const handleFileInputChange = (event, index) => {
      const file = event.target.files[0];
      
      if (file) {
          setAllFiles(prev => {
              const newMap = new Map(prev);
              newMap.set(index, {
                  file,
                  name: file.name,
                  index,
                  documentId: null
              });
              return newMap;
          });

          setDroppedFiles(prev => {
              const newMap = new Map(prev);
              newMap.set(index, {
                  name: file.name,
                  index,
                  documentId: null
              });
              return newMap;
          });

          setOtherDeletedFiles(prev => 
              prev.filter(deletedFile => deletedFile.index !== index)
          );
          
          event.target.value = null;
      }
  };

  const handleDeleteFile = async (index) => {
      const fileToRemove = droppedFiles.get(index) || allFiles.get(index);
      
      if (fileToRemove) {
          try {
              if (projectId && fileToRemove.documentId) {
                  await deleteDocument({ 
                      projectId, 
                      documentId: fileToRemove.documentId 
                  });
                  refetch();
              }

              setOtherDeletedFiles(prev => [...prev, fileToRemove.name]);
              setDroppedFiles(prev => {
                  const newMap = new Map(prev);
                  newMap.delete(index);
                  return newMap;
              });
              setAllFiles(prev => {
                  const newMap = new Map(prev);
                  newMap.delete(index);
                  return newMap;
              });
          } catch (error) {
              console.error("Error deleting file:", error);
          }
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
    // Réinitialisation du champ input
    event.target.value = null;
  };


const handleFileUpload1 = (event, type) => {
  const file = event.target.files[0];  
  if (file) {
      // Ajout du document et mise à jour de l'état
      setDocuments(prevDocuments => [...prevDocuments, { file, type }]);
      setFileName(type, file.name);

      // Réinitialisation du champ input
      event.target.value = null;
  }
};

const handleFileRemove = async (type) => {
  // Trouver le document correspondant
  const documentToRemove = project?.documents.find(doc => doc?.documentType === type);

  if (documentToRemove && documentToRemove._id && projectId) {
    try {
      // Appel de la mutation pour supprimer le document dans la base
      await deleteDocument({ projectId , documentId: documentToRemove._id });
      refetch();
      console.log(`Document avec ID ${documentToRemove._id} supprimé de la base de données.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du document dans la base de données :", error);
      return;
    }
  }

  // Supprimer le document du tableau
  setDocuments(prevDocuments => 
      prevDocuments.filter(document => document.type !== type)
  );
  // Réinitialiser le nom du fichier
  setFileName(type, null); 
  // Ajouter à la liste des fichiers supprimés
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
    setSendingOk(true);
    setHasSubmitted(true);
    setSubmitting('sending');
    const fundingValue = parseFloat(data.funding.replace(/\s/g, ''));

    const totalRaisedValue = parseFloat(data.totalRaised.replace(/\s/g, ''));

    const countryNameSelec = selectedCountry? selectedCountry["name"] : "";

    const updatedData = {
        ...data,
        funding: fundingValue,
        totalRaised : totalRaisedValue,
        visbility: selectedPublication?.toLowerCase(),
        sector: selectedSector,
        country: countryNameSelec,
        status: selectedStatus,
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
    
    // allFiles.forEach(({ file }) => {
    //     formData.append(`files`, file);
    // });

    const validFiles = Array.from(allFiles.values());
    validFiles.forEach(fileData => {
        if (fileData?.file) {
            formData.append('files', fileData.file);
        }
    });

      console.log(allFiles , validFiles)

    if (isFormValid) {
      // Prepare payload for mutation
      const payload = projectId ? { projectId, payload: formData } : formData;
      
      mutation(payload)
        .then((response) => {
          setSubmitting('ok');
          setSendingOk(true);
          setTimeout(() => {
            setSubmitting('');
          }, 2500);
          if(projectId) {

            if(response?.data) {
              navigate(location.pathname, { state: { project: response?.data }, replace: true });
            }
            refetch();
          }
          // Si c'est une création (pas de projectId)
          if (!projectId && response?.data?._id) {
            // Mettre à jour l'URL avec l'ID du nouveau projet
            navigate(`/Editproject/${response.data._id}`, { replace: true } , { state: { project: response.data } });
            // Le replace: true remplace l'entrée actuelle dans l'historique au lieu d'en ajouter une nouvelle
          }
        })
        .catch(() => {
          setSubmitting('');
          setSendingOk(false);
        });
    } else {
      setSubmitting('');
    }
  };

  useEffect(() => {
    if (Mount) { setMount(false) }
    else {
      if (response.isSuccess) {
        // setSubmitting('ok');
        // const redirectTimer = setTimeout(() => {
        //   navigate("/Projects");
        // }, 2500);
        // return () => clearTimeout(redirectTimer);
      }else {
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
    logoFileInputRef?.current?.click();
  };

  const handleLogoFileInputChangeClick = () => {
    logoFileInputRefChange?.current?.click();
  };

  const handleRemoveLogo = () => {
    setImgFile(null);
    setLogoFile(null);
  }

  const handleMouseEnter = () => {
    setShowLogoDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowLogoDropdown(false);
  };

  const handleStatusChangeAndUpdate = async () => {
    let newStatus = selectedStatus;
    if (selectedStatus?.toLowerCase() === 'in progress' || selectedStatus?.toLowerCase() === 'stand by') {
      newStatus = 'Active';
    } else if (selectedStatus?.toLowerCase() === 'active') {
      newStatus = 'Stand by';
    }
    if (projectId) {
      try {
        setStatusChanging(true)
        const response = await axios.patch(`${process.env.REACT_APP_baseURL}/projects/${projectId}/status`, {
          status: newStatus,
        });

        if (response.status === 200) {
          setSelectedStatus(newStatus);
          setStatusChanging(false)
          refetch(); 
        }
      } catch (error) {
        console.error("Failed to update project status:", error);
      }
    } else {
      setSelectedStatus(newStatus);
      setStatusChanging(false)
    }
  };


  return (
      <div className="bg-white-A700 flex flex-col gap-8 items-start justify-start pb-8 pt-8 rounded-tl-[40px] h-full min-h-screen overflow-auto w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
              <PageHeader
                >
                  {t('sidebar.projects')}
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-white-A700 border border-gray-201 rounded-[8px] pb-3 shadow-tablesbs ">
              <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 h-[77px] py-[19px] px-5">
                <Text
                  className="text-lg leading-7 text-gray-900_01 pt-1"
                  size="txtDmSansMedium16"
                >
                  {t('projects.createNewProject.title')}
                </Text>
                <div className="flex flex-row ml-auto gap-[16px] items-center">
                  {selectedStatus !== '' && (
                    <>
                      {(selectedStatus?.toLocaleLowerCase() === 'stand by' ||
                        selectedStatus?.toLocaleLowerCase() === 'in progress') && (
                        <Popup
                        className="text-[#2C3462] creditQuestion1"
                          trigger={open => (
                            <button
                              onClick={() => handleStatusChangeAndUpdate()}
                              className={`${(isAllFormValid && validForm) ? 'bg-teal-A700 text-white-A700 hover:bg-greenbtnhoverbg active:bg-[#018080]' : 'bg-[#e5e5e6] text-[#a7a6a8]'} text-sm font-dm-sans-medium flex flex-row h-[37px] min-w-[85px] gap-[8px] items-center justify-center px-[12px] cursorpointer rounded-md`}
                              type="button" disabled={!(isAllFormValid && validForm)}
                            >
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 1.75L3.58178 11.1019C3.27657 11.4681 3.12396 11.6512 3.12163 11.8059C3.1196 11.9404 3.17952 12.0683 3.2841 12.1528C3.40441 12.25 3.64278 12.25 4.11953 12.25H10.5L9.625 19.25L17.4182 9.89813C17.7234 9.53188 17.876 9.34876 17.8784 9.1941C17.8804 9.05965 17.8205 8.93173 17.7159 8.84722C17.5956 8.75 17.3572 8.75 16.8805 8.75H10.5L11.375 1.75Z"
                                  stroke={(isAllFormValid && validForm) ? "white" : "#a7a6a8"}
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {t('projects.createNewProject.activate')}
                            </button>
                          )}
                          position="bottom center"
                          on={['hover', 'focus']}
                          closeOnDocumentClick
                        >
                        <div className="w-[259px] h-[59px] px-[18px] py-[10px] bg-[#2C3462] rounded-lg justify-center items-center flex">
                          <div className="grow w-full shrink basis-0 h-full justify-center items-center flex">
                            <div className="w-full text-[#D0D5DD] text-[10px] font-dm-sans-regular">
                            {t('projects.createNewProject.activatePop.description')} <span className="font-dm-sans-medium text-[#35D8BF] ">{t('projects.createNewProject.activatePop.title')}</span>, {t('projects.createNewProject.activatePop.activatePop')}
                            </div>
                          </div>
                          </div>
                        </Popup>
                      )}
                      {(selectedStatus?.toLocaleLowerCase() === 'active') && (
                        <Popup
                        className="text-[#2C3462] creditQuestion1"
                          trigger={open => (
                            <button
                              onClick={() => handleStatusChangeAndUpdate()}
                              className="bg-[#A9ACB0] hover:bg-[#a7a6a8] active:bg-[#E2E2EE] text-sm font-dm-sans-medium text-white-A700 flex flex-row h-[37px] min-w-[85px] gap-[8px] items-center justify-center px-[12px] cursorpointer rounded-md"
                              type="button" disabled={!(isAllFormValid && validForm)}
                            >
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.875 16.1875H13.125M5.775 1.75H15.225C15.715 1.75 15.9601 1.75 16.1472 1.84537C16.3119 1.92926 16.4457 2.06312 16.5296 2.22776C16.625 2.41493 16.625 2.65995 16.625 3.15V4.9652C16.625 5.39324 16.625 5.60725 16.5766 5.80866C16.5338 5.98722 16.4631 6.15792 16.3671 6.3145C16.2589 6.4911 16.1076 6.64244 15.8049 6.9451L13.2399 9.51005C12.8934 9.85657 12.7202 10.0298 12.6553 10.2296C12.5982 10.4053 12.5982 10.5947 12.6553 10.7704C12.7202 10.9702 12.8934 11.1434 13.2399 11.4899L15.8049 14.0549C16.1076 14.3576 16.2589 14.5089 16.3671 14.6855C16.4631 14.8421 16.5338 15.0128 16.5766 15.1913C16.625 15.3927 16.625 15.6068 16.625 16.0348V17.85C16.625 18.34 16.625 18.5851 16.5296 18.7722C16.4457 18.9369 16.3119 19.0707 16.1472 19.1546C15.9601 19.25 15.715 19.25 15.225 19.25H5.775C5.28495 19.25 5.03993 19.25 4.85276 19.1546C4.68812 19.0707 4.55426 18.9369 4.47037 18.7722C4.375 18.5851 4.375 18.34 4.375 17.85V16.0348C4.375 15.6068 4.375 15.3927 4.42335 15.1913C4.46622 15.0128 4.53693 14.8421 4.63288 14.6855C4.7411 14.5089 4.89244 14.3576 5.1951 14.0549L7.76005 11.4899C8.10657 11.1434 8.27982 10.9702 8.34474 10.7704C8.40184 10.5947 8.40184 10.4053 8.34474 10.2296C8.27982 10.0298 8.10656 9.85656 7.76005 9.51005L5.1951 6.9451C4.89244 6.64244 4.7411 6.4911 4.63288 6.3145C4.53693 6.15792 4.46622 5.98722 4.42335 5.80866C4.375 5.60725 4.375 5.39324 4.375 4.9652V3.15C4.375 2.65995 4.375 2.41493 4.47037 2.22776C4.55426 2.06312 4.68812 1.92926 4.85276 1.84537C5.03993 1.75 5.28495 1.75 5.775 1.75Z"
                                  stroke="white"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {t('projects.createNewProject.standBy')}
                            </button>
                          )}
                          position="bottom center"
                          on={['hover', 'focus']}
                          closeOnDocumentClick
                        >
                        <div className="w-[259px] h-[59px] px-[18px] py-[10px] bg-[#2C3462] rounded-lg justify-center items-center flex">
                          <div className="grow w-full shrink basis-0 h-full justify-center items-center flex">
                            <div className="w-full text-[#D0D5DD] text-[10px] font-dm-sans-regular">
                            {t('projects.createNewProject.standByPop.description')} <span className="font-dm-sans-medium text-[#35D8BF] ">{t('projects.createNewProject.standByPop.title')}</span>, {t('projects.createNewProject.standByPop.standByPop')}
                            </div>
                          </div>
                        </div>
                        </Popup>
                      )}
                    </>
                  )}
                  <button 
                  onClick={() => setHasSubmitted(true)}
                    className={`${submitting === 'ok' ? 'bg-teal-A700 !cursor-not-allowed' : (!submitting === 'sending') ? 'bg-blue-A400 !cursor-not-allowed' : 'bg-blue-A400  hover:bg-[#235DBD] active:bg-[#224a94]' } text-sm font-dm-sans-medium text-white-A700 flex flex-row h-[37px] min-w-[85px] items-center justify-center px-[12px] cursorpointer rounded-md`} 
                    ref={formButtonRef}
                    disabled={submitting === 'sending'}
                    type="submit"
                >
                    {(submitting === 'sending') ? (
                      <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                  ) : submitting === 'ok' ? (
                    <>
                    <BsCheck2Circle size={18} className="mr-2" />
                    {t("common.saved")}
                    </>
                  ) : (
                    <>
                      <FiSave size={21} className="mr-2" />
                      {t('common.save')}
                    </>
                  )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-6 pt-5 pb-9 bg-white-A700 w-full h-auto">
                <div ref={div1Ref} className="flex md:min-w-[300px] flex-1 flex-col gap-6 items-start justify-start w-full h-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.projectName')}*
                    </Text>
                      <input
                        {...register("name", { required: {value:true , message: "Project Name is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.name ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="name"
                        placeholder={t('projects.createNewProject.enterProjectName')}
                      />
                    {/* {errors.name && <span className="text-sm font-dm-sans-regular text-red-500">{errors.name?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.projectDetails')}*
                    </Text>
                      <textarea
                       {...register("details", { required: {value:true , message: "Project Details is required"} })}
                       className={`!placeholder:text-blue_gray-300 !text-gray700 max-h-[139px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.details ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="details"
                        rows={7}
                        placeholder={t('projects.createNewProject.enterProjectDetails')}
                        style={{
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          resize:'none'
                        }}
                      />
                    {/* {errors.details && <span className="text-sm font-dm-sans-regular text-red-500">{errors.details?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.website')}
                    </Text>
                      <input
                      {...register("website", { required: {value:false , message:"Project website is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="website"
                        placeholder={t('projects.createNewProject.enterWebsite')}
                      />
                    {/* {errors.website && <span className="text-sm font-DmSans text-red-500">{errors.website?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.contactEmail')}*
                    </Text>
                      <input
                        {...register("contactEmail", { required: {value:true , message:"Project Contact Email is required"} ,
                        minLength: {
                          value: 2,
                        },
                        maxLength: {
                          value: 120,
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        }, })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.contactEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        type="text"
                        name="contactEmail"
                        placeholder={t('projects.createNewProject.enterEmail')}
                      />
                    {/* {errors.contactEmail && <span className="text-sm font-DmSans text-red-500">{errors.contactEmail?.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.teamMember')}
                    </Text>
                    <Text className="text-[12px] font-dm-sans-regular text-[#98A2B3] w-auto"
                    >
                      {t('employee.canAdd')}
                    </Text>
                    <MultipleSelect id='teams' options={members}  searchLabel={t('projects.createNewProject.searchMember')} setSelectedOptionVal={setSelectedTeamsMember} selectedOptionsDfault={selectedProjectTeamsMembers}
                    itemClassName='py-2 border-b border-gray-201' placeholder={t('projects.createNewProject.assignTeamMember')} valuekey="fullName" optionkey="workEmail" emptyMsg={t('employee.noTeamMembers')}
                    emptyIcon={<PiUsersThin size={30} />}
                    content={
                      ( option) =>{ return (
                        <div className="flex items-center  space-x-3 ">
                          <img src={ option?.image || userdefaultProfile} alt="teams" className="h-8 w-8 rounded-full"/>
                          <div className="flex flex-col gap-1.5 items-start justify-center w-full">
                            <Text
                              className="text-[#101828] text-sm w-auto"
                              size="txtDMSansRegular14Gray900"
                              >
                              {option.fullName}
                            </Text>
                            <Text
                              className="text-[#98A2B3] text-xs w-auto"
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
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.fundingTarget')}*
                    </Text>
                    <div className="relative flex items-center w-full">
                      <img src={fundImg} className="absolute left-2 top-1/2 transform -translate-y-1/2" alt={""}/>
                      <input
                        {...register("funding", { required: { value: true, message: "Project Funding Target is required" } , 
                        validate: {
                          hasValue: value => cleanNumber(value)?.length > 0 || "Project Funding Target is required"
                        } })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[28px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="funding"
                        type="text"
                        value={fundingValue}
                        onChange={(e) => formatFundingValue(e.target.value)}
                        placeholder={t('projects.createNewProject.enterFundingTarget')}
                      />
                    </div>
                    {/* {errors.funding && <span className="text-sm font-dm-sans-regular text-red-500">{errors.funding.message}</span>} */}
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.totalRaised')}*
                    </Text>
                    <div className="relative flex items-center w-full">
                      <img src={fundImg} className="absolute left-2 top-1/2 transform -translate-y-1/2" alt={""}/>
                      <input
                        {...register("totalRaised", { required: { value: false, message: "Project Funding Target is required" } , 
                        validate: {
                          required: value => {
                            // Vérifier si la valeur existe et n'est pas juste des espaces
                            const cleanValue = value?.replace(/\s/g, '');
                            return cleanValue?.length > 0 || "Project Funding Target is required";
                          }
                        } })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[28px] py-[10px] h-[40px] border ${errors?.totalRaised ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        name="totalRaised"
                        type="text"
                        value={raisedValue}
                        onChange={(e) => formatFunding(e.target.value)}
                        placeholder={t('projects.createNewProject.enterTotalRaised')}
                      />
                    </div>
                    {/* {errors.totalRaised && <span className="text-sm font-dm-sans-regular text-red-500">{errors.totalRaised.message}</span>} */}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.stage')}*
                    </Text>
                    <SimpleSelect id='stage' options={stagesData}  searchLabel={t('common.searchStage')} setSelectedOptionVal={setSelectedStage} 
                    placeholder={t('projects.createNewProject.selectStage')} selectedOptionsDfault={project?.stage || ''} required={requiredFields.stage}
                    content={
                      ( option) =>{ return (
                          <div className="flex text-gray-801 text-left text-base font-dm-sans-regular leading-5 py-2 items-center  w-full">
                               {t(`${option}`)}
                           </div>
                        );
                      }
                    }/>
                    {/* {selectedStages.length==0 && <span className="text-sm font-dm-sans-regular text-red-500">Please select stages</span>}  */}
                    
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.country')}*
                    </Text>
                    <SimpleSelect id='country' options={countries}  searchLabel={t("common.searchCountry")} setSelectedOptionVal={setSelectedCountry} 
                        placeholder={t('projects.createNewProject.selectCountry')} valuekey="name" selectedOptionsDfault={project?.country? dataCountries.find(country => country.name === project.country) : ""} 
                        required={requiredFields.country}
                        content={
                          ( option) =>{ return (
                            <div className={`flex  py-2 items-center  w-full`}>
                                <Text
                                  className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                  >
                                  {option.name}
                                </Text>
                              </div>
                            );
                          }
                    }/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.projectSector')}*
                    </Text>
                    <SimpleSelect id='sector' options={companyType}  searchLabel={t("common.searchSector")} searchable={true} setSelectedOptionVal={setselectedSector} 
                        placeholder={t('projects.createNewProject.selectProjectSector')} selectedOptionsDfault={project?.sector || ''} required={requiredFields.sector}
                        content={
                          ( option) =>{ return (
                            <div className="flex  py-2 items-center  w-full">
                                <Text
                                  className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                  >
                                  {t(`${option}`)}
                                </Text>
                              </div>
                            );
                          }
                        }/>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.projectPublication.title')}*
                    </Text>
                    <Text className="text-[12px] font-dm-sans-regular text-[#98A2B3] w-auto"
                    >
                      {t('projects.createNewProject.projectPublication.description')}
                    </Text>
                    <SimpleSelect id='publication'
                    options={["Public" , "Private"]}  selectedOptionsDfault={project?.visbility}
                    setSelectedOptionVal={setSelectedPublication} searchable={false}
                    placeholder={t('projects.createNewProject.projectPublication.selectType')}
                    required={requiredFields.publication}
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base capitalize font-dm-sans-regular leading-5 w-auto"
                            >
                              {t(`${option}`)}
                            </Text>
                          </div>
                        );
                      }
                    } />               
                  </div>
                  {/* <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      Project status
                    </Text>
                    <SimpleSelect id='status'
                    options={["Active" , "In progress" , "Stand by"]}  selectedOptionsDfault={project?.status}
                    setSelectedOptionVal={setSelectedStatus} searchable={false}
                    placeholder={"Select Type of Status"}
                    required={requiredFields.status}
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
                  </div> */}
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <div className="flex items-center w-full justify-between">
                      <Text className="text-base text-[#1D1C21] w-auto"
                        size="txtDMSansLablel"
                      >
                        {t('projects.createNewProject.projectMilestone')}
                      </Text>
                      {milestones?.length > 1 && <button
                          className="hover:bg-light_blue-100 text-sm hover:border hover:border-solid hover:border-blue-500 text-blue-500 flex flex-row gap-1 h-7 items-center justify-center ml-auto px-[12px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={addMilestone}
                          type="button"
                        >
                          <span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#2575F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          </span>
                          <span className="hidden sm:inline">{t('projects.createNewProject.more')}</span>
                      </button>}
                    </div>
                    {milestones.map((milestone, index) => (
                    <div key={milestone.id} className={`flex flex-row gap-2 items-start justify-start w-full`}>
                      <div className="flex md:flex-1 w-[55%]">
                        <input
                          className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs`}
                          name={`name-${milestone.id}`}
                          placeholder={t('projects.createNewProject.enterProjectMilestone')}
                          value={milestone.name}
                          onChange={e => handleMilestoneChange(e, milestone.id, 'name')}
                        />
                      </div>
                      <CustomCalendar
                        className={' w-[30%]'} 
                        inputPlaceholder={t('projects.createNewProject.dueDate')}
                        defaultValue={milestone.dueDate}
                        onChangeDate={(date) => handleMilestoneDateChange(milestone.id, 'dueDate', parseDateString(date))}
                      />
                      {milestones?.length === 1 ? (
                        <button
                          className="bg-light_blue-100 hover:bg-[#E2E2EE] text-sm border border-solid border-blue-500 text-blue-500 flex flex-row gap-1 h-[40px] items-center justify-center ml-auto px-[12px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={addMilestone}
                          type="button"
                        >
                          <span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#2575F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          </span>
                          <span className="hidden sm:inline">{t('projects.createNewProject.more')}</span>
                        </button>
                      ) : (
                        <button
                          className="bg-[#E8555521] hover:bg-red-200 text-sm border border-solid border-errorColor text-errorColor flex flex-row h-[40px] w-auto items-center justify-center ml-auto px-[12px] py-[7px] rounded-md w-[15%] cursorpointer"
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={() => removeMilestone(milestone?.id)}
                          type="button"
                        >
                        {(loadingDel !== null && loadingDel === milestone?.id) ? <AiOutlineLoading size={22} className="animate-spin disabled !cursor-not-allowed" /> :
                         <span className="flex items-center gap-1">
                         <svg width="13" height="2" viewBox="0 0 13 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.25 1H11.75" stroke="#EF4352" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="hidden lg:inline">{t('projects.createNewProject.hide')}</span>
                        </span>}
                        </button>
                      )}
                    </div>
                    ))}
                  </div>
                </div>
                <div ref={dividerRef} className={`bg-gray-201 lg:min-h-fit lg:h-[${maxDivHeight}] lg:max-h-[${maxDivHeight}] h-px w-full lg:w-px`} />
                {/* <div className="flex flex-col md:divide-x md:min-h-[750px] md:h-full divide-gray-201 hover:divide-pink-400">
                  {` `}
                </div> */}
                <div ref={div2Ref} className="flex flex-col gap-6 items-start justify-start lg:w-[40%] w-full">
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansCardHeader16"
                    >
                      {t('projects.createNewProject.projectLogo.title')}
                    </Text>
                    <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[270px] flex flex-col items-center justify-center rounded-md w-full py-1 cursorpointer relative"
                        onDragOver={handleDragOver}
                        onDrop={handleDropLogo} onClick={handleLogoFileInputClick}>
                      {logoFile ? (
                        <>
                        <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[268px]" />
                        <div className="absolute top-2 right-0 flex flex-col justify-end" 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                          <div className="relative mr-3 w-auto">
                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.0013 2.66659C7.36949 2.66659 7.66797 2.36811 7.66797 1.99992C7.66797 1.63173 7.36949 1.33325 7.0013 1.33325C6.63311 1.33325 6.33464 1.63173 6.33464 1.99992C6.33464 2.36811 6.63311 2.66659 7.0013 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M11.668 2.66659C12.0362 2.66659 12.3346 2.36811 12.3346 1.99992C12.3346 1.63173 12.0362 1.33325 11.668 1.33325C11.2998 1.33325 11.0013 1.63173 11.0013 1.99992C11.0013 2.36811 11.2998 2.66659 11.668 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.33464 2.66659C2.70283 2.66659 3.0013 2.36811 3.0013 1.99992C3.0013 1.63173 2.70283 1.33325 2.33464 1.33325C1.96645 1.33325 1.66797 1.63173 1.66797 1.99992C1.66797 2.36811 1.96645 2.66659 2.33464 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          {showLogoDropdown && 
                            <div className="absolute top-[100%] right-0 flex flex-col">
                            <div className="flex mt-1 flex-col bg-white-A700 border-[0.5px] border-[#2575F01A] rounded-[8px] p-[16px] shadow-roleCardbs z-10">
                              <div className="w-auto group h-9 py-[5px] px-[16px] justify-start items-center gap-3 inline-flex" 
                              onClick={handleLogoFileInputChangeClick}>
                                <span>
                                  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6347 7.09536C12.4495 8.83529 11.4636 10.4658 9.83228 11.4076C7.12196 12.9724 3.65628 12.0438 2.09147 9.33348L1.9248 9.04481M1.36344 5.90467C1.54864 4.16474 2.5345 2.53426 4.16582 1.59241C6.87615 0.0276043 10.3418 0.95623 11.9066 3.66655L12.0733 3.95523M1.32812 10.544L1.81616 8.72267L3.63753 9.21071M10.3609 3.78934L12.1823 4.27737L12.6703 2.45601" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                                <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t('common.change')}</div>
                              </div>
                              <div className="w-auto group h-9 py-[5px] px-[16px] justify-start items-center gap-3 inline-flex" 
                              onClick={handleRemoveLogo}>
                                <span>
                                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1.5H9M1 3.5H13M11.6667 3.5L11.1991 10.5129C11.129 11.565 11.0939 12.0911 10.8667 12.49C10.6666 12.8412 10.3648 13.1235 10.0011 13.2998C9.58798 13.5 9.06073 13.5 8.00623 13.5H5.99377C4.93927 13.5 4.41202 13.5 3.99889 13.2998C3.63517 13.1235 3.33339 12.8412 3.13332 12.49C2.90607 12.0911 2.871 11.565 2.80086 10.5129L2.33333 3.5M5.66667 6.5V9.83333M8.33333 6.5V9.83333" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                                <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t('common.delete')}</div>
                              </div>
                            </div>
                          </div>}
                        </div>
                        <input ref={logoFileInputRefChange} id="fileInput" type="file" onChange={(e) => handleLogoFileUpload(e)} className="hidden" />
                        </>
                      ) : (<>
                      <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 rounded-md w-full">
                        <IoImageOutline />
                        <div className="flex flex-col items-center justify-center w-auto">
                          <Text
                            className="text-[13px] text-base text-center leading-6 tracking-normal w-auto"
                            size="txtDMSansRegular13"
                          >
                          {isDragging? "Drop Your logo here" : t('projects.createNewProject.projectLogo.uploadLogo')}  
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
                      className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansCardHeader16"
                    >
                      {t('projects.createNewProject.uploadDocument')}
                    </Text>
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}
                       onDragOver={handleDragOver}
                       onDrop={(event) => handleDrop1(event, "pitchDeck")}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.uploadPitchDeck.title')}
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
                          <span className="text-blue_gray-300"> {t('projects.createNewProject.uploadPitchDeck.description')} </span>
                        <span className="text-blue-500">{t('projects.createNewProject.uploadPitchDeck.description1')}</span>
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
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.uploadBusinessPlan.title')}
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
                          <span className="text-blue_gray-300"> {t('projects.createNewProject.uploadPitchDeck.description')} </span>
                        <span className="text-blue-500" >{t('projects.createNewProject.uploadPitchDeck.description1')}</span>
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
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('projects.createNewProject.uploadFinancialProjection.title')}
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
                          <span className="text-blue_gray-300"> {t('projects.createNewProject.uploadPitchDeck.description')} </span>
                        <span className="text-blue-500" >{t('projects.createNewProject.uploadPitchDeck.description1')}</span>
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
                    <Text className="text-base text-[#1D1C21] w-auto" size="txtDMSansLablel">
                    {t('projects.createNewProject.uploadOtherDocument.title')}
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
                          <span className="text-blue_gray-300"> {t('projects.createNewProject.uploadPitchDeck.description')} </span>
                        <span className="text-blue-500" >
                          {t('projects.createNewProject.uploadPitchDeck.description1')}
                        </span>
                        </> 
                        }
                      </label>
                    </div>
                    {Array.from(droppedFiles.values()).map((file) => {
                      if (file?.index === index) {
                        return (
                          <div key={`file-${file.index}`} className="flex flex-row gap-2 items-center justify-between w-[90%] pt-2">
                            <div className="flex flex-row gap-2 items-center justify-start w-full">
                              <GrAttachment size={16} className="mr-2" />
                              <Text
                                className="flex-1 text-blue-A400 font-dm-sans-regular text-sm lg:text-base leading-6 tracking-normal w-auto"
                                size=""
                              >
                                {file?.name}
                              </Text>
                            </div>
                            <div className="flex w-auto" onClick={() => handleDeleteFile(file.index)}>
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
                    className="flex w-full text-base text-blue-500 font-dm-sans-medium leading-[18px] cursorpointer rounded-md px-2 py-3 border border-solid border-blue-500 bg-light_blue-100 hover:bg-[#E2E2EE] items-center justify-center"
                    onClick={addDocumentDiv}
                    type="button"
                  >
                    <ImFileText2 size={20} className="mr-2 text-blue-500" />
                    {t('projects.createNewProject.addMoreDocument')}
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
  );
};

export default CreateProject;