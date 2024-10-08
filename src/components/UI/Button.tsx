import React from 'react';

type PropsButtton = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  style:
    | "confirm"
    | "sidebar"
    | "mob-menu"
    | "close-button"
    | "auth-sign"
    | "auth-sign-up-border"
    | "transparent-button"
    | "delete-button";
};

const Button = React.forwardRef<HTMLButtonElement, PropsButtton>((props, ref) => {
  let styles = "";

  switch (props.style) {
    case "confirm":
      styles = "flex justify-center items-center w-full bg-sand hover:bg-secondary text-accent rounded-[12px] px-4 py-2 ";
      break;
    case "sidebar":
      styles = "text-[18px] xl:text-[20px] font-normal leading-[1.2]";
      break;
    case "mob-menu":
      styles = "text-[18px] xl:text-[20px] font-normal leading-[1.2]";
      break;
    case "close-button":
      styles = " w-3 h-3 md:w-4 md:h-4 rounded-full bg-transparent ";
      break;
    case "auth-sign":
      styles = "w-[128px] h-[36px] lg:w-[164px] lg:h-[40px] bg-auth-button-bgn rounded-xl flex justify-center items-center";
      break;
    case "auth-sign-up-border":
      styles = " w-[128px] h-[40px] lg:w-[200px] lg:h-[60px] flex justify-center items-center py-2 lg:py-4 px-6 lg:px-14 border border-blue rounded-xl bg-main";
      break;
    case "transparent-button":
      styles = " w-[52px] h-[52px] ld:w-[64px] lg:h-[64px] rounded-full bg-transparent border-none ";
      break;
    case "delete-button":
      styles = "flex justify-center items-center w-full bg-accent-light hover:bg-secondary text-accent rounded-[12px] px-4 py-2 ";
      break;
    default:
      break;
  }

  return (
    <button
      ref={ref}
      type={props.type}
      className={styles}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;