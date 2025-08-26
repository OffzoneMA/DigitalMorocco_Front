import React from "react";
import userdefaultProfile from '../../Media/User.png'

const TeamMemberItem = ({ imageSrc, name, job }) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-start">
      {imageSrc ?
        <img
          className="h-[62px] object-cover rounded-md w-[62px]"
          src={imageSrc}
          alt="avatar"
        /> :
        <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
          <img src={userdefaultProfile} alt="" className="" />
        </div>}
      <div className="flex flex-col gap-1.5 items-start justify-center w-full overflow-hidden">
        <p
          className="font-dm-sans-regular leading-6 text-[#101828] text-sm w-auto capitalize"
        >
          {name}
        </p>
        <p
          className="text-blue_gray-301 font-dm-sans-regular text-xs leading-5 w-auto"
        >
          {job}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberItem;