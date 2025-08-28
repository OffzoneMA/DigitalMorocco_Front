import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { useUpdateUserMutation } from '../../Services/User.Service';
import { useForm } from 'react-hook-form';
import { Text } from '../../Components/Text';
import { PiUserBold } from "react-icons/pi";
import SimpleSelect from '../../Components/common/SimpleSelect';
import DeleteAccountModal from '../../Components/Modals/DeleteAccountModal';
import { languages } from '../../data/tablesData';
import { regions } from '../../data/tablesData';
import { SlCheck } from "react-icons/sl";
import PageHeader from "../../Components/common/PageHeader";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../Redux/auth/authSlice";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';
import { useGetUserDetailsQuery } from '../../Services/Auth';
import { validateImageFile } from '../../data/helper';
import { countries as allCountries } from '../../data/tablesData';
import HelmetWrapper from '../../Components/common/HelmetWrapper';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';

export default function UserProfile() {
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en';
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const token = sessionStorage.getItem("userToken");
  // const allCountries = Country.getAllCountries();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(userData?.country ? allCountries.find(country => country.name === userData?.country) : null);
  const [selectedCity, setSelectedCity] = useState(userData?.cityState ? userData?.cityState : '');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [isForm1Saved, setIsForm1Saved] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isForm2Saved, setIsForm2Saved] = useState(false);
  const [isForm3Saved, setIsForm3Saved] = useState(false);
  const [error, setError] = useState('');
  const selectedCountryName = selectedCountry ? selectedCountry["name"] : '';
  const selectedCityName = selectedCity ? selectedCity["name"] : '';
  const fileInputRef = useRef(null);
  const handleUploadClick = () => { fileInputRef.current.click(); };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasSubmitted1, setHasSubmitted1] = useState(false);
  const [hasSubmitted2, setHasSubmitted2] = useState(false);
  const [hasSubmitted3, setHasSubmitted3] = useState(false);
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setValue, trigger } = useForm({
    mode: hasSubmitted1 ? "onChange" : "onSubmit",
  });
  const { register: register2, handleSubmit: handleSubmit2, watch, formState: { errors: errors2 }, getValues: getValues2 } = useForm({
    mode: hasSubmitted2 ? "onChange" : "onSubmit",
  });
  const { handleSubmit: handleSubmit3 } = useForm({
    mode: hasSubmitted3 ? "onChange" : "onSubmit",
  });
  const [requiredFields1, setRequiredFields1] = useState({
    country: false,
    city: false,
  });
  const [requiredFields3, setRequiredFields3] = useState({
    region: false,
    language: false
  });
  const [form1Sending, setForm1Sending] = useState(false);
  const [form2Sending, setForm2Sending] = useState(false);
  const [form3Sending, setForm3Sending] = useState(false);

  const { refetch } = useGetUserDetailsQuery();

  // useEffect(() => {
  //   if (userData?.country && Array.isArray(allCountries)) {
  //     const country = allCountries.find(country => country.name === userData.country) || null;
  //     setSelectedCountry(country);
  //   }
  //   if(userData?.cityState) {
  //     setSelectedCity(userData.cityState);
  //   }
  //   if(userData?.region) {
  //     setSelectedRegion(userData.region);
  //   }
  //   if(userData?.language) {
  //     setSelectedLanguage(languages.find(lang => lang.label === userData?.language));
  //   }
  // }, [userData, allCountries]);


  useEffect(() => {
    if (hasSubmitted1) {
      const isCountryValid = selectedCountry !== null;
      const isCityValid = (selectedCity !== '' && selectedCity !== undefined);

      setRequiredFields1({
        country: !isCountryValid,
        city: !isCityValid,
      });

    }
  }, [hasSubmitted1, selectedCountry, selectedCity]);

  useEffect(() => {
    if (hasSubmitted3) {
      const isRegionValid = (selectedRegion !== null && selectedRegion !== undefined && selectedRegion !== '');
      const isLanguageValid = (selectedLanguage !== null && selectedLanguage !== undefined && selectedLanguage !== '');

      setRequiredFields3({
        region: !isRegionValid,
        language: !isLanguageValid
      });

    }
  }, [hasSubmitted3, selectedRegion, selectedLanguage]);

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_baseURL}/users/UserInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const nameParts = data.displayName.split(' ');
        const firstName = nameParts?.slice(0, -1).join(' ');
        const lastName = nameParts[nameParts.length - 1];
        const userCity = data.cityState;
        const language = languages.find(lang => lang.label === data.language)
        const region = data.region;
        setValue('email', data.email);
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        if (data?.country) {
          const foundCountry = allCountries.find(
            country => country.name.toLowerCase() === data?.country.toLowerCase()
          );
          setSelectedCountry(foundCountry);
        }
        if (data?.cityState) {
          setSelectedCity(userCity);

        }
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
        setSelectedLanguage(language);
        setSelectedRegion(region);

      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    UserInfo();
  }, [token, setValue]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!validateImageFile(file)) return
      // If validations pass
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const newPassword = watch("newPassword", "");

  watch("currentPassword", "");
  watch("confirmNewPassword", "");

  const validatePassword = (value) => {
    return {
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{}:;\\|,.<>/?~`]/.test(value),
      hasDigit: /\d/.test(value),
      minLength: value.length >= 8,
    };
  };

  const newPasswordValidation = validatePassword(newPassword);

  const validatePasswordMatch = (value) => {
    const password = watch('newPassword');
    return password === value || "Passwords do not match.";
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validatePhoneNumber = (value) => {
    if (typeof value === 'string' && value !== '') {
      const phoneNumber = parsePhoneNumberFromString(value);

      if (!phoneNumber) {
        return 'Invalid phone number';
      }

      if (!phoneNumber.isValid()) {
        return 'Invalid phone number for the selected country';
      }

      return true;
    }
  };

  const onSubmit1 = async (data) => {
    setForm1Sending(true);
    try {
      const formData = new FormData();
      const currentData = userData || {};

      // Append basic fields to formData
      if (data.firstName && data.lastName) {
        const displayName = `${data.firstName} ${data.lastName}`;
        if (displayName !== currentData.displayName) {
          formData.append('displayName', displayName);
          formData.append('firstName', data.firstName);
          formData.append('lastName', data.lastName);
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

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await axios.put(`${process.env.REACT_APP_baseURL}/users/${userId}/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUserData = response.data.user;
      sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
      setIsForm1Saved(true);
      refetch();
      setForm1Sending(false);
      setPreview(null);
      setSelectedImage(null);
      setTimeout(() => {
        setIsForm1Saved(false);
      }, 5000);
      console.log("Data saved successfully!");

    } catch (error) {
      setForm1Sending(false);
      setHasSubmitted1(false);
      console.error("Error saving data:", error);
    }
  };

  const handleForm1Submit = async (e) => {
    e.preventDefault();
    setHasSubmitted1(true);

    // Déclencher la validation de tous les champs
    const formIsValid = await trigger();
    // Vérifier la validité des champs country et city
    const isCountryValid = (selectedCountry !== null && selectedCountry !== undefined);
    // const isCityValid = (selectedCity !== null && selectedCity !== undefined && selectedCity !== '');

    setRequiredFields1({
      country: !isCountryValid,
      // city: !isCityValid,
    });


    // Si tout est valide, soumettre le formulaire
    if (formIsValid && isCountryValid) {
      handleSubmit1(onSubmit1)(e);
    }
  };

  const onSubmit2 = async (data) => {
    setForm2Sending(true);
    setHasSubmitted2(true);
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
          setForm2Sending(false);
          setTimeout(() => {
            setIsForm2Saved(false);
          }, 5000);
          console.log("Password changed and user data updated successfully!");
        } else {
          setForm2Sending(false);
          console.error("Error fetching updated user data.");
        }
      } else {
        console.error("Error changing password:", response.data.message);
      }
    } catch (error) {
      setForm2Sending(false);
      setHasSubmitted2(false);
      console.error("Error changing password:", error);
    }
  };

  const onSubmit3 = async () => {
    const formData = {};
    setHasSubmitted3(true);
    if (selectedLanguage && selectedLanguage.label && selectedLanguage.label !== userData?.language) {
      formData.language = selectedLanguage.label;
    }

    if (selectedRegion && selectedRegion.label && selectedRegion.label !== userData?.region) {
      formData.region = selectedRegion.label;
    }

    // if (Object.keys(formData).length === 0) {
    //   console.log("No changes detected.");
    //   return; 
    // }

    if ((selectedRegion !== null && selectedRegion !== undefined && selectedRegion !== '') && (selectedLanguage !== null && selectedLanguage !== undefined && selectedLanguage !== '')) {
      try {
        setForm3Sending(true);
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
          setForm3Sending(false);
          setTimeout(() => {
            setIsForm3Saved(false);
          }, 5000);
          console.log("Language and region updated successfully!");

          //change language
          const newLanguage = selectedLanguage?.id;
          i18n.changeLanguage(newLanguage);
          localStorage.setItem('language', newLanguage);

          // const updatedUserData = {
          //   ...userData,
          //   ...formData,
          // };
          refetch();
          sessionStorage.setItem("userData", JSON.stringify(response?.data?.user));
        } else {
          setForm3Sending(false);
          console.error("Error updating language and region:", response.data.message);
        }
      } catch (error) {
        setForm3Sending(false);
        setHasSubmitted3(false);
        console.error("Error updating language and region:", error);
      }
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAccount = async (email, password) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_baseURL}/users/${userId}`, {
        data: { email, password },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Account successfully deleted');
        closeDeleteModal();
        navigate("/SignIn");
        dispatch(logout());
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.error('An error occurred:', error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setError('');
  };

  const handleRemoveLogo = async () => {
    try {
      // Réinitialiser l'aperçu et l'image sélectionnée
      setPreview(null);
      setSelectedImage(null);

      // Vérifier si l'utilisateur a une image existante
      if (userData?.image && preview === null) {
        const response = await axios.put(
          `${process.env.REACT_APP_baseURL}/users/`,
          { image: null }, // Envoyer l'image comme null dans le payload JSON
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Type JSON pour la requête
            },
          }
        );
        //Mettre à jour les données utilisateur dans le stockage de session
        const updatedUserData = response.data;
        sessionStorage.setItem("userData", JSON.stringify(updatedUserData));

        // Recharger les données utilisateur via une fonction refetch
        refetch();
      }
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
    }
  };

  const handleMouseEnter = () => {
    setShowLogoDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowLogoDropdown(false);
  };

  return (
    <>
      <HelmetWrapper
        title={t('helmet.userProfile.title')}
        description={t('helmet.userProfile.description')}
        keywords={t('helmet.userProfile.keywords')}
        canonical={`${process.env.REACT_APP_URL}/UserProfile`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader >
                {t('settings.myProfile.title')}
              </PageHeader>
            </div>
          </div>
          <div className="flex flex-col  md:flex-row items-center md:items-start w-full py-6 gap-8">
            <div className='flex flex-col gap-4 w-[200px] 2xl:w-[240px] 3xl:w-[270px] items-center'>
              <div className={`relative flex w-full h-[200px] 2xl:h-[240px] 3xl:h-[270px] rounded-full items-center justify-center ${(preview || userData?.image) ? '' : 'bg-light_blue-100'}`}
                onClick={handleUploadClick}>
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
                        <path d="M21 10.5V13.6C21 15.8402 21 16.9603 20.564 17.816C20.1805 18.5686 19.5686 19.1805 18.816 19.564C17.9603 20 16.8402 20 14.6 20H7.4C5.15979 20 4.03969 20 3.18404 19.564C2.43139 19.1805 1.81947 18.5686 1.43597 17.816C1 16.9603 1 15.8402 1 13.6V8.4C1 6.15979 1 5.03969 1.43597 4.18404C1.81947 3.43139 2.43139 2.81947 3.18404 2.43597C4.03969 2 5.15979 2 7.4 2H11.5M18 7V1M15 4H21M15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11Z" stroke="#EDF7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {showLogoDropdown &&
                      <div className="absolute top-[100%] right-0 translate-x-[15px] flex flex-col z-10">
                        <div className="flex mt-1 flex-col bg-white-A700 border-[0.5px] border-[#2575F01A] rounded-[8px] p-[16px] shadow-roleCardbs z-10">
                          <div className="w-auto group h-9 py-[5px] px-[6px] justify-start items-center gap-3 inline-flex"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUploadClick()
                            }}>
                            <span>
                              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6347 7.09536C12.4495 8.83529 11.4636 10.4658 9.83228 11.4076C7.12196 12.9724 3.65628 12.0438 2.09147 9.33348L1.9248 9.04481M1.36344 5.90467C1.54864 4.16474 2.5345 2.53426 4.16582 1.59241C6.87615 0.0276043 10.3418 0.95623 11.9066 3.66655L12.0733 3.95523M1.32812 10.544L1.81616 8.72267L3.63753 9.21071M10.3609 3.78934L12.1823 4.27737L12.6703 2.45601" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t('common.change')}</div>
                          </div>
                          <div className="w-auto group h-9 py-[5px] px-[6px] justify-start items-center gap-3 inline-flex"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveLogo()
                            }}>
                            <span>
                              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1.5H9M1 3.5H13M11.6667 3.5L11.1991 10.5129C11.129 11.565 11.0939 12.0911 10.8667 12.49C10.6666 12.8412 10.3648 13.1235 10.0011 13.2998C9.58798 13.5 9.06073 13.5 8.00623 13.5H5.99377C4.93927 13.5 4.41202 13.5 3.99889 13.2998C3.63517 13.1235 3.33339 12.8412 3.13332 12.49C2.90607 12.0911 2.871 11.565 2.80086 10.5129L2.33333 3.5M5.66667 6.5V9.83333M8.33333 6.5V9.83333" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div className="text-[#1d2838] group-hover:text-[#2575F0] transition-colors duration-300">{t('common.delete')}</div>
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
              <button className="icon-container cursorpointer text-blue-501 hover:bg-[#235DBD] active:bg-[#224a94] hover:text-[#EDF7FF] flex flex-row items-center justify-center p-2 gap-3 rounded-full border-[2px] border-blue-501 w-full"
                onClick={handleUploadClick} type="button" >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.625 6V0.75M13 3.375H18.25M18.25 9.5V14.05C18.25 15.5201 18.25 16.2552 17.9639 16.8167C17.7122 17.3107 17.3107 17.7122 16.8167 17.9639C16.2552 18.25 15.5201 18.25 14.05 18.25H4.95C3.47986 18.25 2.74479 18.25 2.18327 17.9639C1.68935 17.7122 1.28778 17.3107 1.03611 16.8167C0.75 16.2552 0.75 15.5201 0.75 14.05V4.95C0.75 3.47986 0.75 2.74479 1.03611 2.18327C1.28778 1.68935 1.68935 1.28778 2.18327 1.03611C2.74479 0.75 3.47986 0.75 4.95 0.75H9.5M0.877522 16.4355C1.28802 14.9588 2.64245 13.875 4.25 13.875H10.375C11.1881 13.875 11.5947 13.875 11.9328 13.9423C13.3212 14.2184 14.4066 15.3038 14.6827 16.6922C14.75 17.0303 14.75 17.4369 14.75 18.25M11.25 7.3125C11.25 9.2455 9.683 10.8125 7.75 10.8125C5.817 10.8125 4.25 9.2455 4.25 7.3125C4.25 5.3795 5.817 3.8125 7.75 3.8125C9.683 3.8125 11.25 5.3795 11.25 7.3125Z" stroke="#2575F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[13px]">
                  {t('settings.myProfile.uploadPhoto')}
                </span>
              </button>
            </div>
            <div className='flex flex-1 flex-col gap-5'>
              <form action="" className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
                <div className='flex flex-row w-full gap-5'>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="firstName" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.firstName')}
                    </Text>
                    <input
                      {...register1('firstName', { required: { value: true } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.firstName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text" name="firstName" id='firstName' placeholder={t('settings.myProfile.firstNamePlaceholder')} />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="lastName" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.lastName')}
                    </Text>
                    <input
                      {...register1('lastName', { required: { value: true } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.lastName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text" name="lastName" id='lastName' placeholder={t('settings.myProfile.lastNamePlaceholder')} />
                  </div>
                </div>
                <div className='flex flex-row w-full gap-5'>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="email" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.email')}
                    </Text>
                    <input
                      {...register1('email', {
                        required: { value: true },
                        minLength: {
                          value: 2,
                        },
                        maxLength: {
                          value: 120,
                        },
                        validate: (value) => isEmail(value) || 'Email invalide',
                      })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.email ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="email" name="email" id='email' placeholder={t('settings.myProfile.emailPlaceholder')} />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="phoneNumber" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.phoneNumber')}
                    </Text>
                    <input
                      {...register1('phoneNumber',
                        {
                          required: { value: false },
                          validate: validatePhoneNumber
                        })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.phoneNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text" name="phoneNumber" id='phoneNumber' placeholder={t('settings.myProfile.phoneNumberPlaceholder')} />
                  </div>
                </div>
                <div className='flex flex-row w-full gap-5'>
                  {/* {userData?.role === "member" && ( */}
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="website" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.website')}
                    </Text>
                    <input
                      {...register1('website', {
                        required: false,
                        validate: (value) => {
                          if (!value) return true; // champ vide accepté
                          return isURL(value, {
                            require_protocol: true,
                          }) || "URL invalide (ex : https://exemple.com)";
                        }
                      })}

                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.website ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text" name="website" id='website' placeholder={t('settings.myProfile.websitePlaceholder')} />
                  </div>
                  {/* )} */}
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text htmlFor="address" className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.address')}
                    </Text>
                    <input
                      {...register1('address', { required: { value: false } })}
                      className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors1?.address ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                      type="text" name="address" id='address' placeholder={t('settings.myProfile.addressPlaceholder')} />
                  </div>
                </div>
                <div className='flex flex-row w-full gap-5'>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                      {t('settings.myProfile.country')}
                    </Text>
                    <SimpleSelect
                      id='country'
                      options={allCountries}

                      searchLabel={t("common.searchCountry")}
                      setSelectedOptionVal={setSelectedCountry}
                      selectedOptionsDfault={selectedCountry}
                      placeholder={t('settings.myProfile.countryPlaceholder')} required={requiredFields1.country}
                      valuekey="name"
                      content={(option) => {
                        return (
                          <div className="flex py-2 items-center w-full">
                            <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                              {t(option.name)}
                            </span>
                          </div>
                        );
                      }}
                    />
                  </div>
                  {/* <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text className="text-base text-gray-901 w-auto" size="txtDMSansLablel">
                  {t('settings.myProfile.cityState')}
                  </Text>
                  <SimpleSelect
                    id='city'
                    options={selectedCountry  ? City.getCitiesOfCountry(selectedCountry?.['isoCode']) : userData?.cityState ? City.getCitiesOfCountry(selectedCountry?.['isoCode']) : []}
                    
                    searchLabel={t("common.searchCity")}
                    selectedOptionsDfault={userData?.cityState ? City.getCitiesOfCountry(selectedCountry?.['isoCode'])?.find(country => country.name === userData?.cityState) : ""}
                    setSelectedOptionVal={setSelectedCity}
                    placeholder={t('settings.myProfile.cityStatePlaceholder')}
                    valuekey="name" required={requiredFields1.city}
                    content={(option) => {
                      return (
                        <div className="flex py-2 items-center w-full">
                          <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">
                            {option.name}
                          </span>
                        </div>
                      );
                    }}
                  />
                </div> */}
                </div>
                {isForm1Saved ? (
                  <button disabled className="bg-gray-201 cursorpointer font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit">
                    <SlCheck size={20} />
                    <span className="text-base text-gray500">{t("common.saved")}</span>
                  </button>
                ) : form1Sending ? (
                  <button
                    type="button"
                    disabled={true}
                    className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto">
                    {t("all.sending")}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )
                  : (
                    <button
                      type="submit"
                      onClick={handleForm1Submit}
                      className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto">
                      {t('settings.myProfile.save')}
                    </button>
                  )}
              </form>
              <form onSubmit={handleSubmit2(onSubmit2)} className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
                <h1 className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
                  {t('settings.myProfile.passwordSetting')}
                </h1>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text htmlFor="currentPassword" className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                    {t('settings.myProfile.currentPassword')}
                  </Text>
                  <div className="relative w-full">
                    <input {...register2('currentPassword',
                      {
                        required: { value: true, message: 'Current Password is required' },
                      })}
                      type={showCurrentPassword ? "text" : "password"}
                      style={{ appearance: 'none' }}
                      className={`${!showCurrentPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white-A700 w-full border border-solid ${errors2?.currentPassword ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-[6px] px-[12px] py-[10px] ${errors2?.currentPassword ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[14px] ${errors2?.currentPassword ? 'text-errorColor' : 'text-[#1d2939]'}`}
                      name="currentPassword"
                      id="currentPassword"
                      placeholder={t('settings.myProfile.currentPasswordPlaceholder')}
                    />
                    {/* {getValues2('currentPassword') && getValues2('currentPassword')?.length > 0 &&  */}
                    <button
                      type="button"
                      className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                      onClick={toggleCurrentPasswordVisibility}
                    >
                      {showCurrentPassword ? (
                        <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B" />
                        </svg>
                      )}
                    </button>
                    {/* } */}
                  </div>
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text htmlFor="newPassword" className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                    {t('settings.myProfile.newPassword')} </Text>
                  <div className="relative w-full">
                    <input {...register2('newPassword',
                      {
                        required: { value: true, message: 'New Password is required' },
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters long'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=~`{}[\]:;"'<>,.?/])[A-Za-z\d!@#$%^&*()\-_+=~`{}[\]:;"'<>,.?/]{8,}$/,
                        },
                        validate: value => value !== '• • • • • • • •'
                      })}
                      type={showPassword ? "text" : "password"}
                      style={{ appearance: 'none' }}
                      className={`${!showPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white-A700 w-full border border-solid ${errors2?.newPassword ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-[6px] px-[12px] py-[10px] ${errors2?.newPassword ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[14px] ${errors2?.newPassword ? 'text-errorColor' : 'text-[#1d2939]'}`}
                      name="newPassword"
                      id="newPassword"
                      placeholder={t('settings.myProfile.newPasswordPlaceholder')}
                    />
                    {/* {getValues2('newPassword')?.length > 0 &&  */}
                    <button
                      type="button"
                      className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B" />
                        </svg>
                      )}
                    </button>
                    {/* } */}
                  </div>
                  {((errors2?.newPassword || newPasswordValidation.minLength || newPasswordValidation.hasLowerCase || newPasswordValidation.hasUpperCase || newPasswordValidation.hasDigit) && getValues2('newPassword') !== '• • • • • • • •') &&
                    <>
                      <span className=''>
                        <ul style={{ listStyle: "none", paddingLeft: 0 }} className='flex flex-wrap items-center gap-4 mt-1' >
                          <li className={`text-[#555458] items-center justify-start text-xs flex ${errors2.newPassword?.type === 'minLength' ? 'error' : 'valid'}`}>
                            {!newPasswordValidation.minLength || getValues2('newPassword') === '' ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472" />
                              </svg>
                            )}
                            <span className='ml-1'>
                              {t('signup.passwordMinLengthVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs justify-start items-center flex ${errors2.newPassword?.type === "hasLowerCase" ? "error" : "valid"}`}>
                            {!newPasswordValidation.hasLowerCase || getValues2('newPassword') === '' ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472" />
                              </svg>
                            )}
                            <span className='ml-1'>
                              {t('signup.passwordLowerCaseVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors2.newPassword?.type === "hasUpperCase" ? "error" : "valid"}`}>
                            {!newPasswordValidation.hasUpperCase || getValues2('newPassword') === '' ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472" />
                              </svg>
                            )}
                            <span className='ml-1'>
                              {t('signup.passwordUpperCaseVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors2.newPassword?.type === "hasSpecialChar" ? "error" : "valid"}`}>
                            {!newPasswordValidation.hasSpecialChar || getValues2('newPassword') === '' ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472" />
                              </svg>
                            )}
                            <span className='ml-1'>
                              {t('signup.SpecialCharVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors2.newPassword?.type === "hasDigit" ? "error" : "valid"}`}>
                            {!newPasswordValidation.hasDigit || getValues2('newPassword') === '' ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472" />
                              </svg>
                            )}
                            <span className='ml-1'>
                              {t('signup.number')}
                            </span>
                          </li>
                        </ul>
                      </span>
                      {/* <span className="text-errorColor font-dm-sans-regular text-sm mt-1">
                    { getValues('password') !=='' && getPasswordErrorMessage()}
                    </span> */}
                    </>
                  }
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start  w-full`}>
                  <Text htmlFor="confirmNewPassword" className="text-base text-gray-901 w-auto" size="txtDMSansLablel" >
                    {t('settings.myProfile.confirmNewPassword')} </Text>
                  <div className="relative w-full">
                    <input {...register2('confirmNewPassword',
                      {
                        required: { value: true, message: 'Confirm New Password is required' },
                        validate: validatePasswordMatch
                      })}
                      type={showPasswordConfirm ? "text" : "password"}
                      style={{ appearance: 'none' }}
                      className={`${!showPasswordConfirm ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white-A700 w-full border border-solid ${errors2?.confirmNewPassword ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-[6px] px-[12px] py-[10px] ${errors2?.confirmNewPassword ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[14px] ${errors2?.confirmNewPassword ? 'text-errorColor' : 'text-[#1d2939]'}`}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      placeholder={t('settings.myProfile.confirmNewPasswordPlaceholder')} />
                    {/* {getValues2('confirmNewPassword')?.length > 0 &&  */}
                    <button
                      type="button"
                      className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                      onClick={togglePasswordConfirmVisibility}
                    >
                      {showPasswordConfirm ? (
                        <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B" />
                        </svg>
                      )}
                    </button>
                    {/* } */}
                  </div>
                </div>
                {isForm2Saved ?
                  (
                    <button disabled className="bg-gray-201 cursorpointer font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                      <SlCheck size={20} /> <span className="text-base text-gray500">{t("common.saved")}</span>
                    </button>
                  ) : form2Sending ? (
                    <button className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto" type="button"
                      disabled={true} >
                      {t("all.sending")}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) :
                    (
                      <button className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto" type="submit" >
                        {t('settings.myProfile.save')}
                      </button>
                    )
                }
              </form>
              <form onSubmit={handleSubmit3(onSubmit3)}
                className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
                <h1 className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
                  {t('settings.myProfile.languageAndRegionSettings')}
                </h1>
                <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                  <Text className={`text-base text-gray-901 ${currentLanguage === 'fr' ? 'w-[170px]' : 'w-[130px]'}`} size="txtDMSansLablel" >
                    {t('settings.myProfile.selectLanguage')} </Text>
                  <SimpleSelect className='max-w-[40%]' id='language' options={languages}
                    searchLabel={t('settings.myProfile.searchLanguage')} setSelectedOptionVal={setSelectedLanguage}
                    selectedOptionsDfault={userData?.language ? languages.find(lang => lang.label === userData.language) : ""} required={requiredFields3.language}
                    placeholder={t('settings.myProfile.selectLanguage')}
                    valuekey="label"
                    content={(option) => {
                      return (
                        <div className="flex  py-2 items-center  w-full">
                          <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto" >
                            {t(option.label)}
                          </span>
                        </div>);
                    }} />
                </div>
                <div className={`flex flex-row gap-14 items-center justify-start  w-full`}>
                  <Text className={`text-base text-gray-901 ${currentLanguage === 'fr' ? 'w-[170px]' : 'w-[130px]'}`} size="txtDMSansLablel" >
                    {t('settings.myProfile.selectRegion')}</Text>
                  <SimpleSelect className='max-w-[40%]' id='region'
                    options={regions} searchLabel={t('settings.myProfile.searchRegion')}
                    setSelectedOptionVal={setSelectedRegion}
                    selectedOptionsDfault={userData?.region ? regions.find(region => region.label === userData.region) : ""}
                    placeholder={t('settings.myProfile.selectRegionPlaceholder')} required={requiredFields3.region}
                    valuekey="label"
                    content={(option) => {
                      return (
                        <div className="flex py-2 items-center  w-full">
                          <span className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto" >
                            {t(option.label)}
                          </span>
                        </div>);
                    }} />
                </div>
                {isForm3Saved ? (
                  <button disabled className="bg-gray-201 cursorpointer font-dm-sans-medium text-gray500 flex flex-row h-[44px] items-center justify-center min-w-[140px] gap-3 mr-auto py-2 px-7 rounded-md w-auto" type="submit" >
                    <SlCheck size={20} /> <span className="text-base text-gray500">
                      {t("common.saved")}</span>
                  </button>
                ) : form3Sending ? (
                  <button
                    className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto"
                    type="button"
                    disabled={true}
                  >
                    {t("all.sending")}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) :
                  (
                    <button
                      onClick={() => setHasSubmitted3(true)}
                      className="bg-blue-A400 cursorpointer hover:bg-[#235DBD] active:bg-[#224a94] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[140px] mr-auto py-2 px-10 rounded-md w-auto"
                      type="submit"
                    // disabled = {!isForm3Valid}
                    >
                      {t('settings.myProfile.save')}
                    </button>
                  )
                }
              </form>

              <div className='flex w-full flex-col gap-5 border-b border-gray-201 border-solid pb-8'>
                <h1 className="font-dm-sans-medium text-base leading-6 text-[#101828] w-full" >
                  {t('settings.myProfile.deleteYourAccount')}
                </h1>
                <p className="font-dm-sans-regular text-base leading-6 text-blue_gray-601 w-full" >
                  {t('settings.myProfile.deleteAccountMessage')}
                </p>
                <button className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base text-white-A700 flex flex-row h-[44px] items-center justify-center min-w-[178px] mr-auto py-2 px-5 rounded-md w-auto cursorpointer"
                  onClick={openDeleteModal} type="button" >
                  {t('settings.myProfile.deleteAccount')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <DeleteAccountModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} handleDeleteAccount={handleDeleteAccount} error={error} />
      </section>
    </>
  );
}