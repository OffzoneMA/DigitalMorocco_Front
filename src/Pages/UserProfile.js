import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../Services/User.Service';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { Text } from '../Components/Text';
import { PiUserBold } from "react-icons/pi";
import SimpleSelect from '../Components/SimpleSelect';
import DeleteAccountModal from '../Components/DeleteAccountModal';
import { Country, City } from 'country-state-city';
import { languages } from '../data/tablesData';
import { regions } from '../data/tablesData';
import { SlCheck } from "react-icons/sl";
import PageHeader from "../Components/PageHeader";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { logout } from "../Redux/auth/authSlice";
import { useGetUserDetailsQuery } from '../Services/Auth';


export default function UserProfile() {
  const { userInfo } = useSelector((state) => state.auth)
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const token = sessionStorage.getItem("userToken");
  const allCountries = Country.getAllCountries();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [name, setName] = useState(userInfo?.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [update, responseUpdate] = useUpdateUserMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(allCountries.find(country => country.name === userData?.country));
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isConnect, setIsConnect] = useState(true);
  const [isForm1Saved, setIsForm1Saved] = useState(false);
  const [isForm2Saved, setIsForm2Saved] = useState(false);
  const [isForm3Saved, setIsForm3Saved] = useState(false);
  const selectedCountryName = selectedCountry ? selectedCountry["name"] : '';
  const selectedCityName = selectedCity ? selectedCity["name"] : '';
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setValue } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, watch, formState: { errors: errors2 } } = useForm();
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();
  const fileInputRef = useRef(null);
  const handleUploadClick = () => { fileInputRef.current.click(); };
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userData)
  // useEffect(() => {
  //   responseUpdate?.error && toast.error("Something went wrong")
  //   if (responseUpdate?.isSuccess) {
  //     toast.success("Edited Successfuly !")
  //     setIsEditing(false)
  //   }
  // }, [responseUpdate.isLoading]);

  useEffect(() => {
    UserInfo();
  }, []);

  const UserInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_baseURL}/users/UserInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const nameParts = data.displayName.split(' ');
      const firstName = nameParts.slice(0, -1).join(' ');
      const lastName = nameParts[nameParts.length - 1];
      const userCountry = data.Country;
      const userCity = data.cityState;
      const language = data.language;
      const region = data.region;
      setUser(data);
      setValue('email', data.email);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      // setValue('country', data.Country);
      setValue('city', data.cityState);
      setValue('phoneNumber', data.phoneNumber);
      setValue('website', data.website);
      setValue('address', data.address);
      setValue('facebook', data.facebookId);
      setValue('instagram', data.instagram);
      setValue('twitter', data.twitter);
      setValue('linkedin', data.linkedinId);
      setValue('language', data.language);
      setValue('region', data.region);

      setSelectedCountry(userCountry);
      setSelectedCity(userCity);
      setSelectedLanguage(language);
      setSelectedRegion(region);
      toast.success("Edited Successfuly !")


    } catch (error) {
      responseUpdate?.error && toast.error("Something went wrong")
      console.error("Error fetching User:", error);
    }
  };


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

  const onSubmit1 = async (data) => {
    try {
      const updatedFields = {};
      const currentData = userData || {};

      if (data.firstName && data.lastName) {
        const displayName = `${data.firstName} ${data.lastName}`;
        if (displayName !== currentData.displayName) {
          updatedFields.displayName = displayName;
        }
      }

      if (data.email && data.email !== currentData.email) {
        updatedFields.email = data.email;
      }

      if (data.phoneNumber && data.phoneNumber !== currentData.phoneNumber) {
        updatedFields.phoneNumber = data.phoneNumber;
      }

      if (data.website && data.website !== currentData.website) {
        updatedFields.website = data.website;
      }

      if (data.address && data.address !== currentData.address) {
        updatedFields.address = data.address;
      }

      if (selectedCountryName && selectedCountryName !== currentData.country) {
        updatedFields.country = selectedCountryName;
      }

      if (selectedCityName && selectedCityName !== currentData.cityState) {
        updatedFields.cityState = selectedCityName;
      }

      const fields = ['facebook', 'instagram', 'twitter', 'linkedin', 'language', 'region'];
      fields.forEach(field => {
        if (data[field] && data[field] !== currentData[field]) {
          updatedFields[field] = data[field];
        }
      });

      if (selectedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = async () => {
          const base64Image = reader.result;
          if (base64Image !== currentData.image) {
            updatedFields.image = base64Image;
          }
          if (Object.keys(updatedFields).length > 0) {
            const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, updatedFields, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            const updatedUserData = response.data.user;
            sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
            setIsForm1Saved(true);
            console.log("Data saved successfully!");
          } else {
            console.log("No changes to save.");
          }
        };
      } else {
        if (Object.keys(updatedFields).length > 0) {
          const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, updatedFields, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const updatedUserData = response.data.user;
          sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
          setIsForm1Saved(true);
          console.log("Data saved successfully!");
        } else {
          console.log("No changes to save.");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };



  // const onSubmit1 = (data) => {
  //   const formData = new FormData();
  //   Object.keys(data).forEach((key) => {
  //     formData.append(key, data[key]);
  //   });
  //   formData.append('country', selectedCountry);
  //   formData.append('city', selectedCity);
  //   if (selectedImage) {
  //     formData.append('image', selectedImage);
  //   }
  //   setIsForm1Saved(true);
  // };


  const onSubmit2 = async (data) => {
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/changePassword`, passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const userResponse = await axios.get(`${process.env.REACT_APP_baseURL}/users/UserInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.data) {
          const updatedUserData = userResponse.data;

          sessionStorage.setItem('userData', JSON.stringify(updatedUserData));

          setIsForm2Saved(true);
          console.log("Password changed and user data updated successfully!");
        } else {
          console.error("Error fetching updated user data.");
        }
      } else {
        console.error("Error changing password:", response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const onSubmit3 = async () => {
    const formData = {};

    if (selectedLanguage && selectedLanguage.label) {
      formData.language = selectedLanguage.label;
    }

    if (selectedRegion && selectedRegion.label) {
      formData.region = selectedRegion.label;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_baseURL}/users/${userId}/languageRegion`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        setIsForm3Saved(true);
        console.log("Language and region updated successfully!");

        const updatedUserData = {
          ...userData,
          ...formData,
        };
        setUser(response?.data?.user);

        // Mettre à jour les informations de l'utilisateur dans la session
        sessionStorage.setItem("userData", JSON.stringify(response?.data?.user));
      } else {
        console.error("Error updating language and region:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating language and region:", error);
    }
  };


  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);

  };

  const handleDeleteAccount = async (email, password) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_baseURL}/users/${userId}`, {
        data: { email, password },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200) {
        console.log('Account successfully deleted');
        closeDeleteModal();
        navigate("/SignIn");
        dispatch(logout());
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader >
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
                userData?.image ? (
                  <img src={userData.image} alt="User" className='w-full h-full rounded-full object-cover' />
                ) : (
                  <PiUserBold size={64} className='text-blue-501' />
                )
              )}

            </div>
            <input ref={fileInputRef} type="file" id="imageUpload"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button className="text-blue-501 hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] flex flex-row items-center justify-center p-2 gap-3 rounded-full border-[2px] border-blue-501 w-full"
              onClick={handleUploadClick} type="button" >
              <img src="/images/img_imageuserplus.svg" className="" alt="Upload Icon" />
              <span className="text-[13px]">
                Upload Photo
              </span>
            </button>
          </div>
          <div className='flex flex-1 flex-col gap-5'>
            <form onSubmit={handleSubmit1(onSubmit1)} className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    First Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('firstName')}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text" name="firstName" placeholder="First Name" />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Last Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('lastName')}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text" name="lastName" placeholder="Last Name" />
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('email')}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="email" name="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Phone Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('phoneNumber')}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text" name="phoneNumber" placeholder="Your Phone Number" />
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                {userData?.role === "member" && (
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      Website
                    </Text>
                    <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                      <input
                        {...register1('website')}
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text" name="website" placeholder="Enter Website" />
                    </div>
                  </div>
                )}
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Address
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      {...register1('address')}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text" name="address" placeholder="Enter Address" />
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Country
                  </Text>
                  <SimpleSelect
                    id='country'
                    options={allCountries}
                    onSelect={""}
                    searchLabel='Select Country'
                    setSelectedOptionVal={setSelectedCountry}
                    selectedOptionsDfault={userData?.country ? allCountries.find(country => country.name === userData.country) : ""}
                    placeholder={selectedCountry ? selectedCountry : "Select Country"}
                    valuekey="name"
                    content={(option) => {
                      return (
                        <div className="flex py-2 items-center w-full">
                          <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                            {option.name}
                          </Text>
                        </div>
                      );
                    }}
                  />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    City/State
                  </Text>
                  <SimpleSelect
                    id='city'
                    options={selectedCountry ? City.getCitiesOfCountry(selectedCountry['isoCode']) : []}
                    onSelect={""}
                    searchLabel='Select City'
                    selectedOptionsDfault={userData?.cityState ? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === userData?.cityState) : ""}
                    setSelectedOptionVal={setSelectedCity}
                    placeholder={"Select City"}
                    valuekey="name"
                    content={(option) => {
                      return (
                        <div className="flex py-2 items-center w-full">
                          <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                            {option.name}
                          </Text>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              {!isForm1Saved ? (
                <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto" type="submit">
                  Save
                </button>
              ) : (
                <button className="bg-gray-201 font-dm-sans-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit">
                  <SlCheck size={20} />
                  <span className="text-base text-gray500">Saved</span>
                </button>
              )}
            </form>

            <form onSubmit={handleSubmit2(onSubmit2)} className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full" >
                Password Setting </Text>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  Current Password </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <input {...register2('currentPassword',
                    { required: { value: true, message: 'Current Password is required' } })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="password" name="currentPassword" defaultValue="• • • • • • • •"
                    placeholder="Your Current Password" />
                </div>
                {errors2.currentPassword && <span className="text-sm font-DmSans text-red-500">
                  {errors2.currentPassword?.message}</span>} </div>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  New Password </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <input {...register2('newPassword',
                    { required: { value: true, message: 'New Password is required' } })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="password" name="newPassword" defaultValue="• • • • • • • •"
                    placeholder="Your Current Password" /> </div>
                {errors2.newPassword && <span className="text-sm font-DmSans text-red-500">
                  {errors2.newPassword?.message}</span>} </div>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  Confirm New Password </Text>
                <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                  <input {...register2('confirmNewPassword',
                    {
                      required: { value: true, message: 'Confirm New Password is required' },
                      validate: validatePasswordMatch
                    })}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="password" name="confirmNewPassword" defaultValue="• • • • • • • •"
                    placeholder="Your Current Password" /> </div>
                {errors2.confirmNewPassword && <span className="text-sm font-DmSans text-red-500">
                  {errors2.confirmNewPassword?.message}</span>} </div>
              {!isForm2Saved ?
                (
                  <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto" type="submit" >
                    Save </button>
                ) : (
                  <button className="bg-gray-201 font-dm-sans-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                    <SlCheck size={20} /> <span className="text-base text-gray500">Saved</span> </button>
                )
              }
            </form>

            <form onSubmit={handleSubmit3(onSubmit3)}
              className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full" >
                Language and Region Settings </Text>
              <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-[130px] " size="txtDMSansLablel" >
                  Select Language </Text>
                <SimpleSelect className='max-w-[40%]' id='language' options={languages} onSelect={""}
                  searchLabel='Search Language' setSelectedOptionVal={setSelectedLanguage}
                  selectedOptionsDfault={userData?.language? languages.find(lang => lang.label === userData.language) : ""}
                  placeholder={"Select Language"}
                  valuekey="label"
                  content={(option) => {
                    return (<div className="flex  py-2 items-center  w-full">
                      <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto" >
                        {option.label} </Text> </div>);
                  }} />
              </div> <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-[130px]" size="txtDMSansLablel" >
                  Select Region </Text>
                <SimpleSelect className='max-w-[40%]' id='region'
                  options={regions} onSelect={""} searchLabel='Search Region'
                  setSelectedOptionVal={setSelectedRegion}
                  selectedOptionsDfault={userData?.region? regions.find(region => region.label === userData.region) : ""}
                  placeholder={"Select Your Region"}
                  valuekey="label"
                  content={(option) => {
                    return (
                      <div className="flex  py-2 items-center  w-full">
                        <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto" >
                          {option.label} </Text> </div>);
                  }} />
              </div>
              {!isForm3Saved ? (
                <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto" type="submit" >
                  Save </button>
              ) : (
                <button className="bg-gray-201 font-dm-sans-medium text-gray500 flex flex-row md:h-auto items-center gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                  <SlCheck size={20} /> <span className="text-base text-gray500">
                    Saved</span> </button>
              )
              } 
            </form>

            <div className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-DmSans text-base font-medium leading-6 text-gray-900 w-full" >
                Delete Your Account </Text>
              <Text className="font-dm-sans-regular text-base leading-6 text-blue_gray-601 w-full" >
                By deleting your account, you’ll no longer be able to access your account or log in to Digital Morocco.
              </Text>
              <button className="bg-blue-A400 text-base text-white-A700 flex flex-row md:h-auto items-center mr-auto py-2 px-10 rounded-md w-auto"
                onClick={openDeleteModal} type="button" >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteAccountModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} handleDeleteAccount={handleDeleteAccount} />
    </div>
  );
}