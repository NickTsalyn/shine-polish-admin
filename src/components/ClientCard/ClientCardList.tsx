"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";

import ClientCard from "./ClientCard";
import {Booking} from "@/interfaces";
import {getBookings} from "@/helpers/api";

const ClientCardList: React.FC = () => {
 const [bookings, setBookings] = React.useState<Booking[]>([]);

 useEffect(() => {
  const setAuthHeader = (token: string) => {
   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmVlOGM3MzE3MmUzNDM3OTNlNjQwZiIsImVtYWlsIjoiQWx2YXJvQ2FwaWJhcmFURVNURVJAbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFsdmFybyBDYXBpYmFyYSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyMzY0ODQ4NywiZXhwIjoxNzIzNzM0ODg3fQ.8FkcJOSWK9cWDRi8Uw9ckhT8SDi4EPrTiMsNu0NE1p4"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   if (Array.isArray(bookings)) {
    setBookings(bookings);
    console.log("Bookings:", bookings);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchData();
 }, []);

 return (
  <div className="flex flex-col w-[320px] mr-10 lg:h-[980px] md:w-[768px] m-auto lg:mx-10 lg:w-[320px]">
   <h2 className="text-3xl mb-5 text-main text-center">Our Clients</h2>
   <div className="flex  lg:flex-col gap-4 max-h-[900px] overflow-y-auto box-border">
    {bookings.map((booking) => (
     <ClientCard
      key={booking.id}
      booking={booking}
     />
    ))}
   </div>
  </div>
 );
};
export default ClientCardList;
