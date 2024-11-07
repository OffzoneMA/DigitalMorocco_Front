import React from "react";
import { Text } from "./Text";
import { GrAttachment } from "react-icons/gr";

const ProjectDocumentItem = ({ docName, docUrl }) => {
  return (
    <a
      href={docUrl}
      target="_blank"   
      rel="noopener noreferrer" 
      download 
      className="flex flex-row gap-2.5 items-center justify-start py-4 min-h-[58px] w-full cursorpointer" 
    >
      <GrAttachment className="mr-2 text-[14px] md-[16px] lg-[18px]" />
      <Text
        className="flex text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto custom-link"
        size=""
      >
        {docName}
      </Text>
    </a>
  );
};

export default ProjectDocumentItem;