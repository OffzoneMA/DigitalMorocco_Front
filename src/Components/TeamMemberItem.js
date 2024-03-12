import React from "react";
import { Text } from "./Text";

const TeamMemberItem = ({imageSrc, name , job}) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-start">
      <img
        className="h-[62px] md:h-auto object-cover rounded-md w-[62px]"
        src={imageSrc}
        alt="avatar"
      />
      <div className="flex flex-col gap-1.5 items-start justify-center w-full overflow-hidden">
        <Text
          className="font-DmSans font-normal leading-6 text-gray-900 text-sm w-auto"
        >
          {name}
        </Text>
        <Text
          className="text-blue_gray-300 font-DmSans text-xs font-normal leading-5 w-auto"
        >
          {job}
        </Text>
      </div>
    </div>
  );
};

export default TeamMemberItem;