import React, { useState , useRef  , useEffect} from "react";
import { Text } from "../../../Components/Text";
import { FiSave } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import { IoImageOutline } from "react-icons/io5";
import { Country ,City } from 'country-state-city';
import { useForm } from "react-hook-form";
import {companyType} from "../../../data/companyType";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { useGetUserDetailsQuery } from "../../../Services/Auth";
import { useTranslation } from "react-i18next";
import { countries } from "../../../data/tablesData";
import { InvestorCompanyTypes } from "../../../data/data";
import { fundingTypes } from "../../../data/data";
import { stage, stages } from "../../../data/stage";
import CustomCalendar from "../../../Components/common/CustomCalendar";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const CompanyProfile = () => {
  const { t } = useTranslation();
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading , refetch} = useGetUserDetailsQuery();
  const [logoFile, setLogoFile] = useState(userDetails?.logo || userDetails?.image || '');
  const [imgFile , setImgFile] = useState(null);
  const [showLogoDropdown , setShowLogoDropdown] = useState(false);
  const [sending , setSending] = useState(false);
  const [isSaved , setIsSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [taxIdentfier, settaxIdentfier] = useState(userDetails?.taxNbr || '');
  const [corporateIdentfier,setcorporateIdentfier] = useState(userDetails?.corporateNbr || '');
  const [selectedSector, setselectedSector] = useState(userDetails?.companyType || '');
  const dataCountries = countries;
  const [selectedCountry , setSelectedCountry] = useState(dataCountries.find(country => country.name === userDetails?.country) || null);
  const [selectedCity , setSelectedCity] = useState(userDetails?.city || null);
  const [selectedCompanyType , setSelectedCompanyType] = useState(null);
  const [selectedInvestmentStages , setSelectedInvestmentStages] = useState([]);
  const [selectedPreferredInvestmentIndustry , setSelectedPreferredInvestmentIndustry] = useState([]);
  const [selectedFundingType , setSelectedFundingType] = useState(null);
  const [selectedDate , setSelectedDate] = useState('');
  const [investmentCapacity , setInvestmentCapacity] = useState(userDetails?.investmentCapacity || '');
  const [numberOfExits , setNumberOfExits] = useState(userDetails?.numberOfExits || '');
  const [numberOfInvestments , setNumberOfInvestments] = useState(userDetails?.numberOfInvestments || '');
  const [acquisitions , setAcquisitions] = useState(userDetails?.acquisitions || '');
  const [isFormValid, setIsFormValid] = useState(true);
  const [fund , setFund] = useState(userDetails?.fund || '');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    country: false,
    city: false,
    sector: false,
    stages: false,
    industry: false,
  });

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

  const formatFundingValue = (value, setFieldValue) => {
    if (value == null) {
      setFieldValue(''); 
      return;
    }
  
    let formattedValue = String(value).replace(/\D/g, ''); 
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setFieldValue(formattedValue);
  };
  

  const logoFileInputRef = useRef(null);
  const logoFileInputRefChange = useRef(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    // if (Mount) { setMount(false) }
    // else{
      if (hasSubmitted ) {
        const isCountryValid = selectedCountry !== null && selectedCountry !== "" && selectedCountry !== undefined;
        const isCityValid = selectedCity !== "" && selectedCity !== undefined && selectedCity !== null;
        const isStagesValid = selectedInvestmentStages.length > 0;
        const isIndustryValid = selectedPreferredInvestmentIndustry.length > 0;
        const isCompanyTypeValid = selectedCompanyType !== null && selectedCompanyType !== "" && selectedCompanyType !== undefined;
    
        // const isValid = isCountryValid && isCityValid && isSectorValid ;

        const isValid = isCountryValid && isStagesValid && isIndustryValid && isCompanyTypeValid;
    
        setRequiredFields({
          country: !isCountryValid,
          // city: !isCityValid,
          stages: !isStagesValid,
          industry: !isIndustryValid,
          companyType: !isCompanyTypeValid,
        });
    
        setIsFormValid(isValid);
      }
    // }
  }, [hasSubmitted ,selectedCountry, selectedCity , selectedInvestmentStages, selectedPreferredInvestmentIndustry, selectedCompanyType]);
  
  useEffect(() => {
    if (userDetails) {
      reset({
        companyName: userDetails?.companyName,
        legalName: userDetails?.legalName,
        description: userDetails?.desc,
        website: userDetails?.website,
        contactEmail: userDetails?.contactEmail,
        phoneNumber: userDetails?.phoneNumber,
        // taxIdentfier: userDetails?.taxNbr,
        // corporateIdentfier: userDetails?.corporateNbr,
      });
      formatFundingValue(userDetails?.fund, setFund);
      formatFundingValue(userDetails?.investmentCapacity, setInvestmentCapacity);
      formatFundingValue(userDetails?.acquisitions, setAcquisitions);
      formatFundingValue(userDetails?.numberOfExits, setNumberOfExits);
      formatFundingValue(userDetails?.numberOfInvestment, setNumberOfInvestments);
      setSelectedFundingType(userDetails?.lastFundingType);
      setSelectedDate(userDetails?.foundedDate);
      setSelectedCompanyType(userDetails?.companyType);
      setSelectedCountry(dataCountries.find(country => country.name === userDetails?.country) || null);
      setSelectedInvestmentStages(userDetails?.investmentStages || []);
      setSelectedPreferredInvestmentIndustry(userDetails?.PreferredInvestmentIndustry || []);
      setLogoFile(userDetails?.logo || userDetails?.image );
    }
  }, [userDetails, reset]);

  const formRef = useRef();

  const countryNameSelec = selectedCountry? selectedCountry["name"] : "";


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

  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData._id;

      const formData = new FormData();
      formData.append('role', userData?.role?.toLowerCase());

      if (imgFile) {
        formData.append('logo', imgFile);
      }

      const requestData = {
        name: data.companyName,
        companyName: data.companyName,
        legalName: data.legalName,
        contactEmail: data.contactEmail,
        desc: data.description,
        website: data.website,
        companyType: selectedCompanyType,
        type: selectedCompanyType,
        country: countryNameSelec,
        location: countryNameSelec,
        city: selectedCity,
        phoneNumber: data.phoneNumber,
        investmentStages: selectedInvestmentStages,
        PreferredInvestmentIndustry: selectedPreferredInvestmentIndustry,
        fund: parseFloat(fund.replace(/\s/g, '')),
        acquisitions: parseFloat(acquisitions.replace(/\s/g, '')),
        investmentCapacity: parseFloat(investmentCapacity.replace(/\s/g, '')),
        numberOfExits: parseFloat(numberOfExits.replace(/\s/g, '')),
        numberOfInvestment: parseFloat(numberOfInvestments.replace(/\s/g, '')),
        lastFundingType: selectedFundingType,
        foundedDate: selectedDate,
      };
      
      formData.append('companyData', JSON.stringify(requestData));

      const isCountryValid = selectedCountry !== null && selectedCountry !== "" && selectedCountry !== undefined;
      // const isCityValid = selectedCity !== "" && selectedCity !== undefined && selectedCity !== null;
      const isStagesValid = selectedInvestmentStages.length > 0;
      const isIndustryValid = selectedPreferredInvestmentIndustry.length > 0;
      const isCompanyTypeValid = selectedCompanyType !== null && selectedCompanyType !== "" && selectedCompanyType !== undefined;
  
      // const isValid = isCountryValid && isCityValid && isSectorValid ;

      const isValid = isCountryValid && isStagesValid && isIndustryValid && isCompanyTypeValid;

      if (isFormValid && isValid) {
        setSending(true);
        const response = await fetch(`${process.env.REACT_APP_baseURL}/members/companies`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if(response.ok) {
          setIsSaved(true);
          setSending(false);
          refetch();
          setTimeout(() => {
              setIsSaved(false);
          }, 5000);
        }
        else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur dans la réponse du serveur');
        }
      }    
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setSending(false);
    }
  };

  const handleLogoFileUpload = (event) => {
    const file = event.target.files[0];
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


  return (
    <>
    <HelmetWrapper
      title={t('helmet.investorProfile.title')}
      description={t('helmet.investorProfile.description')}
      keywords={t('helmet.investorProfile.keywords')}
      canonical={`${process.env.REACT_APP_URL}/InvestorProfile`}
    />
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="bg-white-A700 flex flex-col gap-8 h-full items-start justify-start pb-14 pt-8 rounded-tl-[40px] min-h-screen overflow-auto w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col items-start justify-start pb-6 w-full">
          <div className="w-full flex gap-5">
            <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
              <PageHeader
                >
                {t("sidebar.myProfile")}
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'}/>
            {isSaved? 
              <button
                className="bg-teal-A700 text-base px-[12px] py-[7px] h-[44px] text-white-A700 flex flex-row  items-center ml-auto cursorpointer rounded-md w-auto"
                type="submit"
              >
                <BsCheck2Circle size={18} className="mr-2" />
                {t("common.saved")}
              </button>
              : sending ?
              <button
                className="bg-blue-501 hover:bg-[#235DBD] active:bg-[#224a94 text-sm px-[12px] py-[7px] h-[44px] text-white-A700 flex flex-row items-center ml-auto min-w-[85px] cursorpointer rounded-md w-auto"
                type="button"
                disabled
                >
                <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              :
              <button
                className="bg-blue-501 hover:bg-[#235DBD] active:bg-[#224a94 text-sm px-[12px] py-[7px] h-[44px] text-white-A700 flex flex-row items-center ml-auto min-w-[85px] cursorpointer rounded-md w-auto"
                onClick={() => setHasSubmitted(true)}
                type="submit"
                >
                <FiSave size={18} className="mr-2" />
                {t('myCompany.save')}
              </button>          
            }
          </div>
          <div className="flex flex-wrap items-start justify-start w-full">
            <div class="w-full flex-1 text-[#667085] text-base font-normal font-Inter leading-normal">{t('investors.company.message')}</div>
            <div className="flex lg:w-[35%] w-full items-center justify-start w-full"></div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex  w-full">
          <div className="flex flex-col flex-wrap md:flex-row lg:flex-row gap-8 items-start justify-start px-5 w-full ">
            <div className="flex flex-1 md:miw-w-[300px] flex-col gap-6 items-start justify-start w-full">
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.companyName')}*
                </Text>
                  <input
                    {...register("companyName", { required: {value:true , message: "Company name is required"} })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.companyName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="companyName"
                    placeholder={t('investors.company.companyNamePlaceholder')}
                  />
                {/* {errors.companyName && <span className="text-sm font-DmSans text-red-500">{errors.companyName?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.legalName')}*
                </Text>
                  <input
                    {...register("legalName", { required: {value:true , message:"Company Legal name is required"} })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.legalName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="legalName"
                    placeholder={t('investors.company.legalNamePlaceholder')}
                  />
                {/* {errors.legalName && <span className="text-sm font-DmSans text-red-500">{errors.legalName?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.companyType')}*
                </Text>
                <SimpleSelect id='type' options={InvestorCompanyTypes}  searchLabel={t('investors.company.searchCompanyType')} setSelectedOptionVal={setSelectedCompanyType} 
                    placeholder={t('investors.company.companyTypePlaceholder')} selectedOptionsDfault={selectedCompanyType} 
                    required={requiredFields.companyType}
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
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.description')}*
                </Text>
                  <textarea
                    {...register("description", { required: true })}
                    className={`!placeholder:text-blue_gray-301 h-[139px] !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] border border-[#D0D5DD] ${errors?.description ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    name="description"
                    rows={4}
                    placeholder={t('investors.company.descriptionPlaceholder')}
                    style={{
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          resize:'none'
                        }}
                  />
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.website')}*
                </Text>
                  <input
                  {...register("website", { required: {value:true , message:"Company website is required"} })}
                  className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="website"
                    placeholder={t('investors.company.websitePlaceholder')}
                  />
                {/* {errors.website && <span className="text-sm font-DmSans text-red-500">{errors.website?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.location')}*
                </Text>
                <SimpleSelect id='country' options={countries}  searchLabel={t('investors.company.searchLocation')} setSelectedOptionVal={setSelectedCountry} 
                    placeholder={t('investors.company.locationPlaceholder')} valuekey="name" selectedOptionsDfault={selectedCountry} 
                    required={requiredFields.country}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                              >
                               {t(`${option.name}`)}
                            </Text>
                           </div>
                        );
                      }
                    }/>
              </div>
              {/* <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('myCompany.cityState')}
                </Text>
                <SimpleSelect id='city' options={selectedCountry? City.getCitiesOfCountry(selectedCountry?.['isoCode']): []}  searchLabel={t('common.searchCity')} setSelectedOptionVal={setSelectedCity} 
                    placeholder={t('myCompany.selectCity')} valuekey="name" selectedOptionsDfault={userDetails?.city? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === userDetails?.city) : ""}
                    required={requiredFields.city}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                              >
                               {option.name}
                            </Text>
                           </div>
                        );
                      }
                    }/>
              </div> */}
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.investmentStages')}*
                </Text>
                <MultipleSelect id='sector' options={stage}  searchLabel={'Seach members'} searchable={false} setSelectedOptionVal={setSelectedInvestmentStages} 
                    placeholder={t('investors.company.investmentStagesPlaceholder')}  selectedOptionsDfault={selectedInvestmentStages} 
                    required={requiredFields.stages}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                          <Text
                            className="text-gray-801 text-left text-base font-dm-sans-medium leading-5 w-auto capitalize"
                            >
                              {t(option)}
                          </Text>
                          </div>
                      );
                    }
                  }/>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.preferredInvestmentIndustry')}*
                </Text>
                <MultipleSelect id='sector' options={companyType}  searchLabel={t('investors.company.searchPreferredInvestmentIndustry')} searchable={true} setSelectedOptionVal={setSelectedPreferredInvestmentIndustry} 
                    placeholder={t('investors.company.preferredInvestmentIndustryPlaceholder')} selectedOptionsDfault={selectedPreferredInvestmentIndustry} 
                    required={requiredFields.industry} 
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-medium leading-5 w-auto capitalize"
                              >
                               {t(option)}
                            </Text>
                           </div>
                        );
                      }
                    }/>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.contactEmail')}*
                </Text>
                  <input
                    {...register("contactEmail", { required: {value:true , message:"Company Contact Email is required"},
                    minLength: {
                      value: 2,
                    },
                    maxLength: {
                      value: 120,
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    }, })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.contactEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="contactEmail"
                    placeholder={t('myCompany.enterEmail')}
                  />
                {/* {errors.contactEmail && <span className="text-sm font-DmSans text-red-500">{errors.contactEmail?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.phoneNumber')}*
                </Text>
                  <input
                    {...register("phoneNumber", { required: { value: true, message: "" } ,
                    validate: validatePhoneNumber })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.phoneNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="phoneNumber"
                    placeholder={t('investors.company.phoneNumberPlaceholder')}
                  />
              </div>
            </div>
            <div className={`bg-gray-201 w-full h-px lg:w-px lg:h-full lg:min-h-fit`} />
            <div className="flex flex-col items-start gap-3 justify-start lg:w-[35%] w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full ">
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansRegular16"
                >
                  {t('myCompany.companyLogo')}
                </Text>
                <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[250px] flex flex-col items-center justify-center relative rounded-md w-full"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop} onClick={handleLogoFileInputClick}>
                  {logoFile ? (
                    <>
                    <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[248px]" />
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
                                <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t("common.change")}</div>
                              </div>
                              <div className="w-auto group h-9 py-[5px] px-[16px] justify-start items-center gap-3 inline-flex" 
                              onClick={handleRemoveLogo}>
                                <span>
                                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1.5H9M1 3.5H13M11.6667 3.5L11.1991 10.5129C11.129 11.565 11.0939 12.0911 10.8667 12.49C10.6666 12.8412 10.3648 13.1235 10.0011 13.2998C9.58798 13.5 9.06073 13.5 8.00623 13.5H5.99377C4.93927 13.5 4.41202 13.5 3.99889 13.2998C3.63517 13.1235 3.33339 12.8412 3.13332 12.49C2.90607 12.0911 2.871 11.565 2.80086 10.5129L2.33333 3.5M5.66667 6.5V9.83333M8.33333 6.5V9.83333" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                                <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t('common.delete')}</div>
                              </div>
                            </div>
                          </div>}
                        </div>
                        <input ref={logoFileInputRefChange} id="fileInput" type="file" onChange={(e) => handleLogoFileUpload(e)} className="hidden" />
                        </>
                  ) : (<>
                  <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 rounded-md w-full">
                    <IoImageOutline />
                    <div className="flex flex-col items-start justify-start w-auto">
                      <Text
                        className="text-[13px] text-base text-center leading-6 tracking-normal w-auto"
                        size="txtDMSansRegular13"
                      >
                      {isDragging? t("common.dropLogo") : t('investors.company.uploadLogo')} 
                      </Text>
                    </div>
                  </div>
                  <input ref={logoFileInputRef} id="fileInput" type="file" onChange={(e) => handleLogoFileUpload(e)} className="hidden" />
                  </>
                    )}
                </div>
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.lastFundingType')}
                </Text>
                <SimpleSelect id='sector' options={fundingTypes}  searchLabel={t("common.searchSector")} searchable={false} setSelectedOptionVal={setSelectedFundingType} 
                    placeholder={t('investors.company.lastFundingTypePlaceholder')} selectedOptionsDfault={selectedFundingType} 
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
                  className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.foundedDate')}
                </Text>
                <CustomCalendar
                  className={' w-full'} 
                  inputPlaceholder={t('investors.company.foundedDatePlaceholder')}
                  defaultValue={selectedDate ? new Date(selectedDate) : ''}
                  onChangeDate={(date) => setSelectedDate(date)}
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.investmentCapacity')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="investmentCapacity"
                  type="text"
                  value={investmentCapacity}
                  onChange={(e) => formatFundingValue(e.target.value , setInvestmentCapacity)}
                  placeholder={t('investors.company.investmentCapacityPlaceholder')}
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.numberOfInvestments')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="numberOfInvestments"
                  type="text"
                  value={numberOfInvestments}
                  onChange={(e) => formatFundingValue(e.target.value , setNumberOfInvestments)}
                  placeholder={t('investors.company.numberOfInvestmentsPlaceholder')}
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.numberOfExits')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="numberOfExits"
                  type="text"
                  value={numberOfExits}
                  onChange={(e) => formatFundingValue(e.target.value , setNumberOfExits)}
                  placeholder={t('investors.company.numberOfExitsPlaceholder')}
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.numberOfFunds')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="fund"
                  type="text"
                  value={fund}
                  onChange={(e) => formatFundingValue(e.target.value , setFund)}
                  placeholder={t('investors.company.numberOfFundsPlaceholder')}
                />
              </div>              
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.numberOfAcquisitions')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="acquisitions"
                  type="text"
                  value={acquisitions}
                  onChange={(e) => formatFundingValue(e.target.value , setAcquisitions)}
                  placeholder={t('investors.company.numberOfAcquisitionsPlaceholder')}
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text className="text-base leading-[26px] text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  {t('investors.company.listOfInvestments')}
                </Text>
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border ${errors?.funding ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  name="funding"
                  type="text"
                  readOnly
                  disabled
                  // value={fundingValue}
                  // onChange={(e) => formatFundingValue(e.target.value)}
                  placeholder={t('investors.company.listOfInvestmentsPlaceholder')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>

  );
};

export default CompanyProfile;