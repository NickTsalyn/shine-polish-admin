"use client";
import React, {useEffect} from "react";
import axios from "axios";
import dayjs from "dayjs";
import Button from "../UI/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {title} from "process";

interface ClientCardProps {}
interface Booking {
 id: number | string;
 name: string;
 surname: string;
 selectedDate: string;
 time: string;
 email: string;
 phone: string;
 address: string;
 areas: string[];
}
const getBookings = async (): Promise<Booking[]> => {
 try {
  console.log("Getting bookings...");
  const response = await axios.get<Booking[]>("https://shine-polish-server.onrender.com/admin/bookings");
  console.log("Bookings received:", response.data);
  return response.data;
 } catch (error) {
  console.error("Error getting bookings:", error);
  return [];
 }
};
const ClientCard: React.FC = () => {
 const [selectedDate, setSelectedDate] = React.useState<string>("");
 const [bookings, setBookings] = React.useState<Booking[]>([]);
 useEffect(() => {
  const setAuthHeader = (token: string) => {
   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmVlOGM3MzE3MmUzNDM3OTNlNjQwZiIsImVtYWlsIjoiQWx2YXJvQ2FwaWJhcmFURVNURVJAbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFsdmFybyBDYXBpYmFyYSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyMzEyOTc0NywiZXhwIjoxNzIzMjE2MTQ3fQ.RqmmyKvAUsfN7mGMTTHjsah6Nob0MV0iwu7Y13cEOoM"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   if (Array.isArray(bookings)) {
    const getingDate = bookings.map((booking) => {
     const start = dayjs(`${booking.selectedDate}`).toDate();
     console.log(booking);
     const end = dayjs(`${booking.selectedDate}`).add(3, "hour").toDate();
     console.log("Start:", start, "End:", end);

     const isRegistered = booking.email && booking.phone;
     const backgroundColor = isRegistered ? "#D0F4DE" : "#FF99C8";

     return {
      id: booking.id,
      title: `${booking.name} ${booking.surname}`,
      start,
      end,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      areas: booking.areas,
      selectedDate: booking.selectedDate,
      time: booking.time,
      backgroundColor,
      textColor: isRegistered ? "#000" : "#fff",
     };
    });
    // setBookings(getingDate);
    setSelectedDate(getingDate[0].selectedDate);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchData();
 }, []);

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
   <h2 className="text-3xl mb-5 text-main text-center">Our Clients</h2>
   <div className="w-[320px] h-[180px] shadow-2xl rounded-xl flex">
    <div className="w-[10px] h-full bg-main rounded-l-xl"></div>
    <div className="w-full h-full p-5 flex flex-col justify-between">
     <div className="flex items-center">
      <Stack
       direction="row"
       spacing={2}
      >
       <Avatar {...stringAvatar("Kent Dodds")} />
       <p>name</p>
      </Stack>
     </div>

     <p>email</p>
     <p>{selectedDate}</p>
     <Button
      type="button"
      style={"burger-book-now"}
     >
      <span className="text-main"> Booking details</span>
     </Button>
    </div>
   </div>
  </div>
 );
};

export default ClientCard;
