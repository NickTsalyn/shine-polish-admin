"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CustomButton from "../UI/Button";
import NavMobile from "../Navigation/NavMobile";
import { MOBILE_LINKS } from "@/global/navigation";

const StyledMenuIcon = styled(MenuIcon)(() => ({
  color: "#006778",
  fontSize: 42,
  "@media (min-width: 768px)": {
    fontSize: 52,
  },
}));

const DrawerContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFF",
  width: "280px",
  height: "598px",
  padding: "16px",
  borderRadius: "12px",
  "@media (min-width: 768px)": {
    width: "400px",
    padding: "28px",
    height: "820px",
  },
}));

const StyledItem = styled(ListItem)(() => ({
  color: "#006778",
  padding: "0px",
  fontFamily: "Lato",
}));

const socialIcons = [
  {
    icon: <FacebookRoundedIcon className="text-main size-9 md:size-11" />,
    href: "https://facebook.com",
  },
  {
    icon: <InstagramIcon className="text-main size-9 md:size-11" />,
    href: "https://instagram.com",
  },
  {
    icon: <WhatsAppIcon className="text-main size-9 md:size-11" />,
    href: "https://whatsapp.com",
  },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex lg:hidden ">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <StyledMenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "12px",
            overflow: "hidden",
            width: "auto",
            height: "auto",
          },
        }}
      >
        <DrawerContent>
          <div className="flex flex-row md:flex-row-reverse justify-between items-start mb-4 md:mb-8">
            <div
              className="flex w-[108px] h-[97px] md:w-[136px] md:h-[122px]"
              onClick={toggleDrawer}
            >
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
            <IconButton onClick={toggleDrawer}>
              <CloseIcon className="text-main size-6 md:size-9" />
            </IconButton>
          </div>

          <List className="p-0 flex flex-col grow gap-4 md:gap-6">
            <StyledItem>
              <NavMobile links={MOBILE_LINKS} toggleDrawer={toggleDrawer} />
            </StyledItem>
            <StyledItem onClick={toggleDrawer}>
              <CustomButton style="burger-book-now" type="button">
                <Link
                  href="/booking"
                  className=" text-[20px] md:text-[24px] font-bold text-accent text-center"
                >
                  Book Now
                </Link>
              </CustomButton>
            </StyledItem>
            <StyledItem onClick={toggleDrawer}>
              <span className="w-full py-1 md:py-1.5 border border-solid border-main rounded-xl text-[18px] md:text-[20px] font-normal leading-normal text-main text-center">
                <Link href="tel:+4708003249">tel: 470-800-32-49</Link>
              </span>
            </StyledItem>
            <StyledItem onClick={toggleDrawer}>
              <CustomButton style="burger-contact-us" type="button">
                <span className="text-[20px] md:text-[24px] font-bold leading-normal text-secondary text-center">
                  Contact us
                </span>
              </CustomButton>
            </StyledItem>
          </List>

          <div className="flex flex-col items-center gap-1 md:gap-2 mt-auto">
            <p className="text-[24px] xl:text-[32px] font-light leading-normal text-main">
              Follow us
            </p>
            <ul className="flex gap-[10px] md:gap-[18px]">
              {socialIcons.map((socialIcon, index) => (
                <li key={index} onClick={toggleDrawer}>
                  <Link href={socialIcon.href}>{socialIcon.icon}</Link>
                </li>
              ))}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
