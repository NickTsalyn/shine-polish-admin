"use client";
import Link from "next/link";
import Image from "next/image";

import Button from "./UI/Button";
import { DarkLogo } from "./images";

const buttons = [
  "Home",
  "Upload photos",
  "Clients",
  "Change price",
  "Add areas",
  "Hired workers",
];

export const Sidebar = () => {
  return (
    <aside className="  hidden lg:flex flex-col content-around fixed inset-y-0 left-0 p-5 xl:p-[26px] w-[200px] h-full xl:w-[244px] bg-main z-30">
      <div className="flex w-[128px] h-[115px] xl:w-[156px] xl:h-[140px] mx-auto mb-9 xl:mb-[46px] ">
      <DarkLogo/>
      </div>
      <div className="mb-9 xl:mb-[46px] flex justify-center">
        <Link
          href={"https://shine-polish.vercel.app"}
          className="text-[18px] xl:text-[20px] font-normal leading-[1.2] text-white"
        >
          Router Togler{" "}
        </Link>
      </div>

      <div className="mb-5 ">
        <ul className="flex flex-col gap-5 justify-start text-white ">
          {buttons.map((button) => (
            <li key={button}>
              <Button type={"button"} style={"sidebar"}>
                {button}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
