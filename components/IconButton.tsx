import React from "react";
import BaseButton, { BaseButtonProps } from "./BaseButton";

const IconButton = ({ children, ...props }: BaseButtonProps) => {
  return (
    <BaseButton
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default IconButton;
