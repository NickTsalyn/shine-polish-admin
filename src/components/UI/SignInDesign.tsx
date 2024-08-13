import Button from "./Button";
import Link from "next/link";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GoogleIcon from "@mui/icons-material/Google";

export const SocialMediaSignIn = () => {
  return (
    <>
      {" "}
      <div
        className="rounded-full flex  justify-center w-[52px] h-[52px] lg:w-[64px] lg:h-[64px] border border-tertial"
        style={{
          backgroundImage:
            "linear-gradient(164deg, #006778 4.74%, #00BFDE 88.81%)",
        }}
      >
        <Button style="transparent-button" type="button">
          <Link href="/" />
          <span className="text-white flex items-center justify-center ">
            <FacebookRoundedIcon className="w-[32px] h-[32px] lg:w-[56px] lg:h-[56px]" />
          </span>
        </Button>
      </div>
      <div
        className="rounded-full flex items-center justify-center w-[52px] h-[52px] lg:w-[64px] lg:h-[64px] border border-tertial"
        style={{
          backgroundImage:
            "linear-gradient(9deg, #00BFDE 5.7%, #008298 71.75%, #006778 83.33%)",
        }}
      >
        <Button style="transparent-button" type="button">
          <Link href="/" />
          <span className="text-white flex items-center justify-center">
            <WhatsAppIcon className="w-[32px] h-[32px] lg:w-[56px] lg:h-[56px]" />
          </span>
        </Button>
      </div>
      <div
        className="rounded-full flex items-center justify-center w-[52px] h-[52px] lg:w-[64px] lg:h-[64px] border border-tertial"
        style={{
          backgroundImage:
            "linear-gradient(69deg, #00BFDE 8.52%, #006778 91.48%)",
        }}
      >
        <Button style="transparent-button" type="button">
          <Link href="/" />
          <span className="text-white flex items-center justify-center">
            <GoogleIcon className="w-[32px] h-[32px] lg:w-[56px] lg:h-[56px]" />
          </span>
        </Button>
      </div>
    </>
  );
};

export const MobileScrinWaves = () => {
  return (
    <div className="md:hidden rounded-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="320"
        height="244"
        viewBox="0 0 320 244"
        fill="none"
        className=""
      >
        <path
          d="M0 7.69432C111.577 60.1107 311.714 -25.5459 320.22 8.07003C328.725 41.686 320.22 251 320.22 251H0V7.69432Z"
          fill="url(#paint0_linear_219_2646)"
          fillOpacity="0.13"
        />
        <defs>
          <linearGradient
            id="paint0_linear_219_2646"
            x1="38.5"
            y1="31"
            x2="295.5"
            y2="125"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00BFDE" />
            <stop offset="0.144454" stopColor="#00B5D3" stopOpacity="0.945" />
            <stop offset="0.505529" stopColor="#0092AA" stopOpacity="0.37" />
            <stop offset="1" stopColor="#006778" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute z-1 bottom-0 left-0 rounded-b-[12px] md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="320"
          height="240"
          viewBox="0 0 320 240"
          fill="none"
          className="rounded-b-xl"
        >
          <path
            d="M0 30.869C111.348 83.4632 305.084 -59.8287 319.564 30.869C334.045 121.567 319.564 275 319.564 275H0V30.869Z"
            fill="#006778"
          />
        </svg>
      </div>
    </div>
  );
};

export const TabletScreenFirstWave = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="352"
        height="178"
        viewBox="0 0 380 178"
        fill="none"
        className="rounded-br-[60px]"
      >
        <path
          d="M118.912 138.444C163.869 114.288 192.981 78.3039 215.151 58.5261C237.321 38.7483 259.995 29.4649 309.374 43.9955C358.753 58.5261 391 0 391 0L382.938 178H0C0 178 77.1534 160.882 118.912 138.444Z"
          fill="#00BFDE"
          fillOpacity="0.32"
        />
      </svg>
    </>
  );
};

export const TabletScreenSecondWave = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="181"
        viewBox="0 0 380 181"
        fill="none"
        className="rounded-br-[60px] lg:hidden"
      >
        <path
          d="M0 0C0 0 108 64.5 171 120.5C234 176.5 391 181 391 181H0V0Z"
          fill="white"
          fillOpacity="0.32"
        />
      </svg>
    </>
  );
};

export const DesctopScreenFirstWave = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="480"
        height="250"
        viewBox="0 0 479 250"
        fill="none"
        className="rounded-br-[50px]"
      >
        <path
          d="M0 0C0 0 135.621 89.0884 214.734 166.436C293.847 243.785 491 250 491 250H0V0Z"
          fill="white"
          fillOpacity="0.32"
        />
      </svg>
    </>
  );
};

export const DesctopScreenSecondWave = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="480"
        height="204"
        viewBox="0 0 476 204"
        fill="none"
        className="rounded-br-[50px]"
      >
        <path
          d="M148.412 158.667C204.522 130.982 240.856 89.7415 268.526 67.0748C296.196 44.4082 324.495 33.7687 386.124 50.4218C447.753 67.0748 488 0 488 0L477.938 204H0C0 204 96.2938 184.382 148.412 158.667Z"
          fill="#00BFDE"
          fillOpacity="0.32"
        />
      </svg>
    </>
  );
};
