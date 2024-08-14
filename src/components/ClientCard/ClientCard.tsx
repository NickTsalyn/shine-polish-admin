"use client";
import React, {useEffect} from "react";
import axios from "axios";
import dayjs from "dayjs";
import Button from "../UI/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// import {title} from "process";
import {ClientCardProps, Booking} from "@/interfaces";
import {getBookings} from "@/helpers/api";

const ClientCard: React.FC<ClientCardProps> = ({booking}) => {
 //  const [selectedDate, setSelectedDate] = React.useState<string>("");
 const [bookings, setBookings] = React.useState<Booking | null>(null);
 useEffect(() => {
  const setAuthHeader = (token: string) => {
   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmVlOGM3MzE3MmUzNDM3OTNlNjQwZiIsImVtYWlsIjoiQWx2YXJvQ2FwaWJhcmFURVNURVJAbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFsdmFybyBDYXBpYmFyYSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyMzY0ODQ4NywiZXhwIjoxNzIzNzM0ODg3fQ.8FkcJOSWK9cWDRi8Uw9ckhT8SDi4EPrTiMsNu0NE1p4"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   setBookings(booking);
  };
  fetchData();
 }, [booking]);

 //  AVATAR //

 function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
   hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
   const value = (hash >> (i * 8)) & 0xff;
   color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
 }

 function stringAvatar(name: string) {
  return {
   sx: {
    bgcolor: stringToColor(name),
   },
   children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
 }

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
