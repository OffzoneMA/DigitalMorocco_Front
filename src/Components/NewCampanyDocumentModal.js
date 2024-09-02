import React , {useRef , useState} from "react";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { default as ModalProvider } from "react-modal";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { City } from "country-state-city";
import { useForm } from "react-hook-form";

const NewCampanyDocumentModal = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    City.getAllCities();
    const inputRef = useRef(null);
    const [files, setFiles] = useState(null);
  const [preview , setPreview] = useState(null);
  const documentFile = props?.documentFile? props.documentFile : null;

 
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

    props.onSubmit(formData);
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
            <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline className='text-blue_gray-500' size={20} />
            </div>
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
                {errors.title && <span className="text-sm font-DmSans text-red-500">{errors.title?.message}</span>}
            </div>

            <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base text-[#1D1C21] w-auto" size="txtDMSansLablel">Upload Document</Text>
                <div
                    className={`${(preview || documentFile?._id) ? "border-dashed" : "border-solid"} flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {(preview || documentFile?._id) ? (
                        <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-14">
                            <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-[26px] tracking-normal items-center">
                                <IoDocumentTextOutline size={16} className="mr-2" />
                                {preview ? files.name : documentFile?.name}
                            </Text>
                            <div className="font-DmSans bg-white-A700 text-blue-A400 border border-solid border-blue-A400 flex flex-row md:h-auto items-center p-[7px] rounded-md w-auto">
                                <LuUploadCloud size={18} className="mr-2" />
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
                                    className="text-sm font-medium leading-[26px] mr-2"
                                >
                                    Update your document
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-14">
                            <LuUploadCloud size={24} className="mr-2" />
                            <input
                                ref={inputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                className="!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                                type="file"
                                name="name"
                            />
                            <Text className="font-dm-sans-regular text-sm leading-[26px] tracking-normal">
                                Drop file or <span onClick={() => onButtonClick(inputRef)}>click here to upload your document</span>
                            </Text>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end w-full mx-auto justify-end">
                <div className="flex space-x-5 w-auto">
                    <button
                        type="reset"
                        className="bg-gray-300 text-gray-700 hover:bg-[#D0D5DD] active:bg-light_blue-100 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green"
                        onClick={() => setPreview(null)}
                        style={{ width: "101px", height: "44px" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer-green text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]"
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