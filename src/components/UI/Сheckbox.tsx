import React from "react";
import { RadioCheckProps } from "@/types/types";

const CheckBox = (props: RadioCheckProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`${
        props.style
      }  border justify-center flex flex-col items-center rounded-xl text-center font-intro_book text-base font-normal leading-6
       ${
         props.isActive
           ? "text-white bg-tertial border-main/35 shadow-hover-shadow "
           : "text-main border-main shadow-hover-shadow"
       }
       ${props.disabled && "pointer-events-none opacity-50"}`}
      onClick={props.onClick}
    >
      {props.children}
      {props.text}
    </button>
  );
};

export default CheckBox;
