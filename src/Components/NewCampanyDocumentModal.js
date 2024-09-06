import React , {useRef , useState , useEffect} from "react";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { default as ModalProvider } from "react-modal";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { City } from "country-state-city";
import { useForm } from "react-hook-form";

const NewCampanyDocumentModal = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const inputRef = useRef(null);
  const [files, setFiles] = useState(null);
  const [preview , setPreview] = useState(null);
  const documentFile = props?.documentFile? props.documentFile : null;
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    docFile: false,
  });

  useEffect(() => {
      if (hasSubmitted ) {
        const isFileValid = files !== null;
    
        setRequiredFields({
          docFile: !isFileValid,
        });
    
        setIsFormValid(isFileValid);
      }
  }, [hasSubmitted , files]);
  
 
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

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("file", files); 

    if (documentFile?._id) {
        formData.append("_id", documentFile._id);
    }
    if (documentFile?.ownerId) {
        formData.append("ownerId", documentFile.ownerId);
    }
    if(isFormValid){
        props.onSubmit(formData);
    }
};

const handleCancelClick = () => {
    setPreview(null);
    props.onRequestClose();
};

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
                <Text className="md:text-lg text-[18px] font-medium font-DmSans leading-7 text-gray-900 w-full">
                    {documentFile?._id ? "Edit Document" : "Add New Document"}
                </Text>
            </div>
            {/* <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline className='text-blue_gray-500' size={20} />
            </div> */}
        </div>

        <div className="flex flex-col gap-3 w-full max-h-[70vh]">
            <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base text-[#1D1C21] w-auto" size="txtDMSansLablel">Document Title</Text>
                <input
                    {...register("title", { required: { value: true, message: "Document title is required." } })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.title ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="title"
                    placeholder="Document Title"
                    defaultValue={documentFile?.title || ""}
                />
            </div>
            <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base text-[#1D1C21] w-auto" size="txtDMSansLablel">Upload Document</Text>
                <div
                    className={`${(preview || documentFile?._id) ? "border-dashed" : ""} ${requiredFields.docFile ? "border-errorColor shadow-inputBsError" : "border-[1px] border-[#d0d5dd]"} flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {(preview || documentFile?._id) ? (
                        <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md md:h-[206px] py-14">
                            <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-[26px] tracking-normal items-center">
                                <IoDocumentTextOutline size={16} className="mr-2" />
                                {preview ? files.name : documentFile?.name}
                            </Text>
                            <div className="font-DmSans icon-container bg-white-A700 gap-[6px] text-blue-A400 border border-solid hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] border-blue-A400 flex flex-row h-[46px] items-center py-[7px] px-[12px] rounded-md w-auto">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 11L8.5 8M8.5 8L11.5 11M8.5 8V14.75M14.5 11.5571C15.4161 10.8005 16 9.65595 16 8.375C16 6.09683 14.1532 4.25 11.875 4.25C11.7111 4.25 11.5578 4.1645 11.4746 4.0233C10.4965 2.36363 8.69082 1.25 6.625 1.25C3.5184 1.25 1 3.7684 1 6.875C1 8.42458 1.62659 9.82781 2.64021 10.8451" stroke="#2575F0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <input
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    className="!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                                    type="file"
                                    name="name"
                                />
                                <button
                                    onClick={() => onButtonClick(inputRef)}
                                    type="button"
                                    className="text-sm cursorpointer-green font-dm-sans-medium leading-[26px] mr-2"
                                >
                                    Update your document
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md md:h-[206px] py-14`} 
                        onClick={() => onButtonClick(inputRef)}>
                          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14L11 10M11 10L15 14M11 10V19M19 14.7428C20.2215 13.734 21 12.2079 21 10.5C21 7.46243 18.5376 5 15.5 5C15.2815 5 15.0771 4.886 14.9661 4.69774C13.6621 2.48484 11.2544 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 10.5661 1.83545 12.4371 3.18695 13.7935" stroke="#2575F0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                            <input
                                ref={inputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                className="!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                                type="file"
                                name="name"
                            />
                            <Text className="font-dm-sans-regular text-sm leading-[26px] tracking-normal">
                                Drop file or <span>click here to upload your document</span>
                            </Text>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end w-full mx-auto justify-end">
                <div className="flex space-x-5 w-auto">
                    <button
                        type="reset"
                        className="flex items-center justify-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green"
                        onClick={handleCancelClick}
                        style={{ width: "101px", height: "44px" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={() => setHasSubmitted(true)}
                        className="flex items-center justify-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer-green text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]"
                        style={{ width: "195px", height: "44px" }}
                    >
                        {documentFile?._id ? "Edit Document" : "Add Document"}
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>
    </ModalProvider>
  );
};

export default NewCampanyDocumentModal;