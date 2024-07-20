"use client";

import Link from "next/link";
import ThemeSwitch from "./Switcher";
import { useState } from "react";
import Image from "next/legacy/image";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [lightMode, setDarkMode] = useState(false);
  const [auth] = useState(false);

  const handleChange = () => {
    setDarkMode(!lightMode);
  };

  return (
    <header className="bg-white lg:bg-transparent lg:absolute lg:top-0 lg:right-0 lg:z-20">
      <div className=" px-[20px] md:px-[28px] lg:px-[42px] xl:px-20 py-3 lg:py-[22px] flex direction-row justify-between lg:justify-end">
        <div className="flex lg:hidden w-[68px] h-[60px] md:w-[80px] md:h-[72px]">
          <Link href={"/"} className="w-full h-full relative">
            <Image
              src="/icons/logo/logo_shine.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Link>
        </div>
        <div className=" flex direction-row gap-4 md:gap-[22px] lg:gap-10 items-center justify-center ">
          {auth && (
            <div className=" block lg:hidden text-accent lg:text-white subtext text-center">
              Hello, Fiona
            </div>
          )}
          <div className=" w-[38px] h-7 border rounded-[6px] border-light-main text-center">
            Uk
          </div>
          <ThemeSwitch checked={lightMode} onChange={handleChange} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
