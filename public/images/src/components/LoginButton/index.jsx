import React from "react";

import { Img, Text } from "components";

const LoginButton = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-center w-auto">
          <Text
            className="text-base text-white-A700 w-auto"
            size="txtDMSansMedium16WhiteA700"
          >
            {props?.button}
          </Text>
        </div>
        <Img
          className="h-6 w-6"
          src="images/img_arrowright.svg"
          alt="arrowright"
        />
      </div>
    </>
  );
};

LoginButton.defaultProps = { button: "Sign in" };

export default LoginButton;
