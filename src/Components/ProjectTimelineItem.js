import React from "react";
import {Text} from "./Text";
const ProjectTimelineItem = ({isFirstItem=false, time, text}) => {
  return (
    <div className="flex flex-row gap-4 md:h-auto items-end justify-center w-full">
      <Text
        className={`${isFirstItem? "text-blue_gray-100" :"text-blue_gray-800_01" }  text-right text-sm w-1/6`}
        size={`${isFirstItem? "txtDMSansRegular14Bluegray100" :"txtDMSansRegular14Bluegray80001"}`}
      >
        {time}
      </Text>
      <div className="flex flex-1 flex-row gap-4 items-end">
        {isFirstItem ? (
          <img
            className="w-3.5"
            src="images/img_reply_blue_gray_100.svg"
            alt="reply"
          />
        ) : (
          <img
            className="h-full w-3.5"
            src="images/img_frame36930.svg"
            alt="frame36930"
          />
        )}
        <Text
          className={`font-DmSans text-sm font-normal leading-6 ${isFirstItem? "text-blue_gray-100" :"text-blue_gray-800_01" }`}
        >
          {text}
        </Text>
      </div>
    </div>
  );
};

export default ProjectTimelineItem;