"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import ClientCard from "./ClientCard";
import {Booking} from "@/interfaces";
import {getBookings} from "@/helpers/api";
import {setAuthHeader} from "@/helpers/auth";

const ClientCardList: React.FC = () => {
 const [bookings, setBookings] = useState<Booking[]>([]);

 useEffect(() => {
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQwNjRjYzk2YWFhMWVkNjQyN2NiNyIsImVtYWlsIjoiVG9tQ3J1aXNlNjlAbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRvbSBDcnVpc2UiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MjQ0MjU0MDgsImV4cCI6MTcyNDUxMTgwOH0.8uEECuFpDXRn3bhcBaIsHCRSg7gzkMlTiaspuQuoAkQ"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   console.log("Original Bookings:", bookings); // all bookings

   if (Array.isArray(bookings)) {
    const uniqueClients = bookings.filter(
     (booking, index, self) => index === self.findIndex((b) => b.email === booking.email)
    );
    setBookings(uniqueClients);
    console.log("Filtered Unique Clients:", uniqueClients); // clients без дублікатів
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchData();
 }, []);

 return (
  <div className="flex flex-col w-[320px] mr-10 lg:h-[830px] md:w-[768px] m-auto lg:mx-10 lg:w-[320px]">
   <h2 className="text-3xl mb-5 text-main text-center">Our Clients</h2>
   <div className="flex lg:flex-col gap-4 max-h-[900px] overflow-y-auto box-border">
    {bookings.map((booking) => (
     <ClientCard
      key={booking._id}
      booking={booking}
     />
    ))}
   </div>
  </div>
 );
};

export default ClientCardList;
