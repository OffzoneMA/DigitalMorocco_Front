import React , {useState , useRef , useEffect} from "react";
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
import { useApproveRequestMutation } from "../Services/ContactRequest.Service";
import { useTranslation } from "react-i18next";
import {investmentTypes} from "../data/data.js";

const ApproveContactRequestModal = (props) => {
    const { t } = useTranslation();
    const currentLanguage = localStorage.getItem('language') || 'en'; 
    const [typeInvestment , setSelectedInvestmentType] = useState(null);
    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } , reset } = useForm();
    const formData = new FormData();
    const rowData = props?.rowData ;
    const [sendingOk , setSendingOk] = useState(false);
    const [sending , setSending] = useState(false);


    useEffect(() => {
        if (!props.isOpen) {
          reset(); 
          setSelectedInvestmentType(null);
          setSendingOk(false);
          setSending(false);
        }
      }, [props.isOpen, reset]);

    const onSubmit = async (data) => {
        if(typeInvestment !== null) {
            try {
                setSendingOk(true);
                await props?.methode({
                        approvalNotes: data?.letter,
                        typeInvestment,
                    },
                );
                setSendingOk(false);
                setSelectedInvestmentType(null);
                setSending(false);
                openModal();
              } catch (error) {
                setSendingOk(false);
                setSending(false);
                console.error('Failed to create contact request:', error);
              }
        }
    };

    const openModal  = () =>  {
        setIsConfirmedModalOpen(true);
        props.onRequestClose();
    };
    
    const closeModal = () => {
        setIsConfirmedModalOpen(false);
    };
      

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
                        {t('investment.approveInvestmentRequestHeader')}
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
                        {t('investment.approveInvestmentRequest.typeOfInvestment')}
                        </Text>
                        <SimpleSelect id='project' options={investmentTypes}  searchLabel={t("common.searchType")} setSelectedOptionVal={setSelectedInvestmentType} 
                            placeholder={t('investment.approveInvestmentRequest.typeOfInvestmentPlaceholder')} required={typeInvestment === null && sending}
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
                        <Text
                        className="text-base text-[#1D1C21] w-auto"
                        size="txtDMSansLablel"
                        >
                        {t('investment.approveInvestmentRequest.letterLabel')}
                        </Text>
                        <textarea 
                        {...register("letter", { required: {value:true , message: "Request Letter is required."} })}
                        className={`!placeholder:text-blue_gray-301 !text-gray700 h-[139px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.letter ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                        rows={5}
                        placeholder={t('investment.approveInvestmentRequest.letterPlaceholder')}
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
                        {t('investment.approveInvestmentRequest.additionalContext')}
                        </Text>
                    </div>
                </div>
                <div className="flex space-x-3 md:space-x-5 items-end w-full px-5 justify-end">
                    <button 
                    type="reset"
                    onClick={() => {
                    props.onRequestClose();
                    }}
                    className="flex items-center justify-center min-w-[93px] bg-light_blue-100 hover:bg-[#E2E2EE] text-blue-500 active:bg-[#E2E2EE] py-[10px] md:py-[20px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer">
                        {t("common.cancel")}
                    </button>
                    <button 
                    type="submit" onClick={() => setSending(true)}
                    className={`flex items-center justify-center ml-auto ${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[20px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer`}>
                        {sendingOk ? 
                        <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>  :  
                        t("common.approve")}
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

export default ApproveContactRequestModal;
