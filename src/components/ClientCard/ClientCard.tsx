"use client";
import React from "react";
import dayjs from "dayjs";
import Button from "../UI/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {ClientCardProps, Booking} from "@/interfaces";
import {stringToColor, stringAvatar} from "@/helpers/colorUtils";

const ClientCard: React.FC<ClientCardProps> = ({booking}) => {
 return (
  <div className="flex flex-col">
   <div className="w-[260px] md:w-[320px] h-[160px] md:h-[180px] shadow-2xl rounded-xl flex">
    <div
     className="w-[10px] h-full rounded-l-xl"
     style={{backgroundColor: stringToColor(`${booking.name} ${booking.surname}`)}}
    ></div>
    <div className="w-full h-full p-5 flex flex-col justify-between">
     <div className=" flex items-center">
      <Stack
       direction="row"
       spacing={2}
      >
       <Avatar {...stringAvatar(`${booking.name} ${booking.surname}`)} />
       <p>{`${booking.name} ${booking.surname}`}</p>
      </Stack>
     </div>
     <p>{booking.email}</p>
     <p>{dayjs(booking.selectedDate).format("MM/DD/YYYY")}</p>
     <Button
      type="button"
      style={"confirm"}
     >
      <span className="text-main">Booking details</span>
     </Button>
    </div>
   </div>
  </div>
 );
};

export default ClientCard;
