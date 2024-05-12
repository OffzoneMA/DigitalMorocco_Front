import React, { useState , useMemo , useRef } from "react";
import { Text } from "../Components/Text";
import { FiSave } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { CheckPicker, SelectPicker } from "rsuite";
import MultipleSelect from "../Components/MultipleSelect";
import SimpleSelect from "../Components/SimpleSelect";
import { IoImageOutline } from "react-icons/io5";
import 'rsuite/SelectPicker/styles/index.css';
import 'rsuite/CheckPicker/styles/index.css';
import { Country ,City } from 'country-state-city';
import { useForm } from "react-hook-form";
import {companyType} from "../data/companyType";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";


const MyCompany = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [imgFile , setImgFile] = useState(null);
  const [isSaved , setIsSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [taxIdentfier, settaxIdentfier] = useState('');
  const [selectedCity , setSelectedCity] = useState(null);
  const [selectedSector, setselectedSector] = useState([]);
  const dataCountries = Country.getAllCountries();
  const [selectedCountry , setSelectedCountry] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const formRef = useRef();
  const formButtonRef = useRef();

  const countryNameSelec = selectedCountry? selectedCountry["name"] : "";

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
  

  const onButtonClick = (buttonRef) => {
    buttonRef.current.click();
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
      setImgFile(imageFile);
      setLogoFile(URL.createObjectURL(imageFile));
    }
  };
  
  const companySectorData = companyType.map(
    item => ({ label: item, value: item })
  );
  const formData = new FormData();

  const onSubmit = (data) => {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append('logo', imgFile); 
    formData.append('companyType', selectedSector);
    formData.append('country', countryNameSelec);
    formData.append('cityState', selectedCity);

    setIsSaved(true);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              Company
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'}/>
          {isSaved? 
              <button
                className="bg-teal-A700 text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursor-pointer rounded-md w-auto"
                type="submit"
              >
                <BsCheck2Circle size={18} className="mr-2" />
                Saved
              </button>
              :
              <button
                ref={formButtonRef}
                className="bg-blue-501 text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] cursor-pointer rounded-md w-auto"
                onClick={() => onButtonClick(formButtonRef)}
                type="submit"
                >
                <FiSave size={18} className="mr-2" />
                Save
              </button>          
            }
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex  w-full">
          <div className="flex flex-col md:flex-row lg:flex-row gap-8 items-start justify-start px-5 w-full ">
            <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Company Name
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                    {...register("companyName", { required: {value:true , message: "Company name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                  />
                </div>
                {errors.companyName && <span className="text-sm font-DmSans text-red-500">{errors.companyName?.message}</span>}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Legal Name
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                    {...register("legalName", { required: {value:true , message:"Company Legal name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="legalName"
                    placeholder="Your Company Legal Name"
                  />
                </div>
                {errors.legalName && <span className="text-sm font-DmSans text-red-500">{errors.legalName?.message}</span>}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Description
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <textarea
                    {...register("description", { required: false })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                    name="description"
                    rows={4}
                    placeholder="Write your company’s short description here"
                  />
                </div>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Website
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                  {...register("website", { required: {value:true , message:"Company website is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="website"
                    placeholder="Your Company Website"
                  />
                </div>
                {errors.website && <span className="text-sm font-DmSans text-red-500">{errors.website?.message}</span>}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Contact Email
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                    {...register("contactEmail", { required: {value:true , message:"Company Contact Email is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="contactEmail"
                    placeholder="Your Company email"
                  />
                </div>
                {errors.contactEmail && <span className="text-sm font-DmSans text-red-500">{errors.contactEmail?.message}</span>}
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
                    {...register("address", { required: {value:true , message:"Company address is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="address"
                    placeholder="Your Company address"
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
              {/* {selectedCountry==null && <span className="text-sm font-DmSans text-red-500">Company country is required</span>} */}
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
                {/* {selectedCity==null && <span className="text-sm font-DmSans text-red-500">Company city/state is required</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Company Sector
                </Text>
                <MultipleSelect id='sector' options={companyType} onSelect={""} searchLabel='Select Country' searchable={false} setSelectedOptionVal={setselectedSector} 
                    placeholder="Select Company Sector"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-medium leading-5 w-auto"
                              >
                               {option}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    {/* {selectedSector==null && <span className="text-sm font-DmSans text-red-500">Company Sector is required</span>} */}

              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Tax Identifier Number
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                    className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="name"
                    value={taxIdentfier}
                    onChange={e => handleChange(e, settaxIdentfier)}
                    placeholder="0000 - 0000 - 0000"
                  />
                </div>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansLablel"
                >
                  Corporate Identifier Number
                </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                  <input
                    className={`!placeholder:text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="name"
                    placeholder="0000 - 0000 - 0000"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start md:w-[35%] lg:w-[35%] w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text
                  className="text-base text-gray-900_01 w-auto"
                  size="txtDMSansRegular16"
                >
                  Company Logo
                </Text>
                <div className="bg-white-A700 border border-blue_gray-100_01 border-solid flex flex-col items-center justify-center rounded-md w-full"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                  {logoFile ? (
                    <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[150px]" />
                  ) : (
                  <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 py-[50px] rounded-md w-full">
                    <IoImageOutline />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

  );
};

export default MyCompany;