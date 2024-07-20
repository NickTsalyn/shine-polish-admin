import React from "react";
import { RadioCheckProps } from "@/types/types";

const RadioButton: React.FC<RadioCheckProps> = ({
  style,
  text,
  isActive,
  onClick,
  children,
  onChange,
  accent
}) => {
  return (
    <button
      className={`${style} border justify-center flex flex-col items-center rounded-xl text-center font-intro_book text-base font-normal leading-6 ${
        isActive
          ? "text-white bg-tertial border-main/35 shadow-hover-shadow "
          : " border-main shadow-hover-shadow"
      }`}
      onClick={onClick}
     
    >
      {children}
      {text}
    </button>
  );
};
export default RadioButton;


