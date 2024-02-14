import React from "react";

const sizeClasses = {
  txtDMSansMedium16Bluegray500: "font-dmsans font-medium",
  txtDMSansBold14: "font-bold font-dmsans",
  txtDMSansRegular13Gray700: "font-dmsans font-normal",
  txtDMSansBold16: "font-bold font-dmsans",
  txtDMSansRegular14Gray90001: "font-dmsans font-normal",
  txtDMSansMedium16Gray500: "font-dmsans font-medium",
  txtInterSemiBold200: "font-inter font-semibold",
  txtDMSansMedium22Black900: "font-dmsans font-medium",
  txtDMSansMedium16: "font-dmsans font-medium",
  txtDMSansMedium15: "font-dmsans font-medium",
  txtDMSansMedium14: "font-dmsans font-medium",
  txtManropeMedium14: "font-manrope font-medium",
  txtDMSansMedium22: "font-dmsans font-medium",
  txtManropeSemiBold14: "font-manrope font-semibold",
  txtDMSansRegular12: "font-dmsans font-normal",
  txtDMSansRegular14: "font-dmsans font-normal",
  txtDMSansMedium22Gray90001: "font-dmsans font-medium",
  txtDMSansRegular13: "font-dmsans font-normal",
  txtDMSansRegular16: "font-dmsans font-normal",
  txtDMSansMedium16WhiteA700: "font-dmsans font-medium",
  txtDMSansMedium18: "font-dmsans font-medium",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {

  return (
    <label
      className={`block ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </label>
  );
};

export { Text };
