import React from "react";
import milesImg from '../../Media/img_reply_blue_gray_100.svg';
import milesImg1 from '../../Media/img_frame36930.svg';


const ProjectTimelineItem = ({isFirstItem=false, time, text}) => {
  return (
    <div className="flex flex-row gap-4 md:h-auto items-end justify-center w-full">
      <span
        className={`${isFirstItem? "text-blue_gray-100" :"text-blue_gray-800_01" } font-dm-sans-regular loading-4 capitalize text-right text-sm w-1/6 max-w-[100px]`}
      >
        <time dateTime={time} className={`${isFirstItem? "text-blue_gray-100" :"text-blue_gray-800_01" } font-dm-sans-regular loading-4 capitalize text-right`}>
          {time}
        </time>
      </span>
      <div className="flex flex-1 flex-row gap-4 items-end">
        {isFirstItem ? (
          <img
            className="w-3.5"
            src={milesImg}
            alt="reply"
          />
        ) : (
          <img
            className="h-full w-3.5"
            src={milesImg1}
            alt="frame36930"
          />
        )}
        <p
          className={`font-dm-sans-regular text-sm leading-4 ${isFirstItem? "text-blue_gray-100" :"text-blue_gray-800_01" }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default ProjectTimelineItem;