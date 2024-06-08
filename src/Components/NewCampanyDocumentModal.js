import React , {useMemo , useRef , useState} from "react";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { default as ModalProvider } from "react-modal";
import { LuUpload, LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { City } from "country-state-city";
import { useForm } from "react-hook-form";

const NewCampanyDocumentModal = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const cities = City.getAllCities();
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
    // console.log("files",files);
  };

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const onSubmit = async (data) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = async () => {
        const base64File = reader.result;

        const requestData = {
            title: data.title,
            data: base64File,
            name: files.name,
            type: files.type,
            lastModifiedDate: files.lastModifiedDate
        };

        if (documentFile?._id) {
            requestData._id = documentFile._id;
        }
        if (documentFile?.ownerId) {
            requestData.ownerId = documentFile.ownerId;
        }

        props.onSubmit(requestData);
    };
};


  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[65%] md:w-[45%] lg:w-[40%] xl:w-[40%] 2xl:w-[35%]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
     <form onSubmit={handleSubmit(onSubmit)} className="max-h-[99vh] sm:w-full md:w-full overflow-y-auto">
    <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-4 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text className="md:text-lg text-[18px] font-medium font-DmSans leading-7 text-gray-900 w-full">
                    {documentFile?._id ? "Edit Document" : "Add New Document"}
                </Text>
            </div>
            <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline className='text-blue_gray-500' size={20} />
            </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-h-[70vh]">
            <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base text-gray-900_01 w-auto" size="txtDMSansLablel">Document Title</Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                        {...register("title", { required: { value: true, message: "Document title is required." } })}
                        className="!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                        type="text"
                        name="title"
                        placeholder="Document Title"
                        defaultValue={documentFile?.title || ""}
                    />
                </div>
                {errors.title && <span className="text-sm font-DmSans text-red-500">{errors.title?.message}</span>}
            </div>

            <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base text-gray-900_01 w-auto" size="txtDMSansLablel">Upload Document</Text>
                <div
                    className={`${(preview || documentFile?.id) ? "border-dashed" : "border-solid"} flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {(preview || documentFile?.id) ? (
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
                            <Text className="font-DmSans text-sm font-normal leading-[26px] tracking-normal">
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
                        className="bg-gray-300 text-gray-700 py-3 px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg"
                        onClick={() => setPreview(null)}
                        style={{ width: "101px", height: "44px" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-auto bg-blue-A400 text-white-A700 py-3 px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg"
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