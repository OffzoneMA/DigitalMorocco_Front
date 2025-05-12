import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../Components/Text";
import { authApi } from "../../../Services/Auth";
import {
  useVerifyOTPMutation,
  useSendOTPMutation,
} from "../../../Services/Auth";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../../../Media/img_logo.svg";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

export default function VerificationCode() {
  const { t } = useTranslation();

  const { userInfo } = useSelector((state) => state.auth);
  const { userEmail } = useSelector((state) => state.auth);
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const [sendOtp, { isLoading: isSendingOTP }] = useSendOTPMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  async function onSubmit(values) {
    const updatedValues = { ...values, email: userEmail };
    console.log(updatedValues);
    verifyOTP(updatedValues);
    navigate("/ChooseRole");
  }

  const handleSendOtp = async () => {
    try {
      const { data } = await sendOtp(userEmail);
      console.log(data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <HelmetWrapper
        title={t(`helmet.verification.Code.title`)}
        description={t(`helmet.verification.Code.description`)}
        keywords={t(`helmet.verification.Code.keywords`)}
        canonical={`${import.meta.env.VITE_URL}/VerificationCode`}
      />
      <div className="bg-gray-100 flex flex-col font-DmSans items-center justify-start mx-auto md:py-[60px] md:px-10 px-3 py-[30px] w-full min-h-screen overflow-y-auto">
        <div className="flex flex-col gap-[42px] items-center justify-start mb-[39px]  w-full">
          <a
            href="https://digitalmorocco.net"
            target="_blank"
            className="flex flex-col items-center justify-center w-full"
          >
            <img className="h-[50px] w-[183px]" src={logo} alt="logo" />
          </a>
          <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 max-w-[520px] w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <img
                className="h-[235px] w-[256px]"
                src="/images/img_verify.svg"
                alt="logo"
              />
            </div>
            <Text
              className="md:text-[22px] text-black-900 text-lg w-auto"
              size="txtDMSansMedium22Black900"
            >
              {t("verifyEmail")}
            </Text>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-9 items-center justify-start w-full"
            >
              <div className="flex flex-col items-center justify-start w-full">
                <Text
                  className="leading-[26.00px] max-w-[456px] md:max-w-full text-base text-blue_gray-500 text-center"
                  size="txtDMSansMedium16Bluegray500"
                >
                  {t("verification.instructions")}
                </Text>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-full">
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      {t("verification.verificationCode")}
                    </Text>
                    <div
                      className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${
                      errors?.fullName ? "red-400" : ""
                    }  
                    ${
                      errors?.fullName
                        ? "border-red-500"
                        : "border-blue_gray-100"
                    }`}
                    >
                      <input
                        {...register("code", {
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: /^\d{6}$/,
                            message: t("verification.codeErrorMessage"),
                          },
                        })}
                        id="code"
                        name="code"
                        placeholder={t("verification.enterCodePlaceholder")}
                        className={`leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto 
                      text-left text-sm tracking-[0.14px] w-full bg-transparent border-0 `}
                        type="text"
                      ></input>
                    </div>
                    {errors?.code?.message && (
                      <span className="text-red-400 text-sm">
                        {errors?.code?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex sm:flex-row flex-col gap-6 items-start justify-between py-2 w-full">
                    <div
                      className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto w-full items-center justify-center sm:px-7 px-10 py-[13px] rounded-[26px] cursorpointer "
                      onClick={() => onButtonClick(formButtonRef)}
                    >
                      <button
                        ref={formButtonRef}
                        type="submit"
                        className="text-base text-white-A700 w-auto"
                        size="font-dm-sans-medium"
                      >
                        {t("verification.verifyButton")}
                      </button>
                      {isVerifyingOTP ? (
                        <FaSpinner className="animate-spin h-6 w-6 text-white-A700" />
                      ) : (
                        <img
                          className="h-6 w-6"
                          src="/images/img_arrowright.svg"
                          alt="arrowright"
                        />
                      )}
                    </div>
                    <div className="bg-blue-50 flex flex-row gap-6 h-[52px] md:h-auto w-full items-center justify-center sm:px-8 px-12 py-[13px] rounded-[26px] ">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className=" text-teal-A700 leading-[normal] rounded-[26px] text-base text-center w-full"
                        size="p-[15px]"
                      >
                        {t("verification.resendButton")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                <Text className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto">
                  {t("forgot.havingTroubleSigningIn")}
                </Text>
                <a href="mailto:support@digitalmorocco.net">
                  <Text className=" text-deep_purple-A400 hover:text-[#00CDAE] leading-[26px] font-dm-sans-bold text-sm w-auto cursorpointer">
                    {t("resetEmail.contactSupport")}
                  </Text>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
