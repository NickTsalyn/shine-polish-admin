type PropsButtton = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  style:
    | "burger-book-now"
    | "burger-contact-us"
    | "home-book-now"
    | "home-contact-us"
    | "sidebar-book-now"
    | "sidebar-auth-in"
    | "sidebar-log-out"
    | "auth-sign"
    | "auth-sign-up-border"
    | "apply-btn-light-one"
    | "apply-btn-light"
    | "apply-btn-blue"
    | "footer-book-now"
    | "send"
    | "deep-cleaning"
    | "work-with-us"
    | "close-button"
    | "transparent-button"
    | "complete-booking";
};

export default function Button(props: PropsButtton) {
  let styles = "";

  switch (props.style) {
    case "burger-book-now":
      styles =
        "py-1.5 md:py-1 bg-white border border-solid border-accent rounded-xl w-full";
      break;
    case "burger-contact-us":
      styles = "py-1 border border-solid border-secondary rounded-xl w-full";
      break;
    case "home-book-now":
      styles =
        "py-1 md:py-2 lg:py-2 xl:py-4  px-4 md:px-[54px] lg:px-12 xl:px-[70px]  border border-solid border-secondary rounded-[10px] backdrop-blur-[10px]   ";
      break;
    case "footer-book-now":
      styles =
        "flex justify-center items-center w-[120px] h-8 md:w-[280px] md:h-[60px] lg:w-[400px] lg:h-[80px] xl:w-[440px] xl:h-[100px]  border border-solid border-secondary rounded-[12px] bg-black bg-opacity-35 backdrop-blur-[10px]";
      break;
    case "home-contact-us":
      styles =
        "py-1 md:py-2 lg:py-2 xl:py-4  px-3 md:px-12 lg:px-10 xl:px-[60px]  border border-solid border-secondary rounded-[10px] backdrop-blur-[10px]   ";
      break;
    case "sidebar-book-now":
      styles =
        " px-8 xl:px-12 py-1 xl:py-[6px] w-full border rounded-[10px] border-secondary bg-main ";
      break;
    case "sidebar-auth-in":
      styles =
        " border border-solid border-sand rounded-[10px]  py-1 xl:py-[6px] bg-main w-full";
      break;
    case "sidebar-log-out":
      styles =
        " px-10 xl:px-14 py-1 xl:py-[6px] w-full border rounded-[10px] border-sand bg-main ";
      break;
    case "auth-sign-up-border":
      styles =
        " w-[128px] h-[40px] lg:w-[200px] lg:h-[60px] flex justify-center items-center py-2 lg:py-4 px-6 lg:px-14 border border-blue rounded-xl bg-main";
      break;
    case "auth-sign":
      styles =
        "w-[128px] h-[36px] lg:w-[164px] lg:h-[40px] bg-auth-button-bgn rounded-xl flex justify-center items-center";
      break;
    case "apply-btn-light":
      styles =
        " rounded-xl border-2 border-secondary   bg-secondary  py-1 px-[74px] hover:shadow-apply-send-button-shadow  focus:shadow-apply-send-button-shadow  ";
      break;
    case "apply-btn-light-one":
      styles =
        " rounded-xl border-2 border-secondary  focus:border-accent hover:border-accent text-xl text-accent hover:text-white focus:text-white   bg-secondary  py-1 lg:py-4 px-8 hover:shadow-apply-send-button-shadow  focus:shadow-apply-send-button-shadow hover:bg-accent focus:bg-accent  ";
      break;
    case "apply-btn-blue":
      styles =
        " rounded-xl border-2 border-main  bg-main hover:border-2 hover:border-tertial  hover:bg-tertial/50 focus:bg-tertial/50 hover:shadow-apply-blue-button-shadow focus:shadow-apply-button-shadow  py-1 px-[74px]  ";
      break;
    case "footer-book-now":
      styles =
        " w-[140px] lg:w-[160px] xl:w-[196px] h-9 lg:h-10 border rounded-xl border-secondary bg-main mb-5 flex justify-center items-center";
      break;
    case "send":
      styles =
        "w-[148px] h-[36px] md:w-[162px] md:h-[48px] lg:w-[220px] rounded-xl bg-secondary hover:bg-[#F6AD70]";
      break;
    case "deep-cleaning":
      styles =
        " px-5 py-3 border-2 rounded-xl border-tertial hover:border-main/30 focus:border-main/30 hover:bg-tertial focus:bg-tertial shadow-button-shadow hover:shadow-button-hover-shadow disabled:border-tertial/30 ";
      break;
    case "work-with-us":
      styles =
        " px-8 md:px-12 lg:px-[150px] xl:px-[424px] py-1 md:py-9 xl:py-14 rounded-xl bg-main ";
      break;
    case "close-button":
      styles = " w-3 h-3 md:w-4 md:h-4 rounded-full bg-transparent ";
    case "transparent-button":
      styles =
        " w-[52px] h-[52px] ld:w-[64px] lg:h-[64px] rounded-full bg-transparent border-none ";
    break;        
    case "complete-booking":
      styles =
        " py-1.5 md:py-3 lg:py-[20px] px-10 bg-transparent border-2 border-solid border-white rounded-xl ";
      break;
      default:  
  }
  return (
    <button
      type={props.type}
      className={styles}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
