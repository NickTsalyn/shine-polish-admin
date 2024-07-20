"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/material/styles";

import NavLinks from "./Navigation/NavLinks";
import Button from "./UI/Button";
import { SIDEBAR_LINKS } from "@/global/navigation";

const UserIcon = styled(AccountCircleIcon)(() => ({
  color: "#fff",
  fontSize: 28,
}));

const socialIcons = [
  {
    icon: <FacebookRoundedIcon className="text-white size-9" />,
    href: "https://facebook.com",
  },
  {
    icon: <InstagramIcon className="text-white size-9" />,
    href: "https://instagram.com",
  },
  {
    icon: <WhatsAppIcon className="text-white size-9" />,
    href: "https://whatsapp.com",
  },
];

export default function Sidebar() {
  const [auth, setAuth] = useState(false);

  return (
    <aside className="  hidden lg:flex flex-col content-around fixed inset-y-0 left-0 p-5 xl:p-[26px] w-[200px] h-full xl:w-[244px] bg-main z-30">
      <div className="flex w-[128px] h-[115px] xl:w-[156px] xl:h-[140px] mx-auto mb-6 xl:mb-9 ">
        <Link href={"/"} className="w-full h-full relative">
          <Image
            src="/icons/logo/logo_dark_bg.svg"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </Link>
      </div>

      {auth && (
        <div className="flex items-center gap-5 xl:gap-6 mb-6">
          <UserIcon />
          <p className=" body font-light text-white">Hello, Fiona</p>
        </div>
      )}

      <div className="mb-5 ">
        <NavLinks links={SIDEBAR_LINKS} />
      </div>

      <div className="mt-auto">
        <ul className="mb-5 flex flex-col align-center gap-5 xl:gap-6">
          <li>
            <Button style="sidebar-auth-in" type="button">
              {auth ? (
                <span
                  onClick={() => setAuth(false)}
                  className="body text-secondary"
                >
                  Sign Out
                </span>
              ) : (
                <Link href="/sign-in-form" className="body text-secondary">
                  Sign In <span className="text-white">or </span>Sign Up
                </Link>
              )}
            </Button>
          </li>

          <li>
            <Button style="sidebar-book-now" type="button">
              <Link href="/booking" className="body font-bold text-secondary">
                Book Now
              </Link>
            </Button>
          </li>
          <li>
            <div className="relative px-1 xl:px-[10px] py-1 border border-solid border-white rounded-xl text-[18px] xl:text-[20px] font-light xl:font-normal leading-normal text-white">
              <Link href="tel:+4708003249">tel: 470-800-32-49</Link>

              <div className="absolute top-[-18px] left-0 z-10">
                <Image
                  width={30}
                  height={24}
                  src="/images/woman_with_a_phone.png"
                  alt="woman with a phone"
                />
              </div>
            </div>
          </li>
        </ul>
        <p className="mb-2 xl:mb-3 text-[28px] xl:text-[36px] font-light text-white">
          Follow us
        </p>
        <ul className="flex  gap-5 ">
          {socialIcons.map((socialIcon, index) => (
            <li key={index}>
              <Link href={socialIcon.href}>{socialIcon.icon} </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
