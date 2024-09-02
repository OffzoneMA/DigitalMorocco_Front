import React, { useState , useRef  , useEffect} from "react";
import { Text } from "../Components/Text";
import { FiSave } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import SimpleSelect from "../Components/SimpleSelect";
import { IoImageOutline } from "react-icons/io5";
import { Country ,City } from 'country-state-city';
import { useForm } from "react-hook-form";
import {companyType} from "../data/companyType";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import { useGetUserDetailsQuery } from "../Services/Auth";

const MyCompany = () => {
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading} = useGetUserDetailsQuery();
  const [logoFile, setLogoFile] = useState(userDetails?.member?.logo || '');
  const [imgFile , setImgFile] = useState(null);
  const [isSaved , setIsSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [taxIdentfier, settaxIdentfier] = useState(userDetails?.member?.taxNbr || '');
  const [corporateIdentfier,setcorporateIdentfier] = useState(userDetails?.member?.corporateNbr || '');
  const [selectedSector, setselectedSector] = useState(userDetails?.member?.companyType || '');
  const dataCountries = Country.getAllCountries();
  const [selectedCountry , setSelectedCountry] = useState(dataCountries.find(country => country.name === userDetails?.member?.country) || null);
  const [selectedCity , setSelectedCity] = useState(userDetails?.member?.city || '');
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requiredFields, setRequiredFields] = useState({
    country: false,
    city: false,
    sector: false,
  });

  const logoFileInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    // if (Mount) { setMount(false) }
    // else{
      if (hasSubmitted ) {
        const isCountryValid = selectedCountry !== null;
        const isCityValid = selectedCity !== "";
        const isSectorValid = selectedSector !== "";
    
        const isValid = isCountryValid && isCityValid && isSectorValid ;
    
        setRequiredFields({
          country: !isCountryValid,
          city: !isCityValid,
          sector: !isSectorValid,
        });
    
        setIsFormValid(isValid);
      }
    // }
  }, [hasSubmitted ,selectedCountry, selectedCity, selectedSector]);
  
