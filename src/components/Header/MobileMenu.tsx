"use client";

import { useState } from "react";
import Link from "next/link";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PhotoModal from "../Modals/PhotoModal";
import PriceModal from "../Modals/PriceModal";
import AreasModal from "../Modals/AreasModal";
import AddBookingModal from "../Modals/AddBookingModal";
import AddEmployee from "../Modals/AddEmployee";

import Button from "../UI/Button";
import { DrawerContent, StyledItem, StyledMenuIcon } from "../StyledComponents";
import { ShineLogo } from "../images";
import { buttons } from "../Arrays";

export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string | null) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="flex lg:hidden ">
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenMenu(true)}>
        <StyledMenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
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
            <div className="flex w-[108px] h-[97px] md:w-[136px] md:h-[122px] " onClick={() => setOpenMenu(false)}>
              <ShineLogo />
            </div>
            <IconButton onClick={() => setOpenMenu(false)} className="absolute top-0 right-0">
              <CloseIcon className="text-main size-6 md:size-9" />
            </IconButton>
          </div>

          <div className="mb-9 xl:mb-[46px] flex justify-center">
            <Link
              href={"https://shine-polish.vercel.app"}
              className="text-[18px]  font-normal leading-[1.2] text-main "
            >
              Client Side
            </Link>
          </div>
          <List className="p-0 flex flex-col grow gap-4 md:gap-6 text-main">
            {buttons.map((button) => (
              <li key={button.label}>
                {button.link ? (
                  <Link href={button.link}>
                    <Button type={"button"} style={"mob-menu"} onClick={() => setOpenMenu(false)}>
                      {button.label}
                    </Button>
                  </Link>
                ) : (
                  <Button type={"button"} style={"sidebar"} onClick={() => handleOpenModal(button.modal)}>
                    {button.label}
                  </Button>
                )}
              </li>
            ))}
          </List>
          {openModal === "photo" && <PhotoModal open={openModal === "photo"} onClose={handleCloseModal} />}
          {openModal === "price" && <PriceModal open={openModal === "price"} onClose={handleCloseModal} />}
          {openModal === "areas" && <AreasModal open={openModal === "areas"} onClose={handleCloseModal} />}
          {openModal === "booking" && <AddBookingModal open={openModal === "booking"} onClose={handleCloseModal} />}
          {openModal === "employee" && <AddEmployee open={openModal === "employee"} onClose={handleCloseModal} />}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
