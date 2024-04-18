import React , {useState , useRef} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import SimpleSelect from "./SimpleSelect";
import ConfirmedModal from "./ConfirmedModal";
import { useForm } from "react-hook-form";

const SendContactModal = (props) => {
    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const inputRef = useRef(null);
    const [files, setFiles] = useState(null);
    const [preview , setPreview] = useState(null);
    const [selectedProject , setSelectedProject] = useState(null);

    const projects = [
      {
        id: 1,
        name: 'E-commerce Website',
        description: 'Development of an e-commerce website for a clothing company.',
        status: 'In progress',
        deadline: '2024-06-30',
        teamMembers: ['John Doe', 'Jane Smith', 'Alice Johnson'],
      },
      {
        id: 2,
        name: 'Task Management Application',
        description: 'Creation of a task management application to improve team productivity.',
        status: 'Completed',
        deadline: '2024-04-15',
        teamMembers: ['Bob Brown', 'Emily Wilson'],
      },
      {
        id: 3,
        name: 'Redesign of Institutional Website',
        description: 'Complete redesign of the institutional website for a university to modernize its image.',
        status: 'Pending',
        deadline: '2024-08-31',
        teamMembers: ['Alex Johnson', 'Sophia Lee', 'David Martinez'],
      },
    ];
    

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

    const onSubmit = (data) => {
      formData.append('document', files); 
      formData.append('project', selectedProject);
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      openModal();
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
        className="m-auto w-[65%] md:w-[50%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-screen w-full md:w-full">
          <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
            <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="font-DmSans md:text-lg text-[18px] leading-7 font-medium text-gray-900 w-full"
                >
                  Send Contact Request
                </Text>
              </div>
              <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full max-h-[70vh] overflow-y-auto">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Project
                </Text>
                <SimpleSelect id='project' options={projects} onSelect={""} searchLabel='Search Project' setSelectedOptionVal={setSelectedProject} 
                    placeholder="Select Project" valuekey="name"
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
                  className="font-DmSans text-sm font-normal leading-6 text-left text-gray-700"
                  size=""
                >
                  Introduce your startup or provide additional context about your project
                </Text>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
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
                <div className="flex flex-col items-center text-blue-A400 justify-end gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-12">
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
                    Drop file or <span className="" onClick={()=> onButtonClick(inputRef)}>click here to upload your document</span>  
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
                className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 
                md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">
                    Cancel
                </button>
                <button 
                type="submit"
                className="ml-auto bg-blue-500 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans 
                text-base font-medium leading-5 tracking-normal rounded-lg">
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