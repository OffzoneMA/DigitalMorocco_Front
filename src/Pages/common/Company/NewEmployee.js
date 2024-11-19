import React, { useState, useRef, useEffect } from "react";
import { Text } from "../../../Components/Text";
import { FiSave } from "react-icons/fi";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import { Country, City } from 'country-state-city';
import { BsCheck2Circle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import CustomCalendar from "../../../Components/common/CustomCalendar";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import axios from "axios";
import moment from "moment/moment";
import { jobTitles , employeeLevels , departments } from "../../../data/data";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useTranslation } from "react-i18next";
import { countries } from "../../../data/tablesData";

const NewEmployee = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [imgFile, setImgFile] = useState(null);
  const dataCountries = Country.getAllCountries();
  const { employee } = location.state || {};
  const [logoFile, setLogoFile] = useState(employee?.image || '');
  const [showLogoDropdown , setShowLogoDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(dataCountries.find(country => country.name === employee?.country) || null);
  const [selectedCity, setSelectedCity] = useState(employee?.cityState || '');
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    country: false,
    city: false,
  });

  useEffect(() => {
    if (hasSubmitted ) {
      const isCountryValid = selectedCountry !== null;
      const isCityValid = selectedCity !== "";
  
      const isValid = isCountryValid && isCityValid  ;
  
      setRequiredFields({
        country: !isCountryValid,
        city: !isCityValid,
      });
  
      setIsFormValid(isValid);
    }
  }, [hasSubmitted ,selectedCountry, selectedCity]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    fullName: employee?.fullName || '',
    workEmail: employee?.workEmail || '',
    personalEmail: employee?.personalEmail || '',
    address: employee?.address || '',
    country: employee?.country || '',
    cityState: employee?.cityState || '',
    personalTaxIdentifierNumber: employee?.personalTaxIdentifierNumber || '',
    phoneNumber: employee?.phoneNumber || '',
    jobTitle: employee?.jobTitle || '',
    level: employee?.level || '',
    department: employee?.department || '',
    startDate: employee?.startDate || '',
    photo: employee?.photo || '',
  });

  const logoFileInputRef = useRef(null);
  const logoFileInputRefChange = useRef(null);

  useEffect(() => {
    if (location.state && location.state.employee) {
      setFormData({
        fullName: employee.fullName,
        workEmail: employee.workEmail,
        personalEmail: employee.personalEmail, 
        address: employee.address,
        country: employee.country,
        cityState: employee.cityState,
        personalTaxIdentifierNumber: employee.personalTaxIdentifierNumber,
        phoneNumber: employee.phoneNumber,
        jobTitle: employee.jobTitle,
        level: employee.level,
        department: employee.department,
        startDate: employee.startDate,
        photo: employee.photo,
      });
    }
    if (isSaved) {
      const redirectTimer = setTimeout(() => {
        navigate("/Employees");
      }, 2500);
      return () => clearTimeout(redirectTimer);
    }
  }, [isSaved, navigate, location.state]);


  const handleChange = (e, fieldName) => {
    const formattedValue = e.target.value
      // Supprime tous les caractères non numériques
      .replace(/\D/g, '')
      // Insère un tiret entre chaque groupe de quatre chiffres
      .replace(/(\d{4})/g, '$1 - ')
      // Supprime le dernier espace et tiret s'il y en a un
      .replace(/ - $/, '');
  
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: formattedValue
    }));
  };

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return 'Invalid phone number';
    }
    if (!phoneNumber.isValid()) {
      return 'Invalid phone number for the selected country';
    }
    return true;
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    setLogoFile(URL.createObjectURL(file));
  };

  const handleLogoFileInputClick = () => {
    logoFileInputRef?.current?.click();
  };

  const handleLogoFileInputChangeClick = () => {
    logoFileInputRefChange?.current?.click();
  };
  
  const handleRemoveLogo = () => {
    setImgFile(null);
    setLogoFile(null);
  }
  
  const handleMouseEnter = () => {
    setShowLogoDropdown(true);
  };
  
  const handleMouseLeave = () => {
    setShowLogoDropdown(false);
  };

  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData._id;
      const employeeId = employee?._id;
      const updatedFields = {};
      const currentData = employee || {};
  
      Object.keys(formData).forEach(field => {
        if (formData[field] !== currentData[field]) {
          updatedFields[field] = formData[field];
        }
      });

      if(isFormValid) {
        if (imgFile) {
          const formData = new FormData();
  
          formData.append('image', imgFile); 
          
          updatedFields.jobTitle = selectedJobTitle || currentData.jobTitle;
          updatedFields.level = selectedLevel || currentData.level;
          updatedFields.department = selectedDepartment || currentData.department;
          updatedFields.country = selectedCountry?.name || currentData.country;
          updatedFields.cityState = selectedCity?.name || currentData.cityState;
          updatedFields.startDate = selectedDate ? moment(selectedDate, 'DD/MM/YYYY').toDate() : currentData.startDate;
    
          formData.append('data', JSON.stringify(updatedFields)); // append the rest of the updated fields
          
          if (employeeId) {
            // PUT request to update employee
            await axios.put(`${process.env.REACT_APP_baseURL}/employee/${employeeId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            // POST request to create a new employee
            await fetch(`${process.env.REACT_APP_baseURL}/employee/add`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
          }
        } else {
          const formData = new FormData();
          updatedFields.jobTitle = selectedJobTitle || currentData.jobTitle;
          updatedFields.level = selectedLevel || currentData.level;
          updatedFields.department = selectedDepartment || currentData.department;
          updatedFields.country = selectedCountry?.name || currentData.country;
          updatedFields.cityState = selectedCity?.name || currentData.cityState;
          updatedFields.startDate = selectedDate ? moment(selectedDate, 'DD/MM/YYYY').toDate() : currentData.startDate;
          formData.append('data', JSON.stringify(updatedFields));
  
          if (employeeId) {
            await axios.put(`${process.env.REACT_APP_baseURL}/employee/${employeeId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            await fetch(`${process.env.REACT_APP_baseURL}/employee/add`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
          }
        }
        setIsSaved(true);
      }
      } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      // Affichez une erreur à l'utilisateur si nécessaire
    }
  };
  
  // const onSubmit = async (data) => {
  //   try {
  //     const token = sessionStorage.getItem("userToken");
  //     const userData = JSON.parse(sessionStorage.getItem("userData"));
  //     const userId = userData._id;
  //     const employeeId = employee._id;

  //     const reader = new FileReader();
  //     reader.readAsDataURL(imgFile);
  //     reader.onloadend = async () => {
  //       const base64Image = reader.result;

  //       const requestData = {
  //         fullName: data.fullName,
  //         address: data.address,
  //         email: data.email,
  //         personalTaxIdentifierNumber: data.personalTaxIdentifierNumber,
  //         phoneNumber: data.phoneNumber,
  //         jobTitle: selectedJobTitle.title,
  //         level: selectedLevel.level,
  //         department: selectedDepartment.name,
  //         country: selectedCountry?.name,
  //         cityState: selectedCity?.name,
  //         startDate: moment(selectedDate, 'DD/MM/YYYY').toDate(),
  //         photo: base64Image, 
  //       };
  //       if (location.state && location.state.employee) {
            
  //         await axios.put(`${process.env.REACT_APP_baseURL}/members/${userId}/employees/${employeeId}`, requestData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //       }

  //       else{
  //         fetch(`${process.env.REACT_APP_baseURL}/members/employees/${userId}`, {
  //         method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(requestData),
  //       })
  //         .then(response => response.json())
  //         .then(responseData => {
  //           console.log("Réponse du serveur :", responseData);
  //         }

  //         )
  //         .catch(error => {
  //           console.error("Erreur lors de l'envoi du formulaire :", error);
  //         });
  //       }
        
  //       setIsSaved(true);

  //     };
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoi du formulaire :", error);
  //     // Affichez une erreur à l'utilisateur si nécessaire
  //   }
  // };

    
  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px] overflow-y-auto w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              {t("sidebar.company.main")}
            </PageHeader>
          </div>
          <SearchInput className={'w-[240px]'}/>
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full" style={{ backgroundColor: "white" }}>
          <form className="w-full border border-gray-201 rounded-[8px] shadow-tablesbs "
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="flex flex-row flex-wrap text-sm text-center text-gray-300 border-b border-gray-201 rounded-t-lg bg-white-A700 h-[77px] py-[19px] px-5">
              <Text
                className="text-lg leading-7 text-gray-900_01 pt-1"
                size="txtDmSansMedium16"
              >
                  {employee? t('employee.addEmployee.editEmployee'): t('employee.addEmployee.addEmployee')} 
              </Text>
              {isSaved? 
              <button
                className="bg-teal-A700 text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto"
                type="submit"
              >
                <BsCheck2Circle size={18} className="mr-2" />
                {t('common.saved')}
              </button>
              :
              <button
                className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto cursorpointer"
                type="submit" onClick={() => setHasSubmitted(true)}
              >
                <FiSave size={18} className="mr-2" />
                {t('employee.addEmployee.save')}
              </button>
              }
            </div>
            <div className="flex flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-5 md:px-5 w-full">
              <div className="flex min-w-[300px] flex-1 flex-col gap-6 py-5 items-start justify-start w-full">
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.fullName')}
                  </Text>
                    <input
                      {...register("fullName", { required: { value: true, message: "Employee First Name is required" } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.fullName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="fullName"
                      placeholder={t('employee.addEmployee.enterFullName')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  {/* {errors.fullName && <span className="text-sm font-DmSans text-red-500">{errors.fullName?.message}</span>} */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                   {t('employee.addEmployee.workEmail')}
                  </Text>
                    <input
                      {...register("workEmail", { required: { value: true, message: "Employee Work Email is required" } ,
                      minLength: {
                      value: 2,
                      },
                      maxLength: {
                        value: 120,
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      }, })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.workEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="workEmail"
                      placeholder={t('employee.addEmployee.enterWorkEmail')}
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}                    
                    />
                  {/* {errors.workEmail && <span className="text-sm font-DmSans text-red-500">{errors.workEmail?.message}</span>}             */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                   {t('employee.addEmployee.personalEmail')}
                  </Text>
                    <input
                      {...register("personalEmail", { required: { value: false, message: "Employee Personal Email is required" } ,
                      minLength: {
                      value: 2,
                      },
                      maxLength: {
                        value: 120,
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      },})}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.personalEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="personalEmail"
                      placeholder={t('employee.addEmployee.enterPersonalEmail')}
                      value={formData.personalEmail}
                      onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}                    
                    />
                  {/* {errors.personalEmail && <span className="text-sm font-DmSans text-red-500">{errors.personalEmail?.message}</span>}             */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.phoneNumber')}
                  </Text>
                    <input
                      {...register("phoneNumber", { required: { value: true, message: "Employee Phone Number is required" } ,
                      validate: validatePhoneNumber })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.phoneNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="phoneNumber"
                      placeholder="+212 - "
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  {/* {errors.phoneNumber && <span className="text-sm font-DmSans text-red-500">{errors.phoneNumber?.message}</span>} */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.address')}
                  </Text>
                    <input
                      {...register("address", { required: { value: false, message: "Employee address is required" } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.address ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="address"
                      placeholder={t('employee.addEmployee.enterAddress')}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  {/* {errors.address && <span className="text-sm font-DmSans text-red-500">{errors.address?.message}</span>} */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.country')}
                  </Text>
                  <SimpleSelect id='country'
                    options={countries} 
                    searchLabel={t("common.searchCountry")}
                    setSelectedOptionVal={setSelectedCountry}
                    selectedOptionsDfault={employee?.country? dataCountries.find(country => country.name === employee.country) : ""}
                    placeholder={t('employee.addEmployee.selectCountry')} valuekey="name" required={requiredFields.country} 
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                            >
                              {option.name}
                            </Text>
                          </div>
                        );
                      }
                    } />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.cityState')}
                  </Text>
                  <SimpleSelect id='city'
                    options={selectedCountry ? City.getCitiesOfCountry(selectedCountry['isoCode']) : []}  searchLabel={t("common.searchCity")} setSelectedOptionVal={setSelectedCity}
                    placeholder={t('employee.addEmployee.selectCity')} valuekey="name" required={requiredFields.city} 
                    selectedOptionsDfault={employee?.cityState? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === employee?.cityState) : ""}
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                            >
                              {option.name}
                            </Text>
                          </div>
                        );
                      }
                    } />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-[#1D1C21] w-auto"
                    size="txtDMSansLablel"
                  >
                    {t('employee.addEmployee.personalTaxIdentifierNumber')}
                  </Text>
                    <input
                      {...register("personalTaxIdentifierNumber", { required: { value: false, message: "Employee Personal Tax Identifier Number is required" } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.personalTaxIdentifierNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text"
                      name="personalTaxIdentifierNumber"
                      value={formData.personalTaxIdentifierNumber}
                      onChange={(e) =>handleChange(e, "personalTaxIdentifierNumber")}
                      
                      placeholder="0000 - 0000 - 0000"

                    />
                  {/* {errors.personalTaxIdentifierNumber && <span className="text-sm font-DmSans text-red-500">{errors.personalTaxIdentifierNumber?.message}</span>} */}
                </div>
              </div>
              <div className="flex py-5 flex-col items-start justify-start w-full lg:w-[35%] xl:w-[35%] 2xl:w-[35%] 3xl:w-[35%]">
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[270px] flex flex-col items-center justify-center relative rounded-md w-full"
                      onClick={handleLogoFileInputClick}>
                    {logoFile ? (
                      <>
                      <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[268px]" />
                      <div className="absolute top-2 right-0 flex flex-col justify-end" 
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}>
                            <div className="relative mr-3 w-auto">
                              <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.0013 2.66659C7.36949 2.66659 7.66797 2.36811 7.66797 1.99992C7.66797 1.63173 7.36949 1.33325 7.0013 1.33325C6.63311 1.33325 6.33464 1.63173 6.33464 1.99992C6.33464 2.36811 6.63311 2.66659 7.0013 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11.668 2.66659C12.0362 2.66659 12.3346 2.36811 12.3346 1.99992C12.3346 1.63173 12.0362 1.33325 11.668 1.33325C11.2998 1.33325 11.0013 1.63173 11.0013 1.99992C11.0013 2.36811 11.2998 2.66659 11.668 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.33464 2.66659C2.70283 2.66659 3.0013 2.36811 3.0013 1.99992C3.0013 1.63173 2.70283 1.33325 2.33464 1.33325C1.96645 1.33325 1.66797 1.63173 1.66797 1.99992C1.66797 2.36811 1.96645 2.66659 2.33464 2.66659Z" stroke="#1D2939" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            {showLogoDropdown && 
                              <div className="absolute top-[100%] right-0 flex flex-col">
                              <div className="flex mt-1 flex-col bg-white-A700 border-[0.5px] border-[#2575F01A] rounded-[8px] p-[16px] shadow-roleCardbs z-10">
                                <div className="w-auto group h-9 py-[5px] px-[16px] justify-start items-center gap-3 inline-flex" 
                                onClick={handleLogoFileInputChangeClick}>
                                  <span>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.6347 7.09536C12.4495 8.83529 11.4636 10.4658 9.83228 11.4076C7.12196 12.9724 3.65628 12.0438 2.09147 9.33348L1.9248 9.04481M1.36344 5.90467C1.54864 4.16474 2.5345 2.53426 4.16582 1.59241C6.87615 0.0276043 10.3418 0.95623 11.9066 3.66655L12.0733 3.95523M1.32812 10.544L1.81616 8.72267L3.63753 9.21071M10.3609 3.78934L12.1823 4.27737L12.6703 2.45601" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </span>
                                  <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">Change</div>
                                </div>
                                <div className="w-auto group h-9 py-[5px] px-[16px] justify-start items-center gap-3 inline-flex" 
                                onClick={handleRemoveLogo}>
                                  <span>
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 1.5H9M1 3.5H13M11.6667 3.5L11.1991 10.5129C11.129 11.565 11.0939 12.0911 10.8667 12.49C10.6666 12.8412 10.3648 13.1235 10.0011 13.2998C9.58798 13.5 9.06073 13.5 8.00623 13.5H5.99377C4.93927 13.5 4.41202 13.5 3.99889 13.2998C3.63517 13.1235 3.33339 12.8412 3.13332 12.49C2.90607 12.0911 2.871 11.565 2.80086 10.5129L2.33333 3.5M5.66667 6.5V9.83333M8.33333 6.5V9.83333" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </span>
                                  <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">Delete</div>
                                </div>
                              </div>
                            </div>}
                          </div>
                          <input ref={logoFileInputRefChange} id="fileInput" type="file" onChange={(e) => handleFileChange(e)} className="hidden" />
                          </>
                    ) : (<>
                    <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 rounded-md w-full">
                      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.16735 24.4537C3.87035 24.6667 4.81989 24.6667 6.43398 24.6667H18.5673C20.1814 24.6667 21.1309 24.6667 21.834 24.4537M3.16735 24.4537C3.01661 24.408 2.87721 24.3526 2.74502 24.2852C2.08645 23.9497 1.55102 23.4142 1.21546 22.7557C0.833984 22.007 0.833984 21.0269 0.833984 19.0667V6.93337C0.833984 4.97319 0.833984 3.9931 1.21546 3.24441C1.55102 2.58584 2.08645 2.05041 2.74502 1.71485C3.49371 1.33337 4.4738 1.33337 6.43398 1.33337H18.5673C20.5275 1.33337 21.5076 1.33337 22.2563 1.71485C22.9149 2.05041 23.4503 2.58584 23.7858 3.24441C24.1673 3.9931 24.1673 4.97319 24.1673 6.93337V19.0667C24.1673 21.0269 24.1673 22.007 23.7858 22.7557C23.4503 23.4142 22.9149 23.9497 22.2563 24.2852C22.1241 24.3526 21.9847 24.408 21.834 24.4537M3.16735 24.4537C3.16773 23.5095 3.17339 23.0099 3.25699 22.5896C3.62522 20.7384 5.07234 19.2913 6.92356 18.923C7.37436 18.8334 7.91646 18.8334 9.00065 18.8334H16.0007C17.0848 18.8334 17.6269 18.8334 18.0777 18.923C19.929 19.2913 21.3761 20.7384 21.7443 22.5896C21.8279 23.0099 21.8336 23.5095 21.834 24.4537M17.1673 10.0834C17.1673 12.6607 15.078 14.75 12.5007 14.75C9.92332 14.75 7.83398 12.6607 7.83398 10.0834C7.83398 7.50604 9.92332 5.41671 12.5007 5.41671C15.078 5.41671 17.1673 7.50604 17.1673 10.0834Z" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="flex flex-col items-start justify-start w-auto">
                        <Text
                          className="text-[13px] text-base text-center leading-6 tracking-normal w-auto"
                          size="txtDMSansRegular13"
                        >
                        {t('employee.addEmployee.uploadPhoto')}  
                        </Text>
                      </div>
                    </div>
                    <input ref={logoFileInputRef} id="fileInput" type="file" onChange={(e) => handleFileChange(e)} className="hidden" />
                    </>
                      )}
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('employee.addEmployee.job')}
                    </Text>
                    <SimpleSelect
                      id='job'
                      options={jobTitles}
                      onSelect={(selectedOption) => setSelectedJobTitle(selectedOption)}
                      searchLabel={t('employee.addEmployee.searchJob')}
                      setSelectedOptionVal={setSelectedJobTitle}
                      selectedOptionsDfault={employee?.jobTitle ? jobTitles.find(job => job === employee.jobTitle) : ""}
                      placeholder={t('employee.addEmployee.selectJobTitle')}
                      content={(option) => {
                        return (
                          <div className="flex py-2 items-center w-full">
                            <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                              {t(`${option}`)}
                            </Text>
                          </div>
                        );
                      }}

                      value={selectedJobTitle}
                      onChange={e => handleChange(e, setSelectedJobTitle)}
                    />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('employee.addEmployee.level')}
                    </Text>
                    <SimpleSelect id='level' options={employeeLevels}  searchLabel={t('employee.addEmployee.searchLevel')} setSelectedOptionVal={setSelectedLevel}
                      placeholder={t('employee.addEmployee.selectLevel')}
                      selectedOptionsDfault={employee?.level? employeeLevels.find(lev => lev === employee.level) : ""}
                      content={
                        (option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <Text
                                className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                              >
                                {t(`${option}`)}
                              </Text>
                            </div>
                          );
                        }
                      } />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('employee.addEmployee.department')}
                    </Text>
                    <SimpleSelect id='department' options={departments}  searchLabel={t('employee.addEmployee.searchDepartment')} setSelectedOptionVal={setSelectedDepartment}
                      placeholder={t('employee.addEmployee.selectDepartment')}
                      selectedOptionsDfault={employee?.department? departments.find(dep => dep === employee.department) : ""}
                      content={
                        (option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <Text
                                className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                              >
                                {t(`${option}`)}
                              </Text>
                            </div>
                          );
                        }
                      } />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-[#1D1C21] w-auto"
                      size="txtDMSansLablel"
                    >
                      {t('employee.addEmployee.startDate')}
                    </Text>
                    <CustomCalendar
                      className={' w-full'}
                      defaultValue={formData.startDate ? new Date(formData.startDate) : ''}
                      onChangeDate={(selectedDate) => setSelectedDate(selectedDate)}
                      inputPlaceholder={'DD/MM/YYYY'}
                    />
                    {/* <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <input
                        {...register("startDate", { required: {value:true , message:"Employee Start Date is required"} })}
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
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
                      <MdOutlineDateRange size={20} className={`${isFocused ? 'hidden' : ''} text-blue_gray-301`}/>
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