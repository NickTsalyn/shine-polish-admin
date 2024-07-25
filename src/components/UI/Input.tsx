import React from "react";

interface InputProps {
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "email" | "password" | "text" | "tel" | "checkbox";
  placeholder?: string;
  style:
    | "sign-in-input"
    | "sign-up-input"
    | "form-input"
    | "modal-input"
    | string;
  width?: string;
  name?: string;
  // register?: any;
}

export default function Input({
  onChange,
  type,
  placeholder,
  style,
  width,
  value,
  name,
}: // register,

InputProps) {
  let styles = "";

  switch (style) {
    case "sign-in-input":
      styles = `block mx-auto w-full md:w-[320px] md:h-[40px] py-[8px] lg:py-[12px] px-[9px] lg:px-[16px] mb-[12px] bg-transparent text-main border-2 focus:border-[3px] border-solid border-tertial rounded-[12px] focus:shadow-input-shadow outline-none placeholder:text-main placeholder:opacity-50 focus:invalid:input-border-gradient-error invalid:input-border-gradient-error`;
      break;
    case "sign-up-input":
      styles = `block mx-auto w-full md:w-[300px] ${width} py-[8px] lg:py-[12px] px-[9px] lg:px-[16px] bg-transparent text-main border-2 focus:border-[3px] border-solid border-tertial rounded-[12px] focus:shadow-input-shadow outline-none placeholder:text-main placeholder:opacity-50 input-border-gradient focus:invalid:input-border-gradient-error invalid:input-border-gradient-error `;
      break;
    case "form-input":
      styles = `block mx-full mb-[10px] w-full hx-full h-full ${width} py-[8px] lg:py-[12px] px-[8px] lg:px-[16px] bg-transparent text-text border-solid border-2 focus:border-[3px] border-secondary rounded-[12px] focus:shadow-input-shadow outline-none xl:placeholder:text-[16px] placeholder:text-secondary-placeholder placeholder:opacity-50`;
      break;
    case "modal-input":
      styles = `block mx-auto w-full py-[12px] md:py-[20px] lg:py-[24px] px-[16px] bg-transparent text-main border-solid border focus:border-[2px] border-main rounded-[12px] focus:shadow-input-shadow outline-none placeholder:text-main placeholder:opacity-35 input-border-gradient-modal focus:invalid:input-border-gradient-error invalid:input-border-gradient-error`;
      break;

    default:
      break;
  }
  return (
    <>
      <input
        className={styles}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        // {...register("text")}
        value={value}
        name={name}
      />
    </>
  );
}
