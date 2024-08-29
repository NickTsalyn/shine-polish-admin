"use client";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import Button from "../UI/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {ClientCardProps, Booking} from "@/interfaces";
import {getBookings} from "@/helpers/api";
import {setAuthHeader} from "@/helpers/auth";
import {stringToColor, stringAvatar} from "@/helpers/colorUtils";

const ClientCard: React.FC<ClientCardProps> = ({booking}) => {
 const [bookings, setBookings] = React.useState<Booking | null>(null);
 useEffect(() => {
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQwNjRjYzk2YWFhMWVkNjQyN2NiNyIsImVtYWlsIjoiVG9tQ3J1aXNlNjlAbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRvbSBDcnVpc2UiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MjQ5NDk3MTgsImV4cCI6MTcyNTAzNjExOH0.oruSDsjVzmqSzimdr8Cx6Y5ZKek2FxhISgQ59Yy3WRk"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   setBookings(booking);
  };
  fetchData();
 }, [booking]);

 return (
  <div className="flex flex-col">
   <div className="w-[320px] h-[180px] shadow-2xl rounded-xl flex">
    <div
     className="w-[10px] h-full rounded-l-xl"
     style={{backgroundColor: stringToColor(`${booking.name} ${booking.surname}`)}}
    ></div>
    <div className="w-full h-full p-5 flex flex-col justify-between">
     <div className="flex items-center">
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
