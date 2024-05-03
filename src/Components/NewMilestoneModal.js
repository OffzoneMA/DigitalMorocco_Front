import React, {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { useForm } from "react-hook-form";
import CustomCalendar from "./CustomCalendar";
import { useAddMilestoneToProjectMutation } from "../Services/Project.Service";

const NewMilestoneModal = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDate , setSelectedDate] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addMilestoneToProject, {isSuccess, isLoading, isError, error }] = useAddMilestoneToProjectMutation();

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/');

    const dateObject = new Date(`${year}-${month}-${day}`);

    return dateObject;
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
      className="m-auto w-[65%] md:w-[45%] lg:w-[40%] xl:w-[40%] 2xl:w-[35%]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[97vh] overflow-y-auto w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-6 md:px-5 rounded-[10px] w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <Text
                className="md:text-lg text-[18px] font-medium leading-7 text-gray-900 w-full font-DmSans"
              >
                Add New Milestone
              </Text>
            </div>
            <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                                  size={20}
                />
              </div>
          </div>
          <form className="w-full h-full gap-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full max-h-[70vh] overflow-y-auto">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Milestone Name
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <input
                    {...register("name", { required: {value: true , message: "Milestone name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="name"
                    placeholder="Milestone Name"
                  />
                </div>
                {errors.name && <span className="text-sm font-DmSans text-red-500">{errors.name?.message}</span>}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Due Date
                </Text>
                <CustomCalendar
                        className={' w-full'} 
                        onChangeDate={(date) => setSelectedDate(date)}
                      />
                {/* <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <input
                    {...register("dueDate", { required: {value:true , message: "Due date is required"} })}
                    type="text"
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-[18.2px] tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                    name="dueDate"
                    placeholder="Due Date"
                    onFocus={(e) => {
                      setIsFocused(true);
                      e.target.type = 'date';
                    }}
                    onBlur={(e) => {
                      setIsFocused(false);
                      e.target.type = 'text';
                    }}
                  />
                  <MdOutlineDateRange
                    size={20}
                    className={`${
                      isFocused ? 'hidden' : ''
                    } text-blue_gray-300`}
                  />
                </div> */}
                {errors.dueDate && <span className=" text-sm font-DmSans text-red-500">{errors.dueDate?.message}</span>}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Description <span className="text-blue_gray-300">(Optinal)</span>
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <textarea
                    {...register("description")}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-[18.2px] tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                    name="description"
                    rows={4}
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end w-full justify-end">
              <div className="flex space-x-3 md:space-x-5 w-auto">
                <button onClick={props.onRequestClose} type="reset" className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">Cancel</button>
                <button type="submit" className="ml-auto bg-blue-500 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">Add Milestone</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NewMilestoneModal;