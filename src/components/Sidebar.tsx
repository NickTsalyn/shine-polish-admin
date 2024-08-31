"use client";
import Link from "next/link";

import Button from "./UI/Button";
import { DarkLogo } from "./images";
import { useState } from "react";
import { buttons } from "./Arrays";
import DynamicModal from "./Modals/DynamicModal";

export const Sidebar = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string | null) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <aside className="  hidden lg:flex flex-col content-around fixed inset-y-0 left-0 p-5 xl:p-[26px] w-[200px] h-full xl:w-[244px] bg-main z-30">
      <div className="flex w-[128px] h-[115px] xl:w-[156px] xl:h-[140px] mx-auto mb-9 xl:mb-[46px] ">
        <DarkLogo />
      </div>
      <div className="mb-9 xl:mb-[46px] flex justify-center">
        <Link
          href={"https://shine-polish.vercel.app"}
          className="text-[18px] xl:text-[20px] font-normal leading-[1.2] text-white"
        >
          Client Side{" "}
        </Link>
      </div>

      <div className="mb-5 ">
        <ul className="flex flex-col gap-5 justify-start text-white ">
          {buttons.map((button) => (
            <li key={button.label}>
              {button.link ? (
                <Link href={button.link}>
                  <Button type={"button"} style={"sidebar"}>
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
        </ul>
      </div>
      {openModal === "photo" && (
        <DynamicModal open={openModal === "photo"} onClose={handleCloseModal} formType={"PhotoForm"} />
      )}
      {openModal === "price" && (
        <DynamicModal open={openModal === "price"} onClose={handleCloseModal} formType={"PriceForm"} />
      )}
      {openModal === "areas" && (
        <DynamicModal open={openModal === "areas"} onClose={handleCloseModal} formType={"AreasForm"} />
      )}
      {openModal === "booking" && (
        <DynamicModal open={openModal === "booking"} onClose={handleCloseModal} formType={"AddBookingForm"} />
      )}
      {openModal === "employee" && (
        <DynamicModal open={openModal === "employee"} onClose={handleCloseModal} formType={"AddEmployeeForm"} />
      )}
    </aside>
  );
};
