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
import { parsePhoneNumberFromString } from 'libphonenumber-js';

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
  const [selectedCountry, setSelectedCountry] = useState(allCountries.find(country => country.name === userData?.country) || null);
  const [selectedCity, setSelectedCity] = useState(userData?.cityState || null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isConnect, setIsConnect] = useState(true);
  const [showLogoDropdown , setShowLogoDropdown] = useState(false);
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
  const [isForm1Valid, setIsForm1Valid] = useState(true);
  const [hasSubmitted1, setHasSubmitted1] = useState(false);
  const [requiredFields1, setRequiredFields1] = useState({
    country: false,
    city: false,
  });

  useEffect(() => {
    if (hasSubmitted1 ) {
      const isCountryValid = selectedCountry !== null;
      const isCityValid = selectedCity !== null;
      const isValid = isCountryValid && isCityValid ;
  
      setRequiredFields1({
        country: !isCountryValid,
        city: !isCityValid,
      });
  
      setIsForm1Valid(isValid);
    }
}, [hasSubmitted1 ,selectedCountry, selectedCity]);


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

  // const onSubmit1 = async (data) => {
  //   try {
  //     const updatedFields = {};
  //     const currentData = userData || {};

  //     if (data.firstName && data.lastName) {
  //       const displayName = `${data.firstName} ${data.lastName}`;
  //       if (displayName !== currentData.displayName) {
  //         updatedFields.displayName = displayName;
  //       }
  //     }

  //     if (data.email && data.email !== currentData.email) {
  //       updatedFields.email = data.email;
  //     }

  //     if (data.phoneNumber && data.phoneNumber !== currentData.phoneNumber) {
  //       updatedFields.phoneNumber = data.phoneNumber;
  //     }

  //     if (data.website && data.website !== currentData.website) {
  //       updatedFields.website = data.website;
  //     }

  //     if (data.address && data.address !== currentData.address) {
  //       updatedFields.address = data.address;
  //     }

  //     if (selectedCountryName && selectedCountryName !== currentData.country) {
  //       updatedFields.country = selectedCountryName;
  //     }

  //     if (selectedCityName && selectedCityName !== currentData.cityState) {
  //       updatedFields.cityState = selectedCityName;
  //     }

  //     const fields = ['facebook', 'instagram', 'twitter', 'linkedin', 'language', 'region'];
  //     fields.forEach(field => {
  //       if (data[field] && data[field] !== currentData[field]) {
  //         updatedFields[field] = data[field];
  //       }
  //     });

  //     if(isForm1Valid) {
  //       if (selectedImage) {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(selectedImage);
  //         reader.onloadend = async () => {
  //           const base64Image = reader.result;
  //           if (base64Image !== currentData.image) {
  //             updatedFields.image = base64Image;
  //           }
  //           if (Object.keys(updatedFields).length > 0) {
  //             const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, updatedFields, {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //                 'Content-Type': 'application/json',
  //               },
  //             });
  //             const updatedUserData = response.data.user;
  //             sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
  //             setIsForm1Saved(true);
  //             console.log("Data saved successfully!");
  //           } else {
  //             console.log("No changes to save.");
  //           }
  //         };
  //       } else {
  //         if (Object.keys(updatedFields).length > 0) {
  //           const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, updatedFields, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json',
  //             },
  //           });
  //           const updatedUserData = response.data.user;
  //           sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
  //           setIsForm1Saved(true);
  //           console.log("Data saved successfully!");
  //         } else {
  //           console.log("No changes to save.");
  //         }
  //       }
  //     }

  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };

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

  const onSubmit1 = async (data) => {
    try {
      const formData = new FormData();
      const currentData = userData || {};
  
      // Append basic fields to formData
      if (data.firstName && data.lastName) {
        const displayName = `${data.firstName} ${data.lastName}`;
        if (displayName !== currentData.displayName) {
          formData.append('displayName', displayName);
          formData.append('firstName' , data.firstName);
          formData.append('lastName' , data.lastName);
        }
      }
  
      if (data.email && data.email !== currentData.email) {
        formData.append('email', data.email);
      }
  
      if (data.phoneNumber && data.phoneNumber !== currentData.phoneNumber) {
        formData.append('phoneNumber', data.phoneNumber);
      }
  
      if (data.website && data.website !== currentData.website) {
        formData.append('website', data.website);
      }
  
      if (data.address && data.address !== currentData.address) {
        formData.append('address', data.address);
      }
  
      if (selectedCountryName && selectedCountryName !== currentData.country) {
        formData.append('country', selectedCountryName);
      }
  
      if (selectedCityName && selectedCityName !== currentData.cityState) {
        formData.append('cityState', selectedCityName);
      }
  
      const fields = ['facebook', 'instagram', 'twitter', 'linkedin', 'language', 'region'];
      fields.forEach(field => {
        if (data[field] && data[field] !== currentData[field]) {
          formData.append(field, data[field]);
        }
      });
  
      // Check for image and append it
      if (selectedImage) {
        formData.append('image', selectedImage); // No need for base64 encoding, just append the image file
      }
      if(isForm1Valid) {
        // Check if there are any changes to save
        if (formData.has('displayName') || formData.has('email') || formData.has('phoneNumber') || formData.has('website') ||
            formData.has('address') || formData.has('country') || formData.has('cityState') || formData.has('image') ||
            fields.some(field => formData.has(field))) {

          // Send formData with axios
          const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
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

  const handleRemoveLogo = () => {
    setPreview(null);
    setSelectedImage(null);
  }
  
  const handleMouseEnter = () => {
    setShowLogoDropdown(true);
  };
  
  const handleMouseLeave = () => {
    setShowLogoDropdown(false);
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
            <div className={`relative flex w-full h-[180px] 2xl:h-[220px] 3xl:w-[250px] rounded-full items-center justify-center ${(preview || userData?.image) ? '' : 'bg-light_blue-100'}`}>
              {preview ? (
                <img src={preview} alt="Uploaded" className='w-full h-full rounded-full ' />
              ) : (
                userData?.image ? (
                  <img src={userData.image} alt="User" className='w-full h-full rounded-full ' />
                ) : (
                  <PiUserBold size={64} className='text-blue-501' />
                )
              )}
              {(preview || userData?.image) && (
                <div className='absolute  flex items-center justify-center h-[22px] icon-container1' 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                  <div className='w-auto relative '>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10.5V13.6C21 15.8402 21 16.9603 20.564 17.816C20.1805 18.5686 19.5686 19.1805 18.816 19.564C17.9603 20 16.8402 20 14.6 20H7.4C5.15979 20 4.03969 20 3.18404 19.564C2.43139 19.1805 1.81947 18.5686 1.43597 17.816C1 16.9603 1 15.8402 1 13.6V8.4C1 6.15979 1 5.03969 1.43597 4.18404C1.81947 3.43139 2.43139 2.81947 3.18404 2.43597C4.03969 2 5.15979 2 7.4 2H11.5M18 7V1M15 4H21M15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11Z" stroke="#EDF7FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  {showLogoDropdown &&
                    <div className="absolute top-[100%] right-0 translate-x-[15px] flex flex-col z-10">
                      <div className="flex mt-1 flex-col bg-white-A700 border-[0.5px] border-[#2575F01A] rounded-[8px] p-[16px] shadow-roleCardbs z-10">
                        <div className="w-auto group h-9 py-[5px] px-[6px] justify-start items-center gap-3 inline-flex" 
                        onClick={handleUploadClick}>
                          <span>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.6347 7.09536C12.4495 8.83529 11.4636 10.4658 9.83228 11.4076C7.12196 12.9724 3.65628 12.0438 2.09147 9.33348L1.9248 9.04481M1.36344 5.90467C1.54864 4.16474 2.5345 2.53426 4.16582 1.59241C6.87615 0.0276043 10.3418 0.95623 11.9066 3.66655L12.0733 3.95523M1.32812 10.544L1.81616 8.72267L3.63753 9.21071M10.3609 3.78934L12.1823 4.27737L12.6703 2.45601" stroke="#2575F0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </span>
                          <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">Change</div>
                        </div>
                        <div className="w-auto group h-9 py-[5px] px-[6px] justify-start items-center gap-3 inline-flex" 
                        onClick={handleRemoveLogo}>
                          <span>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 1.5H9M1 3.5H13M11.6667 3.5L11.1991 10.5129C11.129 11.565 11.0939 12.0911 10.8667 12.49C10.6666 12.8412 10.3648 13.1235 10.0011 13.2998C9.58798 13.5 9.06073 13.5 8.00623 13.5H5.99377C4.93927 13.5 4.41202 13.5 3.99889 13.2998C3.63517 13.1235 3.33339 12.8412 3.13332 12.49C2.90607 12.0911 2.871 11.565 2.80086 10.5129L2.33333 3.5M5.66667 6.5V9.83333M8.33333 6.5V9.83333" stroke="#2575F0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </span>
                          <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">Delete</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" id="imageUpload"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button className="icon-container cursorpointer-green text-blue-501 hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] flex flex-row items-center justify-center p-2 gap-3 rounded-full border-[2px] border-blue-501 w-full"
              onClick={handleUploadClick} type="button" >
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.625 6V0.75M13 3.375H18.25M18.25 9.5V14.05C18.25 15.5201 18.25 16.2552 17.9639 16.8167C17.7122 17.3107 17.3107 17.7122 16.8167 17.9639C16.2552 18.25 15.5201 18.25 14.05 18.25H4.95C3.47986 18.25 2.74479 18.25 2.18327 17.9639C1.68935 17.7122 1.28778 17.3107 1.03611 16.8167C0.75 16.2552 0.75 15.5201 0.75 14.05V4.95C0.75 3.47986 0.75 2.74479 1.03611 2.18327C1.28778 1.68935 1.68935 1.28778 2.18327 1.03611C2.74479 0.75 3.47986 0.75 4.95 0.75H9.5M0.877522 16.4355C1.28802 14.9588 2.64245 13.875 4.25 13.875H10.375C11.1881 13.875 11.5947 13.875 11.9328 13.9423C13.3212 14.2184 14.4066 15.3038 14.6827 16.6922C14.75 17.0303 14.75 17.4369 14.75 18.25M11.25 7.3125C11.25 9.2455 9.683 10.8125 7.75 10.8125C5.817 10.8125 4.25 9.2455 4.25 7.3125C4.25 5.3795 5.817 3.8125 7.75 3.8125C9.683 3.8125 11.25 5.3795 11.25 7.3125Z" stroke="#2575F0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
                  <input
                    {...register1('firstName', { required: {value:true } })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.firstName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="firstName" placeholder="First Name" />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Last Name
                  </Text>
                  <input
                    {...register1('lastName', { required: {value:true } })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.lastName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Email
                  </Text>
                  <input
                    {...register1('email', { 
                      required: {value:true } ,
                      minLength: {
                          value: 2,
                        },
                        maxLength: {
                          value: 120,
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        }, })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.email ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="email" name="email" placeholder="Your Email" />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Phone Number
                  </Text>
                  <input
                    {...register1('phoneNumber', 
                      { required: {value:false } , 
                        validate: validatePhoneNumber
                      })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.phoneNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="phoneNumber" placeholder="Your Phone Number" />
                </div>
              </div>
              <div className='flex flex-row w-full gap-5'>
                {/* {userData?.role === "member" && ( */}
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Website
                  </Text>
                  <input
                    {...register1('website', { required: {value:false } })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="website" placeholder="Enter Website" />
                </div>
                {/* )} */}
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                    Address
                  </Text>
                  <input
                    {...register1('address' , { required: {value:false } })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.address ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="address" placeholder="Enter Address" />
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
                    searchLabel='Search Country'
                    setSelectedOptionVal={setSelectedCountry}
                    selectedOptionsDfault={userData?.country ? allCountries.find(country => country.name === userData.country) : ""}
                    placeholder={selectedCountry ? selectedCountry : "Select Country"} required={requiredFields1.country}
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
                    searchLabel='Search City'
                    selectedOptionsDfault={userData?.cityState ? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === userData?.cityState) : ""}
                    setSelectedOptionVal={setSelectedCity}
                    placeholder={"Select City"}
                    valuekey="name" required={requiredFields1.city}
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
                <button 
                onClick={() => setHasSubmitted1(true)}
                className="bg-blue-A400 cursorpointer-green hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto" type="submit">
                  Save
                </button>
              ) : (
                <button className="bg-gray-201 cursorpointer-green font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit">
                  <SlCheck size={20} />
                  <span className="text-base text-gray500">Saved</span>
                </button>
              )}
            </form>

            <form onSubmit={handleSubmit2(onSubmit2)} className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
                Password Setting </Text>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  Current Password </Text>
                <input {...register2('currentPassword',
                  { required: { value: true, message: 'Current Password is required' } })}
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors2?.currentPassword ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  type="password" name="currentPassword" defaultValue="• • • • • • • •"
                  placeholder="Your Current Password" />
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  New Password </Text>
                <input {...register2('newPassword',
                  { required: { value: true, message: 'New Password is required' } ,
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                  } })}
                  className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors2?.newPassword ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                  type="password" name="newPassword" defaultValue="• • • • • • • •"
                  placeholder="Your Current Password" /> 
              </div>
              <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                  Confirm New Password </Text>
                  <input {...register2('confirmNewPassword',
                    {
                      required: { value: true, message: 'Confirm New Password is required' },
                      validate: validatePasswordMatch
                    })}
                    className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors2?.confirmNewPassword ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="password" name="confirmNewPassword" defaultValue="• • • • • • • •"
                    placeholder="Your Current Password" />
              </div>
              {!isForm2Saved ?
                (
                  <button className="bg-blue-A400 cursorpointer-green hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto" type="submit" >
                    Save </button>
                ) : (
                  <button className="bg-gray-201 cursorpointer-green font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                    <SlCheck size={20} /> <span className="text-base text-gray500">Saved</span> </button>
                )
              }
            </form>

            <form onSubmit={handleSubmit3(onSubmit3)}
              className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
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
                <button className="bg-blue-A400 cursorpointer-green hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto" type="submit" >
                  Save </button>
              ) : (
                <button className="bg-gray-201 cursorpointer-green font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                  <SlCheck size={20} /> <span className="text-base text-gray500">
                    Saved</span> </button>
              )
              } 
            </form>

            <div className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
              <Text className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
                Delete Your Account </Text>
              <Text className="font-dm-sans-regular text-base leading-6 text-blue_gray-601 w-full" >
                By deleting your account, you’ll no longer be able to access your account or log in to Digital Morocco.
              </Text>
              <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[178px] mr-auto py-2 px-5 rounded-md w-auto cursorpointer-green"
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