import React , {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { SelectPicker } from "rsuite";
import 'rsuite/SelectPicker/styles/index.css';
import ConfirmedModal from "./ConfirmedModal";

const SendContactModal = (props) => {
    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);

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
        className="m-auto w-[65%] md:w-[45%] lg:w-[40%] xl:w-[40%] 2xl:w-[35%]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <div className="max-h-[99vh] overflow-y-auto w-full md:w-full">
          <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
            <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
              <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                <Text
                  className="md:text-xl text-[18px] text-gray-900 w-full"
                  size="txtDMSansCardHeader16"
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
                <SelectPicker size="md" data={[]} 
                    className="w-full !placeholder:text-blue_gray-300 font-manrope font-normal leading-18 tracking-wide"
                    placeholder="Select Project"/>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Write Your Request Letter
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <textarea 
                    className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    rows={5}
                    placeholder="Write your request letter here"
                    >
                  </textarea>
                </div>
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
                <div className="flex flex-col items-center text-blue-700 justify-end gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-7 lg:py-8 border border-solid">
                    <LuUploadCloud  size={24} className=" mr-2"/>
                    <Text className="font-dmsans text-base font-normal leading-6 tracking-normal">
                    Drop file or click here to upload your document
                    </Text>
                </div>
              </div>
            </div>
            <div className="flex items-end w-full justify-end">
              <div className="flex space-x-3 md:space-x-5 w-auto">
                <button 
                onClick={props.onRequestClose}
                className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 
                md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">
                    Cancel
                </button>
                <button 
                onClick={openModal}
                className="ml-auto bg-blue-500 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans 
                text-base font-medium leading-5 tracking-normal rounded-lg">
                    Send Contact Request
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </ModalProvider>
      <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1="Your contact request has been successfully sent to"
        m2="Venture Catalys" 
        m3="The investor will review your contact request and respond accordingly, keep an eye on your email for any additional communication or updates." />
    </>
    );
  };
  
  export default SendContactModal;