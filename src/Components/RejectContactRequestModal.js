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

const RejectContactRequestModal = (props) => {

    const [selectedRaison , setSelectedRaison] = useState(null);
    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formData = new FormData();
    const rowData = props?.rowData ;

    const onSubmit = async (data) => {
      try {
        await props?.methode({
                rejectionNotes: data?.letter,
                reason: selectedRaison,
            },
        );
        openModal();
      } catch (error) {
        console.error('Failed to create contact request:', error);
      }
    };

    const openModal  = () =>  {
        setIsConfirmedModalOpen(true);
        props.onRequestClose();
    };
    
    const closeModal = () => {
        setIsConfirmedModalOpen(false);
    };

    const rejectionReasons = [
     "Budget Constraints",
     "Not Aligned with Current Goals",
     "Timing Issues",
     "High Risk",
     "Lack of Market Potential",
     "Insufficient Financial Projections",
     "Inexperienced Team",
     "Overvaluation",
     "Competing Interests",
     "Unclear Business Model"
    ];
    
      

    return (
        <>
        <ModalProvider
            appElement={document.getElementById("root")}
            className="m-auto w-[95%] md:w-[100%] max-w-[640px] outline-none"
            overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
            {...props}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="max-h-screen w-full md:w-full">
              <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm py-6 rounded-[10px] w-full">
                <div className="flex flex-row gap-5 items-start justify-start px-5 w-full">
                    <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                        <Text
                        className="font-DmSans md:text-lg text-[18px] leading-7 font-medium text-[#1D2939] w-full"
                        >
                        Reject Sponsorship Request
                        </Text>
                    </div>
                </div>
                <div className="flex px-6 md:px-5 h-[1px] w-full"> <div className="bg-gray-201 w-full"></div></div>
                <div className="flex flex-col gap-5 w-full max-h-[70vh] px-5 overflow-y-auto">
                    <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                        <Text
                        className="text-base text-[#1D1C21] w-auto"
                        size="txtDMSansLablel"
                        >
                        Reason for Rejection
                        </Text>
                        <SimpleSelect id='reason' options={rejectionReasons} onSelect={""} searchLabel='Search Raison' setSelectedOptionVal={setSelectedRaison}
                            placeholder="Select Reason" 
                            content={
                            ( option) =>{ return (
                                <div className={`flex  py-2 items-center w-full`}>
                                    <Text
                                    className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
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
                        className="text-base text-[#1D1C21] w-auto"
                        size="txtDMSansLablel"
                        >
                        Write Your Request Letter
                        </Text>
                        <textarea 
                        {...register("letter", { required: {value:true , message: "Request Letter is required."} })}
                        className={`!placeholder:text-blue_gray-301 !text-gray700 h-[139px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.letter ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        rows={5}
                        placeholder="Write your request letter here" 
                        style={{
                                scrollbarWidth: 'none', 
                                msOverflowStyle: 'none',
                                resize:'none'
                                }}
                        >
                        </textarea>
                        <Text
                        className="font-dm-sans-regular text-sm leading-relaxed text-left text-[#555458]"
                        size=""
                        >
                        Introduce your Company or provide additional context about your Sponsorship
                        </Text>
                    </div>
                </div>
                <div className="flex space-x-3 md:space-x-5 items-end w-full px-5 justify-end">
                    <button 
                    type="reset"
                    onClick={() => {
                    props.onRequestClose();
                    }}
                    className="flex items-center justify-center min-w-[93px] bg-light_blue-100 hover:bg-[#E2E2EE] text-blue-500 active:bg-[#E2E2EE] py-[10px] md:py-[20px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                        Cancel
                    </button>
                    <button 
                    type="submit"
                    className="flex items-center justify-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[20px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                        Reject
                    </button>
                </div>
              </div>
            </form>
        </ModalProvider>
        <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1="Your Sponsorship request has been successfully sent to"
        m2={rowData?.member?.companyName || "Venture Catalys"} 
        m3="The investor will review your contact request and respond accordingly, keep an eye on your email for any additional communication or updates." />
    </>
    );
}

export default RejectContactRequestModal;
