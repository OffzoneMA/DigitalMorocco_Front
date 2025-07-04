import React , { useRef , useState , useEffect} from "react";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { default as ModalProvider } from "react-modal";
import { Text } from "../../Text";
import { useForm } from "react-hook-form";
import MultipleSelect from "../../common/MultipleSelect";
import { useGetShareWithDataQuery } from "../../../Services/Document.Service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewDocumentModal = (props) => {
  const { t } = useTranslation();
  const [Mount, setMount] = useState(true)
  const {data: shareWithData} = useGetShareWithDataQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const documentFile = props?.rowData? props.rowData : null;
  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    defaultValues: {
      title: documentFile?.title,
    }});
  const [selectedMembers , setSelectedMembers] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const [preview , setPreview] = useState(documentFile?.documentName || null);
  const [shareType , setShareType] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    docFile: false,
  });
  const [sendingOk , setSendingOk] = useState(false);

  useEffect(() => {
      if (hasSubmitted ) {
        const isFileValid = (files !== null || preview !== null );
    
        setRequiredFields({
          docFile: !isFileValid,
        });
    
        setIsFormValid(isFileValid);
      }
  }, [hasSubmitted , files , preview]);

  useEffect(() => {
    if (!props.isOpen) {
      reset(); 
      setPreview(null); 
      setFiles(null);
      setHasSubmitted(false); 
      setSendingOk(false);
      setRequiredFields({ docFile: false }); 
    }
  }, [props.isOpen, reset]);

  useEffect(() => {
    if (shareWithData) {
      setFilteredUsers(shareWithData);
    }
  }, [shareWithData]);

  useEffect(() => {
    if (shareWithData && documentFile?.shareWithUsers) {
      const initialSelectedUsers = documentFile.shareWithUsers
        .map(userId => shareWithData.find(user => user._id === userId))
        .filter(user => user); // Remove any undefined values
      setSelectedMembers(initialSelectedUsers);
    }
  }, [documentFile?.shareWithUsers, shareWithData]);

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
    if (props?.rowData ) {
      reset({
        title: props?.rowData?.title,
      });
      setPreview(props?.rowData?.documentName)
    }
  }, [props?.rowData, reset]);

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    // Réinitialiser l'input file
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    // Révoquer l'URL de l'objet pour libérer la mémoire
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    // Réinitialiser les états
    setFiles(null);
    if(documentFile?._id){
      setPreview(documentFile?.documentName)
    }else{
      setPreview(null);
    }
  };

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
    if(isFormValid && preview !==null){
      setSendingOk(true)
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
        props?.refetch();
        setSelectedMembers([]);
        setPreview(null);
        const redirectTimer = setTimeout(() => {
          navigate("/Document");
        }, 1000);
        return () => clearTimeout(redirectTimer);
      }else {
        props?.response?.isError && console.log(props?.response?.error)
      }
    }
  }, [navigate, props, Mount]);

  // .map(
  //   item => ({ label: item, value: item })
  // );
  
    return (
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-auto w-[95%] max-w-[640px] outline-none"
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
                {documentFile?._id? t('document.editDocument'): t('document.uploadNewDocument')} 
              </Text>
            </div>
            <div className="hover:bg-gray-201 rounded-full p-1" onClick={closeModal}>
              {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> */}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full max-h-[70vh] ">
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-[#1D1C21] w-auto"
                size="txtDMSansLablel"
              >
                {t('document.uploadNewDocumentSection.documentTitle')}
              </Text>
              <input
                {...register("title", { required: {value:true , message: "Document title is required."} })}
                className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.title ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                type="text"
                name="title"
                placeholder={t('document.uploadNewDocumentSection.enterDocumentTitle')}
                defaultValue={documentFile?.title}
              />
            </div>
            <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
              <Text
                className="text-base text-[#1D1C21] w-auto"
                size="txtDMSansLablel"
              >
                {t('document.uploadNewDocumentSection.uploadDocument')}
              </Text>
                <div className={`${(preview || documentFile?.documentName)?  "border-dashed ": ""} ${(requiredFields.docFile) ? "border-errorColor shadow-inputBsError" : "border-[1px] border-[#d0d5dd]"} flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border `} 
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                  {(preview || documentFile?.documentName) ? (
                    <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-14">
                        <div className="flex flex-row items-center justify-center gap-3 w-full">
                          <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-6 tracking-normal items-center">
                            <IoDocumentTextOutline size={17} className="mr-2" /> {" "} {files?.name ? files.name : documentFile?._id? documentFile?.documentName: ""}
                          </Text>
                          {files?.name && <button
                            onClick={handleDelete}
                            className="text-[#F48888] hover:text-errorColor rounded-full hover:bg-red-50 transition-colors cursorpointer"
                            aria-label="Supprimer le fichier"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9959 5.87952 15.1518 3.84705 13.6524 2.34764C12.153 0.848226 10.1205 0.00406613 8 0ZM10.9 10.0231C11.0156 10.1397 11.0804 10.2973 11.0804 10.4615C11.0804 10.6257 11.0156 10.7833 10.9 10.9C10.7824 11.0137 10.6252 11.0773 10.4615 11.0773C10.2979 11.0773 10.1407 11.0137 10.0231 10.9L8 8.86923L5.97692 10.9C5.8593 11.0137 5.70208 11.0773 5.53846 11.0773C5.37484 11.0773 5.21763 11.0137 5.1 10.9C4.98444 10.7833 4.91962 10.6257 4.91962 10.4615C4.91962 10.2973 4.98444 10.1397 5.1 10.0231L7.13077 8L5.1 5.97692C5.00187 5.85735 4.95172 5.70556 4.95931 5.55107C4.9669 5.39657 5.03168 5.25043 5.14106 5.14105C5.25043 5.03168 5.39658 4.96689 5.55107 4.95931C5.70557 4.95172 5.85736 5.00187 5.97692 5.1L8 7.13077L10.0231 5.1C10.1426 5.00187 10.2944 4.95172 10.4489 4.95931C10.6034 4.96689 10.7496 5.03168 10.8589 5.14105C10.9683 5.25043 11.0331 5.39657 11.0407 5.55107C11.0483 5.70556 10.9981 5.85735 10.9 5.97692L8.86923 8L10.9 10.0231Z" fill="currentColor"/>
                            </svg>
                          </button>}
                        </div>
                        <div className="font-DmSans flex justify-center items-center icon-container bg-white-A700 gap-[6px] text-blue-A400 border border-solid hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] border-blue-A400 flex-row h-[46px] items-center py-[7px] px-[12px] rounded-md w-auto min-w-[213px] cursorpointer">
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 11L8.5 8M8.5 8L11.5 11M8.5 8V14.75M14.5 11.5571C15.4161 10.8005 16 9.65595 16 8.375C16 6.09683 14.1532 4.25 11.875 4.25C11.7111 4.25 11.5578 4.1645 11.4746 4.0233C10.4965 2.36363 8.69082 1.25 6.625 1.25C3.5184 1.25 1 3.7684 1 6.875C1 8.42458 1.62659 9.82781 2.64021 10.8451" stroke="#2575F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            ref={inputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            className={`!placeholder:text-blue_gray-301 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                            type="file"
                            name="name"
                          />
                          <button
                            onClick={() =>onButtonClick(inputRef)}
                            type="button"
                            className="flex justify-center items-center text-sm font-dm-sans-medium leading-[26px] cursorpointer "
                          >
                            {t('document.uploadNewDocumentSection.updateDocument')}
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
                          className={`!placeholder:text-blue_gray-301 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="file"
                          name="name"
                        />
                  <Text className="font-dm-sans-regular text-sm leading-[26px] tracking-normal">
                  {t('document.uploadNewDocumentSection.uploadPrompt')}  
                  </Text>
                </div>
                  )
                  }
                </div>
            </div>
            <div className={`flex flex-row gap-2 items-center justify-start py-1 w-full`}>
                <Text
                style={{whiteSpace:'nowrap'}}
                    className="text-base text-[#1D1C21] w-auto mr-4"
                >
                {t('document.uploadNewDocumentSection.shareWith')}
              </Text>
              <MultipleSelect id='sector' options={filteredUsers}  searchLabel='Seach members' searchable={false} setSelectedOptionVal={setSelectedMembers} 
                    placeholder={t('document.uploadNewDocumentSection.selectName')} valuekey="name" optionkey="_id" selectedOptionsDfault={selectedMembers}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-medium leading-5 w-auto capitalize"
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
              <button type="reset" 
              className="flex items-center justify-center min-w-[93px] bg-[#E4E7EC]  hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer text-[#475467] py-[10px] md:py-[18px] px-[12px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]" 
              onClick={closeModal}>{t("common.cancel")}</button>
              <button 
              type="submit" 
              onClick={() => setHasSubmitted(true)}
              className="flex items-center justify-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] font-dm-sans-medium text-base h-[44px] min-w-[116px] leading-5 tracking-normal rounded-[6px] cursorpointer" 
              >
              {sendingOk ? 
                <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>  :  
                documentFile?._id ? t('common.edit') : t('document.uploadNewDocumentSection.addDocument')}
              </button>
            </div>
          </div>
        </div>
      </form>
     </ModalProvider>
    )
}

export default NewDocumentModal;