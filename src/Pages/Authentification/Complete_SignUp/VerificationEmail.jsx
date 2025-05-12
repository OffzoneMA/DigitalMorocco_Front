import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Text } from "../../../Components/Text";
import { authApi } from "../../../Services/Auth";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import logo from "../../../Media/img_logo.svg";
import verifyImage from "../../../Media/img_verify.svg";
import checkVerifyImg from "../../../Media/check-verified-02.svg";
import EmailExistModalOrConfirmation from "../../../Components/Modals/EmailExistModalOrConfirmation";
import { logout } from "../../../Redux/auth/authSlice";
import { useDispatch } from "react-redux";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

export default function VerificationEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const { userEmail } = useSelector((state) => state.auth);
  const [User, setUser] = useState(userInfo);
  const [sendLoding, setSendLoding] = useState(false);
  const [userTrigger, { data: userData, error: userError, isLoading }] =
    authApi.endpoints.getUserByEmail.useLazyQuery();
  const [trigger, { data, status, isSuccess, error: sendError }] =
    authApi.endpoints.sendEmailVerification.useLazyQuery();

  /**
   * Current Language
   */
  const currentLanguage = localStorage.getItem("language") || "en";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkAccountVerification = async () => {
      let userEmail = userInfo?.email;
      // If userInfo is not defined, try getting it from sessionStorage
      if (!userEmail) {
        const storedUserData = localStorage.getItem("userEmail");
        if (storedUserData) {
          userEmail = storedUserData;
        }
      }
      if (userEmail) {
        try {
          const payload = await userTrigger(userEmail);
          if (
            payload?.isSuccess &&
            (payload?.data?.status === "verified" ||
              payload?.data?.status === "pending")
          ) {
            setTimeout(() => {
              if (!payload?.data?.role) {
                // sessionStorage.setItem('firtSession' , true)
                // navigate('/ChooseRole');
                dispatch(logout());
                sessionStorage.clear();
                window.location.href = `https://digitalmorocco.net?lang=${currentLanguage}`;
              } else {
                // Perform logout and navigate
                dispatch(logout());
                window.location.href = `https://digitalmorocco.net?lang=${currentLanguage}`;
              }
            }, 2000);
          }
        } catch (error) {
          console.error("Error checking account verification:", error);
        }
      }
    };

    checkAccountVerification();

    const interval = setInterval(() => {
      checkAccountVerification();
    }, 3000);

    return () => clearInterval(interval);
  }, [userInfo, navigate]);

  const handleResendEmail = async () => {
    try {
      await userTrigger(userInfo?.email).then((payload) => {
        if (payload?.isSuccess) {
          setSendLoding(true);
          trigger({
            userId: userInfo?._id,
            lang: localStorage.getItem("language"),
          }).then((response) => {
            if (response.isSuccess) {
              setSendLoding(false);
              openModal();
            }
          });
        }
      });
    } catch (error) {
      console.error("Resend email request failed:", error);
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     openModal();
  //   }
  //   if (sendError && sendError?.data?.name === "CastError") {
  //     console.log(sendError)
  //   }

  // }, [isSuccess , sendError])

  return (
    <>
      <HelmetWrapper
        title={t(`helmet.verification.Email.title`)}
        description={t(`helmet.verification.Email.description`)}
        keywords={t(`helmet.verification.Email.keywords`)}
        canonical={`${import.meta.env.VITE_URL}/VerificationEmail`}
      />
      <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-start mx-auto md:py-[60px] md:px-10 px-3 py-[30px] overflow-y-auto w-full">
        <div className=" flex flex-col gap-[42px] items-center justify-start mb-[77px] w-full">
          <a
            href="https://digitalmorocco.net"
            target="_blank"
            className="flex flex-col items-center justify-center w-full"
          >
            <img className="h-[50px] w-[183px]" src={logo} alt="logo" />
          </a>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-6 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
            <Toaster />
            <div className="flex flex-col items-center justify-start w-auto">
              <img
                className="h-[235px] w-[256px]"
                src={verifyImage}
                alt="logo"
              />
            </div>
            <Text className="text-[22px] font-dm-sans-medium text-gray-901 leading-8 w-auto">
              {t("verifyEmailMsg")}
            </Text>
            <div className="flex flex-col gap-9 items-center justify-start w-full">
              <Text className="leading-[26.00px] md:px-4 font-dm-sans-medium text-base text-[#667085] text-center">
                <>{t("verification.instructions")}</>
              </Text>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className={`flex cursorpointer ${
                    sendLoding || isLoading
                      ? "disabled bg-gray-202 "
                      : "bg-[#EDF7FF] hover:bg-gray-202"
                  } flex-row h-[52px] items-center justify-center px-6 rounded-[26px] text-base font-dm-sans-medium text-[#00CDAE] w-full`}
                >
                  {sendLoding || isLoading
                    ? t("all.sending")
                    : t("resetEmail.resendEmail")}
                </button>
                <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                  <Text className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto">
                    {t("resetEmail.signInTrouble")}
                  </Text>
                  <a href="mailto:support@digitalmorocco.net">
                    <Text className=" text-deep_purple-A400 hover:text-[#00CDAE] leading-[26px] font-dm-sans-bold text-sm w-auto cursorpointer">
                      {t("resetEmail.contactSupport")}
                    </Text>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmailExistModalOrConfirmation
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        content={
          <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
            <img
              className="h-[80px] w-[80px]"
              src={checkVerifyImg}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <Text className="leading-[26.00px] font-dm-sans-medium text-[18px] text-gray-801 text-center ">
                {t("verification.confirmTitle")}
              </Text>
              <Text className="leading-[26.00px] font-dm-sans-regular  text-gray-801 text-center text-sm">
                <>{t("verification.confirmMsg")}</>
              </Text>
            </div>
          </div>
        }
      />
    </>
  );
}
