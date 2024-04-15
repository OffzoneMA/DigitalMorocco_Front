import React, {useState , useRef} from "react";
import { Text } from "../Components/Text";
import { FiSave } from "react-icons/fi";
import SimpleSelect from "../Components/SimpleSelect";
import { PiUserSquare } from "react-icons/pi";
import { Country ,City } from 'country-state-city';
import { BsCheck2Circle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../Components/CustomCalendar";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [photoEmp, setPhotoEmp] = useState(null);
  const [imgFile , setImgFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dataCountries = Country.getAllCountries();
  const [selectedCountry , setSelectedCountry] = useState(null);
  const [selectedCity , setSelectedCity] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedDate , setSelectedDate] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [taxIdentfier, settaxIdentfier] = useState('');
  const countryVal = selectedCountry ? selectedCountry["name"]: "";
  const [isSaved , setIsSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const formData = new FormData();

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const handleChange = (e, setValue) => {
    const formattedValue = e.target.value
      // Supprime tous les caractères non numériques
      .replace(/\D/g, '')
      // Insère un tiret entre chaque groupe de quatre chiffres
      .replace(/(\d{4})/g, '$1 - ')
      // Supprime le dernier espace et tiret s'il y en a un
      .replace(/ - $/, '');
  
    setValue(formattedValue);
  };
  

  const onSubmit = (data) => {
    console.log(data); 
    formData.append('photo', imgFile); 
    formData.append('jobTitle', selectedJobTitle);
    formData.append('level', selectedLevel);
    formData.append('department', selectedDepartment);
    formData.append('country', countryVal);
    formData.append('cityState', selectedCity);
    formData.append('startDate', data.startDate);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    setIsSaved(true);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(imgFile.name)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const imageFile = droppedFiles[0];
      const reader = new FileReader();
      setImgFile(imageFile);
      setPhotoEmp(URL.createObjectURL(imageFile));
    }
  };

  const employeeLevels = [
    { level: 'Junior', description: 'Entry-level position for beginners in the field.' },
    { level: 'Intermediate', description: 'Mid-level position with some experience and skills.' },
    { level: 'Senior', description: 'Experienced position with advanced skills and responsibilities.' },
    { level: 'Manager', description: 'Supervisory position overseeing a team or department.' },
    { level: 'Executive', description: 'Top-level management position with strategic decision-making.' },
    { level: 'Associate', description: 'Position with specialized skills supporting various functions.' },
    { level: 'Director', description: 'Leadership position responsible for a specific area or department.' },
    { level: 'Consultant', description: 'External expert providing specialized advice and guidance.' },
  ];

  const jobTitles = [
    { title: 'Software Engineer', department: 'Engineering' },
    { title: 'Marketing Manager', department: 'Marketing' },
    { title: 'Financial Analyst', department: 'Finance' },
    { title: 'HR Specialist', department: 'Human Resources' },
    { title: 'Product Manager', department: 'Product Management' },
    { title: 'Sales Representative', department: 'Sales' },
    { title: 'Data Scientist', department: 'Information Technology' },
    { title: 'Customer Success Manager', department: 'Customer Service' },
  ];
  
  const departments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Finance' },
    { name: 'Human Resources' },
    { name: 'Product Management' },
    { name: 'Customer Service' },
    { name: 'Sales' },
    { name: 'Research and Development' },
    { name: 'Information Technology' },
    { name: 'Operations' },
  ];
  
  
  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px] overflow-y-auto w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-dmsans h-full items-start justify-start w-auto">
            <Text
              className="text-3xl font-bold leading-11 text-gray-900 w-full"
              size="txtDMSansBold32"
            >
              Company
            </Text>
          </div>
          <div className="flex  w-[22%] rounded-md p-2 border border-solid">
            <img
              className="cursor-pointer h-[18px] mr-1.5 my-px"
              src="images/img_search_blue_gray_700_01.svg"
              alt="search"
            />
            <input
              className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
          
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <form className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row flex-wrap text-sm text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
              <Text
                className="text-lg leading-7 text-gray-900_01 pt-1"
                size="txtDmSansMedium16"
              >
                Add Employee
              </Text>
              {isSaved? 
              <div className="bg-teal-A700 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto">
                <BsCheck2Circle  size={18} className="mr-2"/>
                <button
                  type="submit"
                  className="text-base text-white-A700"
                >
                  Saved
                </button>
              </div>  
              :
              <div className="bg-blue-A400 text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto cursor-pointer" 
              onClick={()=> onButtonClick(formButtonRef)}>
                <FiSave  size={18} className="mr-2"/>
                <button
                ref={formButtonRef}
                  type="submit"
                  className="text-base text-white-A700"
                >
                  Save
                </button>
              </div>
            }
              
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-5 md:px-5 w-full">
              <div className="flex flex-1 flex-col gap-6 py-5 items-start justify-start w-full">
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Full Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("fullName", { required: {value:true , message:"Employee Full Name is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent !border-0`}
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                    />
                  </div>
                  {errors.fullName && <span className="text-sm font-DmSans text-red-500">{errors.fullName?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Work Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("workEmail", { required: {value:true , message:"Employee Work Email is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="workEmail"
                      placeholder="Enter Work Email"
                    />
                  </div>
                  {errors.workEmail && <span className="text-sm font-DmSans text-red-500">{errors.workEmail?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Personal Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("personalEmail", { required: {value:true , message:"Employee personalEmail is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="personalEmail"
                      placeholder="Enter Personal Email"
                    />
                  </div>
                  {errors.personalEmail && <span className="text-sm font-DmSans text-red-500">{errors.personalEmail?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Phone Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("phoneNumber", { required: {value:true , message:"Employee Phone Number is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="phoneNumber"
                      placeholder="+212 - "
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-sm font-DmSans text-red-500">{errors.phoneNumber?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Address
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("address", { required: {value:true , message:"Employee address is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="address"
                      placeholder="Enter Address of Employee"
                    />
                  </div>
                  {errors.address && <span className="text-sm font-DmSans text-red-500">{errors.address?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Country
                  </Text>
                  <SimpleSelect id='country' options={dataCountries} onSelect={""} searchLabel='Select Country' setSelectedOptionVal={setSelectedCountry} 
                    placeholder="Select Country" valuekey="name"
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
                    City/State
                  </Text>
                  <SimpleSelect id='city' options={selectedCountry? City.getCitiesOfCountry(selectedCountry['isoCode']): []} onSelect={""} searchLabel='Select City' setSelectedOptionVal={setSelectedCity} 
                    placeholder="Select City" valuekey="name"
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
                    Personal Tax Identifier Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("personalTaxIdentifierNumber", { required: {value:true , message:"Employee Personal Tax Identifier Number is required"} })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="personalTaxIdentifierNumber"
                      value={taxIdentfier}
                      onChange={e => handleChange(e, settaxIdentfier)}
                      placeholder="0000 - 0000 - 0000"
                    />
                  </div>
                  {errors.personalTaxIdentifierNumber && <span className="text-sm font-DmSans text-red-500">{errors.personalTaxIdentifierNumber?.message}</span>}
                </div>
              </div>
              <div className="flex py-5 flex-col items-start justify-start w-full md:w-[35%] lg:w-[35%] xl:w-[35%] 2xl:w-[35%] 3xl:w-[35%]">
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-blue_gray-100_01 border-solid flex flex-col items-center justify-center rounded-md w-full"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                  {photoEmp ? (
                    <img src={photoEmp} alt="Uploaded Logo" className="rounded-md w-full py-[5px] h-[254px] " />
                  ) : (
                    <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 py-[100px] rounded-md w-full">
                      <PiUserSquare  size={24} radius={8} className=""/>
                        <div className="flex flex-col items-start justify-start w-auto">
                          <Text
                            className="text-[13px] text-base leading-6 tracking-normal w-auto"
                            size="txtDMSansRegular13"
                          >
                          {isDragging? "Drop Your logo here" : "Upload Your Logo"}  
                          </Text>
                        </div>
                    </div>
                    )}
                </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Job Title
                    </Text>
                    <SimpleSelect id='job' options={jobTitles} onSelect={""} searchLabel='Select position / title' setSelectedOptionVal={setSelectedJobTitle} 
                    placeholder="Select position / title" valuekey="title" 
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.title}
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
                      Level
                    </Text>
                    <SimpleSelect id='level' options={employeeLevels} onSelect={""} searchLabel='Select Level' setSelectedOptionVal={setSelectedLevel} 
                    placeholder="Select employee level" valuekey="level"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.level}
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
                      Department
                    </Text>
                    <SimpleSelect id='department' options={departments} onSelect={""} searchLabel='Select Department' setSelectedOptionVal={setSelectedDepartment} 
                    placeholder="Select Department" valuekey="name"
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
                      Start Date
                    </Text>
                    <CustomCalendar
                        className={' w-full'} 
                        onChangeDate={(date) => setSelectedDate(date)}
                        inputPlaceholder={`DD/MM/YYYY`}
                      />
                    {/* <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <input
                        {...register("startDate", { required: {value:true , message:"Employee Start Date is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="startDate"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          setIsFocused(true)
                          e.target.type = 'date';
                        }}
                        onBlur={(e) => {
                          setIsFocused(false)
                          e.target.type = 'text';
                        }}
                      />
                      <MdOutlineDateRange size={20} className={`${isFocused ? 'hidden' : ''} text-blue_gray-300`}/>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;