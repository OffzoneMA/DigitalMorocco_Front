import React from "react";
import { Text } from "./Text";
import { GrAttachment } from "react-icons/gr";

const ProjectDocumentItem = ({docName}) => {
  return (
    <div className="flex flex-row gap-2.5 items-center justify-start py-4 w-full">
      <GrAttachment size={18} className="mr-2" />
      <Text
        className="flex-1 text-blue-A400 font-DmSans text-sm lg:text-base font-normal leading-6 tracking-normal w-auto "
        size=""
      >
        {docName}
      </Text>
    </div>
  );
};

export default ProjectDocumentItem;