console.log(requiredFields)
  useEffect(() => {
    if (userDetails) {
      reset({
        companyName: userDetails?.member?.companyName,
        address: userDetails?.member?.address,
        legalName: userDetails?.member?.legalName,
        description: userDetails?.member?.desc,
        website: userDetails?.member?.website,
        contactEmail: userDetails?.member?.contactEmail,
        taxIdentfier: userDetails?.member?.taxNbr,
        corporateIdentfier: userDetails?.member?.corporateNbr,
      });
    }
  }, [userDetails, reset]);
  console.log(userDetails)
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

  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData._id;

      // Convertir l'image en base64
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = async () => {
      const base64Image = reader.result;
        // Créer un objet JSON avec les données et l'image base64
      const requestData = {
        companyName: data.companyName,
        legalName: data.legalName,
        contactEmail: data.contactEmail,
        desc: data.description,
        website: data.website,
        address: data.address,
        taxIdentfier: taxIdentfier,
        corporateNbr : corporateIdentfier,
        companyType: selectedSector,
        country: countryNameSelec,
        city: selectedCity,
        logo: base64Image, // Ajouter l'image base64
      };
      if(isFormValid){
        // fetch(`${process.env.REACT_APP_baseURL}/members/company/${userId}`, {
        //   method: 'POST',
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(requestData),
        // })
        // .then(response => response.json())
        // .then(responseData => {
        //   console.log("Réponse du serveur :", responseData);
        //   setIsSaved(true);
        //   setTimeout(() => {
        //     setIsSaved(false);
        // }, 5000); 
        // }
        // )
        // .catch(error => {
        //   console.error("Erreur lors de l'envoi du formulaire :", error);
        // });
      }
      };
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire :", error);
      }
  };

  const handleLogoFileUpload = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    setLogoFile(URL.createObjectURL(file));
  };
  
  const handleLogoFileInputClick = () => {
    logoFileInputRef.current.click();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              Company
            </PageHeader>
          </div>
          <SearchInput className={'w-[240px]'}/>
          {isSaved? 
              <button
                className="bg-teal-A700 text-base px-[12px] py-[7px] h-[44px] text-white-A700 flex flex-row  items-center ml-auto cursorpointer-green rounded-md w-auto"
                type="submit"
              >
                <BsCheck2Circle size={18} className="mr-2" />
                Saved
              </button>
              :
              <button
                className="bg-blue-501 text-sm px-[12px] py-[7px] h-[44px] text-white-A700 flex flex-row items-center ml-auto min-w-[85px] cursorpointer-green rounded-md w-auto"
                onClick={() => setHasSubmitted(true)}
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
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Company Name
                </Text>
                  <input
                    {...register("companyName", { required: {value:true , message: "Company name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.companyName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                  />
                {/* {errors.companyName && <span className="text-sm font-DmSans text-red-500">{errors.companyName?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Legal Name
                </Text>
                  <input
                    {...register("legalName", { required: {value:true , message:"Company Legal name is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.legalName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="legalName"
                    placeholder="Your Company Legal Name"
                  />
                {/* {errors.legalName && <span className="text-sm font-DmSans text-red-500">{errors.legalName?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Description
                </Text>
                  <textarea
                    {...register("description", { required: true })}
                    className={`!placeholder:text-blue_gray-300 h-[102px] !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] border border-[#D0D5DD] ${errors?.description ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    name="description"
                    rows={4}
                    placeholder="Write your company’s short description here"
                    style={{
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none'
                        }}
                  />
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Website
                </Text>
                  <input
                  {...register("website", { required: {value:false , message:"Company website is required"} })}
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="website"
                    placeholder="Your Company Website"
                  />
                {/* {errors.website && <span className="text-sm font-DmSans text-red-500">{errors.website?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Contact Email
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
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.contactEmail ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="contactEmail"
                    placeholder="Your Company email"
                  />
                {/* {errors.contactEmail && <span className="text-sm font-DmSans text-red-500">{errors.contactEmail?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Address
                </Text>
                  <input
                    {...register("address", { required: {value:false , message:"Company address is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.address ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="address"
                    placeholder="Your Company address"
                  />
                {/* {errors.address && <span className="text-sm font-DmSans text-red-500">{errors.address?.message}</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Country
                </Text>
                <SimpleSelect id='country' options={dataCountries} onSelect={""} searchLabel='Search Country' setSelectedOptionVal={setSelectedCountry} 
                    placeholder="Select Country" valuekey="name" selectedOptionsDfault={userDetails?.member?.country? dataCountries.find(country => country.name === userDetails?.member?.country) : ""} 
                    required={requiredFields.country}
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
              {/* {selectedCountry==null && <span className="text-sm font-DmSans text-red-500">Company country is required</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  City/State
                </Text>
                <SimpleSelect id='city' options={selectedCountry? City.getCitiesOfCountry(selectedCountry?.['isoCode']): []} onSelect={""} searchLabel='Search City' setSelectedOptionVal={setSelectedCity} 
                    placeholder="Select City" valuekey="name" selectedOptionsDfault={userDetails?.member?.city? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === userDetails?.member?.city) : ""}
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
                {/* {selectedCity==null && <span className="text-sm font-DmSans text-red-500">Company city/state is required</span>} */}
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Company Sector
                </Text>
                <SimpleSelect id='sector' options={companyType} onSelect={""} searchLabel='Search Sector' searchable={false} setSelectedOptionVal={setselectedSector} 
                    placeholder="Select Company Sector" selectedOptionsDfault={userDetails?.member?.companyType || ''} 
                    required={requiredFields.sector}
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-dm-sans-medium leading-5 w-auto"
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
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Tax Identifier Number
                </Text>
                  <input
                    {...register("taxIdentfier", { required: {value:false , message:"Company taxIdentfier is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.taxIdentfier ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="taxIdentfier"
                    value={taxIdentfier}
                    onChange={e => handleChange(e, settaxIdentfier)}
                    placeholder="0000 - 0000 - 0000"
                  />
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansLablel"
                >
                  Corporate Identifier Number
                </Text>
                  <input
                    {...register("corporateIdentfier", { required: {value:false , message:"Company corporateIdentfier is required"} })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.corporateIdentfier ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text"
                    name="corporateIdentfier"
                    value={corporateIdentfier}
                    onChange={e => handleChange(e, setcorporateIdentfier)}
                    placeholder="0000 - 0000 - 0000"
                    
                  />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start md:w-[35%] lg:w-[35%] w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Text
                  className="text-base text-[#1D1C21] w-auto"
                  size="txtDMSansRegular16"
                >
                  Company Logo
                </Text>
                <div className="bg-white-A700 border border-blue_gray-100_01 border-solid h-[150px] flex flex-col items-center justify-center rounded-md w-full"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop} onClick={handleLogoFileInputClick}>
                  {logoFile ? (
                    <img src={logoFile} alt="Uploaded Logo" className="rounded-md w-full h-[150px]" />
                  ) : (<>
                  <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 rounded-md w-full">
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
                  <input ref={logoFileInputRef} id="fileInput" type="file" onChange={(e) => handleLogoFileUpload(e)} className="hidden" />
                  </>
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