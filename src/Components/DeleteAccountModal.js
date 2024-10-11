import React, {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";

const DeleteAccountModal = (props) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false); 
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   props.handleDeleteAccount(email, password);
    // };
    
    const onSubmit = async (data) => {
      await props?.handleDeleteAccount(data.new_email, data.new_password);
    };

    const newPassword = watch("new_password", "");

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };


    return (
        <ModalProvider
        appElement={document.getElementById("root")}
        className="m-auto w-[95%] max-w-[640px]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[97vh] w-full md:w-full">
          <div className="bg-white-A700 border border-gray-500_33 max-h-[97vh] overflow-y-auto border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-row w-full gap-2 items-center">
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9998 7.99999V12M11.9998 16H12.0098M10.6151 2.89171L2.39019 17.0983C1.93398 17.8863 1.70588 18.2803 1.73959 18.6037C1.769 18.8857 1.91677 19.142 2.14613 19.3088C2.40908 19.5 2.86435 19.5 3.77487 19.5H20.2246C21.1352 19.5 21.5904 19.5 21.8534 19.3088C22.0827 19.142 22.2305 18.8857 22.2599 18.6037C22.2936 18.2803 22.0655 17.8863 21.6093 17.0983L13.3844 2.89171C12.9299 2.10654 12.7026 1.71396 12.4061 1.58211C12.1474 1.4671 11.8521 1.4671 11.5935 1.58211C11.2969 1.71396 11.0696 2.10655 10.6151 2.89171Z" stroke="#E02D3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Text className="font-dm-sans-medium text-[20px] leading-6 text-[#E02D3C] w-full">Are you sure you want to delete your account?</Text>
              </div>
              <Text className="font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left w-full">
                After submitting this form, you have 14 days to log back into your account to restore it before it’s <span className="font-dm-sans-medium">permanently deleted.</span>
              </Text>
              <div className="flex flex-col w-full gap-3">
                <Text className="font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left w-full">The following will be deleted as well:</Text>
                <ul className="list-disc list-inside space-y-2 font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left">
                  <li>All your data, investors, and contact info</li>
                  <li>All uploaded documents</li>
                  <li>All your event tickets</li>
                </ul>
                <Text className="font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left w-full">Enter your email and password if you want to proceed:</Text>
                <div className={`flex flex-row gap-14 items-center justify-start pt-3 w-full`}>
                  <Text className="text-base text-[#1D1C21] w-[100px]" size="txtDMSansLablel">Email</Text>
                  <input
                    {...register('new_email', 
                      { required: "Email is required" ,
                      minLength: {
                          value: 2,
                        },
                        maxLength: {
                          value: 120,
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      },})}
                    className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${(errors?.new_email || getValues('new_email')?.length > 0 && (props?.error == 'User not found')) ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                    type="text" name="new_email" placeholder="Your email" autoComplete='off'
                  />
                </div>
                <div className={`flex flex-row gap-14 items-center justify-start pt-3 w-full`}>
                  <Text className="text-base text-[#1D1C21] w-[100px]" size="txtDMSansLablel">Password</Text>
                  <div className="relative w-full">
                      <input
                        {...register('new_password', { required: "Password is required" })}
                        id="new_password"
                        name="new_password"
                        autoComplete='off'
                        type={showPassword ? "text" : "password"}
                        placeholder="Your Password"
                        style={{ appearance: 'none' }}
                        className={`${!showPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white-A700 w-full  border border-solid ${(errors?.new_password || (getValues('new_password')?.length > 0 && (props?.error == 'Incorrect password'))) ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-[6px] px-[12px] py-[10px] h-[40px] ${(errors?.new_password || (getValues('new_password')?.length > 0 && (props?.error == 'Incorrect password'))) ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder-text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${(errors?.new_password || (getValues('new_password')?.length > 0 && (props?.error == 'Incorrect password' ) )) ? 'errorColor' : 'gray-801'}`}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>                           
                        ) : (
                          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B"/>
                          </svg>                            
                        )}
                      </button>
                    </div>
                </div>
              </div>
              <div className="flex items-end w-full pt-3 justify-end">
                <div className="flex space-x-3 md:space-x-5 w-auto">
                  <button onClick={props.onRequestClose} type="reset" className="flex items-center justify-center cursorpointer-green bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 py-2 md:py-3 px-2 md:px-5 font-dm-sans-medium text-base leading-5 tracking-normal rounded-md">Cancel</button>
                  <button type="submit" className="flex items-center justify-center cursorpointer-green ml-auto bg-[#EF4352] hover:bg-[#F02A3C] text-white-A700 py-2 md:py-3 px-2 md:px-5 font-dm-sans-medium text-base leading-5 tracking-normal rounded-md">Delete account</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalProvider>
    )
}
export default DeleteAccountModal;