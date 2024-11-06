import React, {useEffect, useState} from "react";
import {default as ModalProvider} from "react-modal";
import {Text} from "./Text";
import {IoCloseOutline} from "react-icons/io5";
import {useForm} from "react-hook-form";
import CustomCalendar from "./CustomCalendar";
import {useAddMilestoneToProjectMutation} from "../Services/Project.Service";
import { useTranslation } from "react-i18next";

const NewMilestoneModal = (props) => {
  const { t } = useTranslation();
  const [selectedDate , setSelectedDate] = useState('');
  const { register, handleSubmit, formState: { errors } , setValue , reset } = useForm();
  const [addMilestoneToProject, {isSuccess, isLoading, isError, error }] = useAddMilestoneToProjectMutation();
  const [sending , setSending ] = useState(false);
  const [sendingOk , setSendingOk] = useState(false);


  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    if (!props.isOpen) {
      reset(); 
      setSelectedDate('');
      setSending(false);
      setSendingOk(false);
    }
  }, [props.isOpen, reset]);

  const onSubmit = async (data) => {
    if(selectedDate === '') {
      return null;
    }
    else{
      try {
        setSendingOk(true)
        const formDataContent = {
          ...data,
          dueDate: parseDateString(selectedDate)
        };
        const response = await props?.method(formDataContent);
        setTimeout(() => {
          setSending(false);
          setSendingOk(false);
          setSelectedDate('');
          setValue('name' , '')
        }, 5000);
      } catch (error) {
        setSendingOk(false);
        console.error("Error adding milestone:", error);
      }
    }
  };

  useEffect(() => {
    isError && console.log(error?.data.message)
    if (isSuccess) {
        props.onRequestClose();
    }
  
  }, [isLoading]);


  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[95%] md:w-[100%] max-w-[540px]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[97vh] overflow-y-auto w-full ">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col py-6 gap-6 items-center justify-start max-w-screen-sm rounded-[10px] w-full">
          <div className="flex flex-row gap-5 items-start justify-start px-6 md:px-5 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <Text
                className="md:text-lg text-[18px] font-dm-sans-medium leading-7 text-[#1D2939] w-full"
              >
                {t('projects.addNewMilestone.title')}
              </Text>
            </div>
            {/* <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
          </div>
          <div className="flex px-6 md:px-5 h-[1px] w-full"> <div className="bg-gray-201 w-full"></div></div>
          <form className="w-full h-full gap-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 px-6 md:px-5 w-full max-h-[70vh] overflow-y-auto pb-2">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('projects.addNewMilestone.milestoneName')}
                </Text>
                <input
                    {...register("name", { required: {value: true , message: "Milestone name is required"} })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full  rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.name ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="name"
                    placeholder={t('projects.addNewMilestone.milestoneName')}
                    style={{ boxSizing: 'border-box' }}
                  />
                {/* {errors.name && <span className="text-sm font-DmSans text-red-500">{errors.name?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('projects.addNewMilestone.dueDate')}
                </Text>
                <CustomCalendar
                        className={' w-full'} 
                        inputPlaceholder={t('projects.addNewMilestone.dueDate')}
                        onChangeDate={(date) => setSelectedDate(date)} 
                        required={(sending && selectedDate === '')}
                      />
                {/* {errors.dueDate && <span className=" text-sm font-DmSans text-red-500">{errors.dueDate?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('projects.addNewMilestone.description')} <span className="text-blue_gray-301">{t('projects.addNewMilestone.optional')}</span>
                </Text>
                  <textarea
                    {...register("description")}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 h-[70px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs`}
                    name="description"
                    rows={4}
                    placeholder={t('projects.addNewMilestone.descriptionPlaceholder')}
                    style={{
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          resize:'none'
                        }}
                  />
              </div>
            </div>
            <div className="flex space-x-3 md:space-x-5 px-6 md:px-5 items-end w-full justify-end">
              <button onClick={props.onRequestClose} type="reset" 
              className="flex items-center justify-center bg-[#E4E7EC] min-w-[93px] hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer text-[#475467] py-[10px] md:py-[18px] px-[18px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]" 
              >{t("common.cancel")}</button>
              <button onClick={() => setSending(true)} 
              type="submit" 
              className={`flex items-center justify-center min-w-[155px] ml-auto ${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer`}>
              {sendingOk ? 
                <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>  :  
                t('projects.addNewMilestone.add')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NewMilestoneModal;