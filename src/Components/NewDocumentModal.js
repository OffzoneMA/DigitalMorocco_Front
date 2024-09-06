import React , { useRef , useState , useEffect} from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { useForm } from "react-hook-form";
import MultipleSelect from "./MultipleSelect";
import { useCreateDocumentMutation  , useGetShareWithDataQuery } from "../Services/Document.Service";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../Services/User.Service";

const NewDocumentModal = (props) => {
  const [Mount, setMount] = useState(true)
  const { data: users} = useGetAllUsersQuery();
  const {data: shareWithData , isLoading, isError , refetch } = useGetShareWithDataQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const documentFile = props?.rowData? props.rowData : null;
  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    defaultValues: {
      title: documentFile?.title,
    }});
  const [selectedMembers , setSelectedMembers] = useState([]);
  const [createDocument , response] = useCreateDocumentMutation(); 
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const [preview , setPreview] = useState(null);
  const [shareType , setShareType] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    docFile: false,
  });
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
      if (hasSubmitted ) {
        const isFileValid = files !== null;
    
        setRequiredFields({
          docFile: !isFileValid,
        });
    
        setIsFormValid(isFileValid);
      }
  }, [hasSubmitted , files]);

  useEffect(() => {
    if (shareWithData) {
      setFilteredUsers(shareWithData);
    }
  }, [shareWithData]);

  // useEffect(() => {
  //   if (Array.isArray(props?.rowData?.shareWithUsers)) {
  //     const selectedFullUsers = props.rowData.shareWithUsers.map(userId =>
  //       filteredUsers.find(user => user._id === userId)
  //     );
  //     console.log(selectedFullUsers)
  //     setSelectedMembers(selectedFullUsers);
  //   } else {
  //     setSelectedMembers([]);
  //   }
  // }, [props?.rowData?.shareWithUsers, filteredUsers]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files[0]);
    setPreview(URL.createObjectURL(event.dataTransfer.files[0]))
  };

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  useEffect(() => {
    // Réinitialiser le formulaire lorsque documentFile change
    reset({
      title: documentFile?.title,
    });
  }, [documentFile, reset]);

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const closeModal =() => {
    props.onRequestClose();
    setPreview(null)
  }

  const determineShareWith = () => {
    const pluralRoles = {
      member: 'Members',
      investor: 'Investors',
      partner: 'Partners',
      employee: 'Marketing Team', 
    };
  
    // Map the selected members' roles to their singular forms
    const roles = selectedMembers.map(user => user?.type.toLowerCase());
  
    // Get unique roles and sort them
    const uniqueRoles = [...new Set(roles)];
    uniqueRoles.sort();
  
    // Convert roles to their plural forms and capitalize them
    const capitalizedPluralRoles = uniqueRoles.map(role => {
      const pluralRole = pluralRoles[role] || role?.charAt(0)?.toUpperCase() + role?.slice(1) + 's';
      return pluralRole;
    });
  
    // Join the roles with ' & ' for the final result
    return capitalizedPluralRoles.join(' & ');
  };
  
  const formData = new FormData();

  const onSubmit = (data) => {
    const shareWith = determineShareWith(); 
    setShareType(shareWith)
    formData.append('docFile', files); 
    const documentData = {
      ...data,  
      shareWith,  
      shareWithUsers: selectedMembers.map(user => user._id)  
    };
    // Step 2: Stringify the entire documentData object
    formData.append('documentData', JSON.stringify(documentData));
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    }); 

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    if(isFormValid){
      try {
        documentFile?._id ? 
        props?.onSubmit({ id: documentFile._id, formData }).unwrap() : 
        props?.onSubmit(formData).unwrap();
      } catch (err) {
          console.error('Failed to create document:', err);
      }
    }
  };

  useEffect(() => {
    if (Mount) { setMount(false) }
    else {
      if (props?.response?.isSuccess) {
        props.onRequestClose();
        setPreview(null);
        const redirectTimer = setTimeout(() => {
          navigate("/Document");
        }, 1000);
        return () => clearTimeout(redirectTimer);
      }else {
        response.isError && console.log(response.error)
      }
    }
  }, [props?.response]);

  const membersdata = [
    "Annette Black",
    "Youssef DIOURI",
    "Cameron Williamson",
    "Business Angel",
    "Venture Capital"
  ]
  // .map(
  //   item => ({ label: item, value: item })
  // );
  
    return (
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-auto w-[95%] max-w-[540px]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[99vh] sm:w-full md:w-full overflow-y-auto">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-4 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
          <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <Text
                className="md:text-lg text-[18px] leading-7 text-[#1D2939] font-medium w-full font-DmSans"
              >
                {documentFile?._id? "Edit Document": "Upload New Document"} 
              </Text>
            </div>
            <div className="hover:bg-gray-201 rounded-full p-1" onClick={closeModal}>
              {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> */}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full max-h-[70vh] ">
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-[#1D1C21] w-auto"
                size="txtDMSansLablel"
              >
                Document Title
              </Text>
              <input
                {...register("title", { required: {value:true , message: "Document title is required."} })}
                className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.title ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                type="text"
                name="title"
                placeholder="Document Title"
                defaultValue={documentFile?.title}
              />
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-[#1D1C21] w-auto"
                size="txtDMSansLablel"
              >
                Upload Document
              </Text>
                <div className={`${(preview || documentFile?._id)?  "border-dashed ": ""} ${requiredFields.docFile ? "border-errorColor shadow-inputBsError" : "border-[1px] border-[#d0d5dd]"} flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border `} 
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                  {(preview || documentFile?._id) ? (
                    <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-14">
                        <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-6 tracking-normal items-center">
                        <IoDocumentTextOutline size={17} className="mr-2" /> {" "} {preview? files.name : documentFile?._id? documentFile?.documentName: ""}
                        </Text>
                        <div className="bg-white-A700 text-blue-A400 border border-solid border-blue-500 flex flex-row md:h-auto items-center p-[7px] rounded-md w-auto">
                          <LuUploadCloud  size={18} className="mr-2"/>
                          <input
                          ref={inputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="file"
                          name="name"
                        />
                          <button
                            onClick={() =>onButtonClick(inputRef)}
                            type="button"
                            className="text-sm font-medium font-DmSans leading-[26px]  "
                          >
                            update your document
                          </button>
                        </div>
                    </div>) :
                  (   
                <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-14" 
                onClick={()=> onButtonClick(inputRef)}>
                  <LuUploadCloud  size={24} className=" mr-2"/>
                  <input
                          ref={inputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="file"
                          name="name"
                        />
                  <Text className="font-dm-sans-regular text-sm leading-[26px] tracking-normal">
                    Drop file or <span className="" >click here to upload your document</span>  
                  </Text>
                </div>
                  )
                  }
                </div>
            </div>
            <div className={`flex flex-row gap-2 items-center justify-start py-1 w-full`}>
                <Text
                style={{whiteSpace:'nowrap'}}
                    className="text-base text-gray-900_01 w-auto mr-4"
                >
                Share with
              </Text>
              <MultipleSelect id='sector' options={filteredUsers} onSelect={""} searchLabel='Seach members' searchable={false} setSelectedOptionVal={setSelectedMembers} 
                    placeholder="Select name" valuekey="name" optionkey="_id" selectedOptionsDfault={props.rowData?.shareWithUsers?.map(userId => filteredUsers.find(user => user._id === userId))}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-medium leading-5 w-auto"
                              >
                               {option?.name}
                            </Text>
                           </div>
                        );
                      }
                    }/>
            </div>

          </div>
          <div className="flex items-end w-full mx-auto justify-end">
            <div className="flex space-x-5 w-auto">
              <button type="reset" className="flex items-center bg-[#E4E7EC]  hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer-green text-[#475467] py-[10px] md:py-[18px] px-[12px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]" 
              onClick={closeModal}>Cancel</button>
              <button 
              type="submit" 
              onClick={() => setHasSubmitted(true)}
              className="flex items-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] font-dm-sans-medium text-base h-[44px] min-w-[116px] leading-5 tracking-normal rounded-[6px] cursorpointer-green" 
              >{documentFile?._id ? 'Save' : 'Add Document'}</button>
            </div>
          </div>
        </div>
      </form>
     </ModalProvider>
    )
}

export default NewDocumentModal;