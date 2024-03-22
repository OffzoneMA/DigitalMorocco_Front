import React from "react";

import { Img, Text } from "components";

const PasswordResetEnterEmailFiveButton = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-center w-auto">
          <Text
            className="text-base text-gray-500 w-auto"
            size="txtDMSansMedium16Gray500"
          >
            {props?.resetpasswordtext}
          </Text>
        </div>
        <Img
          className="h-6 w-6"
          src="images/img_arrowright_gray_500.svg"
          alt="arrowright"
        />
      </div>
    </>
  );
};

PasswordResetEnterEmailFiveButton.defaultProps = {
  resetpasswordtext: "Reset Password",
};

export default PasswordResetEnterEmailFiveButton;
