import React, {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { BiError } from "react-icons/bi";

const DeleteAccountModal = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.handleDeleteAccount(email, password);
    };
    return (
        <ModalProvider
        appElement={document.getElementById("root")}
        className="m-auto w-[65%] md:w-[50%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%]"
        overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
        {...props}
      >
        <form onSubmit={handleSubmit} className="max-h-[97vh] overflow-y-auto w-full md:w-full">
          <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm rounded-[10px] w-full">
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-row w-full gap-2 items-center">
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9998 7.99999V12M11.9998 16H12.0098M10.6151 2.89171L2.39019 17.0983C1.93398 17.8863 1.70588 18.2803 1.73959 18.6037C1.769 18.8857 1.91677 19.142 2.14613 19.3088C2.40908 19.5 2.86435 19.5 3.77487 19.5H20.2246C21.1352 19.5 21.5904 19.5 21.8534 19.3088C22.0827 19.142 22.2305 18.8857 22.2599 18.6037C22.2936 18.2803 22.0655 17.8863 21.6093 17.0983L13.3844 2.89171C12.9299 2.10654 12.7026 1.71396 12.4061 1.58211C12.1474 1.4671 11.8521 1.4671 11.5935 1.58211C11.2969 1.71396 11.0696 2.10655 10.6151 2.89171Z" stroke="#E02D3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text" name="email" placeholder="Your email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className={`flex flex-row gap-14 items-center justify-start pt-3 w-full`}>
                  <Text className="text-base text-[#1D1C21] w-[100px]" size="txtDMSansLablel">Password</Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                    <input
                      className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="password" name="password" placeholder="Your Password"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-end w-full pt-3 justify-end">
                <div className="flex space-x-3 md:space-x-5 w-auto">
                  <button onClick={props.onRequestClose} type="reset" className="flex items-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 py-2 md:py-3 px-2 md:px-5 font-dm-sans-medium text-base leading-5 tracking-normal rounded-md">Cancel</button>
                  <button type="submit" className="flex items-center ml-auto bg-red-501 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-dm-sans-medium text-base leading-5 tracking-normal rounded-md">Delete account</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalProvider>
    )
}
export default DeleteAccountModal;