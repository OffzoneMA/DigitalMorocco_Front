import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h3 className="font-dm-sans-bold text-[32px] leading-[44px] text-left text-[#101828] ">
      {children}
    </h3>
  );
};

export default PageHeader;