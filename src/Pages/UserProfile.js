import React, { useEffect, useState , useRef, useContext} from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../Services/User.Service';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { Text } from '../Components/Text';
import { PiUserBold } from "react-icons/pi";
import SimpleSelect from '../Components/SimpleSelect';
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import DeleteAccountModal from '../Components/DeleteAccountModal';
import { Country, City } from 'country-state-city';
import { languages } from '../data/tablesData';
import { regions } from '../data/tablesData';
import { SlCheck } from "react-icons/sl";
import PageHeader from "../Components/PageHeader";
import axios from 'axios';

export default function UserProfile() {
  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow , setDeleteRow] = useState(null);
  const [name, setName] = useState(userInfo?.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [update, responseUpdate] = useUpdateUserMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview , setPreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isConnect , setIsConnect] = useState(true);
  const [isForm1Saved , setIsForm1Saved] = useState(false);
  const [isForm2Saved , setIsForm2Saved] = useState(false);
  const [isForm3Saved , setIsForm3Saved] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const allCountries = Country.getAllCountries();
  const selectedCountryName = selectedCountry? selectedCountry["name"] : '';

  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm();
  const { register: register2, handleSubmit: handleSubmit2,watch, formState: { errors: errors2 } } = useForm();
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();


  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/UserInfo'); 
        const data = response.data;
        console.log("data",data)
        setUser(data);
        setValue('email', data.email);
        setValue('username', data.username);
        setValue('country', data.country);
        setValue('city', data.city);
        setValue('phoneNumber', data.phoneNumber);
        setValue('website', data.website);
        setValue('facebook', data.facebook);
        setValue('instagram', data.instagram);
        setValue('twitter', data.twitter);
        setValue('linkedin', data.linkedin);
        setValue('language', data.language);
        setValue('region', data.region);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserInfo();
    } else {
      // Si les informations de l'utilisateur sont déjà disponibles
      setValue('email', user.email);
      setValue('username', user.username);
      setValue('country', user.country);
      setValue('city', user.city);
      setValue('phoneNumber', user.phoneNumber);
      setValue('website', user.website);
      setValue('facebook', user.facebook);
      setValue('instagram', user.instagram);
      setValue('twitter', user.twitter);
      setValue('linkedin', user.linkedin);
      setValue('language', user.language);
      setValue('region', user.region);
      setLoading(false);
    }
  }, [setValue, user, setUser]);


  //   useEffect(()=>{
  //     setName(userInfo?.displayName)
  //   },[userInfo])
  // useEffect(() => {
  //   responseUpdate?.error && toast.error("Something went wrong")
  //   if(responseUpdate?.isSuccess) {
  //   toast.success("Edited Successfuly !")
  //     setIsEditing(false)
  // }
  // }, [responseUpdate.isLoading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePasswordMatch = (value) => {
    const password = watch('newPassword'); 
    return password === value || "Passwords do not match.";
  };

  const onSubmit1 = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append('country', selectedCountry);
    formData.append('city', selectedCity);

    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    setIsForm1Saved(true);
  };

  const onSubmit2 = (data) => {
    console.log("Form 2 Data:", data);
    setIsForm2Saved(true);
  };

  const onSubmit3 = (data) => {
    const formData = {
      ...data,
      language: selectedLanguage,
      region: selectedRegion
    };
    console.log("Form 3 Data:", formData);
    setIsForm3Saved(true);
  };


  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              My Profil
            </PageHeader>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start w-full py-6 gap-8">
          <div className='flex flex-col gap-4 w-[180px] 2xl:w-[220px] 3xl:w-[250px] items-center'>
            <div className='flex w-full h-[180px] 2xl:h-[220px] 3xl:w-[250px] rounded-full items-center justify-center bg-light_blue-100'>
            {preview ? (
              <img src={preview} alt="Uploaded" className='w-full h-full rounded-full object-cover' />
            ) : (
              <PiUserBold size={64} className='text-blue-501'/>
            )}
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              id="imageUpload" 
              onChange={handleImageChange} 
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              className="text-blue-501 flex flex-row items-center justify-center p-2 gap-3 rounded-full border-[2px] border-blue-501 w-full"
              onClick={handleUploadClick}
              type="button"
          >
              <img src="images/img_imageuserplus.svg" className="" alt="Upload Icon" />
              <span className="text-[13px]">Upload Photo</span>
          </button>
          </div>
          <div className='flex flex-1 flex-col gap-5'>
            <form onSubmit={handleSubmit1(onSubmit1)} className='flex w-full flex-col gap-5 border-b border-indigo-50 border-solid pb-8'>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    First Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('firstName', { required: {value:true , message: 'First name is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      
                    />
                  </div>
                  {errors1.firstName && <span className="text-sm font-DmSans text-red-500">{errors1.firstName?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Last Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('lastName', { required: {value:true , message: 'Last name is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  {errors1.lastName && <span className="text-sm font-DmSans text-red-500">{errors1.lastName?.message}</span>}
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('email', { required: {value:true , message: 'Email is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="email"
                      name="email"
                      placeholder="Your Email"
                    />
                  </div>
                  {errors1.email && <span className="text-sm font-DmSans text-red-500">{errors1.email?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Phone Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('phoneNumber', { required: {value:true , message: 'Phone Number is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="phoneNumber"
                      placeholder="Your Phone Number"
                    />
                  </div>
                  {errors1.phoneNumber && <span className="text-sm font-DmSans text-red-500">{errors1.phoneNumber?.message}</span>}
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Website
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('website', { required: {value:false , message: 'Website is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="website"
                      placeholder="Enter Website"
                    />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Address
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('address', { required: {value:true , message: 'Address is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                    />
                  </div>
                  {errors1.address && <span className="text-sm font-DmSans text-red-500">{errors1.address?.message}</span>}
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Country
                  </Text>
                  <SimpleSelect id='country' options={allCountries} onSelect={""} searchLabel='Select Country' setSelectedOptionVal={setSelectedCountry} 
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
                  {/* <SelectPicker size="md" data={allCountries}
                  labelKey='name' valueKey='isoCode' value={selectedCountry} onChange={setSelectedCountry}
                        menuClassName="w-auto"
                        className="w-full z-0 !placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18 tracking-wide"
                        placeholder="Select Country"
                        renderMenuItem={(label, item) =>{ return (
                          <div className="flex items-center justify-start space-x-3">
                            <div className="flex flex-col gap-2 justify-center w-full">
                              <Text
                                className="text-gray-801 text-base font-DmSans font-normal leading-5 w-auto"
                                >
                                 {item.name}
                              </Text>
                             </div>
                          </div>
                          );
                        }
                       }/> */}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
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
                  {/* <SelectPicker size="md" data={City.getCitiesOfCountry(selectedCountry)} 
                        valueKey="name" labelKey='name' value={selectedCity} onChange={setSelectedCity}
                        menuClassName="w-auto"
                        className="w-full z-0 !placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18 tracking-wide"
                        placeholder="Select City"
                        renderMenuItem={(label, item) =>{ return (
                          <div className="flex items-center justify-start space-x-3">
                            <div className="flex flex-col gap-2 justify-center w-full">
                              <Text
                                className="text-gray-801 text-base font-DmSans font-normal leading-5 w-auto"
                                >
                                 {item.name}
                              </Text>
                             </div>
                          </div>
                          );
                        }
                       }/> */}
                </div>
              </div>
              {!isForm1Saved? (
                <button
                  className="bg-blue-A400 font-DmSans font-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                  type="submit"
                  >
                      Save
                </button>
            
              ):
              (
                <button
                  className="bg-gray-201 font-DmSans font-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto"
                  type="submit"
                 >
                  <SlCheck size={20} />
                  <span className="text-base text-gray500">Saved</span>
                </button>
              )}
              
            </form>
            <form onSubmit={handleSubmit2(onSubmit2)} className='flex w-full flex-col gap-5 border-b border-indigo-50 border-solid pb-8'>
              <Text
                className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
              >
                Password Setting
              </Text>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Current Password
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register2('currentPassword', { required: {value:true , message: 'Current Password is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="password"
                      name="currentPassword"
                      defaultValue="• • • • • • • •"
                      placeholder="Your Current Password"
                    />
                  </div>
                  {errors2.currentPassword && <span className="text-sm font-DmSans text-red-500">{errors2.currentPassword?.message}</span>}
                </div>  
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    New Password
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register2('newPassword', { required: {value:true , message: 'New Password is required'} })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="password"
                      name="newPassword"
                      defaultValue="• • • • • • • •"
                      placeholder="Your Current Password"
                    />
                  </div>
                  {errors2.newPassword && <span className="text-sm font-DmSans text-red-500">{errors2.newPassword?.message}</span>}
                </div>  
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-auto"
                    size="txtDMSansLablel"
                  >
                    Confirm New Password
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register2('confirmNewPassword', { required: {value:true , message: 'Confirm New Password is required' } , validate: validatePasswordMatch })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="password"
                      name="confirmNewPassword"
                      defaultValue="• • • • • • • •"
                      placeholder="Your Current Password"
                    />
                  </div>
                  {errors2.confirmNewPassword && <span className="text-sm font-DmSans text-red-500">{errors2.confirmNewPassword?.message}</span>}
                </div> 
                {!isForm2Saved? (
                <button
                    className="bg-blue-A400 font-DmSans font-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                    type="submit"
                  >
                    Save
                </button>
              ):
              (
                <button
                  className="bg-gray-201 font-DmSans font-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto"
                  type="submit"
                  >
                  <SlCheck size={20} />
                  <span className="text-base text-gray500">Saved</span>
                </button>
              )}                    
            </form>
            <div className='flex w-full flex-col gap-5 border-b border-indigo-50 border-solid pb-8'>
              <Text
                  className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                >
                  Social Links
              </Text>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-2 items-center'>
                  <AiFillFacebook size={32}/>
                  <Text
                    className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                  >
                    Facebook
                  </Text>
                </div>
                <button
                  className={` ${isConnect ? 'text-red-502 border-red-502 ' : 'text-blue-501 border-blue-501 '} flex flex-row items-center justify-center py-2 px-4 gap-3 rounded-md border-[1.3px]`}
                  type="submit"
                  >
                  <span className="text-sm leading-[18.33px]">
                      {isConnect ? "Disconnected" : "Connect"}
                  </span>
                </button>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-2 items-center'>
                  <AiOutlineInstagram  size={32}/>
                  <Text
                    className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                  >
                    Instagram
                  </Text>
                </div>
                <button
                  className="text-blue-501 flex flex-row items-center justify-center py-2 px-4 gap-3 rounded-md border-[1.3px] border-blue-501"
                  type="submit"
                  >
                  <span className="text-sm leading-[18.33px]">Connect</span>
                </button>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-2 items-center'>
                  <FaSquareXTwitter  size={27}/>
                  <Text
                    className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                  >
                    Twitter (X)
                  </Text>
                </div>
                <button
                  className="text-blue-501 flex flex-row items-center justify-center py-2 px-4 gap-3 rounded-md border-[1.3px] border-blue-501"
                  type="submit"
                  >
                  <span className="text-sm leading-[18.33px]">Connect</span>
                </button>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-left'>
                  <AiFillLinkedin  size={35} className=''/>
                  <Text
                    className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                  >
                    LinkedIn
                  </Text>
                </div>
                <button
                    className={` ${isConnect ? 'text-red-502 border-red-502 ' : 'text-blue-501 border-blue-501 '} flex flex-row items-center justify-center py-2 px-4 gap-3 rounded-md border-[1.3px]`}
                    type="submit"
                  >
                    <span className="text-sm leading-[18.33px]">
                        {isConnect ? "Disconnected" : "Connect"}
                    </span>
                </button>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-2 items-center'>
                  <AiFillYoutube  size={32}/>
                  <Text
                    className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                  >
                    Youtube
                  </Text>
                </div>
                <button
                  className="text-blue-501 flex flex-row items-center justify-center py-2 px-4 gap-3 rounded-md border-[1.3px] border-blue-501"
                  type="submit"
                  >
                  <span className="text-sm leading-[18.33px]">Connect</span>
                </button>
              </div>
              <button
                  className="bg-blue-A400 font-DmSans font-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                  type="submit"
                >
                  Save
              </button>
            </div>
            <form onSubmit={handleSubmit3(onSubmit3)} className='flex w-full flex-col gap-5 border-b border-indigo-50 border-solid pb-8'>
              <Text
                  className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                >
                  Language and Region Settings
              </Text>
              <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-[130px] "
                    size="txtDMSansLablel"
                  >
                    Select Language
                  </Text>
                  <SimpleSelect className='max-w-[40%]' id='language' options={languages} onSelect={""} searchLabel='Search Language' setSelectedOptionVal={setSelectedLanguage} 
                    placeholder="Select Language" valuekey="label"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.label}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                  {/* <SelectPicker size="md" data={languages}
                        value={selectedLanguage} onChange={setSelectedLanguage} valueKey='label'
                        menuClassName="w-auto z-0 !text-gray700"
                        className="w-[40%] z-0 !placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18"
                        placeholder="Select Language"/> */}
              </div>
              <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                  <Text
                    className="text-base text-gray-901 w-[130px]"
                    size="txtDMSansLablel"
                  >
                    Select Region
                  </Text>
                  <SimpleSelect className='max-w-[40%]' id='region' options={regions} onSelect={""} searchLabel='Search Region' setSelectedOptionVal={setSelectedRegion} 
                    placeholder="Select Your Region" valuekey="label"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.label}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                  {/* <SelectPicker size="md" data={regions}
                        valueKey='label' value={selectedRegion} onChange={setSelectedRegion}
                        menuClassName="w-auto"
                        className="w-[40%] z-0 !placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18 tracking-wide"
                        placeholder="Select Your Region"/> */}
              </div>
              {!isForm3Saved? (
                <button
                    className="bg-blue-A400 font-DmSans font-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                    type="submit"
                >
                    Save
                </button>            
                ):
                (
                <button
                  className="bg-gray-201 font-DmSans font-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto"
                  type="submit"
                 >
                  <SlCheck size={20} />
                  <span className="text-base text-gray500">Saved</span>
                </button>
              )}
            </form>
            <div className='flex w-full flex-col gap-5 border-b border-indigo-50 border-solid pb-8'>
              <Text
                  className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full"
                >
                  Delete Your Account
              </Text>
              <Text
                  className="font-DmSans text-base font-normal leading-6 text-blue_gray-601 w-full"
                >
                  By deleting your account, you’ll no longer be able to access your account or log in to Digital Morocco. 
              </Text>
              <button
                  className="bg-blue-A400 text-base text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                  onClick={openDeleteModal}
                  type="button"
              >
                  Delete Account
              </button>

            </div>
          </div>
        </div>
      </div>
      <DeleteAccountModal isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal} 
        />
    </div>
  );
}
