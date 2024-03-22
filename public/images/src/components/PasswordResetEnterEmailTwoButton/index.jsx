import React from "react";

import { Img, Text } from "components";

const PasswordResetEnterEmailTwoButton = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-row gap-3 items-center justify-center w-auto md:w-full">
          <Img
            className="h-[22px] w-[22px]"
            src="images/img_arrowleft.svg"
            alt="arrowleft"
          />
          <Text
            className="text-blue_gray-400_01 text-sm tracking-[0.14px] w-auto"
            size="txtManropeSemiBold14"
          >
            {props?.loginbuttontext}
          </Text>
        </div>
      </div>
    </>
  );
};

PasswordResetEnterEmailTwoButton.defaultProps = {
  loginbuttontext: "Back to Login",
};

export default PasswordResetEnterEmailTwoButton;
