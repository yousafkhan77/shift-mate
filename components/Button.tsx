import React from "react";
import { Button as PaperButton, ButtonProps } from "react-native-paper";

const Button = (props: ButtonProps) => {
  return (
    <PaperButton
      {...props}
      labelStyle={[props.labelStyle, { fontFamily: "SatoshiBold" }]}
    >
      {props.children}
    </PaperButton>
  );
};

export default Button;
