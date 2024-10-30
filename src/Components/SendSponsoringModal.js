import React , {useState , useRef , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import SimpleSelect from "./SimpleSelect";
import ConfirmedModal from "./ConfirmedModal";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SendSponsoringModal = (props) => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
    const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }  , reset} = useForm();
    const inputRef = useRef(null);
    const [files, setFiles] = useState(null);
    const [preview , setPreview] = useState(null);
    const [selectedType , setSelectedType] = useState(null);
    const [sendingOk , setSendingOk] = useState(false);
    const [sending , setSending] = useState(false);

    useEffect(() => {
      if (!props.isOpen) {
        reset(); 
        setPreview(null);
        setSelectedType(null);
        setSendingOk(false);
        setSending(false);
      }
    }, [props.isOpen, reset]);

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

      if(selectedType !== null) {
        formData.append('document', files); 
        formData.append('eventId', props?.rowData?._id);
        formData.append('sponsorshipAmount', 100);
        formData.append('sponsorshipType', selectedType);
        formData.append('letter' , data?.letter)
        formData.append('requestType', "Sent");

        try {
          setSendingOk(true);
          await props?.methode(formData);
          console.log('Contact request created successfully');
          openModal();
        } catch (error) {
          setSendingOk(false);
          console.error('Failed to create contact request:', error);
        }

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

    const typesOfSponsoring = [
        "Financial",
        "Venue Partner",
        "Prize Sponsors",
         "Other",
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
                    {t('eventListSponsoring.sponsorshipRequest.title')}
                  </Text>
                </div>
                <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                  {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                </div>
              </div>
              <div className="flex px-6 md:px-5 h-[1px] w-full"> <div className="bg-gray-201 w-full"></div></div>
              <div className="flex flex-col gap-5 w-full max-h-[70vh] px-5 overflow-y-auto">
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('eventListSponsoring.sponsorshipRequest.sponsoringTypeLabel')}
                  </Text>
                  <SimpleSelect id='type' options={typesOfSponsoring} onSelect={""} searchLabel={t("common.searchSponsorshipType")} setSelectedOptionVal={setSelectedType} 
                      placeholder={t('eventListSponsoring.sponsorshipRequest.sponsoringTypePlaceholder')} required={selectedType === null && sending}
                      content={
                        ( option) =>{ return (
                          <div className="flex  py-2 items-center  w-full">
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
                    {t('eventListSponsoring.sponsorshipRequest.letterLabel')}
                  </Text>
                  <textarea 
                    {...register("letter", { required: {value:true , message: "Request Letter is required."} })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 h-[139px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px]  border border-[#D0D5DD] ${errors?.letter ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    rows={5}
                    placeholder={t('eventListSponsoring.sponsorshipRequest.letterPlaceholder')}  
                    style={{
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none',
                            resize:'none'
                          }}
                    >
                  </textarea>
                  <Text
                    className="font-dm-sans-regular text-sm leading-6 text-left text-gray700"
                    size=""
                  >
                    {t('eventListSponsoring.sponsorshipRequest.startupIntroduction')}
                  </Text>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('eventListSponsoring.sponsorshipRequest.additionalDocument')}
                  </Text>
                  <div className={`"flex flex-col items-center justify-end md:flex-1 w-full md:w-full h-[166px] rounded-md border ${preview?  "border-dashed ": "border-solid"}`} 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}>
                    {preview? (
                      <div className="flex flex-col items-center text-blue-A400 gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-12">
                      <Text className="flex flex-row font-DmSans text-sm text-gray-900_01 font-normal leading-6 tracking-normal items-center">
                      <IoDocumentTextOutline size={17} className="mr-2" /> {" "} {files.name}
                      </Text>
                      <div className="bg-white-A700 icon-container text-blue-700 border border-solid border-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] flex flex-row gap-[6px] items-center p-[7px] rounded-md w-auto">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 11.5L8.5 8.5M8.5 8.5L11.5 11.5M8.5 8.5V15.25M14.5 12.0571C15.4161 11.3005 16 10.156 16 8.875C16 6.59683 14.1532 4.75 11.875 4.75C11.7111 4.75 11.5578 4.6645 11.4746 4.5233C10.4965 2.86363 8.69082 1.75 6.625 1.75C3.5184 1.75 1 4.2684 1 7.375C1 8.92458 1.62659 10.3278 2.64021 11.3451" stroke="#2575F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
                          className="font-dm-sans-medium text-sm leading-[26px] cursorpointer "
                        >
                          {t('eventListSponsoring.sponsorshipRequest.updateDocument')}
                        </button>
                      </div>
                  </div>) :
                    (   
                  <div className="flex flex-col items-center gap-[16px] text-blue-A400 justify-end gap-4 md:flex-1 w-full md:w-full h-auto rounded-md py-12"
                   onClick={()=> onButtonClick(inputRef)} >
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14.5L11 10.5M11 10.5L15 14.5M11 10.5V19.5M19 15.2428C20.2215 14.234 21 12.7079 21 11C21 7.96243 18.5376 5.5 15.5 5.5C15.2815 5.5 15.0771 5.386 14.9661 5.19774C13.6621 2.98484 11.2544 1.5 8.5 1.5C4.35786 1.5 1 4.85786 1 9C1 11.0661 1.83545 12.9371 3.18695 14.2935" stroke="#2575F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      ref={inputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="file"
                      name="name"
                    />
                    <Text className="text-sm leading-[26px] items-center font-normal tracking-normal">
                    {t('eventListSponsoring.sponsorshipRequest.additionalDocumentPlaceholder')}  
                    </Text>
                  </div>
                    )
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-end w-full px-5 justify-end">
                <div className="flex space-x-3 md:space-x-5 w-auto">
                  <button 
                  type="reset"
                  onClick={() => {
                    props.onRequestClose();
                    setPreview(null);
                  }}
                  className="flex items-center justify-center min-w-[93px] bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                      {t("common.cancel")}
                  </button>
                  <button 
                  type="submit" onClick={() => setSending(true)}
                  className={`flex items-center justify-center ml-auto ${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green`}>
                      {sendingOk ? 
                      <div className="flex items-center justify-center gap-6"> Sending... 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>  :  
                      t('eventListSponsoring.sponsorshipRequest.sendRequest')}
                  </button>
                  
                </div>
              </div>
            </div>
          </form>
        </ModalProvider>
        <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
          m1="Your contact request has been successfully sent to"
          m2={props?.rowData?.name || "Venture Catalys"} 
          m3="The investor will review your contact request and respond accordingly, keep an eye on your email for any additional communication or updates." />
      </>
    );
}

export default SendSponsoringModal;
