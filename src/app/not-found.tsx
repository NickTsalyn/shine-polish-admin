"use client";

import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

const BgnImg = () => {
  return (
    <div className="absolute inset-0 z-[-1]">
      <Image
        src="/images/error_page_image.webp"
        alt="photo not found"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div className="relative h-[calc(100vh-84px)] md:h-[calc(100vh-96px)] lg:h-screen w-full ">
      <BgnImg />
      <div className="container flex flex-col justify-between items-center  py-9 md:py-11 lg:py-12 h-full">
        <h1 className="text-[48px] md:text-[60px] lg:text-[80px] xl:text-[116px] font-light text-white text-center">
          404
          <br />
          Page not found
        </h1>
        <div className="text-white text-xl md:text-2xl lg:text-4xl ">
          <Link href={"/"}>
            to Home
            <LogoutIcon className="size-5 md:size-7 lg:size-9 xl:size-11 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
