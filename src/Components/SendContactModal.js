import React , {useState , useRef} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import SimpleSelect from "./SimpleSelect";
import ConfirmedModal from "./ConfirmedModal";
import { useForm } from "react-hook-form";
import { useGetAllProjectsQuery } from "../Services/Member.Service";
import { useCreateConatctReqProjectMutation } from "../Services/Member.Service";

const SendContactModal = (props) => {
    const [createContactReqProject] = useCreateConatctReqProjectMutation();

    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data, error, isLoading , refetch } = useGetAllProjectsQuery();
    const inputRef = useRef(null);
    const [files, setFiles] = useState(null);
    const [preview , setPreview] = useState(null);
    const [selectedProject , setSelectedProject] = useState(null);
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
  
    const formData = new FormData();

    const onSubmit = async (data) => {
      formData.append('document', files); 
      formData.append('projectId', selectedProject?._id);
      formData.append('investorId' , props?.investorId)
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      
      try {
        const response = await createContactReqProject(formData).unwrap();
        console.log('Contact request created successfully');
        openModal();
      } catch (error) {
        console.error('Failed to create contact request:', error);
      }
    };

    const openModal  = () =>  {
        setIsConfirmedModalOpen(true);
        // props.setToClose(true);
        // props.setIsContactModalOpen(false);
        props.onRequestClose();
      };
    
      const closeModal = () => {
        setIsConfirmedModalOpen(false);
      };

    return (
        <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-auto w-[95%] md:w-[100%] max-w-[600px]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-screen w-full md:w-full">
          <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
            <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="font-DmSans md:text-lg text-[18px] leading-7 font-medium text-gray-900 w-full"
                >
                  Send Contact Request
                </Text>
              </div>
              <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full max-h-[70vh] overflow-y-auto">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Project
                </Text>
                <SimpleSelect id='project' options={data} onSelect={""} searchLabel='Search Project' setSelectedOptionVal={setSelectedProject} 
                    placeholder="Select Project" valuekey="name"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
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
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Write Your Request Letter
                </Text>
                <div className="flex flex-col md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <textarea 
                    {...register("letter", { required: {value:true , message: "Request Letter is required."} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    rows={5}
                    placeholder="Write your request letter here"
                    >
                  </textarea>
                </div>
                {errors.letter && <span className="text-sm font-DmSans text-red-500">{errors.letter?.message} </span>}
                <Text
                  className="font-dm-sans-regular text-sm leading-6 text-left text-gray-700"
                  size=""
                >
                  Introduce your startup or provide additional context about your project
                </Text>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Upload Additional Document
                </Text>
                <div className={`"flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-auto rounded-md border ${preview?  "border-dashed ": "border-solid"}`} 
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                  {preview? (
                    <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-12">
                    <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-6 tracking-normal items-center">
                    <IoDocumentTextOutline size={17} className="mr-2" /> {" "} {files.name}
                    </Text>
                    <div className="bg-white-A700 text-blue-700 border border-solid border-blue-500 flex flex-row md:h-auto items-center p-[7px] rounded-md w-auto">
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
                        className="font-DmSans text-sm font-medium leading-[26px] "
                      >
                        update your document
                      </button>
                    </div>
                </div>) :
                  (   
                <div className="flex flex-col items-center text-blue-A400 justify-end gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-12"
                 onClick={()=> onButtonClick(inputRef)} >
                  <LuUploadCloud  size={24} className=" mr-2"/>
                  <input
                          ref={inputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                          type="file"
                          name="name"
                        />
                  <Text className="text-sm leading-[26px] items-center font-normal tracking-normal">
                    Drop file or <span className="" >click here to upload your document</span>  
                  </Text>
                </div>
                  )
                  }
                </div>
              </div>
            </div>
            <div className="flex items-end w-full justify-end">
              <div className="flex space-x-3 md:space-x-5 w-auto">
                <button 
                type="reset"
                onClick={() => {
                  props.onRequestClose();
                  setPreview(null);
                }}
                className="flex items-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                    Cancel
                </button>
                <button 
                type="submit"
                className="flex items-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                    Send Contact Request
                </button>
                
              </div>
            </div>
          </div>
        </form>
      </ModalProvider>
      <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1="Your contact request has been successfully sent to"
        m2="Venture Catalys" 
        m3="The investor will review your contact request and respond accordingly, keep an eye on your email for any additional communication or updates." />
    </>
    );
  };
  
  export default SendContactModal;