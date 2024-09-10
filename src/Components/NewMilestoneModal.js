import React, {useEffect, useState} from "react";
import {default as ModalProvider} from "react-modal";
import {Text} from "./Text";
import {IoCloseOutline} from "react-icons/io5";
import {useForm} from "react-hook-form";
import CustomCalendar from "./CustomCalendar";
import {useAddMilestoneToProjectMutation} from "../Services/Project.Service";

const NewMilestoneModal = (props) => {
  const [selectedDate , setSelectedDate] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addMilestoneToProject, {isSuccess, isLoading, isError, error }] = useAddMilestoneToProjectMutation();

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}
  const onSubmit = async (data) => {
    try {
      const formDataContent = {
        ...data,
        dueDate: parseDateString(selectedDate)
    };

      const response = await addMilestoneToProject({ projectId: props?.rowData?._id ,milestoneData: formDataContent  });
    } catch (error) {
      console.error("Error adding milestone:", error);
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
                Add New Milestone
              </Text>
            </div>
            {/* <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
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
                  Milestone Name
                </Text>
                <input
                    {...register("name", { required: {value: true , message: "Milestone name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full  rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.name ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="name"
                    placeholder="Milestone Name"
                    style={{ boxSizing: 'border-box' }}
                  />
                {/* {errors.name && <span className="text-sm font-DmSans text-red-500">{errors.name?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Due Date
                </Text>
                <CustomCalendar
                        className={' w-full'} 
                        onChangeDate={(date) => setSelectedDate(date)}
                      />
                {/* {errors.dueDate && <span className=" text-sm font-DmSans text-red-500">{errors.dueDate?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Description <span className="text-blue_gray-300">(Optinal)</span>
                </Text>
                  <textarea
                    {...register("description")}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 h-[70px] leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs`}
                    name="description"
                    rows={4}
                    placeholder="Description" 
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
              className="flex items-center bg-[#E4E7EC]  hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer-green text-[#475467] py-[10px] md:py-[18px] px-[12px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]" 
              >Cancel</button>
              <button type="submit" className="flex items-center ml-auto bg-[#2575F0] hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">Add Milestone</button>
            </div>
          </form>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NewMilestoneModal;