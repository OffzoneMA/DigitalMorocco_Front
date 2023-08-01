import React, { useEffect, useState } from 'react';
import EmailVerify from './Complete_SignUp/EmailVerify';
import Role from './Complete_SignUp/Role';
import { useSelector } from 'react-redux';
import { authApi } from '../../Services/Auth';


const ContinueSignUp = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [UserStatus, setUserStatus] = useState(userInfo?.status)
    useEffect(() => {
      setUserStatus(userInfo?.status)
    }, [userInfo?.status])

  return (
    <div className="items-center border-5 flex-wrap md:space-y-8 p-7 py-12">
      <div className="flex flex-col md:flex-row  gap-24  md:gap-4 md:min-h-[350px]">
        <EmailVerify UserStatus={UserStatus} UserId={userInfo?._id}  />
        <Role UserStatus={UserStatus} UserId={userInfo?._id} />
      </div>
    </div>
  );
};

export default ContinueSignUp;
