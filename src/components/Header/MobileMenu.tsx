"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

import Button from "../UI/Button";

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
const buttons = [
  "Home",
  "Upload photos",
  "Clients",
  "Change price",
  "Add areas",
  "Hired workers",
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
          <div className="flex flex-row md:flex-row-reverse justify-center items-start mb-4 md:mb-8 relative">
            <div
              className="flex w-[108px] h-[97px] md:w-[136px] md:h-[122px] "
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
            <IconButton
              onClick={toggleDrawer}
              className="absolute top-0 right-0"
            >
              <CloseIcon className="text-main size-6 md:size-9" />
            </IconButton>
          </div>

          <div className="mb-9 xl:mb-[46px] flex justify-center">
            <Link
              href={"https://shine-polish.vercel.app"}
              className="text-[18px]  font-normal leading-[1.2] text-main "
            >
              Router Togler
            </Link>
          </div>

          <List className="p-0 flex flex-col grow gap-4 md:gap-6">
            <StyledItem>
              <ul className="flex flex-col gap-3 md:gap-[18px] justify-start  ">
                {buttons.map((button) => (
                  <li key={button}>
                    <Button type={"button"} style={"sidebar"}>
                      {button}
                    </Button>
                  </li>
                ))}
              </ul>
            </StyledItem>
          </List>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
